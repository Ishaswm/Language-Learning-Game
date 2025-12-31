/**
 * MenuSystem class handles game navigation and settings
 * Provides main menu, in-game menu, settings panel, and language selection
 */
class MenuSystem {
  constructor(gameEngine, container) {
    this.gameEngine = gameEngine
    this.container = container || document.body
    
    // Menu containers
    this.mainMenuContainer = null
    this.inGameMenuContainer = null
    this.settingsPanel = null
    this.languageSelector = null
    
    // State management
    this.isVisible = false
    this.currentMenu = 'hidden' // 'hidden', 'main', 'ingame', 'settings', 'language'
    this.gameState = 'menu' // 'menu', 'playing', 'paused'
    
    // Settings data
    this.settings = {
      language: 'en-US',
      volume: 0.7,
      sfxVolume: 0.8,
      fontSize: 'medium',
      highContrast: false,
      subtitles: true,
      voiceInput: true,
      difficulty: 'intermediate'
    }
    
    // Callbacks
    this.onStartGameCallback = null
    this.onResumeGameCallback = null
    this.onSettingsChangeCallback = null
    this.onLanguageChangeCallback = null
    
    // Initialize menu system
    this.initializeMenus()
    this.loadSettings()
  }

  /**
   * Initialize all menu components
   */
  initializeMenus() {
    this.createMainMenu()
    this.createInGameMenu()
    this.createSettingsPanel()
    this.createLanguageSelector()
    this.setupEventListeners()
  }

