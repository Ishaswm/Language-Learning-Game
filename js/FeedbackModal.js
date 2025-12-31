/**
 * FeedbackModal class handles learning progress display and feedback
 * Provides immediate post-conversation feedback, progress dashboard, and skill breakdowns
 */
class FeedbackModal {
  constructor(container) {
    this.container = container || document.body
    this.modalOverlay = null
    this.modalContainer = null
    this.feedbackContent = null
    this.progressDashboard = null
    
    this.isVisible = false
    this.currentMode = 'hidden' // 'hidden', 'feedback', 'progress'
    
    // Callbacks
    this.onCloseCallback = null
    this.onContinueCallback = null
    
    // Initialize modal components
    this.initializeModal()
  }

  /**
   * Initialize modal components
   */
  initializeModal() {
    this.createModalOverlay()
    this.createModalContainer()
    this.createFeedbackContent()
    this.createProgressDashboard()
    this.setupEventListeners()
  }

  /**
   * Create modal overlay
   */
  createModalOverlay() {
    this.modalOverlay = document.createElement('div')
    this.modalOverlay.className = 'feedback-modal-overlay'
    this.modalOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      z-index: 2000;
      backdrop-filter: blur(4px);
    `
    
    this.container.appendChild(this.modalOverlay)
  }

  /**
   * Create main modal container
   */
  createModalContainer() {
    this.modalContainer = document.createElement('div')
    this.modalContainer.className = 'feedback-modal-container'
    this.modalContainer.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
      border: 3px solid #4CAF50;
      border-radius: 12px;
      padding: 24px;
      max-width: 600px;
      max-height: 80vh;
      width: 90%;
      overflow-y: auto;
      font-family: 'Press Start 2P', cursive;
      color: white;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    `

    // Close button
    const closeButton = document.createElement('button')
    closeButton.className = 'modal-close-button'
    closeButton.innerHTML = '✕'
    closeButton.style.cssText = `
      position: absolute;
      top: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #999;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s ease;
    `

    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.background = 'rgba(244, 67, 54, 0.8)'
      closeButton.style.color = 'white'
    })

    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.background = 'rgba(255, 255, 255, 0.1)'
      closeButton.style.color = '#999'
    })

    closeButton.addEventListener('click', () => {
      this.close()
    })

    this.modalContainer.appendChild(closeButton)
    this.modalOverlay.appendChild(this.modalContainer)
  }

  /**
   * Create feedback content section
   */
  createFeedbackContent() {
    this.feedbackContent = document.createElement('div')
    this.feedbackContent.className = 'feedback-content'
    this.feedbackContent.style.cssText = `
      display: none;
    `

    // Title
    const title = document.createElement('h2')
    title.className = 'feedback-title'
    title.style.cssText = `
      color: #4CAF50;
      font-size: 18px;
      margin: 0 0 24px 0;
      text-align: center;
      text-transform: uppercase;
    `
    title.textContent = 'Conversation Complete!'

    // Strengths section
    const strengthsSection = document.createElement('div')
    strengthsSection.className = 'strengths-section'
    strengthsSection.style.cssText = `
      margin-bottom: 24px;
      padding: 16px;
      background: rgba(76, 175, 80, 0.1);
      border: 2px solid #4CAF50;
      border-radius: 8px;
    `

    const strengthsTitle = document.createElement('h3')
    strengthsTitle.textContent = '✓ What You Did Well'
    strengthsTitle.style.cssText = `
      color: #4CAF50;
      font-size: 14px;
      margin: 0 0 12px 0;
    `

    const strengthsList = document.createElement('ul')
    strengthsList.className = 'strengths-list'
    strengthsList.style.cssText = `
      list-style: none;
      padding: 0;
      margin: 0;
    `

    strengthsSection.appendChild(strengthsTitle)
    strengthsSection.appendChild(strengthsList)

    // Improvements section
    const improvementsSection = document.createElement('div')
    improvementsSection.className = 'improvements-section'
    improvementsSection.style.cssText = `
      margin-bottom: 24px;
      padding: 16px;
      background: rgba(255, 152, 0, 0.1);
      border: 2px solid #FF9800;
      border-radius: 8px;
    `

    const improvementsTitle = document.createElement('h3')
    improvementsTitle.textContent = '💡 Areas to Improve'
    improvementsTitle.style.cssText = `
      color: #FF9800;
      font-size: 14px;
      margin: 0 0 12px 0;
    `

    const improvementsList = document.createElement('ul')
    improvementsList.className = 'improvements-list'
    improvementsList.style.cssText = `
      list-style: none;
      padding: 0;
      margin: 0;
    `

    improvementsSection.appendChild(improvementsTitle)
    improvementsSection.appendChild(improvementsList)

    // Skill metrics section
    const skillMetricsSection = document.createElement('div')
    skillMetricsSection.className = 'skill-metrics-section'
    skillMetricsSection.style.cssText = `
      margin-bottom: 24px;
    `

    const skillMetricsTitle = document.createElement('h3')
    skillMetricsTitle.textContent = '📊 Skill Breakdown'
    skillMetricsTitle.style.cssText = `
      color: #2196F3;
      font-size: 14px;
      margin: 0 0 16px 0;
      text-align: center;
    `

    const skillMetricsContainer = document.createElement('div')
    skillMetricsContainer.className = 'skill-metrics-container'
    skillMetricsContainer.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    `

    skillMetricsSection.appendChild(skillMetricsTitle)
    skillMetricsSection.appendChild(skillMetricsContainer)

    // Continue button
    const continueButton = document.createElement('button')
    continueButton.className = 'continue-button'
    continueButton.textContent = 'Continue Learning'
    continueButton.style.cssText = `
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #4CAF50, #388E3C);
      color: white;
      border: none;
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    `

    continueButton.addEventListener('mouseenter', () => {
      continueButton.style.transform = 'translateY(-2px)'
      continueButton.style.boxShadow = '0 4px 16px rgba(76, 175, 80, 0.4)'
    })

    continueButton.addEventListener('mouseleave', () => {
      continueButton.style.transform = 'translateY(0)'
      continueButton.style.boxShadow = 'none'
    })

    continueButton.addEventListener('click', () => {
      this.close()
      if (this.onContinueCallback) {
        this.onContinueCallback()
      }
    })

    // Assemble feedback content
    this.feedbackContent.appendChild(title)
    this.feedbackContent.appendChild(strengthsSection)
    this.feedbackContent.appendChild(improvementsSection)
    this.feedbackContent.appendChild(skillMetricsSection)
    this.feedbackContent.appendChild(continueButton)
    this.modalContainer.appendChild(this.feedbackContent)
  }

  /**
   * Create progress dashboard section
   */
  createProgressDashboard() {
    this.progressDashboard = document.createElement('div')
    this.progressDashboard.className = 'progress-dashboard'
    this.progressDashboard.style.cssText = `
      display: none;
    `

    // Title
    const title = document.createElement('h2')
    title.className = 'progress-title'
    title.style.cssText = `
      color: #2196F3;
      font-size: 18px;
      margin: 0 0 24px 0;
      text-align: center;
      text-transform: uppercase;
    `
    title.textContent = 'Learning Progress'

    // Session summary
    const sessionSummary = document.createElement('div')
    sessionSummary.className = 'session-summary'
    sessionSummary.style.cssText = `
      margin-bottom: 24px;
      padding: 16px;
      background: rgba(33, 150, 243, 0.1);
      border: 2px solid #2196F3;
      border-radius: 8px;
    `

    const sessionTitle = document.createElement('h3')
    sessionTitle.textContent = '📈 Session Summary'
    sessionTitle.style.cssText = `
      color: #2196F3;
      font-size: 14px;
      margin: 0 0 12px 0;
    `

    const sessionStats = document.createElement('div')
    sessionStats.className = 'session-stats'
    sessionStats.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    `

    sessionSummary.appendChild(sessionTitle)
    sessionSummary.appendChild(sessionStats)

    // Overall progress
    const overallProgress = document.createElement('div')
    overallProgress.className = 'overall-progress'
    overallProgress.style.cssText = `
      margin-bottom: 24px;
    `

    const overallTitle = document.createElement('h3')
    overallTitle.textContent = '🎯 Overall Skills'
    overallTitle.style.cssText = `
      color: #9C27B0;
      font-size: 14px;
      margin: 0 0 16px 0;
      text-align: center;
    `

    const skillsGrid = document.createElement('div')
    skillsGrid.className = 'skills-grid'
    skillsGrid.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    `

    overallProgress.appendChild(overallTitle)
    overallProgress.appendChild(skillsGrid)

    // Close button
    const closeButton = document.createElement('button')
    closeButton.className = 'progress-close-button'
    closeButton.textContent = 'Back to Game'
    closeButton.style.cssText = `
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #2196F3, #1976D2);
      color: white;
      border: none;
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    `

    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.transform = 'translateY(-2px)'
      closeButton.style.boxShadow = '0 4px 16px rgba(33, 150, 243, 0.4)'
    })

    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.transform = 'translateY(0)'
      closeButton.style.boxShadow = 'none'
    })

    closeButton.addEventListener('click', () => {
      this.close()
    })

    // Assemble progress dashboard
    this.progressDashboard.appendChild(title)
    this.progressDashboard.appendChild(sessionSummary)
    this.progressDashboard.appendChild(overallProgress)
    this.progressDashboard.appendChild(closeButton)
    this.modalContainer.appendChild(this.progressDashboard)
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Close modal when clicking overlay
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.close()
      }
    })

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (this.isVisible && e.key === 'Escape') {
        this.close()
      }
    })
  }

  /**
   * Show immediate post-conversation feedback
   * @param {Array} strengths - Array of strength messages
   * @param {Array} improvements - Array of improvement suggestions
   * @param {Object} skillMetrics - Skill scores (vocabulary, fluency, pronunciation, grammar)
   * @param {Object} options - Additional options
   */
  showImmediateFeedback(strengths, improvements, skillMetrics = {}, options = {}) {
    this.currentMode = 'feedback'
    this.isVisible = true

    // Update strengths
    const strengthsList = this.feedbackContent.querySelector('.strengths-list')
    strengthsList.innerHTML = ''
    strengths.forEach(strength => {
      const listItem = this.createFeedbackListItem(strength, 'positive')
      strengthsList.appendChild(listItem)
    })

    // Update improvements
    const improvementsList = this.feedbackContent.querySelector('.improvements-list')
    improvementsList.innerHTML = ''
    improvements.forEach(improvement => {
      const listItem = this.createFeedbackListItem(improvement, 'improvement')
      improvementsList.appendChild(listItem)
    })

    // Update skill metrics
    this.renderSkillBreakdown(skillMetrics)

    // Show feedback content
    this.feedbackContent.style.display = 'block'
    this.progressDashboard.style.display = 'none'
    this.modalOverlay.style.display = 'block'

    // Animate in
    this.animateIn()
  }

  /**
   * Display progress dashboard with session metrics
   * @param {Object} sessionData - Session statistics and metrics
   */
  displayProgressSummary(sessionData) {
    this.currentMode = 'progress'
    this.isVisible = true

    // Update session stats
    const sessionStats = this.progressDashboard.querySelector('.session-stats')
    sessionStats.innerHTML = ''

    const stats = [
      { label: 'Conversations', value: sessionData.conversationCount || 0, icon: '💬' },
      { label: 'Total Turns', value: sessionData.totalTurns || 0, icon: '🔄' },
      { label: 'Time Spent', value: this.formatDuration(sessionData.timeSpent || 0), icon: '⏱️' },
      { label: 'Scenarios', value: sessionData.scenariosCompleted || 0, icon: '🎭' }
    ]

    stats.forEach(stat => {
      const statElement = this.createStatElement(stat.label, stat.value, stat.icon)
      sessionStats.appendChild(statElement)
    })

    // Update overall skills
    this.renderOverallSkills(sessionData.overallSkills || {})

    // Show progress dashboard
    this.feedbackContent.style.display = 'none'
    this.progressDashboard.style.display = 'block'
    this.modalOverlay.style.display = 'block'

    // Animate in
    this.animateIn()
  }

  /**
   * Render skill breakdown with visual progress bars
   * @param {Object} skillMetrics - Skill scores object
   */
  renderSkillBreakdown(skillMetrics) {
    const container = this.feedbackContent.querySelector('.skill-metrics-container')
    container.innerHTML = ''

    const skills = [
      { name: 'Vocabulary', score: skillMetrics.vocabulary || 0, color: '#4CAF50' },
      { name: 'Fluency', score: skillMetrics.fluency || 0, color: '#2196F3' },
      { name: 'Pronunciation', score: skillMetrics.pronunciation || 0, color: '#FF9800' },
      { name: 'Grammar', score: skillMetrics.grammar || 0, color: '#9C27B0' }
    ]

    skills.forEach(skill => {
      const skillElement = this.createSkillBar(skill.name, skill.score, skill.color)
      container.appendChild(skillElement)
    })
  }

  /**
   * Render overall skills for progress dashboard
   * @param {Object} overallSkills - Overall skill metrics
   */
  renderOverallSkills(overallSkills) {
    const container = this.progressDashboard.querySelector('.skills-grid')
    container.innerHTML = ''

    const skills = [
      { name: 'Vocabulary', score: overallSkills.vocabulary || 0, color: '#4CAF50' },
      { name: 'Fluency', score: overallSkills.fluency || 0, color: '#2196F3' },
      { name: 'Pronunciation', score: overallSkills.pronunciation || 0, color: '#FF9800' },
      { name: 'Grammar', score: overallSkills.grammar || 0, color: '#9C27B0' }
    ]

    skills.forEach(skill => {
      const skillElement = this.createSkillBar(skill.name, skill.score, skill.color, true)
      container.appendChild(skillElement)
    })
  }

  /**
   * Create feedback list item with appropriate styling
   * @param {string} text - Feedback text
   * @param {string} type - Type of feedback ('positive' or 'improvement')
   * @returns {HTMLElement} List item element
   */
  createFeedbackListItem(text, type) {
    const listItem = document.createElement('li')
    listItem.style.cssText = `
      padding: 8px 0;
      font-size: 12px;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    `

    const icon = document.createElement('span')
    icon.style.cssText = `
      font-size: 14px;
      margin-top: 2px;
    `
    icon.textContent = type === 'positive' ? '✓' : '💡'

    const textSpan = document.createElement('span')
    textSpan.textContent = text
    textSpan.style.cssText = `
      flex: 1;
      color: ${type === 'positive' ? '#4CAF50' : '#FF9800'};
    `

    listItem.appendChild(icon)
    listItem.appendChild(textSpan)

    return listItem
  }

  /**
   * Create skill progress bar
   * @param {string} name - Skill name
   * @param {number} score - Skill score (0-100)
   * @param {string} color - Progress bar color
   * @param {boolean} showLevel - Whether to show level indicator
   * @returns {HTMLElement} Skill bar element
   */
  createSkillBar(name, score, color, showLevel = false) {
    const skillContainer = document.createElement('div')
    skillContainer.style.cssText = `
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `

    const skillHeader = document.createElement('div')
    skillHeader.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    `

    const skillName = document.createElement('span')
    skillName.textContent = name
    skillName.style.cssText = `
      font-size: 10px;
      color: #E0E0E0;
    `

    const skillScore = document.createElement('span')
    skillScore.textContent = `${Math.round(score)}%`
    skillScore.style.cssText = `
      font-size: 10px;
      color: ${color};
      font-weight: bold;
    `

    skillHeader.appendChild(skillName)
    skillHeader.appendChild(skillScore)

    // Progress bar
    const progressBar = document.createElement('div')
    progressBar.style.cssText = `
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    `

    const progressFill = document.createElement('div')
    progressFill.style.cssText = `
      width: ${Math.min(score, 100)}%;
      height: 100%;
      background: linear-gradient(90deg, ${color}, ${color}CC);
      border-radius: 4px;
      transition: width 0.5s ease;
    `

    progressBar.appendChild(progressFill)

    // Level indicator for progress dashboard
    if (showLevel) {
      const level = Math.floor(score / 20) + 1 // 1-5 levels
      const levelIndicator = document.createElement('div')
      levelIndicator.textContent = `Level ${level}`
      levelIndicator.style.cssText = `
        font-size: 8px;
        color: ${color};
        margin-top: 4px;
        text-align: center;
      `
      skillContainer.appendChild(levelIndicator)
    }

    skillContainer.appendChild(skillHeader)
    skillContainer.appendChild(progressBar)

    return skillContainer
  }

  /**
   * Create statistic element for session summary
   * @param {string} label - Stat label
   * @param {string|number} value - Stat value
   * @param {string} icon - Stat icon
   * @returns {HTMLElement} Stat element
   */
  createStatElement(label, value, icon) {
    const statElement = document.createElement('div')
    statElement.style.cssText = `
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `

    const iconElement = document.createElement('div')
    iconElement.textContent = icon
    iconElement.style.cssText = `
      font-size: 20px;
      margin-bottom: 8px;
    `

    const valueElement = document.createElement('div')
    valueElement.textContent = value
    valueElement.style.cssText = `
      font-size: 14px;
      color: #2196F3;
      font-weight: bold;
      margin-bottom: 4px;
    `

    const labelElement = document.createElement('div')
    labelElement.textContent = label
    labelElement.style.cssText = `
      font-size: 8px;
      color: #B0B0B0;
      text-transform: uppercase;
    `

    statElement.appendChild(iconElement)
    statElement.appendChild(valueElement)
    statElement.appendChild(labelElement)

    return statElement
  }

  /**
   * Format duration in milliseconds to readable string
   * @param {number} duration - Duration in milliseconds
   * @returns {string} Formatted duration
   */
  formatDuration(duration) {
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    }
    return `${seconds}s`
  }

  /**
   * Close the modal
   */
  close() {
    this.isVisible = false
    this.currentMode = 'hidden'

    // Animate out
    this.modalContainer.style.transform = 'translate(-50%, -50%) scale(0.8)'
    this.modalContainer.style.opacity = '0'
    this.modalOverlay.style.opacity = '0'

    setTimeout(() => {
      this.modalOverlay.style.display = 'none'
      this.modalContainer.style.transform = 'translate(-50%, -50%) scale(1)'
      this.modalContainer.style.opacity = '1'
      this.modalOverlay.style.opacity = '1'
    }, 300)

    if (this.onCloseCallback) {
      this.onCloseCallback()
    }
  }

  /**
   * Animate modal in
   */
  animateIn() {
    this.modalContainer.style.transform = 'translate(-50%, -50%) scale(0.8)'
    this.modalContainer.style.opacity = '0'
    this.modalOverlay.style.opacity = '0'

    // Force reflow
    this.modalContainer.offsetHeight

    this.modalContainer.style.transition = 'all 0.3s ease-out'
    this.modalOverlay.style.transition = 'opacity 0.3s ease-out'
    
    this.modalContainer.style.transform = 'translate(-50%, -50%) scale(1)'
    this.modalContainer.style.opacity = '1'
    this.modalOverlay.style.opacity = '1'
  }

  /**
   * Set callback for modal close
   * @param {function} callback - Callback function
   */
  onClose(callback) {
    this.onCloseCallback = callback
  }

  /**
   * Set callback for continue button
   * @param {function} callback - Callback function
   */
  onContinue(callback) {
    this.onContinueCallback = callback
  }

  /**
   * Check if modal is currently visible
   * @returns {boolean} True if modal is visible
   */
  isModalVisible() {
    return this.isVisible
  }

  /**
   * Get current modal mode
   * @returns {string} Current mode
   */
  getCurrentMode() {
    return this.currentMode
  }
}