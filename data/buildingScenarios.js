/**
 * Building scenario templates with asset-based contexts
 * Provides specific learning scenarios for each building type using the assets
 */

// Hospital scenarios using medical-themed assets
const hospitalScenarios = {
  buildingType: 'hospital',
  assetContext: './assets/Gemini_Generated_Image_194dv5194dv5194d.png',
  scenarios: [
    {
      id: 'hospital_appointment_booking',
      title: 'Making a Medical Appointment',
      description: 'Practice scheduling a doctor\'s appointment over the phone',
      difficulty: 'beginner',
      assetContext: 'Medical facility with professional healthcare environment',
      context: {
        setting: 'Hospital reception desk with medical staff',
        playerRole: 'Patient calling to schedule an appointment',
        npcRole: 'Hospital receptionist',
        goal: 'Successfully book an appointment for a check-up',
        timeOfDay: 'Business hours',
        atmosphere: 'Professional, helpful, organized'
      },
      prompt: 'You need to call the hospital to schedule a routine check-up. The receptionist will help you find an available appointment time that works with your schedule.',
      npcIntroduction: 'Good morning! This is City General Hospital. How may I help you today?',
      expectedVocabulary: [
        'appointment', 'doctor', 'schedule', 'available', 'time',
        'check-up', 'patient', 'insurance', 'morning', 'afternoon',
        'physician', 'consultation', 'booking', 'calendar', 'slot'
      ],
      keyPhrases: [
        'I would like to make an appointment',
        'When is the doctor available?',
        'What time works best?',
        'I need to see a doctor',
        'Do you have any openings?',
        'I prefer morning/afternoon appointments'
      ],
      conversationFlow: [
        {
          stage: 'greeting',
          npcPrompt: 'How can I assist you with scheduling today?',
          expectedPlayerResponse: 'Request for appointment booking'
        },
        {
          stage: 'details',
          npcPrompt: 'What type of appointment do you need?',
          expectedPlayerResponse: 'Specify appointment type (check-up, consultation, etc.)'
        },
        {
          stage: 'scheduling',
          npcPrompt: 'Let me check our availability. What days work for you?',
          expectedPlayerResponse: 'Provide preferred days and times'
        },
        {
          stage: 'confirmation',
          npcPrompt: 'Perfect! Let me confirm your appointment details.',
          expectedPlayerResponse: 'Confirm details and provide contact information'
        }
      ],
      learningObjectives: [
        'Use polite language for medical requests',
        'Ask about availability and scheduling',
        'Provide personal information appropriately',
        'Confirm appointment details accurately',
        'Handle scheduling conflicts diplomatically'
      ],
      culturalNotes: [
        'Medical appointments often require advance booking',
        'Bring insurance information and ID to appointments',
        'Arrive 15 minutes early for paperwork',
        'It\'s polite to confirm appointments the day before'
      ]
    },

    {
      id: 'hospital_symptom_description',
      title: 'Describing Medical Symptoms',
      description: 'Explain your health concerns clearly to a healthcare provider',
      difficulty: 'intermediate',
      assetContext: 'Doctor\'s office with medical equipment and examination area',
      context: {
        setting: 'Doctor\'s examination room during consultation',
        playerRole: 'Patient describing symptoms to doctor',
        npcRole: 'Medical doctor conducting examination',
        goal: 'Clearly communicate health issues and symptoms',
        timeOfDay: 'During scheduled appointment',
        atmosphere: 'Professional, caring, focused on health'
      },
      prompt: 'You\'re at your doctor\'s appointment. The doctor needs to understand your symptoms to provide proper care. Describe how you\'ve been feeling and any specific health concerns.',
      npcIntroduction: 'Good to see you today. What brings you in? How have you been feeling?',
      expectedVocabulary: [
        'pain', 'headache', 'fever', 'tired', 'symptoms',
        'stomach', 'throat', 'cough', 'dizzy', 'nausea',
        'ache', 'discomfort', 'swelling', 'rash', 'fatigue',
        'intensity', 'duration', 'frequency', 'medication'
      ],
      keyPhrases: [
        'I have been feeling...',
        'The pain is in my...',
        'It started yesterday/last week',
        'It hurts when I...',
        'The symptoms include...',
        'I\'ve been experiencing...',
        'It feels like...',
        'The pain is sharp/dull/throbbing'
      ],
      conversationFlow: [
        {
          stage: 'initial_complaint',
          npcPrompt: 'What\'s been bothering you? Tell me about your main concern.',
          expectedPlayerResponse: 'Describe primary symptoms or health issue'
        },
        {
          stage: 'symptom_details',
          npcPrompt: 'Can you describe the pain/discomfort in more detail?',
          expectedPlayerResponse: 'Provide specific details about symptoms'
        },
        {
          stage: 'timeline',
          npcPrompt: 'When did these symptoms start? Have they changed?',
          expectedPlayerResponse: 'Explain when symptoms began and progression'
        },
        {
          stage: 'impact',
          npcPrompt: 'How are these symptoms affecting your daily activities?',
          expectedPlayerResponse: 'Describe impact on daily life and activities'
        }
      ],
      learningObjectives: [
        'Describe physical sensations accurately',
        'Use time expressions for symptom timeline',
        'Express intensity and frequency of symptoms',
        'Ask appropriate questions about treatment',
        'Understand medical advice and instructions'
      ],
      culturalNotes: [
        'Be honest and detailed about symptoms',
        'Don\'t minimize or exaggerate health concerns',
        'Ask questions if you don\'t understand medical terms',
        'Follow up with questions about treatment options'
      ]
    },

    {
      id: 'hospital_medical_consultation',
      title: 'Medical Consultation Discussion',
      description: 'Engage in detailed discussion about treatment options and medical advice',
      difficulty: 'advanced',
      assetContext: 'Professional medical consultation room with doctor and patient',
      context: {
        setting: 'Doctor\'s office during detailed consultation',
        playerRole: 'Patient discussing treatment options',
        npcRole: 'Specialist doctor providing medical advice',
        goal: 'Understand treatment options and make informed decisions',
        timeOfDay: 'Extended consultation appointment',
        atmosphere: 'Thorough, educational, collaborative decision-making'
      },
      prompt: 'Your doctor has reviewed your test results and wants to discuss treatment options. This is an important conversation about your health care plan and next steps.',
      npcIntroduction: 'I\'ve reviewed your test results, and I\'d like to discuss some treatment options with you. Do you have any questions before we begin?',
      expectedVocabulary: [
        'treatment', 'medication', 'therapy', 'surgery', 'recovery',
        'side effects', 'prognosis', 'diagnosis', 'specialist', 'referral',
        'procedure', 'alternative', 'risks', 'benefits', 'follow-up',
        'prescription', 'dosage', 'monitoring', 'lifestyle', 'prevention'
      ],
      keyPhrases: [
        'What are my treatment options?',
        'What are the risks and benefits?',
        'How long will recovery take?',
        'Are there any side effects?',
        'What happens if I don\'t treat this?',
        'Can you explain the procedure?',
        'I\'d like a second opinion',
        'What lifestyle changes should I make?'
      ],
      conversationFlow: [
        {
          stage: 'results_explanation',
          npcPrompt: 'Let me explain what your test results show...',
          expectedPlayerResponse: 'Ask clarifying questions about results'
        },
        {
          stage: 'treatment_options',
          npcPrompt: 'Here are the treatment options we should consider...',
          expectedPlayerResponse: 'Ask about different treatment approaches'
        },
        {
          stage: 'risks_benefits',
          npcPrompt: 'Each option has different risks and benefits...',
          expectedPlayerResponse: 'Inquire about specific risks and outcomes'
        },
        {
          stage: 'decision_making',
          npcPrompt: 'What questions do you have? What feels right for you?',
          expectedPlayerResponse: 'Express preferences and make informed decisions'
        }
      ],
      learningObjectives: [
        'Understand complex medical information',
        'Ask informed questions about treatment',
        'Express concerns and preferences clearly',
        'Negotiate and collaborate in medical decisions',
        'Understand long-term health implications'
      ],
      culturalNotes: [
        'It\'s important to ask questions about your treatment',
        'You have the right to understand all options',
        'Second opinions are acceptable and often encouraged',
        'Take notes or bring someone to important appointments'
      ]
    }
  ]
}

