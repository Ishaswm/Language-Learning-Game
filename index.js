const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Initialize InteractionManager
const interactionManager = new InteractionManager(null, canvas, c)

// Initialize Camera Controller
const cameraController = new CameraController(canvas)

// Initialize Movement Controller (will be set up after player creation)
let movementController = null

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}



const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 70) {
  charactersMap.push(charactersMapData.slice(i, 70 + i))
}
console.log(charactersMap)

const boundaries = []
const offset = {
  x: -735,
  y: -650
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})



const characters = []
const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

// Load new character assets
const newCharacterImages = {}
newAssets.characters.forEach(character => {
  const img = new Image()
  img.src = character.sprite
  newCharacterImages[character.id] = img
})

// Create building instances from asset definitions
const buildings = createBuildingInstances()

// Create environmental elements
console.log('Creating environmental elements...')
const environmentalData = createEnvironmentalElements()
const environmentalElements = environmentalData.elements
const environmentalBoundaries = environmentalData.boundaries

console.log('Environmental elements created:', environmentalElements.length)
console.log('Environmental boundaries created:', environmentalBoundaries.length)
console.log('Sample environmental element:', environmentalElements[0])

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // 1026 === villager
    if (symbol === 1026) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 3,
          animate: true,
          dialogue: ['...', 'Hey mister, have you seen my Doggochu?'],
          role: 'villager',
          personality: 'friendly',
          dialogueTopics: ['local_news', 'missing_pet'],
          conversationStarters: ['Hey there!', 'Have you seen anything unusual?']
        })
      )
    }
    // 1031 === oldMan
    else if (symbol === 1031) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 3,
          dialogue: ['My bones hurt.'],
          role: 'elder',
          personality: 'formal',
          dialogueTopics: ['health', 'old_times', 'wisdom'],
          conversationStarters: ['Hello young one.', 'Back in my day...']
        })
      )
    }
    // 1032 === Dr. Elena Martinez (new asset)
    else if (symbol === 1032) {
      const doctorData = newAssets.characters.find(c => c.id === 'npc1')
      if (doctorData) {
        characters.push(
          new Character({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            },
            image: newCharacterImages['npc1'],
            frames: {
              max: 1, // Static image for now
              hold: 60
            },
            scale: 2,
            dialogue: doctorData.dialogue,
            role: doctorData.role,
            personality: doctorData.personality,
            scenarios: doctorData.scenarios,
            dialogueTopics: doctorData.dialogueTopics,
            conversationStarters: doctorData.conversationStarters,
            id: doctorData.id,
            name: doctorData.name
          })
        )
      }
    }
    // 1033 === Marco the Shopkeeper (new asset)
    else if (symbol === 1033) {
      const shopkeeperData = newAssets.characters.find(c => c.id === 'npc2')
      if (shopkeeperData) {
        characters.push(
          new Character({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            },
            image: newCharacterImages['npc2'],
            frames: {
              max: 1, // Static image for now
              hold: 60
            },
            scale: 2,
            dialogue: shopkeeperData.dialogue,
            role: shopkeeperData.role,
            personality: shopkeeperData.personality,
            scenarios: shopkeeperData.scenarios,
            dialogueTopics: shopkeeperData.dialogueTopics,
            conversationStarters: shopkeeperData.conversationStarters,
            id: shopkeeperData.id,
            name: shopkeeperData.name
          })
        )
      }
    }
    // 1034 === Sofia the Student (new asset)
    else if (symbol === 1034) {
      const studentData = newAssets.characters.find(c => c.id === 'npc3')
      if (studentData) {
        characters.push(
          new Character({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            },
            image: newCharacterImages['npc3'],
            frames: {
              max: 1, // Static image for now
              hold: 60
            },
            scale: 2,
            dialogue: studentData.dialogue,
            role: studentData.role,
            personality: studentData.personality,
            scenarios: studentData.scenarios,
            dialogueTopics: studentData.dialogueTopics,
            conversationStarters: studentData.conversationStarters,
            id: studentData.id,
            name: studentData.name
          })
        )
      }
    }
    // 1035 === Carlos the Citizen (new asset)
    else if (symbol === 1035) {
      const citizenData = newAssets.characters.find(c => c.id === 'npc4')
      if (citizenData) {
        characters.push(
          new Character({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            },
            image: newCharacterImages['npc4'],
            frames: {
              max: 1, // Static image for now
              hold: 60
            },
            scale: 2,
            dialogue: citizenData.dialogue,
            role: citizenData.role,
            personality: citizenData.personality,
            scenarios: citizenData.scenarios,
            dialogueTopics: citizenData.dialogueTopics,
            conversationStarters: citizenData.conversationStarters,
            id: citizenData.id,
            name: citizenData.name
          })
        )
      }
    }

    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})

// Add environmental boundaries to the main boundaries array
boundaries.push(...environmentalBoundaries)

const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Player({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const movables = [
  background,
  ...boundaries,
  foreground,
  ...characters,
  ...buildings,
  ...environmentalElements
]
const renderables = [
  background,
  ...boundaries,
  ...characters,
  ...buildings,
  ...environmentalElements,
  player,
  foreground
]

// Initialize interaction zones for characters
interactionManager.initializeCharacterZones(characters)

// Initialize interaction zones for buildings
interactionManager.initializeBuildingZones(buildings)

// Set up camera to follow player
cameraController.setTarget(player)

// Initialize movement controller
movementController = new MovementController(player, movables, boundaries, characters)



function animate() {
  const animationId = window.requestAnimationFrame(animate)
  
  // Update camera position for smooth following
  cameraController.update()
  
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  // Check for proximity-based interactions
  interactionManager.checkProximity(player)
  
  // Update interaction zones positions
  interactionManager.updateZones()
  
  // Render visual indicators for interactive elements
  interactionManager.renderVisualIndicators()

  // Reset player animation
  player.animate = false

  // Update sprite based on current interaction state
  player.updateSpriteForState()

  // Handle movement using the new movement controller
  if (keys.w.pressed && lastKey === 'w') {
    movementController.tryMove('up')
  } else if (keys.a.pressed && lastKey === 'a') {
    movementController.tryMove('left')
  } else if (keys.s.pressed && lastKey === 's') {
    movementController.tryMove('down')
  } else if (keys.d.pressed && lastKey === 'd') {
    movementController.tryMove('right')
  }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        player.interactionAsset.dialogueIndex++

        const { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector('#characterDialogueBox').innerHTML =
            player.interactionAsset.dialogue[dialogueIndex]
          return
        }

        // finish conversation using new method
        player.exitConversationMode()
        document.querySelector('#characterDialogueBox').style.display = 'none'

        break
    }
    return
  }

  switch (e.key) {
    case ' ':
      if (!player.interactionAsset) return

      // beginning the conversation using new method
      const firstMessage = player.interactionAsset.dialogue[0]
      document.querySelector('#characterDialogueBox').innerHTML = firstMessage
      document.querySelector('#characterDialogueBox').style.display = 'flex'
      player.enterConversationMode()
      break
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    // audio.Map.play()
    clicked = true
  }
})
