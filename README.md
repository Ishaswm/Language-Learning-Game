# Language Learning RPG

A 2D, Pokémon-style, top-down language learning game that provides an immersive environment for practicing target languages through interactive conversations with NPCs and building interactions.

## 🎮 Game Features

### Core Gameplay
- **2D Top-down Exploration**: Navigate a small city with Pokémon-style movement
- **Interactive NPCs**: Engage in conversations with various characters (doctor, shopkeeper, student, citizen)
- **Building Interactions**: Enter buildings for structured learning scenarios (hospital, café, shop, school)
- **Voice Input**: Practice speaking with Web Speech API integration
- **Real-time Feedback**: Get immediate feedback on language learning progress

### Language Learning System
- **Contextual Conversations**: Role-based dialogue with NPCs matching their professions
- **Building Scenarios**: Structured learning tasks in different environments
- **Voice Processing**: Speech recognition and transcription
- **Progress Tracking**: Monitor learning metrics and conversation history
- **Accessibility**: Text-only mode and subtitle support

### Environmental Features
- **25+ Environmental Elements**: Fountains, benches, gardens, street lamps
- **Natural Boundaries**: Hedge rows and rock formations
- **Visual Variety**: Strategic placement of decorative elements
- **Collision Detection**: Proper physics for environmental interactions

## 🚀 Getting Started

### Prerequisites
- Modern web browser with Web Speech API support (Chrome, Firefox, Safari)
- Local web server (Python, Node.js, or any HTTP server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ishaswm/Language-Learning-Game.git
   cd Language-Learning-Game
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000` in your web browser

## 🎯 How to Play

### Movement
- **WASD** or **Arrow Keys**: Move your character around the city
- **Spacebar**: Interact with NPCs and buildings when prompted

### Conversations
1. Approach an NPC or building entrance
2. Press **Spacebar** to start interaction
3. Use the **microphone button** for voice input or type responses
4. Complete the conversation to receive feedback

### Building Scenarios
- **Hospital**: Practice medical consultations and appointment booking
- **Café**: Order food, make reservations, ask for recommendations
- **Shop**: Purchase items, inquire about prices, request assistance
- **School**: Ask for directions, enrollment information, course details

## 🏗️ Project Structure

```
pokemon-style-game/
├── assets/                     # Game assets (sprites, images)
├── audio/                      # Audio files
├── data/                       # Game data and configurations
│   ├── buildingDefinitions.js  # Building types and scenarios
│   ├── buildingScenarios.js    # Detailed building interactions
│   ├── characters.js           # Character map data
│   ├── collisions.js           # Collision detection data
│   ├── environmentalAssets.js  # Environmental elements system
│   ├── newAssets.js            # New character and building assets
│   └── npcConversationTemplates.js # NPC dialogue templates
├── img/                        # Image assets
├── js/                         # JavaScript modules
│   ├── ConversationManager.js  # Handles dialogue flow
│   ├── DialogueUI.js           # UI for conversations
│   ├── FeedbackModal.js        # Learning progress feedback
│   ├── InteractionManager.js   # Proximity and interaction detection
│   ├── MenuSystem.js           # Game menus and navigation
│   ├── ScenarioEngine.js       # Building-specific learning tasks
│   ├── VoiceProcessor.js       # Voice input processing
│   └── utils.js                # Utility functions
├── classes.js                  # Core game classes
├── index.js                    # Main game logic
├── index.html                  # Main HTML file
└── README.md                   # This file
```

## 🛠️ Technical Details

### Core Classes
- **Player**: Main character with interaction states
- **Character**: NPCs with role-based dialogue
- **EnvironmentalElement**: Decorative and boundary elements
- **Sprite**: Base class for all visual elements
- **Boundary**: Collision detection elements

### Language Learning Components
- **VoiceProcessor**: Web Speech API integration
- **ConversationManager**: Dialogue flow and state management
- **ScenarioEngine**: Building-specific learning scenarios
- **FeedbackModal**: Progress tracking and display

### Environmental System
- **25 environmental elements** strategically placed
- **Collision detection** for boundaries and decorations
- **Visual variety** using all available assets
- **Natural boundaries** creating defined areas

## 🎨 Assets

The game uses AI-generated sprites from the `assets/` folder:
- Character sprites for NPCs (doctor, shopkeeper, student, citizen)
- Environmental elements (fountains, benches, gardens, lamps)
- Building representations
- Natural boundary elements (hedges, rocks)

## 🧪 Testing

### Test Files
- `test-environmental-assets.html` - Environmental system testing
- `test-simple.html` - Basic functionality validation
- `test-language-classes.html` - Language learning components
- `test-npc-conversations.html` - NPC dialogue system
- `test-ui-components.html` - UI component testing

### Running Tests
Open any test file in your browser after starting the local server.

## 🔧 Development

### Adding New NPCs
1. Add character data to `data/newAssets.js`
2. Create dialogue templates in `data/npcConversationTemplates.js`
3. Update character map in `data/characters.js`

### Adding Environmental Elements
1. Define new elements in `data/environmentalAssets.js`
2. Configure placement positions
3. Set collision properties as needed

### Adding Building Scenarios
1. Create scenarios in `data/buildingScenarios.js`
2. Define building types in `data/buildingDefinitions.js`
3. Update interaction zones

## 🌟 Features Implemented

### ✅ Completed Features
- [x] Core 2D game engine with collision detection
- [x] Character movement and camera following
- [x] NPC interaction system with role-based dialogue
- [x] Building interaction scenarios
- [x] Voice input processing with Web Speech API
- [x] Conversation management and dialogue flow
- [x] Learning progress feedback system
- [x] Environmental assets integration
- [x] Accessibility features (text-only mode, subtitles)
- [x] Menu system and game navigation

### 🚧 In Progress
- [ ] Responsive design for mobile devices
- [ ] Audio system integration
- [ ] Data persistence and progress tracking
- [ ] Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built using HTML5 Canvas and vanilla JavaScript
- Voice processing powered by Web Speech API
- Sprites generated using AI tools
- Inspired by classic Pokémon-style RPG games

## 📞 Support

If you encounter any issues or have questions:
1. Check the test files for debugging information
2. Open browser developer console for error messages
3. Create an issue on GitHub with detailed information

---

**Happy Language Learning! 🎓🎮**