// Café scenarios using café-themed assets
const cafeScenarios = {
  buildingType: 'cafe',
  assetContext: './assets/Gemini_Generated_Image_ghp5wmghp5wmghp5.png',
  scenarios: [
    {
      id: 'cafe_ordering_food',
      title: 'Ordering Food and Drinks',
      description: 'Practice ordering items from a café menu',
      difficulty: 'beginner',
      assetContext: 'Cozy café with menu board and friendly staff',
      context: {
        setting: 'Café counter with menu displays and barista',
        playerRole: 'Customer placing an order',
        npcRole: 'Friendly café barista/server',
        goal: 'Successfully order food and beverages',
        timeOfDay: 'Busy morning or afternoon',
        atmosphere: 'Casual, friendly, welcoming'
      },
      prompt: 'You\'re at a popular local café and want to order something to eat and drink. Look at the menu options and place your order with the friendly server.',
      npcIntroduction: 'Welcome to our café! What can I get started for you today?',
      expectedVocabulary: [
        'coffee', 'tea', 'sandwich', 'order', 'please',
        'menu', 'latte', 'cappuccino', 'pastry', 'size',
        'espresso', 'americano', 'croissant', 'muffin', 'bagel',
        'milk', 'sugar', 'cream', 'decaf', 'regular'
      ],
      keyPhrases: [
        'I would like to order...',
        'Can I have a...',
        'What do you recommend?',
        'How much does it cost?',
        'What sizes do you have?',
        'I\'ll take a...',
        'Do you have any specials?',
        'Can I get that to go?'
      ],
      conversationFlow: [
        {
          stage: 'greeting',
          npcPrompt: 'Good morning! What looks good to you today?',
          expectedPlayerResponse: 'Greet and begin looking at menu options'
        },
        {
          stage: 'menu_inquiry',
          npcPrompt: 'Would you like to hear about our specials?',
          expectedPlayerResponse: 'Ask about menu items or specials'
        },
        {
          stage: 'ordering',
          npcPrompt: 'Great choice! What size would you like?',
          expectedPlayerResponse: 'Specify order details and preferences'
        },
        {
          stage: 'payment',
          npcPrompt: 'Will that be for here or to go? And how would you like to pay?',
          expectedPlayerResponse: 'Specify dining preference and payment method'
        }
      ],
      learningObjectives: [
        'Use polite ordering language',
        'Ask about menu items and prices',
        'Express food and drink preferences',
        'Handle payment conversation',
        'Understand café terminology and options'
      ],
      culturalNotes: [
        'Tipping is customary in many cafés',
        'It\'s okay to ask for recommendations',
        'Many cafés offer loyalty programs',
        'Peak hours may have longer wait times'
      ]
    },

    {
      id: 'cafe_making_reservations',
      title: 'Making a Group Reservation',
      description: 'Reserve a table for friends or colleagues',
      difficulty: 'intermediate',
      assetContext: 'Café with seating areas and reservation system',
      context: {
        setting: 'Café during phone call or in-person reservation',
        playerRole: 'Customer making a group reservation',
        npcRole: 'Café manager or host handling reservations',
        goal: 'Book a table for a specific time and group size',
        timeOfDay: 'Planning for future visit',
        atmosphere: 'Accommodating, organized, helpful'
      },
      prompt: 'You want to bring a group of friends or colleagues to the café for a meeting or social gathering. Call or visit to make a reservation for your group.',
      npcIntroduction: 'Hello! Are you looking to make a reservation? I\'d be happy to help you with that.',
      expectedVocabulary: [
        'reservation', 'table', 'people', 'time', 'available',
        'party', 'evening', 'book', 'confirm', 'group',
        'seating', 'capacity', 'arrangement', 'occasion', 'special',
        'deposit', 'cancellation', 'policy', 'contact', 'number'
      ],
      keyPhrases: [
        'I\'d like to make a reservation',
        'Do you have a table available?',
        'For how many people?',
        'What time would work?',
        'We\'re celebrating...',
        'Is there a minimum order?',
        'Can we reserve a quiet area?',
        'What\'s your cancellation policy?'
      ],
      conversationFlow: [
        {
          stage: 'initial_request',
          npcPrompt: 'When were you thinking of coming in?',
          expectedPlayerResponse: 'Specify date and approximate time'
        },
        {
          stage: 'group_details',
          npcPrompt: 'How many people will be in your party?',
          expectedPlayerResponse: 'Provide group size and any special needs'
        },
        {
          stage: 'availability_check',
          npcPrompt: 'Let me check what we have available...',
          expectedPlayerResponse: 'Discuss timing flexibility and preferences'
        },
        {
          stage: 'confirmation',
          npcPrompt: 'Perfect! Let me get your contact information.',
          expectedPlayerResponse: 'Provide contact details and confirm reservation'
        }
      ],
      learningObjectives: [
        'Make future arrangements and plans',
        'Specify numbers, times, and dates',
        'Negotiate availability and alternatives',
        'Confirm details and provide contact information',
        'Understand reservation policies and procedures'
      ],
      culturalNotes: [
        'Reservations may require a deposit for large groups',
        'Call ahead for busy times or special occasions',
        'Be prepared to provide contact information',
        'Confirm reservations the day before'
      ]
    },

    {
      id: 'cafe_social_conversation',
      title: 'Casual Social Interaction',
      description: 'Engage in friendly conversation with café staff or other customers',
      difficulty: 'advanced',
      assetContext: 'Relaxed café environment encouraging social interaction',
      context: {
        setting: 'Café seating area during a relaxed visit',
        playerRole: 'Regular customer engaging in conversation',
        npcRole: 'Friendly barista or fellow customer',
        goal: 'Have a natural, enjoyable social conversation',
        timeOfDay: 'Quieter periods encouraging conversation',
        atmosphere: 'Relaxed, friendly, community-oriented'
      },
      prompt: 'You\'re a regular at this café and enjoy chatting with the staff and other customers. Today you have time to have a longer conversation about local events, recommendations, or shared interests.',
      npcIntroduction: 'Hey there! Good to see you again. How\'s your day going? Trying anything new today?',
      expectedVocabulary: [
        'regular', 'neighborhood', 'community', 'local', 'events',
        'recommendation', 'favorite', 'usually', 'sometimes', 'weekend',
        'weather', 'busy', 'relaxing', 'interesting', 'nearby',
        'activities', 'hobbies', 'work', 'family', 'plans'
      ],
      keyPhrases: [
        'I usually come here because...',
        'Have you tried the new...?',
        'What do you recommend?',
        'How long have you worked here?',
        'Do you know any good places nearby?',
        'What\'s happening in the neighborhood?',
        'I love the atmosphere here',
        'This is my favorite spot because...'
      ],
      conversationFlow: [
        {
          stage: 'casual_greeting',
          npcPrompt: 'The usual today, or are you feeling adventurous?',
          expectedPlayerResponse: 'Engage in friendly banter about preferences'
        },
        {
          stage: 'local_connection',
          npcPrompt: 'Have you heard about the new place that opened down the street?',
          expectedPlayerResponse: 'Discuss local businesses and community'
        },
        {
          stage: 'personal_sharing',
          npcPrompt: 'What brings you to this part of town today?',
          expectedPlayerResponse: 'Share appropriate personal information'
        },
        {
          stage: 'recommendations',
          npcPrompt: 'Since you like this, you might enjoy...',
          expectedPlayerResponse: 'Exchange recommendations and opinions'
        }
      ],
      learningObjectives: [
        'Engage in natural, unscripted conversation',
        'Share opinions and preferences appropriately',
        'Ask follow-up questions to maintain conversation',
        'Use conversational fillers and transitions',
        'Build rapport and community connections'
      ],
      culturalNotes: [
        'Café culture varies by region and country',
        'Regular customers often develop relationships with staff',
        'Cafés can be community gathering places',
        'Respect others\' space and conversation preferences'
      ]
    }
  ]
}

