function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

// Enhanced collision detection that works with interaction zones
function checkCollisionWithBoundaries(player, boundaries, offset) {
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary,
          position: {
            x: boundary.position.x + offset.x,
            y: boundary.position.y + offset.y
          }
        }
      })
    ) {
      return true // Collision detected
    }
  }
  return false // No collision
}

// Improved character collision detection that integrates with InteractionManager
function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 }
}) {
  // The InteractionManager now handles proximity detection
  // This function maintains legacy compatibility
  player.setInteractionTarget(null)
  
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y
          }
        }
      })
    ) {
      player.setInteractionTarget(character)
      return character
    }
  }
  return null
}

// Camera following system with smooth movement
class CameraController {
  constructor(canvas) {
    this.canvas = canvas
    this.position = { x: 0, y: 0 }
    this.target = null
    this.smoothing = 0.1 // Smoothing factor for camera movement
    this.deadZone = {
      x: canvas.width * 0.4,
      y: canvas.height * 0.4,
      width: canvas.width * 0.2,
      height: canvas.height * 0.2
    }
  }

  setTarget(target) {
    this.target = target
  }

  update() {
    if (!this.target) return

    // Calculate target camera position
    const targetX = -(this.target.position.x - this.canvas.width / 2)
    const targetY = -(this.target.position.y - this.canvas.height / 2)

    // Smooth camera movement
    this.position.x += (targetX - this.position.x) * this.smoothing
    this.position.y += (targetY - this.position.y) * this.smoothing
  }

  getOffset() {
    return {
      x: this.position.x,
      y: this.position.y
    }
  }
}

// Movement system that integrates with interaction states
class MovementController {
  constructor(player, movables, boundaries, characters) {
    this.player = player
    this.movables = movables
    this.boundaries = boundaries
    this.characters = characters
    this.moveSpeed = 3
  }

  // Attempt to move player in specified direction
  tryMove(direction) {
    if (!this.player.canMove()) {
      return false
    }

    const offsets = {
      up: { x: 0, y: this.moveSpeed },
      down: { x: 0, y: -this.moveSpeed },
      left: { x: this.moveSpeed, y: 0 },
      right: { x: -this.moveSpeed, y: 0 }
    }

    const characterOffsets = {
      up: { x: 0, y: 3 },
      down: { x: 0, y: -3 },
      left: { x: 3, y: 0 },
      right: { x: -3, y: 0 }
    }

    const offset = offsets[direction]
    const charOffset = characterOffsets[direction]

    if (!offset) return false

    // Set player animation and sprite
    this.player.animate = true
    this.player.image = this.player.sprites[direction]

    // Check character collisions
    checkForCharacterCollision({
      characters: this.characters,
      player: this.player,
      characterOffset: charOffset
    })

    // Check boundary collisions
    if (checkCollisionWithBoundaries(this.player, this.boundaries, offset)) {
      return false // Movement blocked
    }

    // Move all movable objects
    this.movables.forEach((movable) => {
      movable.position.x += offset.x
      movable.position.y += offset.y
    })

    return true // Movement successful
  }
}
