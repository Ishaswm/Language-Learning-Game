/**
 * Building definitions for language learning RPG
 * Maps asset sprites to learning contexts and interaction zones
 */

// Building class for interactive learning locations
class Building extends Sprite {
  constructor({
    position,
    image,
    type,
    name,
    scenarios = [],
    interactionZone = null,
    scale = 1,
    id = null
  }) {
    super({
      position,
      image,
      frames: { max: 1, hold: 10 },
      scale
    })

    this.id = id || `building_${type}_${Date.now()}`
    this.type = type
    this.name = name
    this.scenarios = scenarios
    this.isInteractable = true
    
    // Define interaction zone (area where player can interact)
    this.interactionZone = interactionZone || {
      x: position.x - 30,
      y: position.y - 30,
      width: this.width + 60,
      height: this.height + 60
    }
  }

  // Get available scenarios for this building
  getScenarios() {
    return this.scenarios
  }

  // Get scenario by difficulty level
  getScenariosByDifficulty(difficulty) {
    return this.scenarios.filter(scenario => scenario.difficulty === difficulty)
  }

  // Check if player is in interaction range
  isPlayerInRange(player, threshold = 50) {
    const playerCenterX = player.position.x + player.width / 2
    const playerCenterY = player.position.y + player.height / 2
    const buildingCenterX = this.position.x + this.width / 2
    const buildingCenterY = this.position.y + this.height / 2

    const distance = Math.sqrt(
      Math.pow(playerCenterX - buildingCenterX, 2) + 
      Math.pow(playerCenterY - buildingCenterY, 2)
    )

    return distance <= threshold
  }

  // Draw building with interaction indicator if player is nearby
  draw() {
    super.draw()
    
    // Additional building-specific rendering can be added here
    // For example, name labels, interaction prompts, etc.
  }
}

// Building type definitions using assets from the assets/ folder
const buildingTypes = {
  hospital: {
    name: 'Hospital',
    description: 'Practice medical conversations and appointments',
    assetFile: './assets/Gemini_Generated_Image_194dv5194dv5194d.png', // Medical-themed asset
    scenarios: ['appointment_booking', 'symptom_description', 'medical_consultation'],
    interactionPrompt: 'Press SPACE to enter the hospital',
    learningContexts: [
      'Making medical appointments',
      'Describing symptoms and health concerns', 
      'Understanding medical advice',
      'Emergency situations'
    ]
  },
  
  cafe: {
    name: 'Café',
    description: 'Practice food service and social interactions',
    assetFile: './assets/Gemini_Generated_Image_ghp5wmghp5wmghp5.png', // Café-themed asset
    scenarios: ['ordering_food', 'making_reservations', 'social_conversation'],
    interactionPrompt: 'Press SPACE to enter the café',
    learningContexts: [
      'Ordering food and beverages',
      'Making restaurant reservations',
      'Casual social conversations',
      'Handling service issues'
    ]
  },
  
  shop: {
    name: 'Shop',
    description: 'Practice shopping and customer service interactions',
    assetFile: './assets/Gemini_Generated_Image_hp5qdqhp5qdqhp5q.png', // Shop-themed asset
    scenarios: ['purchasing_items', 'asking_prices', 'requesting_assistance'],
    interactionPrompt: 'Press SPACE to enter the shop',
    learningContexts: [
      'Asking about prices and products',
      'Making purchases and payments',
      'Requesting customer assistance',
      'Returning or exchanging items'
    ]
  },
  
  school: {
    name: 'School',
    description: 'Practice educational and administrative interactions',
    assetFile: './assets/Gemini_Generated_Image_vby7auvby7auvby7.png', // School-themed asset
    scenarios: ['asking_directions', 'enrollment_inquiries', 'course_information'],
    interactionPrompt: 'Press SPACE to enter the school',
    learningContexts: [
      'Asking for directions around campus',
      'Inquiring about course enrollment',
      'Getting academic information',
      'Participating in classroom activities'
    ]
  }
}

