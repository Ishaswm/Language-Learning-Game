/**
 * ScenarioEngine class handles building-specific learning tasks
 * Creates scenario templates, contextual prompts, and manages difficulty levels
 * Now integrated with asset-based building scenarios
 */
class ScenarioEngine {
  constructor() {
    this.scenarios = {}
    this.assetBasedScenarios = {} // New asset-based scenarios
    this.difficultyLevels = ['beginner', 'intermediate', 'advanced']
    this.currentScenario = null
    
    // Initialize scenario templates
    this.initializeScenarios()
    this.initializeAssetBasedScenarios()
  }

  /**
   * Initialize asset-based scenario templates from buildingScenarios.js
   */
  initializeAssetBasedScenarios() {
    // Check if buildingScenarioTemplates is available (from buildingScenarios.js)
    if (typeof buildingScenarioTemplates !== 'undefined') {
      this.assetBasedScenarios = buildingScenarioTemplates
      console.log('Asset-based scenarios loaded:', Object.keys(this.assetBasedScenarios))
    } else {
      console.warn('buildingScenarioTemplates not found - asset-based scenarios not loaded')
    }
  }

  /**
   * Get asset-based scenario for a building type
   * @param {string} buildingType - Type of building (hospital, cafe, shop, school)
   * @param {string} scenarioId - Optional specific scenario ID
   * @returns {Object|null} Scenario data with asset context
   */
  getAssetBasedScenario(buildingType, scenarioId = null) {
    const buildingScenarios = this.assetBasedScenarios[buildingType]
    if (!buildingScenarios) return null

    if (scenarioId) {
      return buildingScenarios.scenarios.find(scenario => scenario.id === scenarioId) || null
    }

    // Return random scenario if no specific ID provided
    const scenarios = buildingScenarios.scenarios
    if (scenarios.length === 0) return null
    
    const randomIndex = Math.floor(Math.random() * scenarios.length)
    return scenarios[randomIndex]
  }

