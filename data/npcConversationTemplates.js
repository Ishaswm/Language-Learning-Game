/**
 * NPC Conversation Templates
 * Detailed conversation templates for each character based on their roles and personalities
 * These templates provide role-specific dialogue topics, responses, and conversation flows
 */

// Make variables global for browser compatibility
var npcConversationTemplates = {
  // Character 1: Dr. Elena Martinez - Doctor role with helpful personality
  npc1: {
    character: {
      id: 'npc1',
      name: 'Dr. Elena Martinez',
      role: 'doctor',
      personality: 'helpful'
    },
    
    greetings: [
      "Good day! I'm Dr. Martinez. How can I help you today?",
      "Hello! Welcome to our medical center. What brings you here?",
      "Hi there! I'm Dr. Martinez. Are you feeling alright?",
      "Good to see you! Do you have any health concerns I can help with?"
    ],
    
    conversationTopics: {
      appointment_booking: {
        prompts: [
          "Would you like to schedule an appointment?",
          "When would be a good time for your visit?",
          "What type of appointment do you need?",
          "Are you looking for a routine check-up or something specific?"
        ],
        responses: {
          positive: [
            "Excellent! Let me check our available slots.",
            "Perfect! I can help you find a suitable time.",
            "Great! What works best for your schedule?",
            "Wonderful! Let's get you scheduled right away."
          ],
          scheduling: [
            "How about next Tuesday at 2 PM?",
            "We have an opening this Friday morning.",
            "Would Thursday afternoon work for you?",
            "I can fit you in Monday at 10 AM."
          ]
        }
      },
      
      symptom_description: {
        prompts: [
          "Can you describe how you're feeling?",
          "What symptoms have you been experiencing?",
          "When did you first notice these symptoms?",
          "Tell me more about what's bothering you."
        ],
        responses: {
          concerned: [
            "I understand. That must be concerning for you.",
            "Thank you for sharing that with me.",
            "I see. Let's discuss this further.",
            "That's important information. Tell me more."
          ],
          reassuring: [
            "That sounds like something we can definitely help with.",
            "Don't worry, we'll figure this out together.",
            "These symptoms are quite common, and treatable.",
            "I'm confident we can find a solution for you."
          ]
        }
      },
      
      medical_consultation: {
        prompts: [
          "Based on what you've told me, I recommend...",
          "Let's discuss your treatment options.",
          "Have you tried any remedies for this before?",
          "Do you have any questions about your condition?"
        ],
        responses: {
          explanatory: [
            "This condition typically responds well to treatment.",
            "Here's what I think is happening...",
            "The good news is this is very manageable.",
            "Let me explain what we can do to help."
          ],
          instructional: [
            "I'd like you to try this approach first.",
            "Make sure to follow these instructions carefully.",
            "Come back and see me if symptoms persist.",
            "Don't hesitate to call if you have concerns."
          ]
        }
      },
      
      health_advice: {
        prompts: [
          "Remember to maintain a healthy lifestyle.",
          "Prevention is always better than treatment.",
          "Do you have any questions about staying healthy?",
          "Here are some tips for better health..."
        ],
        responses: {
          preventive: [
            "Regular exercise is so important for your health.",
            "A balanced diet makes a huge difference.",
            "Don't forget to get enough sleep each night.",
            "Staying hydrated is crucial for your wellbeing."
          ],
          encouraging: [
            "You're taking great steps for your health!",
            "Keep up the good work with your healthy habits!",
            "I'm proud of your commitment to wellness.",
            "Your health is in good hands with these choices."
          ]
        }
      }
    },
    
    farewells: [
      "Take care of yourself! Don't hesitate to come back if needed.",
      "Stay healthy! Remember what we discussed today.",
      "It was good talking with you. Feel better soon!",
      "Have a wonderful day, and remember to prioritize your health!"
    ],
    
    personality_traits: {
      helpful: {
        modifiers: ["I'm here to help", "Let me assist you", "Don't worry"],
        tone: "supportive and professional"
      }
    }
  },

  // Character 2: Marco the Shopkeeper - Shopkeeper role with friendly personality  
  npc2: {
    character: {
      id: 'npc2',
      name: 'Marco the Shopkeeper',
      role: 'shopkeeper',
      personality: 'friendly'
    },
    
    greetings: [
      "Welcome to Marco's General Store! What can I help you find?",
      "Hello there! Looking for anything in particular today?",
      "Good day! I've got everything you need right here.",
      "Hi! Welcome to my shop. How can I help you?"
    ],
    
    conversationTopics: {
      product_inquiry: {
        prompts: [
          "What are you shopping for today?",
          "Are you looking for something specific?",
          "Can I help you find a particular item?",
          "What brings you to my store today?"
        ],
        responses: {
          helpful: [
            "Ah yes! I have exactly what you need.",
            "Perfect! Let me show you our selection.",
            "You're in luck! We just got that in stock.",
            "Great choice! That's one of our popular items."
          ],
          apologetic: [
            "I'm sorry, we're out of that right now.",
            "Unfortunately, I don't carry that item.",
            "We're expecting more of those next week.",
            "Let me check if I have something similar."
          ]
        }
      },
      
      price_negotiation: {
        prompts: [
          "That item is priced at...",
          "For you, I can offer a special price.",
          "The regular price is... but I might have a discount.",
          "Let me check if there are any current promotions."
        ],
        responses: {
          flexible: [
            "I think we can work something out.",
            "For a regular customer like you, I can do better.",
            "Let me see what I can do about the price.",
            "How about we make a deal?"
          ],
          firm: [
            "That's already our best price.",
            "The quality really justifies the cost.",
            "I'm afraid that's as low as I can go.",
            "But look at the value you're getting!"
          ]
        }
      },
      
      store_recommendations: {
        prompts: [
          "If you're interested, I highly recommend...",
          "Our customers really love this item.",
          "This is one of my personal favorites.",
          "You might also be interested in..."
        ],
        responses: {
          enthusiastic: [
            "This is flying off the shelves!",
            "I guarantee you'll love this product.",
            "This has been our bestseller this month.",
            "Everyone who tries this comes back for more."
          ],
          informative: [
            "This one is great quality for the price.",
            "It's perfect for what you're looking for.",
            "This brand is very reliable.",
            "I've been selling these for years."
          ]
        }
      },
      
      payment_methods: {
        prompts: [
          "How would you like to pay today?",
          "We accept cash, card, or mobile payment.",
          "Will that be cash or card?",
          "What's your preferred payment method?"
        ],
        responses: {
          accommodating: [
            "Whatever works best for you!",
            "No problem at all!",
            "That's perfectly fine.",
            "Absolutely, we can do that."
          ]
        }
      }
    },
    
    farewells: [
      "Thanks for shopping with us! Come back anytime!",
      "Have a great day! Don't be a stranger!",
      "Pleasure doing business with you!",
      "See you soon! Enjoy your purchase!"
    ],
    
    personality_traits: {
      friendly: {
        modifiers: ["my friend", "buddy", "pal"],
        tone: "warm and welcoming"
      }
    }
  },

  // Character 3: Sofia the Student - Student role with energetic personality
  npc3: {
    character: {
      id: 'npc3',
      name: 'Sofia the Student',
      role: 'student',
      personality: 'energetic'
    },
    
    greetings: [
      "Hey there! Are you new to the language school?",
      "Hi! I love meeting other language learners!",
      "Hello! Want to practice conversation together?",
      "Hey! I'm Sofia. Are you here to learn languages too?"
    ],
    
    conversationTopics: {
      school_life: {
        prompts: [
          "How are your classes going?",
          "What's your favorite subject?",
          "Are you enjoying school here?",
          "Which teachers do you like best?"
        ],
        responses: {
          enthusiastic: [
            "Oh, I absolutely love it here!",
            "The classes are so much fun!",
            "I'm learning so much every day!",
            "The teachers are amazing!"
          ],
          relatable: [
            "Sometimes it's challenging, but that's normal!",
            "I know exactly how you feel!",
            "We all struggle with that sometimes!",
            "Don't worry, it gets easier with practice!"
          ]
        }
      },
      
      language_learning_tips: {
        prompts: [
          "Want to know my secret for learning faster?",
          "I've discovered some great study techniques!",
          "Here's what really helped me improve...",
          "The best way to practice is..."
        ],
        responses: {
          helpful: [
            "Practice speaking every single day!",
            "Don't be afraid to make mistakes!",
            "Find a conversation partner!",
            "Watch movies in your target language!"
          ],
          encouraging: [
            "You're doing great, keep it up!",
            "Everyone learns at their own pace!",
            "The important thing is to never give up!",
            "I believe in you!"
          ]
        }
      },
      
      study_groups: {
        prompts: [
          "Do you want to join our study group?",
          "We meet every week to practice together.",
          "Would you like to study with us sometime?",
          "Our group is always looking for new members!"
        ],
        responses: {
          inviting: [
            "We have so much fun while learning!",
            "Everyone is super friendly and supportive!",
            "It's a great way to make friends too!",
            "We help each other with difficult topics!"
          ],
          organizing: [
            "We usually meet at the library on Tuesdays.",
            "Sometimes we practice at the café downtown.",
            "We do conversation practice and grammar review.",
            "Everyone brings different strengths to the group!"
          ]
        }
      },
      
      local_recommendations: {
        prompts: [
          "Have you explored the town yet?",
          "There are some great places to practice here!",
          "You should definitely check out...",
          "The locals are so patient with language learners!"
        ],
        responses: {
          excited: [
            "The café on Main Street is perfect for conversations!",
            "The bookstore owner loves helping students!",
            "There's a language exchange every Friday night!",
            "The park is great for reading practice!"
          ],
          informative: [
            "Most people here speak slowly if you ask nicely.",
            "The library has tons of language learning resources.",
            "There are conversation clubs all around town.",
            "Everyone here is used to helping language students."
          ]
        }
      }
    },
    
    farewells: [
      "See you around! Keep practicing!",
      "Good luck with your studies! You've got this!",
      "Hope to see you at our next study session!",
      "Keep up the great work! Bye!"
    ],
    
    personality_traits: {
      energetic: {
        modifiers: ["awesome", "amazing", "fantastic", "super"],
        tone: "enthusiastic and encouraging"
      }
    }
  },

  // Character 4: Carlos the Citizen - Citizen role with casual personality
  npc4: {
    character: {
      id: 'npc4',
      name: 'Carlos the Citizen',
      role: 'citizen',
      personality: 'casual'
    },
    
    greetings: [
      "Hey! Nice to see a new face around town.",
      "Hello there! Enjoying your visit to our little town?",
      "Hi! I don't think we've met. I'm Carlos.",
      "Good day! Are you visiting or thinking of moving here?"
    ],
    
    conversationTopics: {
      local_history: {
        prompts: [
          "I've lived here my whole life, you know.",
          "This town has quite a history.",
          "Let me tell you about the old days...",
          "Things have really changed around here."
        ],
        responses: {
          nostalgic: [
            "Back when I was a kid, this place was different.",
            "The old market square used to be so lively.",
            "My grandfather told me stories about this place.",
            "You should have seen the festivals we used to have!"
          ],
          informative: [
            "That building over there is over 100 years old.",
            "The town was founded by immigrants, just like you!",
            "We've always been welcoming to newcomers.",
            "Each neighborhood has its own character."
          ]
        }
      },
      
      weather_chat: {
        prompts: [
          "Beautiful day, isn't it?",
          "How about this weather we're having?",
          "Perfect day for a walk around town.",
          "Hope you're enjoying our local climate!"
        ],
        responses: {
          agreeable: [
            "Yeah, we're really lucky with the weather here.",
            "This is typical for this time of year.",
            "Wait until you see our sunsets!",
            "The weather's been great for outdoor activities."
          ],
          conversational: [
            "Though it can get pretty hot in summer.",
            "Winter here is mild compared to other places.",
            "Spring is my favorite season here.",
            "The rain usually doesn't last long."
          ]
        }
      },
      
      town_directions: {
        prompts: [
          "Looking for somewhere specific?",
          "Need help finding your way around?",
          "I know this town like the back of my hand.",
          "Where are you trying to get to?"
        ],
        responses: {
          helpful: [
            "Oh, that's easy! Just go straight down this road.",
            "You're actually pretty close to there.",
            "I can give you a shortcut if you want.",
            "That's one of my favorite spots in town!"
          ],
          detailed: [
            "Take a left at the big oak tree.",
            "You'll see a blue building - that's your landmark.",
            "It's about a 5-minute walk from here.",
            "Can't miss it - there's always people around there."
          ]
        }
      },
      
      local_events: {
        prompts: [
          "There's always something happening in town.",
          "You picked a good time to visit!",
          "We have some great events coming up.",
          "The community here is really active."
        ],
        responses: {
          inviting: [
            "You should come to the market on Saturday!",
            "There's a festival next month you'd love.",
            "The community center always has activities.",
            "Everyone's welcome at our local events."
          ],
          descriptive: [
            "The farmers market has the best local produce.",
            "Our summer concerts are really popular.",
            "The art fair brings people from all over.",
            "We do a big celebration for the town's birthday."
          ]
        }
      },
      
      daily_life: {
        prompts: [
          "Life here is pretty relaxed.",
          "It's a great place to live, honestly.",
          "Everyone knows everyone around here.",
          "We've got a good community spirit."
        ],
        responses: {
          content: [
            "I wouldn't want to live anywhere else.",
            "Sure, it's quiet, but that's what I like about it.",
            "People look out for each other here.",
            "It's got everything you need, really."
          ],
          reflective: [
            "Sometimes I think about moving to the city...",
            "But then I remember why I love it here.",
            "The pace of life suits me just fine.",
            "There's something special about small towns."
          ]
        }
      }
    },
    
    farewells: [
      "Well, it was nice chatting with you!",
      "Hope you enjoy the rest of your time here!",
      "See you around town!",
      "Take care, and welcome to our community!"
    ],
    
    personality_traits: {
      casual: {
        modifiers: ["you know", "honestly", "pretty much", "basically"],
        tone: "relaxed and conversational"
      }
    }
  }
}

