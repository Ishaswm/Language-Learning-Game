/**
 * DialogueUI class handles conversation display and voice input interface
 * Provides speech bubbles, chat panels, scenario prompts, and microphone controls
 */
class DialogueUI {
  constructor(container) {
    this.container = container || document.body
    this.dialogueContainer = null
    this.conversationPanel = null
    this.scenarioPrompt = null
    this.voiceInputInterface = null
    this.microphoneButton = null
    this.visualFeedback = null
    this.textInputFallback = null
    
    this.isVisible = false
    this.currentMode = 'hidden' // 'hidden', 'scenario', 'conversation', 'voice_input'
    
    // Callbacks
    this.onVoiceStartCallback = null
    this.onVoiceStopCallback = null
    this.onTextSubmitCallback = null
    this.onCloseCallback = null
    
    // Initialize UI components
    this.initializeUI()
  }

  /**
   * Initialize all UI components
   */
  initializeUI() {
    this.createDialogueContainer()
    this.createScenarioPrompt()
    this.createConversationPanel()
    this.createVoiceInputInterface()
    this.createTextInputFallback()
    this.setupEventListeners()
  }

  /**
   * Create main dialogue container
   */
  createDialogueContainer() {
    this.dialogueContainer = document.createElement('div')
    this.dialogueContainer.className = 'dialogue-ui-container'
    this.dialogueContainer.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.8));
      border-top: 4px solid #333;
      padding: 20px;
      font-family: 'Press Start 2P', cursive;
      color: white;
      display: none;
      z-index: 1000;
      max-height: 60vh;
      overflow-y: auto;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.5);
    `
    
    this.container.appendChild(this.dialogueContainer)
  }

  /**
   * Create scenario prompt display
   */
  createScenarioPrompt() {
    this.scenarioPrompt = document.createElement('div')
    this.scenarioPrompt.className = 'scenario-prompt'
    this.scenarioPrompt.style.cssText = `
      background: rgba(255,255,255,0.1);
      border: 2px solid #4CAF50;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      display: none;
    `

    const promptTitle = document.createElement('h3')
    promptTitle.className = 'prompt-title'
    promptTitle.style.cssText = `
      color: #4CAF50;
      font-size: 14px;
      margin: 0 0 12px 0;
      text-transform: uppercase;
    `

    const promptText = document.createElement('p')
    promptText.className = 'prompt-text'
    promptText.style.cssText = `
      font-size: 12px;
      line-height: 1.6;
      margin: 0;
      color: #E0E0E0;
    `

    const promptContext = document.createElement('div')
    promptContext.className = 'prompt-context'
    promptContext.style.cssText = `
      margin-top: 12px;
      padding: 8px;
      background: rgba(0,0,0,0.3);
      border-radius: 4px;
      font-size: 10px;
      color: #B0B0B0;
      display: none;
    `

    this.scenarioPrompt.appendChild(promptTitle)
    this.scenarioPrompt.appendChild(promptText)
    this.scenarioPrompt.appendChild(promptContext)
    this.dialogueContainer.appendChild(this.scenarioPrompt)
  }

  /**
   * Create conversation panel for chat-style display
   */
  createConversationPanel() {
    this.conversationPanel = document.createElement('div')
    this.conversationPanel.className = 'conversation-panel'
    this.conversationPanel.style.cssText = `
      background: rgba(255,255,255,0.05);
      border: 2px solid #666;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      max-height: 300px;
      overflow-y: auto;
      display: none;
    `

    const messagesContainer = document.createElement('div')
    messagesContainer.className = 'messages-container'
    messagesContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 12px;
    `

    this.conversationPanel.appendChild(messagesContainer)
    this.dialogueContainer.appendChild(this.conversationPanel)
  }

  /**
   * Create voice input interface
   */
  createVoiceInputInterface() {
    this.voiceInputInterface = document.createElement('div')
    this.voiceInputInterface.className = 'voice-input-interface'
    this.voiceInputInterface.style.cssText = `
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: rgba(255,255,255,0.1);
      border: 2px solid #2196F3;
      border-radius: 8px;
      margin-bottom: 16px;
    `

    // Microphone button
    this.microphoneButton = document.createElement('button')
    this.microphoneButton.className = 'microphone-button'
    this.microphoneButton.innerHTML = '🎤'
    this.microphoneButton.style.cssText = `
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid #2196F3;
      background: linear-gradient(135deg, #2196F3, #1976D2);
      color: white;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(33,150,243,0.3);
    `

    // Voice status display
    this.visualFeedback = document.createElement('div')
    this.visualFeedback.className = 'voice-feedback'
    this.visualFeedback.style.cssText = `
      flex: 1;
      padding: 12px;
      background: rgba(0,0,0,0.3);
      border-radius: 4px;
      font-size: 12px;
      color: #E0E0E0;
      min-height: 40px;
      display: flex;
      align-items: center;
    `
    this.visualFeedback.textContent = 'Click the microphone to start speaking'

    // Close button
    const closeButton = document.createElement('button')
    closeButton.className = 'close-button'
    closeButton.innerHTML = '✕'
    closeButton.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #666;
      background: rgba(255,255,255,0.1);
      color: #999;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    `

    this.voiceInputInterface.appendChild(this.microphoneButton)
    this.voiceInputInterface.appendChild(this.visualFeedback)
    this.voiceInputInterface.appendChild(closeButton)
    this.dialogueContainer.appendChild(this.voiceInputInterface)

    // Add hover effects
    this.microphoneButton.addEventListener('mouseenter', () => {
      this.microphoneButton.style.transform = 'scale(1.1)'
      this.microphoneButton.style.boxShadow = '0 6px 16px rgba(33,150,243,0.4)'
    })

    this.microphoneButton.addEventListener('mouseleave', () => {
      this.microphoneButton.style.transform = 'scale(1)'
      this.microphoneButton.style.boxShadow = '0 4px 12px rgba(33,150,243,0.3)'
    })

    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.background = 'rgba(255,255,255,0.2)'
      closeButton.style.color = '#FFF'
    })

    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.background = 'rgba(255,255,255,0.1)'
      closeButton.style.color = '#999'
    })

    // Event listeners
    closeButton.addEventListener('click', () => {
      this.hideDialogue()
    })
  }

  /**
   * Create text input fallback
   */
  createTextInputFallback() {
    this.textInputFallback = document.createElement('div')
    this.textInputFallback.className = 'text-input-fallback'
    this.textInputFallback.style.cssText = `
      display: flex;
      gap: 12px;
      padding: 16px;
      background: rgba(255,255,255,0.1);
      border: 2px solid #FF9800;
      border-radius: 8px;
      margin-bottom: 16px;
    `

    const textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.placeholder = 'Type your response here...'
    textInput.className = 'text-input'
    textInput.style.cssText = `
      flex: 1;
      padding: 12px;
      border: 2px solid #666;
      border-radius: 4px;
      background: rgba(0,0,0,0.5);
      color: white;
      font-family: 'Press Start 2P', cursive;
      font-size: 12px;
    `

    const submitButton = document.createElement('button')
    submitButton.textContent = 'Send'
    submitButton.className = 'text-submit-button'
    submitButton.style.cssText = `
      padding: 12px 24px;
      background: linear-gradient(135deg, #4CAF50, #388E3C);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      transition: all 0.3s ease;
    `

    this.textInputFallback.appendChild(textInput)
    this.textInputFallback.appendChild(submitButton)
    this.dialogueContainer.appendChild(this.textInputFallback)

    // Handle text submission
    const handleSubmit = () => {
      const text = textInput.value.trim()
      if (text && this.onTextSubmitCallback) {
        this.onTextSubmitCallback(text)
        textInput.value = ''
      }
    }

    submitButton.addEventListener('click', handleSubmit)
    textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSubmit()
      }
    })

    // Hover effects
    submitButton.addEventListener('mouseenter', () => {
      submitButton.style.transform = 'translateY(-2px)'
      submitButton.style.boxShadow = '0 4px 12px rgba(76,175,80,0.3)'
    })

    submitButton.addEventListener('mouseleave', () => {
      submitButton.style.transform = 'translateY(0)'
      submitButton.style.boxShadow = 'none'
    })
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Microphone button click
    this.microphoneButton.addEventListener('click', () => {
      this.toggleVoiceRecording()
    })

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (this.isVisible) {
        switch (e.key) {
          case 'Escape':
            this.hideDialogue()
            break
          case ' ':
            if (e.target.tagName !== 'INPUT') {
              e.preventDefault()
              this.toggleVoiceRecording()
            }
            break
        }
      }
    })
  }

  /**
   * Show scenario prompt with clear visual hierarchy
   * @param {string} title - Scenario title
   * @param {string} text - Scenario description/prompt
   * @param {Object} context - Additional context information
   * @param {string} audioUrl - Optional audio URL for prompt
   */
  showScenarioPrompt(title, text, context = null, audioUrl = null) {
    this.currentMode = 'scenario'
    this.isVisible = true

    // Update scenario prompt content
    const promptTitle = this.scenarioPrompt.querySelector('.prompt-title')
    const promptText = this.scenarioPrompt.querySelector('.prompt-text')
    const promptContext = this.scenarioPrompt.querySelector('.prompt-context')

    promptTitle.textContent = title
    promptText.textContent = text

    if (context) {
      promptContext.style.display = 'block'
      promptContext.innerHTML = `
        <strong>Setting:</strong> ${context.setting || 'N/A'}<br>
        <strong>Your Role:</strong> ${context.role || 'N/A'}<br>
        <strong>Goal:</strong> ${context.goal || 'N/A'}
      `
    } else {
      promptContext.style.display = 'none'
    }

    // Show components
    this.dialogueContainer.style.display = 'block'
    this.scenarioPrompt.style.display = 'block'
    this.conversationPanel.style.display = 'none'
    this.voiceInputInterface.style.display = 'flex'
    this.textInputFallback.style.display = 'flex'

    // Play audio if provided
    if (audioUrl) {
      this.playAudio(audioUrl)
    }

    // Animate in
    this.animateIn()
  }

  /**
   * Display conversation in chat-style format
   * @param {Array} messages - Array of message objects
   */
  displayConversation(messages) {
    this.currentMode = 'conversation'
    this.isVisible = true

    const messagesContainer = this.conversationPanel.querySelector('.messages-container')
    messagesContainer.innerHTML = '' // Clear existing messages

    messages.forEach(message => {
      const messageElement = this.createMessageElement(message)
      messagesContainer.appendChild(messageElement)
    })

    // Show conversation panel
    this.dialogueContainer.style.display = 'block'
    this.scenarioPrompt.style.display = 'none'
    this.conversationPanel.style.display = 'block'
    this.voiceInputInterface.style.display = 'flex'
    this.textInputFallback.style.display = 'flex'

    // Scroll to bottom
    this.conversationPanel.scrollTop = this.conversationPanel.scrollHeight

    // Animate in
    this.animateIn()
  }

  /**
   * Create message element for conversation display
   * @param {Object} message - Message object with speaker, content, timestamp
   * @returns {HTMLElement} Message element
   */
  createMessageElement(message) {
    const messageDiv = document.createElement('div')
    messageDiv.className = `message message-${message.speaker}`
    
    const isPlayer = message.speaker === 'player'
    const isSystem = message.speaker === 'system'
    
    messageDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: ${isPlayer ? 'flex-end' : 'flex-start'};
      margin-bottom: 12px;
    `

    // Message bubble
    const bubble = document.createElement('div')
    bubble.className = 'message-bubble'
    bubble.style.cssText = `
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 12px;
      line-height: 1.4;
      word-wrap: break-word;
      position: relative;
      ${isPlayer ? `
        background: linear-gradient(135deg, #2196F3, #1976D2);
        color: white;
        border-bottom-right-radius: 4px;
      ` : isSystem ? `
        background: rgba(255,193,7,0.2);
        color: #FFC107;
        border: 1px solid #FFC107;
        text-align: center;
        font-style: italic;
      ` : `
        background: rgba(255,255,255,0.1);
        color: #E0E0E0;
        border: 1px solid #666;
        border-bottom-left-radius: 4px;
      `}
    `

    // Speaker label
    if (!isSystem) {
      const speakerLabel = document.createElement('div')
      speakerLabel.className = 'speaker-label'
      speakerLabel.textContent = isPlayer ? 'You' : 'NPC'
      speakerLabel.style.cssText = `
        font-size: 10px;
        color: #999;
        margin-bottom: 4px;
        ${isPlayer ? 'text-align: right;' : 'text-align: left;'}
      `
      messageDiv.appendChild(speakerLabel)
    }

    bubble.textContent = message.content
    messageDiv.appendChild(bubble)

    // Timestamp
    if (message.timestamp) {
      const timestamp = document.createElement('div')
      timestamp.className = 'message-timestamp'
      timestamp.textContent = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
      timestamp.style.cssText = `
        font-size: 8px;
        color: #666;
        margin-top: 4px;
        ${isPlayer ? 'text-align: right;' : 'text-align: left;'}
      `
      messageDiv.appendChild(timestamp)
    }

    return messageDiv
  }

  /**
   * Show voice input interface with microphone button
   */
  showVoiceInput() {
    this.currentMode = 'voice_input'
    this.isVisible = true

    this.dialogueContainer.style.display = 'block'
    this.scenarioPrompt.style.display = 'none'
    this.conversationPanel.style.display = 'none'
    this.voiceInputInterface.style.display = 'flex'
    this.textInputFallback.style.display = 'flex'

    // Focus on voice input
    this.visualFeedback.textContent = 'Ready to listen. Click the microphone or press spacebar to start.'

    this.animateIn()
  }

  /**
   * Update visual feedback for recording status
   * @param {string} status - Recording status ('recording', 'stopped', 'error', 'processing')
   * @param {string} transcription - Current transcription text
   */
  updateVisualFeedback(status, transcription = '') {
    switch (status) {
      case 'recording':
        this.microphoneButton.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)'
        this.microphoneButton.innerHTML = '🔴'
        this.visualFeedback.style.background = 'rgba(244,67,54,0.2)'
        this.visualFeedback.style.color = '#f44336'
        this.visualFeedback.innerHTML = '🎤 <strong>Recording...</strong> Speak now!'
        break
      
      case 'processing':
        this.microphoneButton.style.background = 'linear-gradient(135deg, #FF9800, #F57C00)'
        this.microphoneButton.innerHTML = '⏳'
        this.visualFeedback.style.background = 'rgba(255,152,0,0.2)'
        this.visualFeedback.style.color = '#FF9800'
        this.visualFeedback.innerHTML = '⏳ <strong>Processing...</strong> Please wait.'
        break
      
      case 'stopped':
        this.microphoneButton.style.background = 'linear-gradient(135deg, #4CAF50, #388E3C)'
        this.microphoneButton.innerHTML = '✓'
        this.visualFeedback.style.background = 'rgba(76,175,80,0.2)'
        this.visualFeedback.style.color = '#4CAF50'
        this.visualFeedback.innerHTML = `✓ <strong>Complete!</strong> ${transcription ? `"${transcription}"` : ''}`
        
        // Reset after delay
        setTimeout(() => {
          this.resetVoiceInterface()
        }, 3000)
        break
      
      case 'error':
        this.microphoneButton.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)'
        this.microphoneButton.innerHTML = '⚠'
        this.visualFeedback.style.background = 'rgba(244,67,54,0.2)'
        this.visualFeedback.style.color = '#f44336'
        this.visualFeedback.innerHTML = '⚠ <strong>Error!</strong> Please try again.'
        
        // Reset after delay
        setTimeout(() => {
          this.resetVoiceInterface()
        }, 3000)
        break
      
      case 'transcribing':
        this.visualFeedback.innerHTML = `🎯 <strong>Transcribing:</strong> "${transcription}"`
        break
    }
  }

  /**
   * Reset voice interface to default state
   */
  resetVoiceInterface() {
    this.microphoneButton.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)'
    this.microphoneButton.innerHTML = '🎤'
    this.visualFeedback.style.background = 'rgba(0,0,0,0.3)'
    this.visualFeedback.style.color = '#E0E0E0'
    this.visualFeedback.textContent = 'Click the microphone to start speaking'
  }

  /**
   * Toggle voice recording
   */
  toggleVoiceRecording() {
    const isRecording = this.microphoneButton.innerHTML === '🔴'
    
    if (isRecording) {
      // Stop recording
      if (this.onVoiceStopCallback) {
        this.onVoiceStopCallback()
      }
    } else {
      // Start recording
      if (this.onVoiceStartCallback) {
        this.onVoiceStartCallback()
      }
    }
  }

  /**
   * Hide dialogue interface
   */
  hideDialogue() {
    this.isVisible = false
    this.currentMode = 'hidden'
    
    // Animate out
    this.dialogueContainer.style.transform = 'translateY(100%)'
    this.dialogueContainer.style.opacity = '0'
    
    setTimeout(() => {
      this.dialogueContainer.style.display = 'none'
      this.resetVoiceInterface()
    }, 300)

    if (this.onCloseCallback) {
      this.onCloseCallback()
    }
  }

  /**
   * Animate dialogue in
   */
  animateIn() {
    this.dialogueContainer.style.transform = 'translateY(100%)'
    this.dialogueContainer.style.opacity = '0'
    
    // Force reflow
    this.dialogueContainer.offsetHeight
    
    this.dialogueContainer.style.transition = 'all 0.3s ease-out'
    this.dialogueContainer.style.transform = 'translateY(0)'
    this.dialogueContainer.style.opacity = '1'
  }

  /**
   * Play audio for scenario prompts
   * @param {string} audioUrl - URL of audio file
   */
  playAudio(audioUrl) {
    try {
      const audio = new Audio(audioUrl)
      audio.play().catch(error => {
        console.warn('Could not play audio:', error)
      })
    } catch (error) {
      console.warn('Audio playback not supported:', error)
    }
  }

  /**
   * Add new message to conversation
   * @param {Object} message - Message object
   */
  addMessage(message) {
    if (this.currentMode === 'conversation') {
      const messagesContainer = this.conversationPanel.querySelector('.messages-container')
      const messageElement = this.createMessageElement(message)
      messagesContainer.appendChild(messageElement)
      
      // Scroll to bottom
      this.conversationPanel.scrollTop = this.conversationPanel.scrollHeight
    }
  }

  /**
   * Set callback for voice recording start
   * @param {function} callback - Callback function
   */
  onVoiceStart(callback) {
    this.onVoiceStartCallback = callback
  }

  /**
   * Set callback for voice recording stop
   * @param {function} callback - Callback function
   */
  onVoiceStop(callback) {
    this.onVoiceStopCallback = callback
  }

  /**
   * Set callback for text input submission
   * @param {function} callback - Callback function
   */
  onTextSubmit(callback) {
    this.onTextSubmitCallback = callback
  }

  /**
   * Set callback for dialogue close
   * @param {function} callback - Callback function
   */
  onClose(callback) {
    this.onCloseCallback = callback
  }

  /**
   * Check if dialogue is currently visible
   * @returns {boolean} True if dialogue is visible
   */
  isDialogueVisible() {
    return this.isVisible
  }

  /**
   * Get current dialogue mode
   * @returns {string} Current mode
   */
  getCurrentMode() {
    return this.currentMode
  }

  /**
   * Show text input fallback only
   */
  showTextInputOnly() {
    this.voiceInputInterface.style.display = 'none'
    this.textInputFallback.style.display = 'flex'
  }

  /**
   * Show voice input only
   */
  showVoiceInputOnly() {
    this.voiceInputInterface.style.display = 'flex'
    this.textInputFallback.style.display = 'none'
  }

  /**
   * Show both input methods
   */
  showBothInputMethods() {
    this.voiceInputInterface.style.display = 'flex'
    this.textInputFallback.style.display = 'flex'
  }
}