  /**
   * Get asset-based scenarios by difficulty
   * @param {string} buildingType - Type of building
   * @param {string} difficulty - Difficulty level
   * @returns {Array} Array of scenarios matching difficulty
   */
  getAssetBasedScenariosByDifficulty(buildingType, difficulty) {
    const buildingScenarios = this.assetBasedScenarios[buildingType]
    if (!buildingScenarios) return []

    return buildingScenarios.scenarios.filter(scenario => scenario.difficulty === difficulty)
  }
  /**
   * Initialize scenario templates for different building types
   */
  initializeScenarios() {
    this.scenarios = {
      hospital: {
        name: 'Hospital',
        description: 'Practice medical conversations and appointments',
        scenarios: [
          {
            id: 'hospital_appointment',
            title: 'Making an Appointment',
            description: 'Schedule a doctor\'s appointment over the phone',
            difficulty: 'beginner',
            context: {
              setting: 'Hospital reception desk',
              role: 'Patient calling to make an appointment',
              goal: 'Successfully schedule an appointment'
            },
            prompt: 'You need to call the hospital to schedule a check-up appointment. The receptionist will help you find an available time.',
            expectedVocabulary: [
              'appointment', 'doctor', 'schedule', 'available', 'time',
              'check-up', 'patient', 'insurance', 'morning', 'afternoon'
            ],
            keyPhrases: [
              'I would like to make an appointment',
              'When is the doctor available?',
              'What time works best?',
              'I need to see a doctor'
            ],
            learningObjectives: [
              'Use polite language for requests',
              'Ask about availability',
              'Provide personal information',
              'Confirm appointment details'
            ]
          },
          {
            id: 'hospital_symptoms',
            title: 'Describing Symptoms',
            description: 'Explain your health concerns to a doctor',
            difficulty: 'intermediate',
            context: {
              setting: 'Doctor\'s office during consultation',
              role: 'Patient describing symptoms',
              goal: 'Clearly communicate health issues'
            },
            prompt: 'You\'re at the doctor\'s office for your appointment. Describe how you\'ve been feeling and any symptoms you\'ve experienced.',
            expectedVocabulary: [
              'pain', 'headache', 'fever', 'tired', 'symptoms',
              'stomach', 'throat', 'cough', 'dizzy', 'nausea'
            ],
            keyPhrases: [
              'I have been feeling...',
              'The pain is in my...',
              'It started yesterday/last week',
              'It hurts when I...'
            ],
            learningObjectives: [
              'Describe physical sensations',
              'Use time expressions',
              'Express intensity of symptoms',
              'Ask for medical advice'
            ]
          },
          {
            id: 'hospital_emergency',
            title: 'Emergency Situation',
            description: 'Handle an urgent medical situation',
            difficulty: 'advanced',
            context: {
              setting: 'Emergency room',
              role: 'Person seeking urgent care',
              goal: 'Communicate urgency and get immediate help'
            },
            prompt: 'You\'re in the emergency room with an urgent medical issue. Explain the situation clearly and quickly to the medical staff.',
            expectedVocabulary: [
              'emergency', 'urgent', 'accident', 'injury', 'bleeding',
              'unconscious', 'allergic', 'medication', 'immediately', 'serious'
            ],
            keyPhrases: [
              'This is an emergency',
              'I need help immediately',
              'Someone is hurt',
              'Call a doctor right away'
            ],
            learningObjectives: [
              'Express urgency effectively',
              'Describe emergency situations',
              'Use imperative forms',
              'Communicate under pressure'
            ]
          }
        ]
      },

      cafe: {
        name: 'Café',
        description: 'Practice food service and social interactions',
        scenarios: [
          {
            id: 'cafe_ordering',
            title: 'Ordering Food and Drinks',
            description: 'Order items from a café menu',
            difficulty: 'beginner',
            context: {
              setting: 'Café counter',
              role: 'Customer placing an order',
              goal: 'Successfully order food and drinks'
            },
            prompt: 'You\'re at a popular café and want to order something to eat and drink. Look at the menu and place your order with the server.',
            expectedVocabulary: [
              'coffee', 'tea', 'sandwich', 'order', 'please',
              'menu', 'latte', 'cappuccino', 'pastry', 'size'
            ],
            keyPhrases: [
              'I would like to order...',
              'Can I have a...',
              'What do you recommend?',
              'How much does it cost?'
            ],
            learningObjectives: [
              'Use polite ordering language',
              'Ask about menu items',
              'Express preferences',
              'Handle payment conversation'
            ]
          },
          {
            id: 'cafe_reservation',
            title: 'Making a Reservation',
            description: 'Reserve a table for a group',
            difficulty: 'intermediate',
            context: {
              setting: 'Café phone call',
              role: 'Customer making a reservation',
              goal: 'Book a table for a specific time and group size'
            },
            prompt: 'You want to bring friends to the café later today. Call to make a reservation for your group.',
            expectedVocabulary: [
              'reservation', 'table', 'people', 'time', 'available',
              'party', 'evening', 'book', 'confirm', 'group'
            ],
            keyPhrases: [
              'I\'d like to make a reservation',
              'Do you have a table available?',
              'For how many people?',
              'What time would work?'
            ],
            learningObjectives: [
              'Make future arrangements',
              'Specify numbers and times',
              'Negotiate availability',
              'Confirm details'
            ]
          },
          {
            id: 'cafe_complaint',
            title: 'Handling a Problem',
            description: 'Address an issue with your order',
            difficulty: 'advanced',
            context: {
              setting: 'Café table after receiving order',
              role: 'Customer with a complaint',
              goal: 'Politely resolve an order problem'
            },
            prompt: 'There\'s something wrong with your order - maybe it\'s cold, incorrect, or not what you expected. Speak with the staff to resolve the issue.',
            expectedVocabulary: [
              'problem', 'wrong', 'cold', 'mistake', 'replace',
              'complaint', 'manager', 'refund', 'apologize', 'solution'
            ],
            keyPhrases: [
              'Excuse me, there\'s a problem',
              'This isn\'t what I ordered',
              'Could you please fix this?',
              'I\'d like to speak to the manager'
            ],
            learningObjectives: [
              'Express dissatisfaction politely',
              'Explain problems clearly',
              'Request solutions',
              'Handle conflict resolution'
            ]
          }
        ]
      },

      shop: {
        name: 'Shop',
        description: 'Practice shopping and customer service interactions',
        scenarios: [
          {
            id: 'shop_prices',
            title: 'Asking for Prices',
            description: 'Inquire about the cost of items',
            difficulty: 'beginner',
            context: {
              setting: 'Retail store',
              role: 'Customer shopping for items',
              goal: 'Find out prices and make purchasing decisions'
            },
            prompt: 'You\'re browsing in a shop and want to know the prices of various items. Ask the shopkeeper about costs and compare options.',
            expectedVocabulary: [
              'price', 'cost', 'expensive', 'cheap', 'money',
              'dollar', 'sale', 'discount', 'budget', 'afford'
            ],
            keyPhrases: [
              'How much does this cost?',
              'What\'s the price of...?',
              'Is this on sale?',
              'Do you have anything cheaper?'
            ],
            learningObjectives: [
              'Ask about prices',
              'Compare costs',
              'Express budget constraints',
              'Negotiate or ask for discounts'
            ]
          },
          {
            id: 'shop_assistance',
            title: 'Requesting Assistance',
            description: 'Ask staff for help finding items',
            difficulty: 'intermediate',
            context: {
              setting: 'Large retail store',
              role: 'Customer needing help',
              goal: 'Get assistance finding specific items'
            },
            prompt: 'You\'re looking for specific items in a large store but can\'t find them. Ask the staff for help locating what you need.',
            expectedVocabulary: [
              'help', 'find', 'looking for', 'where', 'assistance',
              'aisle', 'section', 'department', 'location', 'directions'
            ],
            keyPhrases: [
              'Excuse me, can you help me?',
              'I\'m looking for...',
              'Where can I find...?',
              'Could you show me where...?'
            ],
            learningObjectives: [
              'Ask for help politely',
              'Describe what you\'re looking for',
              'Follow directions',
              'Thank people for assistance'
            ]
          },
          {
            id: 'shop_return',
            title: 'Returning an Item',
            description: 'Return or exchange a purchased item',
            difficulty: 'advanced',
            context: {
              setting: 'Customer service desk',
              role: 'Customer returning an item',
              goal: 'Successfully return or exchange an item'
            },
            prompt: 'You bought something that doesn\'t work or fit properly. Go to customer service to return or exchange the item.',
            expectedVocabulary: [
              'return', 'exchange', 'receipt', 'refund', 'defective',
              'warranty', 'policy', 'store credit', 'broken', 'size'
            ],
            keyPhrases: [
              'I\'d like to return this',
              'This doesn\'t work properly',
              'Do I need a receipt?',
              'What\'s your return policy?'
            ],
            learningObjectives: [
              'Explain reasons for returns',
              'Understand store policies',
              'Handle paperwork and receipts',
              'Negotiate solutions'
            ]
          }
        ]
      },

      school: {
        name: 'School',
        description: 'Practice educational and administrative interactions',
        scenarios: [
          {
            id: 'school_directions',
            title: 'Asking for Directions',
            description: 'Find your way around the school campus',
            difficulty: 'beginner',
            context: {
              setting: 'School hallway or main office',
              role: 'New student or visitor',
              goal: 'Get directions to a specific location'
            },
            prompt: 'You\'re new to the school and need to find a specific classroom, office, or facility. Ask someone for directions.',
            expectedVocabulary: [
              'directions', 'classroom', 'where', 'building', 'floor',
              'hallway', 'stairs', 'elevator', 'left', 'right'
            ],
            keyPhrases: [
              'Excuse me, where is...?',
              'How do I get to...?',
              'Can you show me the way?',
              'Is it on this floor?'
            ],
            learningObjectives: [
              'Ask for directions politely',
              'Understand directional language',
              'Use location vocabulary',
              'Follow spoken directions'
            ]
          },
          {
            id: 'school_enrollment',
            title: 'Course Information',
            description: 'Inquire about classes and enrollment',
            difficulty: 'intermediate',
            context: {
              setting: 'Academic advisor\'s office',
              role: 'Prospective or current student',
              goal: 'Get information about courses and requirements'
            },
            prompt: 'You want to learn about available language courses, schedules, and enrollment requirements. Speak with an academic advisor.',
            expectedVocabulary: [
              'course', 'class', 'schedule', 'requirements', 'enroll',
              'semester', 'credits', 'prerequisite', 'tuition', 'advisor'
            ],
            keyPhrases: [
              'What courses are available?',
              'When does the class meet?',
              'What are the requirements?',
              'How do I enroll?'
            ],
            learningObjectives: [
              'Ask about academic programs',
              'Understand scheduling information',
              'Discuss requirements and prerequisites',
              'Plan academic pathway'
            ]
          },
          {
            id: 'school_presentation',
            title: 'Giving a Presentation',
            description: 'Present a topic to the class',
            difficulty: 'advanced',
            context: {
              setting: 'Classroom with students and teacher',
              role: 'Student giving a presentation',
              goal: 'Deliver a clear and engaging presentation'
            },
            prompt: 'You need to give a short presentation about your home country, a hobby, or an interesting topic to your language class.',
            expectedVocabulary: [
              'presentation', 'topic', 'introduce', 'explain', 'conclude',
              'audience', 'slides', 'example', 'question', 'summary'
            ],
            keyPhrases: [
              'Today I\'m going to talk about...',
              'First, let me explain...',
              'For example...',
              'In conclusion...'
            ],
            learningObjectives: [
              'Structure a presentation',
              'Use transition words',
              'Engage an audience',
              'Handle questions and feedback'
            ]
          }
        ]
      }
    }
  }