/**
 * Utility functions for accessing NPC conversation templates
 */
var NPCTemplateUtils = {
  /**
   * Get conversation template for specific NPC
   * @param {string} npcId - ID of the NPC (npc1, npc2, npc3, npc4)
   * @returns {Object} NPC conversation template
   */
  getTemplate(npcId) {
    return npcConversationTemplates[npcId] || null
  },

  /**
   * Get random greeting for NPC
   * @param {string} npcId - ID of the NPC
   * @returns {string} Random greeting
   */
  getRandomGreeting(npcId) {
    const template = this.getTemplate(npcId)
    if (!template || !template.greetings) return "Hello!"
    
    const greetings = template.greetings
    return greetings[Math.floor(Math.random() * greetings.length)]
  },

  /**
   * Get random conversation topic for NPC
   * @param {string} npcId - ID of the NPC
   * @returns {string} Random topic key
   */
  getRandomTopic(npcId) {
    const template = this.getTemplate(npcId)
    if (!template || !template.conversationTopics) return null
    
    const topics = Object.keys(template.conversationTopics)
    return topics[Math.floor(Math.random() * topics.length)]
  },

  /**
   * Get topic prompts for specific NPC and topic
   * @param {string} npcId - ID of the NPC
   * @param {string} topicKey - Topic key
   * @returns {Array} Array of prompts for the topic
   */
  getTopicPrompts(npcId, topicKey) {
    const template = this.getTemplate(npcId)
    if (!template || !template.conversationTopics[topicKey]) return []
    
    return template.conversationTopics[topicKey].prompts || []
  },

  /**
   * Get random prompt for specific topic
   * @param {string} npcId - ID of the NPC
   * @param {string} topicKey - Topic key
   * @returns {string} Random prompt
   */
  getRandomPrompt(npcId, topicKey) {
    const prompts = this.getTopicPrompts(npcId, topicKey)
    if (prompts.length === 0) return "Tell me more about that."
    
    return prompts[Math.floor(Math.random() * prompts.length)]
  },

  /**
   * Get responses for specific NPC, topic, and response type
   * @param {string} npcId - ID of the NPC
   * @param {string} topicKey - Topic key
   * @param {string} responseType - Type of response (positive, negative, etc.)
   * @returns {Array} Array of responses
   */
  getTopicResponses(npcId, topicKey, responseType) {
    const template = this.getTemplate(npcId)
    if (!template || !template.conversationTopics[topicKey]) return []
    
    const topic = template.conversationTopics[topicKey]
    return topic.responses && topic.responses[responseType] ? topic.responses[responseType] : []
  },

  /**
   * Get random response for specific context
   * @param {string} npcId - ID of the NPC
   * @param {string} topicKey - Topic key
   * @param {string} responseType - Type of response
   * @returns {string} Random response
   */
  getRandomResponse(npcId, topicKey, responseType) {
    const responses = this.getTopicResponses(npcId, topicKey, responseType)
    if (responses.length === 0) return "That's interesting!"
    
    return responses[Math.floor(Math.random() * responses.length)]
  },

  /**
   * Get random farewell for NPC
   * @param {string} npcId - ID of the NPC
   * @returns {string} Random farewell
   */
  getRandomFarewell(npcId) {
    const template = this.getTemplate(npcId)
    if (!template || !template.farewells) return "Goodbye!"
    
    const farewells = template.farewells
    return farewells[Math.floor(Math.random() * farewells.length)]
  },

  /**
   * Get all available topics for an NPC
   * @param {string} npcId - ID of the NPC
   * @returns {Array} Array of topic keys
   */
  getAllTopics(npcId) {
    const template = this.getTemplate(npcId)
    if (!template || !template.conversationTopics) return []
    
    return Object.keys(template.conversationTopics)
  },

  /**
   * Get personality information for NPC
   * @param {string} npcId - ID of the NPC
   * @returns {Object} Personality traits and modifiers
   */
  getPersonalityTraits(npcId) {
    const template = this.getTemplate(npcId)
    if (!template || !template.personality_traits) return null
    
    return template.personality_traits
  }
}