/**
 * ConversationManager class handles dialogue flow and turn-based interactions
 * Manages conversation state, templates, and history tracking
 */
class ConversationManager {
  constructor(voiceProcessor = null) {
    this.voiceProcessor = voiceProcessor
    this.currentConversation = null
    this.conversationHistory = []
    this.isActive = false
    this.conversationTemplates = {}
    this.onConversationUpdateCallback = null
    this.onConversationEndCallback = null
    
    // Initialize conversation templates
    this.initializeTemplates()
  }

  /**
   * Initialize conversation templates for different scenarios
   */
  initializeTemplates() {
    // Load NPC-specific conversation templates if available
    if (typeof npcConversationTemplates !== 'undefined') {
      this.npcTemplates = npcConversationTemplates
    }

    this.conversationTemplates = {
      // NPC conversation templates (legacy support)
      npc: {
        villager: {
          greetings: [
            "Hello there! How are you today?",
            "Good day! What brings you here?",
            "Hi! Nice weather we're having, isn't it?"
          ],
          topics: [
            "Have you seen anything interesting around town?",
            "Do you know where I can find the market?",
            "What's your favorite place in the city?",
            "Have you lived here long?"
          ],
          responses: {
            positive: [
              "That's wonderful to hear!",
              "I'm so glad you think so!",
              "That sounds really nice!"
            ],
            negative: [
              "Oh, I'm sorry to hear that.",
              "That's unfortunate.",
              "I hope things get better."
            ],
            neutral: [
              "I see, that's interesting.",
              "Thank you for sharing that.",
              "That's good to know."
            ]
          }
        },
        teacher: {
          greetings: [
            "Welcome! I'm here to help you practice.",
            "Hello, student! Ready for a conversation?",
            "Good to see you! Let's practice together."
          ],
          topics: [
            "Tell me about your hobbies.",
            "What did you do yesterday?",
            "Describe your favorite food.",
            "What are your plans for the weekend?"
          ],
          responses: {
            encouraging: [
              "Excellent! Your pronunciation is improving!",
              "Great job! Keep practicing!",
              "Well done! I can see your progress!"
            ],
            corrective: [
              "Good try! Let me help you with that pronunciation.",
              "Almost there! Try saying it like this...",
              "Nice effort! Here's a tip to improve..."
            ]
          }
        },
        shopkeeper: {
          greetings: [
            "Welcome to my shop! How can I help you?",
            "Good day! What are you looking for today?",
            "Hello! Feel free to browse around!"
          ],
          topics: [
            "What would you like to buy?",
            "Are you looking for anything specific?",
            "Would you like to see our special offers?",
            "Do you need help finding something?"
          ],
          responses: {
            helpful: [
              "Of course! I can help you with that.",
              "Certainly! Let me show you our options.",
              "Absolutely! Here's what we have available."
            ],
            apologetic: [
              "I'm sorry, we don't have that in stock.",
              "Unfortunately, that item is not available.",
              "I apologize, but we're out of that product."
            ]
          }
        },
        // Add new character roles using detailed templates
        doctor: {
          greetings: this.getNPCGreetings('npc1'),
          topics: this.getNPCTopicPrompts('npc1'),
          responses: this.getNPCResponses('npc1')
        },
        student: {
          greetings: this.getNPCGreetings('npc3'),
          topics: this.getNPCTopicPrompts('npc3'),
          responses: this.getNPCResponses('npc3')
        },
        citizen: {
          greetings: this.getNPCGreetings('npc4'),
          topics: this.getNPCTopicPrompts('npc4'),
          responses: this.getNPCResponses('npc4')
        }
      },
      
      // Building scenario templates
      building: {
        hospital: {
          scenarios: [
            {
              title: "Making an Appointment",
              prompt: "You need to schedule a doctor's appointment. Practice calling the hospital reception.",
              context: "You are calling the hospital to book an appointment for a check-up.",
              expectedVocabulary: ["appointment", "doctor", "schedule", "available", "time"]
            },
            {
              title: "Describing Symptoms",
              prompt: "You're at the doctor's office. Describe how you're feeling to the doctor.",
              context: "You are speaking with a doctor about your health concerns.",
              expectedVocabulary: ["pain", "headache", "fever", "tired", "symptoms"]
            }
          ]
        },
        cafe: {
          scenarios: [
            {
              title: "Ordering Food and Drinks",
              prompt: "You're at a café and want to order something. Practice ordering from the menu.",
              context: "You are a customer at a café speaking with the server.",
              expectedVocabulary: ["coffee", "tea", "sandwich", "order", "please"]
            },
            {
              title: "Making a Reservation",
              prompt: "You want to reserve a table for later. Call the café to make a reservation.",
              context: "You are calling the café to book a table for you and your friends.",
              expectedVocabulary: ["reservation", "table", "people", "time", "available"]
            }
          ]
        },
        shop: {
          scenarios: [
            {
              title: "Asking for Prices",
              prompt: "You're shopping and want to know the prices of items. Practice asking about costs.",
              context: "You are in a shop asking the shopkeeper about prices.",
              expectedVocabulary: ["price", "cost", "expensive", "cheap", "money"]
            },
            {
              title: "Requesting Assistance",
              prompt: "You need help finding something in the store. Ask the staff for assistance.",
              context: "You are looking for a specific item and need help from store staff.",
              expectedVocabulary: ["help", "find", "looking for", "where", "assistance"]
            }
          ]
        },
        school: {
          scenarios: [
            {
              title: "Asking for Directions",
              prompt: "You're new to the school and need to find a classroom. Ask for directions.",
              context: "You are a new student asking for help finding your way around.",
              expectedVocabulary: ["directions", "classroom", "where", "building", "floor"]
            },
            {
              title: "Course Information",
              prompt: "You want to learn about available courses. Ask about class schedules and requirements.",
              context: "You are inquiring about enrolling in language courses.",
              expectedVocabulary: ["course", "class", "schedule", "requirements", "enroll"]
            }
          ]
        }
      }
    }
  }