  /**
   * Load scenario for a specific building type (enhanced with asset-based scenarios)
   * @param {string} buildingType - Type of building (hospital, cafe, shop, school)
   * @returns {Object|null} Building scenario data
   */
  loadScenario(buildingType) {
    // First try to get asset-based scenarios
    const assetBasedScenario = this.assetBasedScenarios[buildingType]
    if (assetBasedScenario) {
      return assetBasedScenario
    }
    
    // Fallback to original scenarios
    return this.scenarios[buildingType] || null
  }

  /**
   * Get a specific scenario by building type and scenario ID (enhanced with asset-based scenarios)
   * @param {string} buildingType - Type of building
   * @param {string} scenarioId - ID of the specific scenario
   * @returns {Object|null} Scenario data
   */
  getScenario(buildingType, scenarioId) {
    // First try asset-based scenarios
    const assetBasedScenario = this.getAssetBasedScenario(buildingType, scenarioId)
    if (assetBasedScenario) {
      return assetBasedScenario
    }
    
    // Fallback to original scenarios
    const building = this.scenarios[buildingType]
    if (!building) return null

    return building.scenarios.find(scenario => scenario.id === scenarioId) || null
  }

  /**
   * Get scenarios by difficulty level (enhanced with asset-based scenarios)
   * @param {string} buildingType - Type of building
   * @param {string} difficulty - Difficulty level (beginner, intermediate, advanced)
   * @returns {Array} Array of scenarios matching the difficulty
   */
  getScenariosByDifficulty(buildingType, difficulty) {
    // First try asset-based scenarios
    const assetBasedScenarios = this.getAssetBasedScenariosByDifficulty(buildingType, difficulty)
    if (assetBasedScenarios.length > 0) {
      return assetBasedScenarios
    }
    
    // Fallback to original scenarios
    const building = this.scenarios[buildingType]
    if (!building) return []

    return building.scenarios.filter(scenario => scenario.difficulty === difficulty)
  }

