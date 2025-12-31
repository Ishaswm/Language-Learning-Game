class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1
  }) {
    this.position = position
    this.image = new Image()
    this.frames = { ...frames, val: 0, elapsed: 0 }
    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale
      this.height = this.image.height * scale
    }
    this.image.src = image.src

    this.animate = animate
    this.sprites = sprites
    this.opacity = 1

    this.rotation = rotation
    this.scale = scale
  }

  draw() {
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
    )

    c.restore()

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }
}


class Boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Player extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })

    // Interaction state management
    this.isInteracting = false
    this.interactionTarget = null
    this.interactionAsset = null // Legacy compatibility
    this.conversationMode = false
    this.movementEnabled = true
    
    // Interaction states for smooth transitions
    this.states = {
      EXPLORING: 'exploring',
      APPROACHING: 'approaching', 
      CONVERSING: 'conversing'
    }
    this.currentState = this.states.EXPLORING
  }

  // Set interaction target and manage state transitions
  setInteractionTarget(target) {
    this.interactionTarget = target
    this.interactionAsset = target // Legacy compatibility
    
    if (target) {
      this.currentState = this.states.APPROACHING
    } else {
      this.currentState = this.states.EXPLORING
    }
  }

  // Enter conversation mode with smooth transition
  enterConversationMode() {
    this.conversationMode = true
    this.isInteracting = true
    this.movementEnabled = false
    this.currentState = this.states.CONVERSING
    this.animate = false // Stop movement animation
  }

  // Exit conversation mode and return to exploration
  exitConversationMode() {
    this.conversationMode = false
    this.isInteracting = false
    this.movementEnabled = true
    this.currentState = this.states.EXPLORING
    this.interactionTarget = null
    this.interactionAsset = null
  }

  // Check if player can move based on current state
  canMove() {
    return this.movementEnabled && !this.conversationMode
  }

  // Update sprite handling for interaction states
  updateSpriteForState() {
    switch (this.currentState) {
      case this.states.EXPLORING:
        // Normal movement sprites handled by movement logic
        break
      case this.states.APPROACHING:
        // Could add special approaching animation here
        break
      case this.states.CONVERSING:
        // Stop animation and use idle sprite
        this.animate = false
        break
    }
  }
}

class EnvironmentalElement extends Sprite {
  constructor({
    position,
    image,
    scale = 1,
    type = 'decoration',
    hasCollision = false,
    name = 'Environmental Element',
    description = '',
    id = null,
    frames = { max: 1, hold: 10 },
    animate = false
  }) {
    super({
      position,
      image: image, // Pass the image object directly as Sprite expects it
      frames,
      animate,
      scale
    })

    this.type = type
    this.hasCollision = hasCollision
    this.name = name
    this.description = description
    this.id = id
    this.isEnvironmental = true
    
    // Visual enhancement properties
    this.opacity = 1
    this.shadowOffset = { x: 2, y: 2 }
    this.shadowBlur = 4
    this.shadowColor = 'rgba(0, 0, 0, 0.3)'
  }

  draw() {
    // Add subtle shadow for depth
    if (this.type === 'decoration') {
      c.save()
      c.shadowOffsetX = this.shadowOffset.x
      c.shadowOffsetY = this.shadowOffset.y
      c.shadowBlur = this.shadowBlur
      c.shadowColor = this.shadowColor
    }

    // Call parent draw method
    super.draw()

    if (this.type === 'decoration') {
      c.restore()
    }
  }

  // Check if this element should block movement
  blocksMovement() {
    return this.hasCollision
  }

  // Get interaction info (for future interactive environmental elements)
  getInteractionInfo() {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      canInteract: false // Environmental elements are currently non-interactive
    }
  }
}