  /**
   * Start a new conversation
   * @param {string} type - Type of conversation ('npc' or 'building')
   * @param {string} subtype - Subtype (e.g., 'villager', 'hospital')
   * @param {Object} context - Additional context for the conversation
   * @returns {Object} Conversation object
   */
  startConversation(type, subtype, context = {}) {
    const conversationId = this.generateConversationId()
    
    this.currentConversation = {
      id: conversationId,
      type: type,
      subtype: subtype,
      context: context,
      messages: [],
      startTime: new Date(),
      status: 'active',
      turnCount: 0
    }

    this.isActive = true

    // Add initial message based on conversation type
    const initialMessage = this.getInitialMessage(type, subtype, context)
    if (initialMessage) {
      this.addMessage('npc', initialMessage)
    }

    // Notify callback
    this.notifyConversationUpdate()

    return this.currentConversation
  }

  /**
   * Get initial message for conversation
   * @param {string} type - Conversation type
   * @param {string} subtype - Conversation subtype
   * @param {Object} context - Conversation context
   * @returns {string} Initial message
   */
  getInitialMessage(type, subtype, context) {
    if (type === 'npc') {
      // Check if this is a specific NPC with detailed templates
      if (context.npcId && typeof NPCTemplateUtils !== 'undefined') {
        return this.getNPCInitialMessage(context.npcId)
      }
      
      // Fallback to role-based templates
      if (this.conversationTemplates.npc[subtype]) {
        const greetings = this.conversationTemplates.npc[subtype].greetings
        return this.getRandomFromArray(greetings)
      }
    } else if (type === 'building' && this.conversationTemplates.building[subtype]) {
      const scenarios = this.conversationTemplates.building[subtype].scenarios
      if (context.scenarioIndex !== undefined && scenarios[context.scenarioIndex]) {
        return scenarios[context.scenarioIndex].prompt
      }
      return scenarios[0]?.prompt || "Let's start our conversation!"
    }
    
    return "Hello! Let's have a conversation."
  }

  /**
   * Add a message to the current conversation
   * @param {string} speaker - Who is speaking ('player', 'npc', 'system')
   * @param {string} content - Message content
   * @param {Object} metadata - Additional message metadata
   */
  addMessage(speaker, content, metadata = {}) {
    if (!this.currentConversation) return

    const message = {
      id: this.generateMessageId(),
      speaker: speaker,
      content: content,
      timestamp: new Date(),
      metadata: metadata
    }

    this.currentConversation.messages.push(message)
    
    if (speaker === 'player') {
      this.currentConversation.turnCount++
    }

    // Notify callback
    this.notifyConversationUpdate()
  }

  /**
   * Process player response and generate NPC reply
   * @param {string} playerInput - Player's input text
   * @returns {string} NPC response
   */
  processPlayerResponse(playerInput) {
    if (!this.currentConversation) return null

    // Add player message
    this.addMessage('player', playerInput)

    // Generate NPC response
    const npcResponse = this.generateNPCResponse(playerInput)
    
    if (npcResponse) {
      this.addMessage('npc', npcResponse)
    }

    return npcResponse
  }