  /**
   * Create main menu
   */
  createMainMenu() {
    this.mainMenuContainer = document.createElement('div')
    this.mainMenuContainer.className = 'main-menu-container'
    this.mainMenuContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Press Start 2P', cursive;
      color: white;
      z-index: 1500;
    `

    // Game title
    const gameTitle = document.createElement('h1')
    gameTitle.textContent = 'Language Learning RPG'
    gameTitle.style.cssText = `
      font-size: 24px;
      color: #4CAF50;
      margin-bottom: 48px;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      animation: glow 2s ease-in-out infinite alternate;
    `

    // Add glow animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes glow {
        from { text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0 0 10px #4CAF50; }
        to { text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0 0 20px #4CAF50, 0 0 30px #4CAF50; }
      }
    `
    document.head.appendChild(style)

    // Menu buttons container
    const menuButtons = document.createElement('div')
    menuButtons.className = 'main-menu-buttons'
    menuButtons.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
    `

    // Create menu buttons
    const buttons = [
      { text: 'Start Game', action: 'start', color: '#4CAF50' },
      { text: 'Select Language', action: 'language', color: '#2196F3' },
      { text: 'Settings', action: 'settings', color: '#FF9800' },
      { text: 'Help', action: 'help', color: '#9C27B0' }
    ]

    buttons.forEach(buttonConfig => {
      const button = this.createMenuButton(buttonConfig.text, buttonConfig.color)
      button.addEventListener('click', () => {
        this.handleMainMenuAction(buttonConfig.action)
      })
      menuButtons.appendChild(button)
    })

    // Version info
    const versionInfo = document.createElement('div')
    versionInfo.textContent = 'v1.0.0 - Learn languages through adventure!'
    versionInfo.style.cssText = `
      position: absolute;
      bottom: 20px;
      font-size: 8px;
      color: #666;
      text-align: center;
    `

    this.mainMenuContainer.appendChild(gameTitle)
    this.mainMenuContainer.appendChild(menuButtons)
    this.mainMenuContainer.appendChild(versionInfo)
    this.container.appendChild(this.mainMenuContainer)
  }

  /**
   * Create in-game menu (pause menu)
   */
  createInGameMenu() {
    this.inGameMenuContainer = document.createElement('div')
    this.inGameMenuContainer.className = 'ingame-menu-container'
    this.inGameMenuContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      align-items: center;
      justify-content: center;
      font-family: 'Press Start 2P', cursive;
      color: white;
      z-index: 1500;
      backdrop-filter: blur(4px);
    `

    const menuPanel = document.createElement('div')
    menuPanel.style.cssText = `
      background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
      border: 3px solid #4CAF50;
      border-radius: 12px;
      padding: 32px;
      min-width: 300px;
      text-align: center;
    `

    const menuTitle = document.createElement('h2')
    menuTitle.textContent = 'Game Menu'
    menuTitle.style.cssText = `
      color: #4CAF50;
      font-size: 18px;
      margin: 0 0 24px 0;
    `

    const menuButtons = document.createElement('div')
    menuButtons.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 12px;
    `

    const inGameButtons = [
      { text: 'Resume', action: 'resume', color: '#4CAF50' },
      { text: 'View Progress', action: 'progress', color: '#2196F3' },
      { text: 'Settings', action: 'settings', color: '#FF9800' },
      { text: 'Help', action: 'help', color: '#9C27B0' },
      { text: 'Main Menu', action: 'mainmenu', color: '#f44336' }
    ]

    inGameButtons.forEach(buttonConfig => {
      const button = this.createMenuButton(buttonConfig.text, buttonConfig.color, 'small')
      button.addEventListener('click', () => {
        this.handleInGameMenuAction(buttonConfig.action)
      })
      menuButtons.appendChild(button)
    })

    menuPanel.appendChild(menuTitle)
    menuPanel.appendChild(menuButtons)
    this.inGameMenuContainer.appendChild(menuPanel)
    this.container.appendChild(this.inGameMenuContainer)
  }

  /**
   * Create settings panel
   */
  createSettingsPanel() {
    this.settingsPanel = document.createElement('div')
    this.settingsPanel.className = 'settings-panel'
    this.settingsPanel.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: none;
      align-items: center;
      justify-content: center;
      font-family: 'Press Start 2P', cursive;
      color: white;
      z-index: 1600;
      backdrop-filter: blur(4px);
    `

    const settingsContainer = document.createElement('div')
    settingsContainer.style.cssText = `
      background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
      border: 3px solid #FF9800;
      border-radius: 12px;
      padding: 32px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    `

    const settingsTitle = document.createElement('h2')
    settingsTitle.textContent = 'Settings'
    settingsTitle.style.cssText = `
      color: #FF9800;
      font-size: 18px;
      margin: 0 0 24px 0;
      text-align: center;
    `

    const settingsContent = document.createElement('div')
    settingsContent.className = 'settings-content'
    settingsContent.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 20px;
    `

    // Create settings sections
    this.createAudioSettings(settingsContent)
    this.createAccessibilitySettings(settingsContent)
    this.createGameplaySettings(settingsContent)

    // Settings buttons
    const settingsButtons = document.createElement('div')
    settingsButtons.style.cssText = `
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
    `

    const saveButton = this.createMenuButton('Save', '#4CAF50', 'small')
    const cancelButton = this.createMenuButton('Cancel', '#666', 'small')

    saveButton.addEventListener('click', () => {
      this.saveSettings()
      this.hideSettings()
    })

    cancelButton.addEventListener('click', () => {
      this.loadSettings()
      this.hideSettings()
    })

    settingsButtons.appendChild(saveButton)
    settingsButtons.appendChild(cancelButton)

    settingsContainer.appendChild(settingsTitle)
    settingsContainer.appendChild(settingsContent)
    settingsContainer.appendChild(settingsButtons)
    this.settingsPanel.appendChild(settingsContainer)
    this.container.appendChild(this.settingsPanel)
  }

  /**
   * Create language selector
   */
  createLanguageSelector() {
    this.languageSelector = document.createElement('div')
    this.languageSelector.className = 'language-selector'
    this.languageSelector.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: none;
      align-items: center;
      justify-content: center;
      font-family: 'Press Start 2P', cursive;
      color: white;
      z-index: 1600;
      backdrop-filter: blur(4px);
    `

    const languageContainer = document.createElement('div')
    languageContainer.style.cssText = `
      background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
      border: 3px solid #2196F3;
      border-radius: 12px;
      padding: 32px;
      max-width: 400px;
      width: 90%;
    `

    const languageTitle = document.createElement('h2')
    languageTitle.textContent = 'Select Language'
    languageTitle.style.cssText = `
      color: #2196F3;
      font-size: 18px;
      margin: 0 0 24px 0;
      text-align: center;
    `

    const languageGrid = document.createElement('div')
    languageGrid.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    `

    const languages = [
      { code: 'en-US', name: 'English', flag: '🇺🇸' },
      { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
      { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
      { code: 'de-DE', name: 'German', flag: '🇩🇪' },
      { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
      { code: 'pt-PT', name: 'Portuguese', flag: '🇵🇹' },
      { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
      { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' }
    ]

    languages.forEach(lang => {
      const langButton = document.createElement('button')
      langButton.innerHTML = `${lang.flag}<br>${lang.name}`
      langButton.style.cssText = `
        padding: 16px 8px;
        background: ${this.settings.language === lang.code ? 
          'linear-gradient(135deg, #2196F3, #1976D2)' : 
          'rgba(255, 255, 255, 0.1)'};
        color: white;
        border: 2px solid ${this.settings.language === lang.code ? '#2196F3' : '#666'};
        border-radius: 8px;
        font-family: 'Press Start 2P', cursive;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        line-height: 1.4;
      `

      langButton.addEventListener('click', () => {
        this.selectLanguage(lang.code)
        this.updateLanguageButtons(languageGrid, lang.code)
      })

      langButton.addEventListener('mouseenter', () => {
        if (this.settings.language !== lang.code) {
          langButton.style.background = 'rgba(255, 255, 255, 0.2)'
          langButton.style.borderColor = '#999'
        }
      })

      langButton.addEventListener('mouseleave', () => {
        if (this.settings.language !== lang.code) {
          langButton.style.background = 'rgba(255, 255, 255, 0.1)'
          langButton.style.borderColor = '#666'
        }
      })

      languageGrid.appendChild(langButton)
    })

    const backButton = this.createMenuButton('Back', '#666', 'small')
    backButton.addEventListener('click', () => {
      this.hideLanguageSelector()
    })

    languageContainer.appendChild(languageTitle)
    languageContainer.appendChild(languageGrid)
    languageContainer.appendChild(backButton)
    this.languageSelector.appendChild(languageContainer)
    this.container.appendChild(this.languageSelector)
  }

  /**
   * Create audio settings section
   */
  createAudioSettings(container) {
    const section = this.createSettingsSection('🔊 Audio', container)
    
    this.createSliderSetting(section, 'Master Volume', 'volume', 0, 1, 0.1)
    this.createSliderSetting(section, 'Sound Effects', 'sfxVolume', 0, 1, 0.1)
  }

  /**
   * Create accessibility settings section
   */
  createAccessibilitySettings(container) {
    const section = this.createSettingsSection('♿ Accessibility', container)
    
    this.createSelectSetting(section, 'Font Size', 'fontSize', [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' }
    ])
    
    this.createToggleSetting(section, 'High Contrast', 'highContrast')
    this.createToggleSetting(section, 'Subtitles', 'subtitles')
    this.createToggleSetting(section, 'Voice Input', 'voiceInput')
  }

  /**
   * Create gameplay settings section
   */
  createGameplaySettings(container) {
    const section = this.createSettingsSection('🎮 Gameplay', container)
    
    this.createSelectSetting(section, 'Difficulty', 'difficulty', [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ])
  }

  /**
   * Create settings section
   */
  createSettingsSection(title, container) {
    const section = document.createElement('div')
    section.style.cssText = `
      padding: 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `

    const sectionTitle = document.createElement('h3')
    sectionTitle.textContent = title
    sectionTitle.style.cssText = `
      font-size: 12px;
      margin: 0 0 16px 0;
      color: #E0E0E0;
    `

    section.appendChild(sectionTitle)
    container.appendChild(section)
    return section
  }

  /**
   * Create slider setting
   */
  createSliderSetting(container, label, key, min, max, step) {
    const setting = document.createElement('div')
    setting.style.cssText = `
      margin-bottom: 16px;
    `

    const labelElement = document.createElement('label')
    labelElement.textContent = label
    labelElement.style.cssText = `
      display: block;
      font-size: 10px;
      margin-bottom: 8px;
      color: #B0B0B0;
    `

    const sliderContainer = document.createElement('div')
    sliderContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
    `

    const slider = document.createElement('input')
    slider.type = 'range'
    slider.min = min
    slider.max = max
    slider.step = step
    slider.value = this.settings[key]
    slider.style.cssText = `
      flex: 1;
      height: 4px;
      background: #333;
      border-radius: 2px;
      outline: none;
    `

    const valueDisplay = document.createElement('span')
    valueDisplay.textContent = Math.round(this.settings[key] * 100) + '%'
    valueDisplay.style.cssText = `
      font-size: 10px;
      color: #4CAF50;
      min-width: 40px;
    `

    slider.addEventListener('input', (e) => {
      this.settings[key] = parseFloat(e.target.value)
      valueDisplay.textContent = Math.round(this.settings[key] * 100) + '%'
    })

    sliderContainer.appendChild(slider)
    sliderContainer.appendChild(valueDisplay)
    setting.appendChild(labelElement)
    setting.appendChild(sliderContainer)
    container.appendChild(setting)
  }