// Building positions and instances for the game map
const buildingInstances = [
  {
    id: 'hospital_main',
    type: 'hospital',
    position: { x: 200, y: 150 },
    mapSymbol: 1034, // Symbol used in collision/character map
    scale: 2
  },
  {
    id: 'cafe_central',
    type: 'cafe', 
    position: { x: 500, y: 300 },
    mapSymbol: 1035,
    scale: 2
  },
  {
    id: 'shop_market',
    type: 'shop',
    position: { x: 350, y: 200 },
    mapSymbol: 1036,
    scale: 2
  },
  {
    id: 'school_language',
    type: 'school',
    position: { x: 150, y: 400 },
    mapSymbol: 1037,
    scale: 2
  }
]

// Building interaction zones configuration
const buildingInteractionZones = {
  // Hospital interaction zone
  hospital: {
    proximityThreshold: 60,
    interactionArea: {
      width: 120,
      height: 120
    },
    visualFeedback: {
      hoverColor: '#FF6B6B', // Medical red
      activeColor: '#FF4757',
      glowIntensity: 12
    }
  },
  
  // Café interaction zone
  cafe: {
    proximityThreshold: 55,
    interactionArea: {
      width: 110,
      height: 110
    },
    visualFeedback: {
      hoverColor: '#8B4513', // Coffee brown
      activeColor: '#A0522D',
      glowIntensity: 10
    }
  },
  
  // Shop interaction zone
  shop: {
    proximityThreshold: 50,
    interactionArea: {
      width: 100,
      height: 100
    },
    visualFeedback: {
      hoverColor: '#4ECDC4', // Shop teal
      activeColor: '#26D0CE',
      glowIntensity: 8
    }
  },
  
  // School interaction zone
  school: {
    proximityThreshold: 65,
    interactionArea: {
      width: 130,
      height: 130
    },
    visualFeedback: {
      hoverColor: '#45B7D1', // Academic blue
      activeColor: '#3498DB',
      glowIntensity: 15
    }
  }
}

// Function to create building instances from definitions
function createBuildingInstances() {
  const buildings = []
  
  buildingInstances.forEach(instance => {
    const buildingType = buildingTypes[instance.type]
    if (!buildingType) {
      console.warn(`Unknown building type: ${instance.type}`)
      return
    }

    // Load building image
    const buildingImage = new Image()
    buildingImage.src = buildingType.assetFile

    // Create building instance
    const building = new Building({
      position: instance.position,
      image: buildingImage,
      type: instance.type,
      name: buildingType.name,
      scenarios: buildingType.scenarios,
      scale: instance.scale || 1,
      id: instance.id,
      interactionZone: {
        x: instance.position.x - buildingInteractionZones[instance.type].proximityThreshold / 2,
        y: instance.position.y - buildingInteractionZones[instance.type].proximityThreshold / 2,
        width: buildingInteractionZones[instance.type].interactionArea.width,
        height: buildingInteractionZones[instance.type].interactionArea.height
      }
    })

    // Add building-specific properties
    building.description = buildingType.description
    building.interactionPrompt = buildingType.interactionPrompt
    building.learningContexts = buildingType.learningContexts
    building.visualFeedback = buildingInteractionZones[instance.type].visualFeedback

    buildings.push(building)
  })

  return buildings
}

// Function to get building by type
function getBuildingByType(type) {
  return buildingTypes[type] || null
}

// Function to get building instance by ID
function getBuildingById(buildings, id) {
  return buildings.find(building => building.id === id) || null
}

// Function to get buildings near a position
function getBuildingsNearPosition(buildings, position, radius = 100) {
  return buildings.filter(building => {
    const distance = Math.sqrt(
      Math.pow(building.position.x - position.x, 2) + 
      Math.pow(building.position.y - position.y, 2)
    )
    return distance <= radius
  })
}

// Export building system components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Building,
    buildingTypes,
    buildingInstances,
    buildingInteractionZones,
    createBuildingInstances,
    getBuildingByType,
    getBuildingById,
    getBuildingsNearPosition
  }
}