// Shop scenarios using shop-themed assets
const shopScenarios = {
  buildingType: 'shop',
  assetContext: './assets/Gemini_Generated_Image_hp5qdqhp5qdqhp5q.png',
  scenarios: [
    {
      id: 'shop_purchasing_items',
      title: 'Making Purchases',
      description: 'Buy items and handle the complete shopping transaction',
      difficulty: 'beginner',
      assetContext: 'Retail shop with products and checkout counter',
      context: {
        setting: 'Shop floor and checkout counter',
        playerRole: 'Customer making purchases',
        npcRole: 'Shop clerk or cashier',
        goal: 'Successfully purchase desired items',
        timeOfDay: 'Regular shopping hours',
        atmosphere: 'Helpful, commercial, customer-focused'
      },
      prompt: 'You\'ve found the items you want to buy and are ready to make your purchase. Go to the checkout counter and complete your transaction with the shop clerk.',
      npcIntroduction: 'Hi there! Did you find everything you were looking for today?',
      expectedVocabulary: [
        'purchase', 'buy', 'price', 'cost', 'total', 'receipt',
        'cash', 'card', 'credit', 'debit', 'change', 'bag',
        'item', 'product', 'checkout', 'register', 'payment',
        'discount', 'sale', 'tax', 'amount', 'transaction'
      ],
      keyPhrases: [
        'I\'d like to buy this',
        'How much is the total?',
        'Can I pay with card?',
        'Do you need a receipt?',
        'Can I get a bag?',
        'Is this on sale?',
        'Do you accept credit cards?',
        'Keep the change'
      ],
      conversationFlow: [
        {
          stage: 'checkout_greeting',
          npcPrompt: 'Find everything okay? Let me ring these up for you.',
          expectedPlayerResponse: 'Confirm items and engage in checkout process'
        },
        {
          stage: 'pricing',
          npcPrompt: 'Your total comes to...',
          expectedPlayerResponse: 'Acknowledge total and prepare payment'
        },
        {
          stage: 'payment',
          npcPrompt: 'How would you like to pay today?',
          expectedPlayerResponse: 'Specify payment method and complete transaction'
        },
        {
          stage: 'completion',
          npcPrompt: 'Here\'s your receipt. Would you like a bag?',
          expectedPlayerResponse: 'Complete transaction and express thanks'
        }
      ],
      learningObjectives: [
        'Handle money and payment transactions',
        'Understand pricing and totals',
        'Use appropriate shopping vocabulary',
        'Complete transactions politely and efficiently',
        'Ask for additional services (bags, receipts)'
      ],
      culturalNotes: [
        'Tipping is not expected in most retail shops',
        'Keep receipts for returns or exchanges',
        'Some shops offer loyalty programs',
        'Be prepared with payment method before checkout'
      ]
    },

    {
      id: 'shop_asking_prices',
      title: 'Inquiring About Prices and Products',
      description: 'Ask about costs, compare options, and make purchasing decisions',
      difficulty: 'intermediate',
      assetContext: 'Shop with various products and price displays',
      context: {
        setting: 'Shop floor with product displays and staff',
        playerRole: 'Customer comparing products and prices',
        npcRole: 'Knowledgeable shop assistant',
        goal: 'Get pricing information and make informed purchasing decisions',
        timeOfDay: 'During shopping visit',
        atmosphere: 'Informative, helpful, sales-oriented'
      },
      prompt: 'You\'re browsing in the shop and want to compare prices and features of different items. Ask the shop assistant about costs, quality, and recommendations.',
      npcIntroduction: 'Can I help you with anything? Are you looking for something specific today?',
      expectedVocabulary: [
        'price', 'cost', 'expensive', 'cheap', 'affordable', 'budget',
        'compare', 'quality', 'brand', 'features', 'warranty',
        'discount', 'sale', 'promotion', 'deal', 'value',
        'difference', 'option', 'choice', 'recommend', 'suggest'
      ],
      keyPhrases: [
        'How much does this cost?',
        'What\'s the difference between these two?',
        'Is this on sale?',
        'Do you have anything cheaper?',
        'What do you recommend?',
        'Is this good quality?',
        'Are there any discounts available?',
        'What\'s your best price?'
      ],
      conversationFlow: [
        {
          stage: 'product_inquiry',
          npcPrompt: 'What kind of product are you interested in?',
          expectedPlayerResponse: 'Describe what you\'re looking for'
        },
        {
          stage: 'price_comparison',
          npcPrompt: 'Here are a few options in different price ranges...',
          expectedPlayerResponse: 'Ask about prices and compare features'
        },
        {
          stage: 'recommendations',
          npcPrompt: 'Based on what you\'ve told me, I\'d suggest...',
          expectedPlayerResponse: 'Ask follow-up questions about recommendations'
        },
        {
          stage: 'decision_making',
          npcPrompt: 'Would you like to think about it, or are you ready to decide?',
          expectedPlayerResponse: 'Make purchasing decision or ask for more time'
        }
      ],
      learningObjectives: [
        'Ask about prices and product features',
        'Compare different options effectively',
        'Express budget constraints appropriately',
        'Understand sales and discount information',
        'Make informed purchasing decisions'
      ],
      culturalNotes: [
        'Bargaining is acceptable in some cultures but not others',
        'Sales staff are usually knowledgeable about products',
        'Don\'t feel pressured to buy immediately',
        'Ask about return policies before purchasing'
      ]
    },

    {
      id: 'shop_requesting_assistance',
      title: 'Getting Help from Shop Staff',
      description: 'Ask staff for help finding items and getting product information',
      difficulty: 'advanced',
      assetContext: 'Large shop with multiple departments and helpful staff',
      context: {
        setting: 'Large retail shop with various departments',
        playerRole: 'Customer needing assistance finding specific items',
        npcRole: 'Experienced shop assistant or department manager',
        goal: 'Get comprehensive help finding and understanding products',
        timeOfDay: 'During regular shopping hours',
        atmosphere: 'Professional, service-oriented, knowledgeable'
      },
      prompt: 'You\'re in a large shop looking for specific items but need help navigating the store and understanding product options. Ask the staff for detailed assistance.',
      npcIntroduction: 'Good afternoon! I see you\'re looking around - can I help you find something specific or answer any questions?',
      expectedVocabulary: [
        'assistance', 'help', 'find', 'locate', 'department', 'section',
        'aisle', 'floor', 'directions', 'information', 'details',
        'specifications', 'availability', 'stock', 'order', 'delivery',
        'installation', 'service', 'support', 'expertise', 'advice'
      ],
      keyPhrases: [
        'I\'m looking for...',
        'Can you help me find...?',
        'Where is the... department?',
        'Do you have this in stock?',
        'Can you tell me more about...?',
        'What would you recommend for...?',
        'Is there someone who specializes in...?',
        'Can you check if you have...?'
      ],
      conversationFlow: [
        {
          stage: 'needs_assessment',
          npcPrompt: 'What exactly are you looking for today?',
          expectedPlayerResponse: 'Explain specific needs and requirements'
        },
        {
          stage: 'product_guidance',
          npcPrompt: 'Let me show you where that is and explain the options...',
          expectedPlayerResponse: 'Ask detailed questions about products'
        },
        {
          stage: 'expert_advice',
          npcPrompt: 'Based on your needs, here\'s what I\'d recommend...',
          expectedPlayerResponse: 'Seek expert opinions and additional information'
        },
        {
          stage: 'service_options',
          npcPrompt: 'We also offer installation and support services...',
          expectedPlayerResponse: 'Inquire about additional services and support'
        }
      ],
      learningObjectives: [
        'Ask for help and directions effectively',
        'Describe specific needs and requirements',
        'Understand detailed product information',
        'Seek expert advice and recommendations',
        'Navigate complex retail environments'
      ],
      culturalNotes: [
        'Shop staff are usually trained to be helpful',
        'Don\'t hesitate to ask for assistance',
        'Specialized departments may have expert staff',
        'Good service often leads to customer loyalty'
      ]
    }
  ]
}

