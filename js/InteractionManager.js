class InteractionManager {
  constructor(gameEngine, canvas, context) {
    this.gameEngine = gameEngine
    this.canvas = canvas
    this.context = context
    this.interactionZones = []
    this.proximityThreshold = 60 // pixels
    this.visualIndicators = new Map()
    this.buildings = [] // Store building instances
    this.buildingZones = [] // Store building interaction zones
  }

  // Add interaction zone for NPCs and buildings
  addInteractionZone(target, type, zone = null) {
    const interactionZone = {
      id: target.id || `${type}_${Date.now()}`,
      target: target,
      type: type, // 'npc' or 'building'
      zone: zone || {
        x: target.position.x - this.proximityThreshold / 2,
        y: target.position.y - this.proximityThreshold / 2,
        width: target.width + this.proximityThreshold,
        height: target.height + this.proximityThreshold
      },
      isActive: false,
      showIndicator: false
    }
    
    this.interactionZones.push(interactionZone)
    return interactionZone
  }

  // Check proximity between player and all interaction zones
  checkProximity(player) {
    let nearestInteraction = null
    let nearestDistance = Infinity

    this.interactionZones.forEach(zone => {
      const distance = this.calculateDistance(player, zone.target)
      const isInZone = this.isPlayerInZone(player, zone)
      
      // Update zone state
      zone.isActive = isInZone
      zone.showIndicator = distance <= this.proximityThreshold

      // Track nearest interaction for player targeting
      if (isInZone && distance < nearestDistance) {
        nearestDistance = distance
        nearestInteraction = zone
      }
    })

    // Update player interaction target
    if (nearestInteraction) {
      player.setInteractionTarget(nearestInteraction.target)
    } else {
      player.setInteractionTarget(null)
    }

    return nearestInteraction
  }

  // Calculate distance between player and target
  calculateDistance(player, target) {
    const playerCenterX = player.position.x + player.width / 2
    const playerCenterY = player.position.y + player.height / 2
    const targetCenterX = target.position.x + target.width / 2
    const targetCenterY = target.position.y + target.height / 2

    return Math.sqrt(
      Math.pow(playerCenterX - targetCenterX, 2) + 
      Math.pow(playerCenterY - targetCenterY, 2)
    )
  }

  // Check if player is within interaction zone
  isPlayerInZone(player, zone) {
    return (
      player.position.x + player.width >= zone.zone.x &&
      player.position.x <= zone.zone.x + zone.zone.width &&
      player.position.y + player.height >= zone.zone.y &&
      player.position.y <= zone.zone.y + zone.zone.height
    )
  }

  // Trigger interaction with target
  triggerInteraction(type, target) {
    switch (type) {
      case 'npc':
        this.triggerNPCInteraction(target)
        break
      case 'building':
        this.triggerBuildingInteraction(target)
        break
      default:
        console.warn('Unknown interaction type:', type)
    }
  }

  // Handle NPC interaction
  triggerNPCInteraction(npc) {
    console.log('Triggering NPC interaction with:', npc.role, npc.id)
    
    // If ConversationManager is available, use it for enhanced conversations
    if (typeof ConversationManager !== 'undefined' && window.conversationManager) {
      const context = {
        npcId: npc.id,
        npcRole: npc.role,
        npcName: npc.name,
        personality: npc.personality
      }
      
      // Start conversation using ConversationManager
      window.conversationManager.startConversation('npc', npc.role, context)
      return
    }
    
    // Fallback to existing dialogue system
    if (npc.dialogue && npc.dialogue.length > 0) {
      const firstMessage = npc.dialogue[0]
      const dialogueBox = document.querySelector('#characterDialogueBox')
      if (dialogueBox) {
        dialogueBox.innerHTML = firstMessage
        dialogueBox.style.display = 'flex'
      }
    }
  }

  // Handle building interaction with asset-based contexts
  triggerBuildingInteraction(building) {
    console.log('Triggering building interaction with:', building.type, building.name)
    
    // Create building-specific interaction context
    const interactionContext = {
      buildingType: building.type,
      buildingName: building.name,
      availableScenarios: building.scenarios,
      learningContexts: building.learningContexts
    }
    
    // Display building interaction UI
    this.displayBuildingInteractionUI(building, interactionContext)
  }

  // Display building interaction UI with asset-based context
  displayBuildingInteractionUI(building, context) {
    const dialogueBox = document.querySelector('#characterDialogueBox')
    if (dialogueBox) {
      // Get a random scenario for this building type
      let scenario = null
      if (typeof getRandomScenario === 'function') {
        scenario = getRandomScenario(building.type)
      }
      
      // Create rich building interaction content
      let interactionHTML = `
        <div class="building-interaction">
          <h3>Welcome to the ${building.name}</h3>
          <p>${building.description}</p>
      `
      
      if (scenario) {
        interactionHTML += `
          <div class="scenario-preview">
            <h4>Available Scenario: ${scenario.title}</h4>
            <p><em>${scenario.description}</em></p>
            <p class="scenario-difficulty">Difficulty: ${scenario.difficulty}</p>
          </div>
        `
      }
      
      interactionHTML += `
          <div class="learning-contexts">
            <h4>Practice Areas:</h4>
            <ul>
              ${building.learningContexts.map(context => `<li>${context}</li>`).join('')}
            </ul>
          </div>
          <p class="interaction-prompt">${building.interactionPrompt}</p>
        </div>
      `
      
      dialogueBox.innerHTML = interactionHTML
      dialogueBox.style.display = 'flex'
      
      // Add building-specific styling
      dialogueBox.className = `dialogue-box building-${building.type}`
    }
  }

  // End current interaction
  endInteraction() {
    const dialogueBox = document.querySelector('#characterDialogueBox')
    if (dialogueBox) {
      dialogueBox.style.display = 'none'
    }
  }

  // Render visual indicators for interactive elements
  renderVisualIndicators() {
    this.interactionZones.forEach(zone => {
      if (zone.showIndicator) {
        this.drawInteractionIndicator(zone)
      }
    })
  }

  // Draw interaction indicator with building-specific visual feedback
  drawInteractionIndicator(zone) {
    const ctx = this.context
    const target = zone.target
    
    // Save context state
    ctx.save()
    
    // Use building-specific visual feedback if available
    let glowColor = '#FFFFFF'
    let glowIntensity = 8
    let strokeColor = '#FFFFFF'
    
    if (zone.type === 'building' && zone.visualFeedback) {
      if (zone.isActive) {
        glowColor = zone.visualFeedback.activeColor
        strokeColor = zone.visualFeedback.activeColor
        glowIntensity = zone.visualFeedback.glowIntensity
      } else {
        glowColor = zone.visualFeedback.hoverColor
        strokeColor = zone.visualFeedback.hoverColor
        glowIntensity = zone.visualFeedback.glowIntensity * 0.7
      }
    } else {
      // Default NPC styling
      if (zone.isActive) {
        glowColor = '#FFD700' // Gold color
        strokeColor = '#FFD700'
        glowIntensity = 15
      }
    }
    
    // Draw glow effect
    ctx.shadowColor = glowColor
    ctx.shadowBlur = glowIntensity
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = zone.isActive ? 3 : 2
    
    // Draw indicator rectangle around target
    ctx.strokeRect(
      target.position.x - 5,
      target.position.y - 5,
      target.width + 10,
      target.height + 10
    )
    
    // Draw interaction prompt if in active zone
    if (zone.isActive) {
      const promptText = zone.interactionPrompt || 
        (zone.type === 'npc' ? 'Press SPACE to talk' : 'Press SPACE to enter')
      this.drawInteractionPrompt(target, zone.type, promptText)
    }
    
    // Restore context state
    ctx.restore()
  }

  // Draw interaction prompt text with custom message support
  drawInteractionPrompt(target, type, customPrompt = null) {
    const ctx = this.context
    const promptText = customPrompt || 
      (type === 'npc' ? 'Press SPACE to talk' : 'Press SPACE to enter')
    
    // Calculate prompt position above target
    const promptX = target.position.x + target.width / 2
    const promptY = target.position.y - 20
    
    // Draw prompt background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    ctx.font = '14px Arial'
    const textMetrics = ctx.measureText(promptText)
    const padding = 8
    
    ctx.fillRect(
      promptX - textMetrics.width / 2 - padding,
      promptY - 16 - padding,
      textMetrics.width + padding * 2,
      20 + padding * 2
    )
    
    // Draw prompt text
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    ctx.fillText(promptText, promptX, promptY)
  }

  // Initialize interaction zones for existing characters
  initializeCharacterZones(characters) {
    characters.forEach(character => {
      this.addInteractionZone(character, 'npc')
    })
  }

  // Initialize interaction zones for buildings using asset-based system
  initializeBuildingZones(buildings = []) {
    this.buildings = buildings
    buildings.forEach(building => {
      const zone = this.addInteractionZone(building, 'building', building.interactionZone)
      
      // Store building-specific zone data
      zone.buildingType = building.type
      zone.visualFeedback = building.visualFeedback
      zone.interactionPrompt = building.interactionPrompt
      zone.learningContexts = building.learningContexts
      
      this.buildingZones.push(zone)
    })
  }

  // Update interaction zones when world objects move
  updateZones() {
    this.interactionZones.forEach(zone => {
      // Update zone position based on target position
      zone.zone.x = zone.target.position.x - this.proximityThreshold / 2
      zone.zone.y = zone.target.position.y - this.proximityThreshold / 2
    })
  }

  // Clean up interaction zones
  removeInteractionZone(targetId) {
    this.interactionZones = this.interactionZones.filter(zone => zone.id !== targetId)
  }

  // Get all active interaction zones
  getActiveZones() {
    return this.interactionZones.filter(zone => zone.isActive)
  }

  // Get zones showing indicators
  getIndicatorZones() {
    return this.interactionZones.filter(zone => zone.showIndicator)
  }

  // Get building by type
  getBuildingByType(type) {
    return this.buildings.find(building => building.type === type) || null
  }

  // Get all buildings of a specific type
  getBuildingsByType(type) {
    return this.buildings.filter(building => building.type === type)
  }

  // Get building interaction zone by building ID
  getBuildingZone(buildingId) {
    return this.buildingZones.find(zone => zone.target.id === buildingId) || null
  }

  // Check if position is near any building
  isNearBuilding(position, radius = 100) {
    return this.buildings.some(building => {
      const distance = Math.sqrt(
        Math.pow(building.position.x - position.x, 2) + 
        Math.pow(building.position.y - position.y, 2)
      )
      return distance <= radius
    })
  }

  // Get nearest building to a position
  getNearestBuilding(position) {
    let nearestBuilding = null
    let nearestDistance = Infinity

    this.buildings.forEach(building => {
      const distance = Math.sqrt(
        Math.pow(building.position.x - position.x, 2) + 
        Math.pow(building.position.y - position.y, 2)
      )
      
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestBuilding = building
      }
    })

    return nearestBuilding
  }
}