  /**
   * Generate contextual prompt for a scenario (enhanced for asset-based scenarios)
   * @param {Object} scenario - Scenario object
   * @param {string} difficulty - Optional difficulty override
   * @returns {Object} Generated prompt with context
   */
  generatePrompt(scenario, difficulty = null) {
    if (!scenario) return null

    const effectiveDifficulty = difficulty || scenario.difficulty
    
    // Enhanced prompt generation for asset-based scenarios
    const promptData = {
      title: scenario.title,
      description: scenario.description,
      prompt: scenario.prompt,
      context: scenario.context,
      difficulty: effectiveDifficulty,
      vocabulary: this.getVocabularyForDifficulty(scenario.expectedVocabulary, effectiveDifficulty),
      keyPhrases: this.getPhrasesForDifficulty(scenario.keyPhrases, effectiveDifficulty),
      objectives: scenario.learningObjectives,
      tips: this.generateTips(scenario, effectiveDifficulty)
    }

    // Add asset-specific enhancements if available
    if (scenario.assetContext) {
      promptData.assetContext = scenario.assetContext
    }
    
    if (scenario.npcIntroduction) {
      promptData.npcIntroduction = scenario.npcIntroduction
    }
    
    if (scenario.conversationFlow) {
      promptData.conversationFlow = scenario.conversationFlow
    }
    
    if (scenario.culturalNotes) {
      promptData.culturalNotes = scenario.culturalNotes
    }

    return promptData
  }