class Character extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = [''],
    role = 'villager',
    scenarios = [],
    personality = 'friendly',
    dialogueTopics = [],
    conversationStarters = [],
    id = null,
    name = 'Unknown'
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })

    this.dialogue = dialogue
    this.dialogueIndex = 0
    this.role = role
    this.scenarios = scenarios
    this.personality = personality
    this.dialogueTopics = dialogueTopics
    this.conversationStarters = conversationStarters
    this.id = id
    this.name = name
    
    // Enhanced interaction state
    this.isAvailable = true
    this.currentConversationTopic = null
    this.conversationHistory = []
  }

  // Get a random conversation starter based on role and personality
  getRandomConversationStarter() {
    // Use detailed templates if available for this character
    if (this.id && typeof NPCTemplateUtils !== 'undefined') {
      return NPCTemplateUtils.getRandomGreeting(this.id)
    }
    
    if (this.conversationStarters.length === 0) {
      return this.getDefaultConversationStarter()
    }
    
    const randomIndex = Math.floor(Math.random() * this.conversationStarters.length)
    return this.conversationStarters[randomIndex]
  }

  // Get default conversation starter based on role
  getDefaultConversationStarter() {
    const roleBasedStarters = {
      'doctor': 'How can I help you today? Are you feeling alright?',
      'shopkeeper': 'Welcome to my shop! What can I help you find?',
      'student': 'Hi there! Are you new around here?',
      'citizen': 'Hello! Nice day, isn\'t it?',
      'teacher': 'Hello! Would you like to practice your language skills?',
      'villager': 'Hello there, traveler!'
    }
    
    return roleBasedStarters[this.role] || 'Hello!'
  }

  // Get a random dialogue topic for variety
  getRandomDialogueTopic() {
    // Use detailed templates if available for this character
    if (this.id && typeof NPCTemplateUtils !== 'undefined') {
      return NPCTemplateUtils.getRandomTopic(this.id)
    }
    
    if (this.dialogueTopics.length === 0) {
      return this.getDefaultDialogueTopics()
    }
    
    const randomIndex = Math.floor(Math.random() * this.dialogueTopics.length)
    return this.dialogueTopics[randomIndex]
  }

  // Get default dialogue topics based on role
  getDefaultDialogueTopics() {
    const roleBasedTopics = {
      'doctor': ['health', 'symptoms', 'appointments', 'medical_advice'],
      'shopkeeper': ['products', 'prices', 'recommendations', 'store_hours'],
      'student': ['school', 'studies', 'local_area', 'friends'],
      'citizen': ['weather', 'local_events', 'directions', 'daily_life'],
      'teacher': ['language_learning', 'grammar', 'vocabulary', 'practice'],
      'villager': ['local_news', 'weather', 'directions']
    }
    
    return roleBasedTopics[this.role] || ['general_conversation']
  }

  // Generate contextual dialogue based on personality and role
  generateContextualDialogue(topic = null) {
    // Use detailed templates if available for this character
    if (this.id && typeof NPCTemplateUtils !== 'undefined') {
      const selectedTopic = topic || NPCTemplateUtils.getRandomTopic(this.id)
      const personalityModifier = this.getPersonalityModifier()
      
      return {
        topic: selectedTopic,
        starter: NPCTemplateUtils.getRandomGreeting(this.id),
        personality: this.personality,
        role: this.role,
        npcId: this.id // Include NPC ID for detailed conversation handling
      }
    }
    
    const selectedTopic = topic || this.getRandomDialogueTopic()
    const personalityModifier = this.getPersonalityModifier()
    
    // This would integrate with the conversation system
    return {
      topic: selectedTopic,
      starter: this.getRandomConversationStarter(),
      personality: this.personality,
      role: this.role
    }
  }

  // Get personality modifier for dialogue tone
  getPersonalityModifier() {
    const modifiers = {
      'friendly': { tone: 'warm', enthusiasm: 'high' },
      'formal': { tone: 'professional', enthusiasm: 'moderate' },
      'casual': { tone: 'relaxed', enthusiasm: 'moderate' },
      'helpful': { tone: 'supportive', enthusiasm: 'high' },
      'shy': { tone: 'quiet', enthusiasm: 'low' },
      'energetic': { tone: 'upbeat', enthusiasm: 'very_high' }
    }
    
    return modifiers[this.personality] || modifiers['friendly']
  }

  // Start a conversation and track it
  startConversation(topic = null) {
    this.isAvailable = false
    this.currentConversationTopic = topic || this.getRandomDialogueTopic()
    
    const conversationData = this.generateContextualDialogue(this.currentConversationTopic)
    
    // Add to conversation history
    this.conversationHistory.push({
      timestamp: new Date(),
      topic: this.currentConversationTopic,
      initiated: true
    })
    
    return conversationData
  }

  // End conversation and reset state
  endConversation() {
    this.isAvailable = true
    this.currentConversationTopic = null
    this.dialogueIndex = 0
  }
}
