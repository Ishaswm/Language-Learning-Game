// New asset definitions for language learning RPG
// These assets will be classified and integrated into the game

const newAssets = {
  // Character assets - NPCs for language learning interactions
  characters: [
    {
      id: 'npc1',
      name: 'Dr. Elena Martinez',
      sprite: './assets/Gemini_Generated_Image_194dv5194dv5194d.png',
      role: 'doctor',
      personality: 'helpful',
      position: { x: 15, y: 20 }, // Grid position in charactersMap
      dialogue: [
        'Good day! I\'m Dr. Martinez. How can I help you today?',
        'Are you feeling alright? Any symptoms I should know about?',
        'Remember to take care of your health!'
      ],
      conversationStarters: [
        'Hello! I\'m Dr. Martinez. What brings you to the clinic today?',
        'Good to see you! Are you here for a check-up or do you have any concerns?',
        'Welcome to our medical center. How are you feeling today?',
        'Hi there! I\'m here to help with any health questions you might have.'
      ],
      dialogueTopics: [
        'appointment_booking',
        'symptom_description', 
        'medical_consultation',
        'health_advice',
        'prescription_discussion',
        'follow_up_care'
      ],
      scenarios: ['hospital', 'medical_consultation', 'appointment_booking']
    },
    {
      id: 'npc2', 
      name: 'Marco the Shopkeeper',
      sprite: './assets/Gemini_Generated_Image_ghp5wmghp5wmghp5.png',
      role: 'shopkeeper',
      personality: 'friendly',
      position: { x: 25, y: 30 },
      dialogue: [
        'Welcome to Marco\'s General Store!',
        'What can I help you find today?',
        'We have the best prices in town!'
      ],
      conversationStarters: [
        'Welcome to my shop! Looking for anything in particular?',
        'Hello there! I\'ve got everything you need right here.',
        'Good day! What brings you to Marco\'s store today?',
        'Hi! Need help finding something? I know where everything is!'
      ],
      dialogueTopics: [
        'product_inquiry',
        'price_negotiation',
        'store_recommendations',
        'payment_methods',
        'store_hours',
        'special_offers'
      ],
      scenarios: ['shop', 'purchasing', 'price_inquiry']
    },
    {
      id: 'npc3',
      name: 'Sofia the Student',
      sprite: './assets/Gemini_Generated_Image_hp5qdqhp5qdqhp5q.png',
      role: 'student',
      personality: 'energetic',
      position: { x: 10, y: 15 },
      dialogue: [
        'Hi! I\'m Sofia, I study at the language school here.',
        'Are you learning a new language too?',
        'This town is great for practicing with locals!'
      ],
      conversationStarters: [
        'Hey there! Are you new to the language school?',
        'Hi! I love meeting other language learners. What are you studying?',
        'Hello! Want to practice conversation together?',
        'Hey! I\'m Sofia. Are you here to learn languages too?'
      ],
      dialogueTopics: [
        'school_life',
        'language_learning_tips',
        'study_groups',
        'local_recommendations',
        'student_activities',
        'course_information'
      ],
      scenarios: ['school', 'student_life', 'language_exchange']
    },
    {
      id: 'npc4',
      name: 'Carlos the Citizen',
      sprite: './assets/Gemini_Generated_Image_vby7auvby7auvby7.png',
      role: 'citizen',
      personality: 'casual',
      position: { x: 35, y: 25 },
      dialogue: [
        'Hello there! Beautiful day, isn\'t it?',
        'I\'ve lived in this town my whole life.',
        'Always happy to chat with visitors!'
      ],
      conversationStarters: [
        'Hey! Nice to see a new face around town.',
        'Hello there! Enjoying your visit to our little town?',
        'Hi! I don\'t think we\'ve met. I\'m Carlos, local resident.',
        'Good day! Are you visiting or thinking of moving here?'
      ],
      dialogueTopics: [
        'local_history',
        'weather_chat',
        'town_directions',
        'local_events',
        'daily_life',
        'community_news',
        'restaurant_recommendations'
      ],
      scenarios: ['casual_conversation', 'local_information', 'directions']
    }
  ],
  
  // Building/Environment assets
  buildings: [
    {
      id: 'building1',
      name: 'Language School',
      sprite: './assets/Gemini_Generated_Image_hp5qdqhp5qdqhp5q.png',
      type: 'school',
      position: { x: 10, y: 15 },
      scenarios: ['enrollment', 'course_info', 'directions']
    },
    {
      id: 'building2',
      name: 'Community Center', 
      sprite: './assets/Gemini_Generated_Image_vby7auvby7auvby7.png',
      type: 'community',
      position: { x: 35, y: 25 },
      scenarios: ['events', 'social_interaction', 'information']
    }
  ]
}

// Character map positions for new NPCs (using existing character map system)
const newCharacterPositions = [
  { symbol: 1032, npcId: 'npc1', x: 15, y: 20 }, // Dr. Elena Martinez
  { symbol: 1033, npcId: 'npc2', x: 25, y: 30 }, // Marco the Shopkeeper
  { symbol: 1034, npcId: 'npc3', x: 10, y: 15 }, // Sofia the Student  
  { symbol: 1035, npcId: 'npc4', x: 35, y: 25 }  // Carlos the Citizen
]

// Building interaction zones (using existing boundary system)
const newBuildingZones = [
  { symbol: 1036, buildingId: 'building1', x: 12, y: 18 }, // Language School
  { symbol: 1037, buildingId: 'building2', x: 37, y: 28 }  // Community Center
]