  /**
   * Get vocabulary appropriate for difficulty level
   * @param {Array} vocabulary - Full vocabulary list
   * @param {string} difficulty - Difficulty level
   * @returns {Array} Filtered vocabulary list
   */
  getVocabularyForDifficulty(vocabulary, difficulty) {
    if (!vocabulary) return []

    switch (difficulty) {
      case 'beginner':
        return vocabulary.slice(0, Math.ceil(vocabulary.length * 0.5))
      case 'intermediate':
        return vocabulary.slice(0, Math.ceil(vocabulary.length * 0.75))
      case 'advanced':
        return vocabulary
      default:
        return vocabulary
    }
  }

  /**
   * Get key phrases appropriate for difficulty level
   * @param {Array} phrases - Full phrases list
   * @param {string} difficulty - Difficulty level
   * @returns {Array} Filtered phrases list
   */
  getPhrasesForDifficulty(phrases, difficulty) {
    if (!phrases) return []

    switch (difficulty) {
      case 'beginner':
        return phrases.slice(0, 2)
      case 'intermediate':
        return phrases.slice(0, 3)
      case 'advanced':
        return phrases
      default:
        return phrases
    }
  }

  /**
   * Generate tips based on scenario and difficulty
   * @param {Object} scenario - Scenario object
   * @param {string} difficulty - Difficulty level
   * @returns {Array} Array of helpful tips
   */
  generateTips(scenario, difficulty) {
    const baseTips = [
      'Take your time to think before speaking',
      'Don\'t worry about making mistakes - they help you learn',
      'Use gestures if it helps you communicate'
    ]

    const difficultyTips = {
      beginner: [
        'Start with simple sentences',
        'Use the key phrases provided as templates',
        'Focus on being understood rather than being perfect'
      ],
      intermediate: [
        'Try to use varied vocabulary',
        'Practice connecting your ideas with transition words',
        'Ask follow-up questions to keep the conversation going'
      ],
      advanced: [
        'Challenge yourself to use complex sentence structures',
        'Express opinions and give detailed explanations',
        'Handle unexpected responses and adapt your conversation'
      ]
    }

    return [...baseTips, ...(difficultyTips[difficulty] || [])]
  }

  /**
   * Validate player response against scenario expectations
   * @param {string} input - Player input text
   * @param {Object} scenario - Current scenario
   * @returns {Object} Validation results
   */
  validateResponse(input, scenario) {
    if (!input || !scenario) {
      return { isValid: false, feedback: 'No input provided' }
    }

    const lowerInput = input.toLowerCase()
    const vocabulary = scenario.expectedVocabulary || []
    const keyPhrases = scenario.keyPhrases || []

    // Check vocabulary usage
    const usedVocabulary = vocabulary.filter(word => 
      lowerInput.includes(word.toLowerCase())
    )

    // Check key phrase usage
    const usedPhrases = keyPhrases.filter(phrase => 
      lowerInput.includes(phrase.toLowerCase())
    )

    // Calculate scores
    const vocabularyScore = vocabulary.length > 0 ? 
      (usedVocabulary.length / vocabulary.length) * 100 : 100
    const phraseScore = keyPhrases.length > 0 ? 
      (usedPhrases.length / keyPhrases.length) * 100 : 100

    // Generate feedback
    const feedback = this.generateValidationFeedback(
      usedVocabulary, 
      usedPhrases, 
      vocabularyScore, 
      phraseScore,
      scenario
    )

    return {
      isValid: vocabularyScore > 20 || phraseScore > 0, // Basic validation
      vocabularyScore: Math.round(vocabularyScore),
      phraseScore: Math.round(phraseScore),
      overallScore: Math.round((vocabularyScore + phraseScore) / 2),
      usedVocabulary,
      usedPhrases,
      feedback
    }
  }