  /**
   * Generate NPC response based on player input and conversation context
   * @param {string} playerInput - Player's input
   * @returns {string} Generated NPC response
   */
  generateNPCResponse(playerInput) {
    if (!this.currentConversation) return null

    const { type, subtype, turnCount, context } = this.currentConversation
    
    // Use detailed NPC templates if available
    if (type === 'npc' && context.npcId) {
      return this.generateDetailedNPCResponse(context.npcId, playerInput, turnCount)
    }
    
    // Simple response generation based on conversation type and turn count
    if (type === 'npc' && this.conversationTemplates.npc[subtype]) {
      const template = this.conversationTemplates.npc[subtype]
      
      // After a few turns, ask a topic question
      if (turnCount > 1 && turnCount % 3 === 0) {
        return this.getRandomFromArray(template.topics)
      }
      
      // Generate contextual response
      const sentiment = this.analyzeSentiment(playerInput)
      const responses = template.responses[sentiment] || template.responses.neutral
      return this.getRandomFromArray(responses)
    } else if (type === 'building') {
      // For building scenarios, provide contextual responses
      return this.generateBuildingResponse(playerInput, subtype)
    }

    return "That's interesting! Tell me more."
  }

  /**
   * Generate response for building scenarios
   * @param {string} playerInput - Player's input
   * @param {string} buildingType - Type of building
   * @returns {string} Generated response
   */
  generateBuildingResponse(playerInput, buildingType) {
    const responses = {
      hospital: [
        "I understand. Let me check our available appointments.",
        "Thank you for that information. How can I help you further?",
        "I see. Is there anything else you'd like to discuss?"
      ],
      cafe: [
        "Excellent choice! Anything else I can get for you?",
        "Coming right up! Would you like anything to drink with that?",
        "Perfect! I'll get that ready for you."
      ],
      shop: [
        "Certainly! Let me show you what we have available.",
        "That's a popular item! Here's what I can tell you about it.",
        "Of course! I'd be happy to help you with that."
      ],
      school: [
        "That's a great question! Let me provide you with that information.",
        "I can definitely help you with that. Here's what you need to know.",
        "Excellent! I'm glad you're interested in our programs."
      ]
    }

    const buildingResponses = responses[buildingType] || responses.shop
    return this.getRandomFromArray(buildingResponses)
  }

