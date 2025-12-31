/**
 * VoiceProcessor class handles Web Speech API integration for language learning
 * Provides voice recording, processing, transcription, and fallback to text input
 */
class VoiceProcessor {
  constructor() {
    this.recognition = null
    this.isRecording = false
    this.isSupported = false
    this.transcription = ''
    this.onTranscriptionCallback = null
    this.onErrorCallback = null
    this.onStatusChangeCallback = null
    
    // Initialize Web Speech API
    this.initializeSpeechRecognition()
  }

  /**
   * Initialize Web Speech API with browser compatibility checks
   */
  initializeSpeechRecognition() {
    // Check for Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.isSupported = true
      
      // Configure speech recognition
      this.recognition.continuous = false
      this.recognition.interimResults = true
      this.recognition.lang = 'en-US' // Default language, can be changed
      
      // Set up event listeners
      this.setupEventListeners()
    } else {
      console.warn('Web Speech API not supported in this browser')
      this.isSupported = false
    }
  }

  /**
   * Set up event listeners for speech recognition
   */
  setupEventListeners() {
    if (!this.recognition) return

    this.recognition.onstart = () => {
      this.isRecording = true
      this.notifyStatusChange('recording')
    }

    this.recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      // Update transcription
      this.transcription = finalTranscript || interimTranscript
      
      // Notify callback with transcription
      if (this.onTranscriptionCallback) {
        this.onTranscriptionCallback(this.transcription, !event.results[event.results.length - 1].isFinal)
      }
    }

    this.recognition.onend = () => {
      this.isRecording = false
      this.notifyStatusChange('stopped')
    }

    this.recognition.onerror = (event) => {
      this.isRecording = false
      this.notifyStatusChange('error')
      
      if (this.onErrorCallback) {
        this.onErrorCallback(event.error)
      }
    }
  }

  /**
   * Start voice recording
   * @returns {boolean} True if recording started successfully
   */
  startRecording() {
    if (!this.isSupported) {
      console.warn('Speech recognition not supported')
      return false
    }

    if (this.isRecording) {
      console.warn('Already recording')
      return false
    }

    try {
      this.transcription = ''
      this.recognition.start()
      return true
    } catch (error) {
      console.error('Failed to start recording:', error)
      if (this.onErrorCallback) {
        this.onErrorCallback(error.message)
      }
      return false
    }
  }

  /**
   * Stop voice recording
   */
  stopRecording() {
    if (!this.isRecording || !this.recognition) return

    try {
      this.recognition.stop()
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }

  /**
   * Get current transcription
   * @returns {string} Current transcription text
   */
  getTranscription() {
    return this.transcription
  }

  /**
   * Set language for speech recognition
   * @param {string} language - Language code (e.g., 'en-US', 'es-ES', 'fr-FR')
   */
  setLanguage(language) {
    if (this.recognition) {
      this.recognition.lang = language
    }
  }

  /**
   * Check if voice input is supported
   * @returns {boolean} True if Web Speech API is supported
   */
  isVoiceSupported() {
    return this.isSupported
  }

  /**
   * Check if currently recording
   * @returns {boolean} True if recording is active
   */
  isCurrentlyRecording() {
    return this.isRecording
  }

  /**
   * Set callback for transcription updates
   * @param {function} callback - Function to call with transcription updates
   */
  onTranscription(callback) {
    this.onTranscriptionCallback = callback
  }

  /**
   * Set callback for error handling
   * @param {function} callback - Function to call when errors occur
   */
  onError(callback) {
    this.onErrorCallback = callback
  }

  /**
   * Set callback for status changes
   * @param {function} callback - Function to call when recording status changes
   */
  onStatusChange(callback) {
    this.onStatusChangeCallback = callback
  }

  /**
   * Notify status change to callback
   * @param {string} status - New status ('recording', 'stopped', 'error')
   */
  notifyStatusChange(status) {
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(status)
    }
  }

  /**
   * Create fallback text input element
   * @param {HTMLElement} container - Container element for text input
   * @param {function} onSubmit - Callback for text submission
   * @returns {HTMLElement} Text input element
   */
  createTextInputFallback(container, onSubmit) {
    const inputContainer = document.createElement('div')
    inputContainer.className = 'text-input-fallback'
    inputContainer.style.cssText = `
      display: flex;
      gap: 8px;
      padding: 12px;
      background: white;
      border: 2px solid #333;
      border-radius: 4px;
      margin: 8px 0;
    `

    const textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.placeholder = 'Type your response here...'
    textInput.style.cssText = `
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 2px;
      font-family: 'Press Start 2P', cursive;
      font-size: 12px;
    `

    const submitButton = document.createElement('button')
    submitButton.textContent = 'Send'
    submitButton.style.cssText = `
      padding: 8px 16px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
    `

    // Handle submission
    const handleSubmit = () => {
      const text = textInput.value.trim()
      if (text && onSubmit) {
        onSubmit(text)
        textInput.value = ''
      }
    }

    submitButton.addEventListener('click', handleSubmit)
    textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSubmit()
      }
    })

    inputContainer.appendChild(textInput)
    inputContainer.appendChild(submitButton)
    container.appendChild(inputContainer)

    return inputContainer
  }

  /**
   * Create visual feedback element for recording status
   * @param {HTMLElement} container - Container element for visual feedback
   * @returns {HTMLElement} Visual feedback element
   */
  createVisualFeedback(container) {
    const feedbackElement = document.createElement('div')
    feedbackElement.className = 'voice-feedback'
    feedbackElement.style.cssText = `
      display: none;
      padding: 8px;
      text-align: center;
      background: #f0f0f0;
      border: 2px solid #333;
      border-radius: 4px;
      margin: 8px 0;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
    `

    container.appendChild(feedbackElement)

    // Set up status change listener to update visual feedback
    this.onStatusChange((status) => {
      switch (status) {
        case 'recording':
          feedbackElement.style.display = 'block'
          feedbackElement.style.background = '#ffebee'
          feedbackElement.style.color = '#c62828'
          feedbackElement.textContent = '🎤 Recording... Speak now!'
          break
        case 'stopped':
          feedbackElement.style.display = 'block'
          feedbackElement.style.background = '#e8f5e8'
          feedbackElement.style.color = '#2e7d32'
          feedbackElement.textContent = '✓ Recording complete'
          setTimeout(() => {
            feedbackElement.style.display = 'none'
          }, 2000)
          break
        case 'error':
          feedbackElement.style.display = 'block'
          feedbackElement.style.background = '#fff3e0'
          feedbackElement.style.color = '#ef6c00'
          feedbackElement.textContent = '⚠ Recording failed'
          setTimeout(() => {
            feedbackElement.style.display = 'none'
          }, 3000)
          break
      }
    })

    return feedbackElement
  }
}