  /**
   * Create toggle setting
   */
  createToggleSetting(container, label, key) {
    const setting = document.createElement('div')
    setting.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    `

    const labelElement = document.createElement('label')
    labelElement.textContent = label
    labelElement.style.cssText = `
      font-size: 10px;
      color: #B0B0B0;
    `

    const toggle = document.createElement('button')
    toggle.textContent = this.settings[key] ? 'ON' : 'OFF'
    toggle.style.cssText = `
      padding: 4px 12px;
      background: ${this.settings[key] ? '#4CAF50' : '#666'};
      color: white;
      border: none;
      border-radius: 4px;
      font-family: 'Press Start 2P', cursive;
      font-size: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    `

    toggle.addEventListener('click', () => {
      this.settings[key] = !this.settings[key]
      toggle.textContent = this.settings[key] ? 'ON' : 'OFF'
      toggle.style.background = this.settings[key] ? '#4CAF50' : '#666'
    })

    setting.appendChild(labelElement)
    setting.appendChild(toggle)
    container.appendChild(setting)
  }

  /**
   * Create select setting
   */
  createSelectSetting(container, label, key, options) {
    const setting = document.createElement('div')
    setting.style.cssText = `
      margin-bottom: 16px;
    `

    const labelElement = document.createElement('label')
    labelElement.textContent = label
    labelElement.style.cssText = `
      display: block;
      font-size: 10px;
      margin-bottom: 8px;
      color: #B0B0B0;
    `

    const select = document.createElement('select')
    select.value = this.settings[key]
    select.style.cssText = `
      width: 100%;
      padding: 8px;
      background: #333;
      color: white;
      border: 1px solid #666;
      border-radius: 4px;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
    `

    options.forEach(option => {
      const optionElement = document.createElement('option')
      optionElement.value = option.value
      optionElement.textContent = option.label
      select.appendChild(optionElement)
    })

    select.addEventListener('change', (e) => {
      this.settings[key] = e.target.value
    })

    setting.appendChild(labelElement)
    setting.appendChild(select)
    container.appendChild(setting)
  }

  /**
   * Create menu button
   */
  createMenuButton(text, color, size = 'normal') {
    const button = document.createElement('button')
    button.textContent = text
    button.style.cssText = `
      padding: ${size === 'small' ? '12px 24px' : '16px 32px'};
      background: linear-gradient(135deg, ${color}, ${color}CC);
      color: white;
      border: 2px solid ${color};
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      font-size: ${size === 'small' ? '10px' : '12px'};
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: ${size === 'small' ? '120px' : '200px'};
      text-align: center;
    `

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)'
      button.style.boxShadow = `0 4px 16px ${color}40`
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)'
      button.style.boxShadow = 'none'
    })

    return button
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.currentMenu === 'settings' || this.currentMenu === 'language') {
          this.hideCurrentMenu()
        } else if (this.gameState === 'playing') {
          this.showInGameMenu()
        }
      }
    })
  }

  /**
   * Handle main menu actions
   */
  handleMainMenuAction(action) {
    switch (action) {
      case 'start':
        this.startGame()
        break
      case 'language':
        this.showLanguageSelector()
        break
      case 'settings':
        this.showSettings()
        break
      case 'help':
        this.showHelp()
        break
    }
  }

  /**
   * Handle in-game menu actions
   */
  handleInGameMenuAction(action) {
    switch (action) {
      case 'resume':
        this.resumeGame()
        break
      case 'progress':
        this.showProgress()
        break
      case 'settings':
        this.showSettings()
        break
      case 'help':
        this.showHelp()
        break
      case 'mainmenu':
        this.returnToMainMenu()
        break
    }
  }

  /**
   * Show main menu
   */
  showMainMenu() {
    this.currentMenu = 'main'
    this.gameState = 'menu'
    this.isVisible = true
    this.mainMenuContainer.style.display = 'flex'
    this.hideOtherMenus(['main'])
  }

  /**
   * Show in-game menu
   */
  showInGameMenu() {
    this.currentMenu = 'ingame'
    this.gameState = 'paused'
    this.isVisible = true
    this.inGameMenuContainer.style.display = 'flex'
    this.hideOtherMenus(['ingame'])
  }

  /**
   * Show settings panel
   */
  showSettings() {
    this.currentMenu = 'settings'
    this.isVisible = true
    this.settingsPanel.style.display = 'flex'
  }

  /**
   * Show language selector
   */
  showLanguageSelector() {
    this.currentMenu = 'language'
    this.isVisible = true
    this.languageSelector.style.display = 'flex'
  }

  /**
   * Hide settings panel
   */
  hideSettings() {
    this.settingsPanel.style.display = 'none'
    this.currentMenu = this.gameState === 'menu' ? 'main' : 'ingame'
  }

  /**
   * Hide language selector
   */
  hideLanguageSelector() {
    this.languageSelector.style.display = 'none'
    this.currentMenu = 'main'
  }

  /**
   * Hide current menu
   */
  hideCurrentMenu() {
    switch (this.currentMenu) {
      case 'settings':
        this.hideSettings()
        break
      case 'language':
        this.hideLanguageSelector()
        break
      case 'ingame':
        this.resumeGame()
        break
    }
  }

  /**
   * Hide other menus except specified ones
   */
  hideOtherMenus(except = []) {
    if (!except.includes('main')) {
      this.mainMenuContainer.style.display = 'none'
    }
    if (!except.includes('ingame')) {
      this.inGameMenuContainer.style.display = 'none'
    }
    if (!except.includes('settings')) {
      this.settingsPanel.style.display = 'none'
    }
    if (!except.includes('language')) {
      this.languageSelector.style.display = 'none'
    }
  }

  /**
   * Start game
   */
  startGame() {
    this.gameState = 'playing'
    this.currentMenu = 'hidden'
    this.isVisible = false
    this.hideOtherMenus()
    
    if (this.onStartGameCallback) {
      this.onStartGameCallback()
    }
  }

  /**
   * Resume game
   */
  resumeGame() {
    this.gameState = 'playing'
    this.currentMenu = 'hidden'
    this.isVisible = false
    this.hideOtherMenus()
    
    if (this.onResumeGameCallback) {
      this.onResumeGameCallback()
    }
  }

  /**
   * Return to main menu
   */
  returnToMainMenu() {
    this.showMainMenu()
  }

  /**
   * Show progress (placeholder)
   */
  showProgress() {
    // This will be integrated with FeedbackModal
    console.log('Show progress dashboard')
  }

  /**
   * Show help (placeholder)
   */
  showHelp() {
    alert('Help: Use WASD or arrow keys to move. Press SPACE to interact with NPCs and buildings. Press ESC to open the menu.')
  }

  /**
   * Select language
   */
  selectLanguage(languageCode) {
    this.settings.language = languageCode
    
    if (this.onLanguageChangeCallback) {
      this.onLanguageChangeCallback(languageCode)
    }
  }

  /**
   * Update language buttons appearance
   */
  updateLanguageButtons(container, selectedLanguage) {
    const buttons = container.querySelectorAll('button')
    buttons.forEach((button, index) => {
      const languages = ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-PT', 'ja-JP', 'ko-KR']
      const isSelected = languages[index] === selectedLanguage
      
      button.style.background = isSelected ? 
        'linear-gradient(135deg, #2196F3, #1976D2)' : 
        'rgba(255, 255, 255, 0.1)'
      button.style.borderColor = isSelected ? '#2196F3' : '#666'
    })
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem('languageLearningRPG_settings', JSON.stringify(this.settings))
      
      if (this.onSettingsChangeCallback) {
        this.onSettingsChangeCallback(this.settings)
      }
    } catch (error) {
      console.warn('Could not save settings:', error)
    }
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const savedSettings = localStorage.getItem('languageLearningRPG_settings')
      if (savedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(savedSettings) }
      }
    } catch (error) {
      console.warn('Could not load settings:', error)
    }
  }

  /**
   * Get current settings
   */
  getSettings() {
    return { ...this.settings }
  }

  /**
   * Set callback for game start
   */
  onStartGame(callback) {
    this.onStartGameCallback = callback
  }

  /**
   * Set callback for game resume
   */
  onResumeGame(callback) {
    this.onResumeGameCallback = callback
  }

  /**
   * Set callback for settings change
   */
  onSettingsChange(callback) {
    this.onSettingsChangeCallback = callback
  }

  /**
   * Set callback for language change
   */
  onLanguageChange(callback) {
    this.onLanguageChangeCallback = callback
  }

  /**
   * Check if menu is currently visible
   */
  isMenuVisible() {
    return this.isVisible
  }

  /**
   * Get current menu state
   */
  getCurrentMenu() {
    return this.currentMenu
  }

  /**
   * Get current game state
   */
  getGameState() {
    return this.gameState
  }
}