  /**
   * Simple sentiment analysis for player input
   * @param {string} input - Player input text
   * @returns {string} Sentiment ('positive', 'negative', 'neutral')
   */
  analyzeSentiment(input) {
    const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'like', 'yes', 'sure']
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'no', 'never', 'wrong']
    
    const lowerInput = input.toLowerCase()
    
    const positiveCount = positiveWords.filter(word => lowerInput.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerInput.includes(word)).length
    
    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }

  /**
   * End the current conversation
   * @returns {Object} Completed conversation object
   */
  endConversation() {
    if (!this.currentConversation) return null

    this.currentConversation.status = 'completed'
    this.currentConversation.endTime = new Date()
    
    // Add to history
    this.conversationHistory.push({ ...this.currentConversation })
    
    // Notify callback
    if (this.onConversationEndCallback) {
      this.onConversationEndCallback(this.currentConversation)
    }

    const completedConversation = this.currentConversation
    this.currentConversation = null
    this.isActive = false

    return completedConversation
  }

  /**
   * Get conversation history
   * @param {number} limit - Maximum number of conversations to return
   * @returns {Array} Array of conversation objects
   */
  getConversationHistory(limit = null) {
    if (limit) {
      return this.conversationHistory.slice(-limit)
    }
    return [...this.conversationHistory]
  }

  /**
   * Get current conversation
   * @returns {Object|null} Current conversation object
   */
  getCurrentConversation() {
    return this.currentConversation
  }

  /**
   * Check if conversation is active
   * @returns {boolean} True if conversation is active
   */
  isConversationActive() {
    return this.isActive && this.currentConversation !== null
  }

  /**
   * Set callback for conversation updates
   * @param {function} callback - Function to call when conversation updates
   */
  onConversationUpdate(callback) {
    this.onConversationUpdateCallback = callback
  }

  /**
   * Set callback for conversation end
   * @param {function} callback - Function to call when conversation ends
   */
  onConversationEnd(callback) {
    this.onConversationEndCallback = callback
  }

  /**
   * Notify conversation update callback
   */
  notifyConversationUpdate() {
    if (this.onConversationUpdateCallback && this.currentConversation) {
      this.onConversationUpdateCallback(this.currentConversation)
    }
  }

  /**
   * Generate unique conversation ID
   * @returns {string} Unique conversation ID
   */
  generateConversationId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  /**
   * Generate unique message ID
   * @returns {string} Unique message ID
   */
  generateMessageId() {
    return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  /**
   * Get random element from array
   * @param {Array} array - Array to select from
   * @returns {*} Random element from array
   */
  getRandomFromArray(array) {
    if (!array || array.length === 0) return null
    return array[Math.floor(Math.random() * array.length)]
  }

  /**
   * Get conversation statistics
   * @returns {Object} Statistics about conversations
   */
  getStatistics() {
    const totalConversations = this.conversationHistory.length
    const npcConversations = this.conversationHistory.filter(c => c.type === 'npc').length
    const buildingConversations = this.conversationHistory.filter(c => c.type === 'building').length
    
    const totalTurns = this.conversationHistory.reduce((sum, c) => sum + c.turnCount, 0)
    const averageTurns = totalConversations > 0 ? totalTurns / totalConversations : 0

    return {
      totalConversations,
      npcConversations,
      buildingConversations,
      totalTurns,
      averageTurns: Math.round(averageTurns * 100) / 100
    }
  }

  /**
   * Helper methods for accessing NPC-specific conversation templates
   */

  /**
   * Get greetings for specific NPC
   * @param {string} npcId - NPC identifier (npc1, npc2, npc3, npc4)
   * @returns {Array} Array of greetings
   */
  getNPCGreetings(npcId) {
    if (typeof NPCTemplateUtils !== 'undefined') {
      const template = NPCTemplateUtils.getTemplate(npcId)
      return template ? template.greetings : ["Hello!"]
    }
    return ["Hello!"]
  }

  /**
   * Get topic prompts for specific NPC
   * @param {string} npcId - NPC identifier
   * @returns {Array} Array of topic prompts
   */
  getNPCTopicPrompts(npcId) {
    if (typeof NPCTemplateUtils !== 'undefined') {
      const topics = NPCTemplateUtils.getAllTopics(npcId)
      const prompts = []
      
      topics.forEach(topic => {
        const topicPrompts = NPCTemplateUtils.getTopicPrompts(npcId, topic)
        prompts.push(...topicPrompts)
      })
      
      return prompts.length > 0 ? prompts : ["Tell me more about that."]
    }
    return ["Tell me more about that."]
  }

  /**
   * Get responses for specific NPC
   * @param {string} npcId - NPC identifier
   * @returns {Object} Object containing response categories
   */
  getNPCResponses(npcId) {
    if (typeof NPCTemplateUtils !== 'undefined') {
      const template = NPCTemplateUtils.getTemplate(npcId)
      if (template && template.conversationTopics) {
        const responses = { positive: [], negative: [], neutral: [] }
        
        // Collect all responses from all topics
        Object.values(template.conversationTopics).forEach(topic => {
          if (topic.responses) {
            Object.entries(topic.responses).forEach(([type, responseArray]) => {
              if (responses[type]) {
                responses[type].push(...responseArray)
              } else {
                responses[type] = [...responseArray]
              }
            })
          }
        })
        
        // Ensure we have fallback responses
        if (responses.positive.length === 0) responses.positive = ["That's great!"]
        if (responses.negative.length === 0) responses.negative = ["I understand."]
        if (responses.neutral.length === 0) responses.neutral = ["I see."]
        
        return responses
      }
    }
    
    return {
      positive: ["That's great!"],
      negative: ["I understand."],
      neutral: ["I see."]
    }
  }

  /**
   * Get initial message for NPC conversation using detailed templates
   * @param {string} npcId - NPC identifier
   * @returns {string} Initial greeting message
   */
  getNPCInitialMessage(npcId) {
    if (typeof NPCTemplateUtils !== 'undefined') {
      return NPCTemplateUtils.getRandomGreeting(npcId)
    }
    return "Hello! Let's have a conversation."
  }

  /**
   * Generate NPC response using detailed templates
   * @param {string} npcId - NPC identifier
   * @param {string} playerInput - Player's input
   * @param {number} turnCount - Current turn count
   * @returns {string} Generated NPC response
   */
  generateDetailedNPCResponse(npcId, playerInput, turnCount) {
    if (typeof NPCTemplateUtils !== 'undefined') {
      // Get a random topic for this NPC
      const topic = NPCTemplateUtils.getRandomTopic(npcId)
      
      if (topic) {
        // Analyze player sentiment
        const sentiment = this.analyzeSentiment(playerInput)
        
        // Try to get a contextual response
        let response = NPCTemplateUtils.getRandomResponse(npcId, topic, sentiment)
        
        // If no specific response, get a random prompt for the topic
        if (!response || response === "That's interesting!") {
          response = NPCTemplateUtils.getRandomPrompt(npcId, topic)
        }
        
        // If still no response, use a general response
        if (!response) {
          const template = NPCTemplateUtils.getTemplate(npcId)
          const personality = template ? template.character.personality : 'friendly'
          
          switch (personality) {
            case 'helpful':
              response = "How can I help you with that?"
              break
            case 'friendly':
              response = "That sounds interesting! Tell me more."
              break
            case 'energetic':
              response = "That's awesome! I'd love to hear more about it!"
              break
            case 'casual':
              response = "Yeah, I know what you mean."
              break
            default:
              response = "That's interesting! Tell me more."
          }
        }
        
        return response
      }
    }
    
    // Fallback to original method
    return this.generateNPCResponse(playerInput)
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = []
  }
}