// School scenarios using school-themed assets
const schoolScenarios = {
  buildingType: 'school',
  assetContext: './assets/Gemini_Generated_Image_vby7auvby7auvby7.png',
  scenarios: [
    {
      id: 'school_asking_directions',
      title: 'Finding Your Way Around Campus',
      description: 'Get directions to classrooms, offices, and facilities',
      difficulty: 'beginner',
      assetContext: 'School campus with buildings, hallways, and helpful staff',
      context: {
        setting: 'School hallway, main office, or campus grounds',
        playerRole: 'New student or visitor needing directions',
        npcRole: 'Helpful student, teacher, or staff member',
        goal: 'Successfully navigate to desired location',
        timeOfDay: 'During school hours',
        atmosphere: 'Educational, helpful, organized'
      },
      prompt: 'You\'re new to the school and need to find a specific classroom, office, or facility. Ask someone for clear directions to help you navigate the campus.',
      npcIntroduction: 'Hi! You look like you might be lost. Can I help you find something?',
      expectedVocabulary: [
        'directions', 'classroom', 'office', 'building', 'floor',
        'hallway', 'stairs', 'elevator', 'left', 'right',
        'straight', 'turn', 'corner', 'entrance', 'exit',
        'map', 'signs', 'number', 'room', 'department'
      ],
      keyPhrases: [
        'Excuse me, where is...?',
        'How do I get to...?',
        'Can you show me the way?',
        'Is it on this floor?',
        'Which direction should I go?',
        'How far is it from here?',
        'Are there any landmarks?',
        'Thank you for your help'
      ],
      conversationFlow: [
        {
          stage: 'location_request',
          npcPrompt: 'What are you looking for?',
          expectedPlayerResponse: 'Specify the location you need to find'
        },
        {
          stage: 'direction_giving',
          npcPrompt: 'Oh, that\'s easy! Go down this hall and...',
          expectedPlayerResponse: 'Listen to directions and ask for clarification'
        },
        {
          stage: 'confirmation',
          npcPrompt: 'Does that make sense? Do you want me to repeat anything?',
          expectedPlayerResponse: 'Confirm understanding or ask for repetition'
        },
        {
          stage: 'additional_help',
          npcPrompt: 'If you get lost, just ask anyone or look for the signs.',
          expectedPlayerResponse: 'Thank the person and confirm next steps'
        }
      ],
      learningObjectives: [
        'Ask for directions politely and clearly',
        'Understand directional language and instructions',
        'Use location and navigation vocabulary',
        'Follow spoken directions accurately',
        'Express gratitude for assistance'
      ],
      culturalNotes: [
        'Students and staff are usually happy to help',
        'Campus maps are often available at main entrances',
        'Room numbers usually follow a logical system',
        'Don\'t be afraid to ask multiple people if needed'
      ]
    },

    {
      id: 'school_enrollment_inquiries',
      title: 'Course and Program Information',
      description: 'Learn about academic programs, requirements, and enrollment processes',
      difficulty: 'intermediate',
      assetContext: 'Academic advisor\'s office with course catalogs and program information',
      context: {
        setting: 'Academic advisor\'s office or admissions department',
        playerRole: 'Prospective or current student seeking information',
        npcRole: 'Academic advisor or admissions counselor',
        goal: 'Get comprehensive information about academic programs',
        timeOfDay: 'During office hours',
        atmosphere: 'Professional, informative, supportive'
      },
      prompt: 'You want to learn about available language courses, program requirements, and enrollment procedures. Meet with an academic advisor to get detailed information.',
      npcIntroduction: 'Welcome! I\'m here to help you with information about our programs. What would you like to know about?',
      expectedVocabulary: [
        'course', 'program', 'major', 'minor', 'requirements', 'prerequisites',
        'credits', 'semester', 'quarter', 'schedule', 'enrollment',
        'registration', 'tuition', 'fees', 'financial aid', 'scholarship',
        'advisor', 'counselor', 'degree', 'certificate', 'graduation'
      ],
      keyPhrases: [
        'What programs do you offer?',
        'What are the requirements for...?',
        'How do I enroll in...?',
        'When does registration open?',
        'What\'s the cost of tuition?',
        'Are there any prerequisites?',
        'Can I get financial aid?',
        'Who will be my advisor?'
      ],
      conversationFlow: [
        {
          stage: 'program_interest',
          npcPrompt: 'What field of study are you interested in?',
          expectedPlayerResponse: 'Describe academic interests and goals'
        },
        {
          stage: 'program_details',
          npcPrompt: 'Let me tell you about our language programs...',
          expectedPlayerResponse: 'Ask specific questions about courses and requirements'
        },
        {
          stage: 'enrollment_process',
          npcPrompt: 'Here\'s how the enrollment process works...',
          expectedPlayerResponse: 'Inquire about deadlines and procedures'
        },
        {
          stage: 'next_steps',
          npcPrompt: 'What would you like to do next?',
          expectedPlayerResponse: 'Discuss next steps and follow-up actions'
        }
      ],
      learningObjectives: [
        'Ask about academic programs and requirements',
        'Understand educational terminology and processes',
        'Discuss academic goals and planning',
        'Navigate enrollment and registration procedures',
        'Seek appropriate academic guidance'
      ],
      culturalNotes: [
        'Academic advisors are there to help you succeed',
        'Come prepared with questions and goals',
        'Understand deadlines and important dates',
        'Take notes during advising sessions'
      ]
    },

    {
      id: 'school_course_information',
      title: 'Detailed Course Discussion',
      description: 'Get in-depth information about specific courses and academic expectations',
      difficulty: 'advanced',
      assetContext: 'Professor\'s office or classroom with academic materials',
      context: {
        setting: 'Professor\'s office during office hours',
        playerRole: 'Student seeking detailed course information',
        npcRole: 'Professor or department head',
        goal: 'Understand course content, expectations, and academic standards',
        timeOfDay: 'During professor\'s office hours',
        atmosphere: 'Academic, detailed, intellectually engaging'
      },
      prompt: 'You\'re considering taking an advanced language course and want to understand the curriculum, expectations, and how it fits into your academic goals. Meet with the professor.',
      npcIntroduction: 'Please, come in! I understand you\'re interested in our advanced language course. What would you like to know about the curriculum?',
      expectedVocabulary: [
        'curriculum', 'syllabus', 'assignments', 'exams', 'projects',
        'research', 'presentation', 'participation', 'attendance', 'grading',
        'objectives', 'outcomes', 'methodology', 'resources', 'textbook',
        'assessment', 'feedback', 'office hours', 'expectations', 'standards'
      ],
      keyPhrases: [
        'What does the course cover?',
        'What are your expectations?',
        'How is the course graded?',
        'What kind of assignments are there?',
        'How much time should I expect to spend?',
        'What resources will I need?',
        'Can you tell me about the workload?',
        'How can I succeed in this course?'
      ],
      conversationFlow: [
        {
          stage: 'course_overview',
          npcPrompt: 'Let me give you an overview of what we cover...',
          expectedPlayerResponse: 'Ask about specific topics and learning objectives'
        },
        {
          stage: 'expectations_discussion',
          npcPrompt: 'Here\'s what I expect from students in this course...',
          expectedPlayerResponse: 'Inquire about academic standards and requirements'
        },
        {
          stage: 'assessment_methods',
          npcPrompt: 'We use various assessment methods including...',
          expectedPlayerResponse: 'Ask about grading, exams, and project requirements'
        },
        {
          stage: 'success_strategies',
          npcPrompt: 'Students who do well in this course typically...',
          expectedPlayerResponse: 'Seek advice on how to excel and manage coursework'
        }
      ],
      learningObjectives: [
        'Understand detailed academic information',
        'Discuss course content and expectations',
        'Ask informed questions about curriculum',
        'Understand assessment and grading methods',
        'Seek academic advice and success strategies'
      ],
      culturalNotes: [
        'Professors appreciate students who are engaged and prepared',
        'Office hours are valuable opportunities for one-on-one discussion',
        'Academic honesty and integrity are fundamental expectations',
        'Building relationships with professors can benefit your academic career'
      ]
    }
  ]
}