  /**
   * Generate validation feedback
   * @param {Array} usedVocabulary - Vocabulary words used
   * @param {Array} usedPhrases - Key phrases used
   * @param {number} vocabularyScore - Vocabulary usage score
   * @param {number} phraseScore - Phrase usage score
   * @param {Object} scenario - Current scenario
   * @returns {Object} Feedback object
   */
  generateValidationFeedback(usedVocabulary, usedPhrases, vocabularyScore, phraseScore, scenario) {
    const strengths = []
    const improvements = []

    // Analyze strengths
    if (vocabularyScore > 50) {
      strengths.push('Great use of relevant vocabulary!')
    }
    if (phraseScore > 50) {
      strengths.push('Excellent use of key phrases!')
    }
    if (usedVocabulary.length > 0) {
      strengths.push(`Good job using: ${usedVocabulary.join(', ')}`)
    }

    // Analyze areas for improvement
    if (vocabularyScore < 30) {
      improvements.push('Try to use more vocabulary from the scenario')
    }
    if (phraseScore < 30) {
      improvements.push('Consider using the suggested key phrases')
    }
    if (usedVocabulary.length === 0 && usedPhrases.length === 0) {
      improvements.push('Try to incorporate some of the suggested vocabulary and phrases')
    }

    // Add scenario-specific feedback
    const scenarioFeedback = this.getScenarioSpecificFeedback(scenario.id)

    return {
      strengths: strengths.length > 0 ? strengths : ['You participated in the conversation!'],
      improvements: improvements.length > 0 ? improvements : ['Keep practicing to improve!'],
      scenarioTips: scenarioFeedback
    }
  }

  /**
   * Get scenario-specific feedback tips
   * @param {string} scenarioId - ID of the scenario
   * @returns {Array} Array of scenario-specific tips
   */
  getScenarioSpecificFeedback(scenarioId) {
    const feedbackMap = {
      hospital_appointment: [
        'Remember to be polite when making requests',
        'Ask about available times and dates',
        'Provide your contact information'
      ],
      hospital_symptoms: [
        'Be specific about your symptoms',
        'Mention when symptoms started',
        'Describe the intensity of pain or discomfort'
      ],
      cafe_ordering: [
        'Use "please" and "thank you"',
        'Ask about recommendations',
        'Confirm your order before paying'
      ],
      shop_prices: [
        'Compare prices between items',
        'Ask about sales or discounts',
        'Express your budget if needed'
      ],
      school_directions: [
        'Ask for landmarks to help you remember',
        'Repeat directions back to confirm',
        'Thank the person for their help'
      ]
    }

    return feedbackMap[scenarioId] || [
      'Focus on clear communication',
      'Don\'t be afraid to ask for clarification',
      'Practice makes perfect!'
    ]
  }

  /**
   * Get random scenario from a building type (enhanced with asset-based scenarios)
   * @param {string} buildingType - Type of building
   * @param {string} difficulty - Optional difficulty filter
   * @returns {Object|null} Random scenario
   */
  getRandomScenario(buildingType, difficulty = null) {
    // First try asset-based scenarios
    const assetBasedScenario = this.getAssetBasedScenario(buildingType)
    if (assetBasedScenario) {
      if (difficulty) {
        const filteredScenarios = this.getAssetBasedScenariosByDifficulty(buildingType, difficulty)
        if (filteredScenarios.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredScenarios.length)
          return filteredScenarios[randomIndex]
        }
      } else {
        return assetBasedScenario
      }
    }
    
    // Fallback to original scenarios
    const building = this.scenarios[buildingType]
    if (!building) return null

    let availableScenarios = building.scenarios
    if (difficulty) {
      availableScenarios = availableScenarios.filter(s => s.difficulty === difficulty)
    }

    if (availableScenarios.length === 0) return null

    const randomIndex = Math.floor(Math.random() * availableScenarios.length)
    return availableScenarios[randomIndex]
  }

  /**
   * Get all available building types
   * @returns {Array} Array of building type names
   */
  getAvailableBuildingTypes() {
    return Object.keys(this.scenarios)
  }

  /**
   * Get all available difficulty levels
   * @returns {Array} Array of difficulty levels
   */
  getDifficultyLevels() {
    return [...this.difficultyLevels]
  }

  /**
   * Get scenario statistics
   * @returns {Object} Statistics about available scenarios
   */
  getScenarioStatistics() {
    const stats = {
      totalBuildings: Object.keys(this.scenarios).length,
      totalScenarios: 0,
      scenariosByDifficulty: {
        beginner: 0,
        intermediate: 0,
        advanced: 0
      },
      scenariosByBuilding: {}
    }

    Object.entries(this.scenarios).forEach(([buildingType, building]) => {
      stats.scenariosByBuilding[buildingType] = building.scenarios.length
      stats.totalScenarios += building.scenarios.length

      building.scenarios.forEach(scenario => {
        if (stats.scenariosByDifficulty[scenario.difficulty] !== undefined) {
          stats.scenariosByDifficulty[scenario.difficulty]++
        }
      })
    })

    return stats
  }
}