// Combine all scenario templates
const buildingScenarioTemplates = {
  hospital: hospitalScenarios,
  cafe: cafeScenarios,
  shop: shopScenarios,
  school: schoolScenarios
}

// Function to get scenarios by building type
function getScenariosByBuildingType(buildingType) {
  return buildingScenarioTemplates[buildingType] || null
}

// Function to get specific scenario by building type and scenario ID
function getScenarioById(buildingType, scenarioId) {
  const buildingScenarios = buildingScenarioTemplates[buildingType]
  if (!buildingScenarios) return null
  
  return buildingScenarios.scenarios.find(scenario => scenario.id === scenarioId) || null
}

// Function to get scenarios by difficulty level
function getScenariosByDifficulty(buildingType, difficulty) {
  const buildingScenarios = buildingScenarioTemplates[buildingType]
  if (!buildingScenarios) return []
  
  return buildingScenarios.scenarios.filter(scenario => scenario.difficulty === difficulty)
}

// Function to get random scenario from building type
function getRandomScenario(buildingType, difficulty = null) {
  const buildingScenarios = buildingScenarioTemplates[buildingType]
  if (!buildingScenarios) return null
  
  let availableScenarios = buildingScenarios.scenarios
  if (difficulty) {
    availableScenarios = availableScenarios.filter(scenario => scenario.difficulty === difficulty)
  }
  
  if (availableScenarios.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * availableScenarios.length)
  return availableScenarios[randomIndex]
}

// Export scenario system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buildingScenarioTemplates,
    getScenariosByBuildingType,
    getScenarioById,
    getScenariosByDifficulty,
    getRandomScenario
  }
}