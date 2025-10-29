// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Jeremy Edwards CV loaded successfully');
  
  // Initialize the CV application
  initializeCV();
});

/**
 * Initialize CV functionality
 */
function initializeCV() {
  // Add smooth scrolling for anchor links
  addSmoothScrolling();
  
  // Add print functionality
  addPrintFunctionality();
  
  // Add interactive features
  addInteractiveFeatures();
  
  // Initialize chat functionality
  initializeChat();
  
  // Track page load analytics
  trackPageLoad();
}

/**
 * Add smooth scrolling behavior for anchor links
 */
function addSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Add print functionality
 */
function addPrintFunctionality() {
  // Listen for print events
  window.addEventListener('beforeprint', function() {
    console.log('Preparing CV for printing...');
    document.body.classList.add('printing');
  });
  
  window.addEventListener('afterprint', function() {
    console.log('Print dialog closed');
    document.body.classList.remove('printing');
  });
  
  // Add keyboard shortcut for printing (Ctrl+P)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      console.log('Print shortcut detected');
    }
  });
}

/**
 * Add interactive features
 */
function addInteractiveFeatures() {
  // Add hover effects for role sections
  const roles = document.querySelectorAll('.role');
  
  roles.forEach(role => {
    role.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    });
    
    role.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
  
  // Add click-to-copy functionality for contact information
  addContactCopyFunctionality();
  
  // Add skill chip interactions
  addSkillChipInteractions();
}

/**
 * Add click-to-copy functionality for contact information
 */
function addContactCopyFunctionality() {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  const phoneLink = document.querySelector('a[href^="tel:"]');
  
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      const email = this.textContent;
      copyToClipboard(email, 'Email copied to clipboard!');
    });
  }
  
  if (phoneLink) {
    phoneLink.addEventListener('click', function(e) {
      const phone = this.textContent;
      copyToClipboard(phone, 'Phone number copied to clipboard!');
    });
  }
}

/**
 * Add interactions for skill chips
 */
function addSkillChipInteractions() {
  const chips = document.querySelectorAll('.chip');
  
  chips.forEach(chip => {
    chip.addEventListener('click', function() {
      // Toggle selected state
      this.classList.toggle('selected');
      
      // Add visual feedback
      if (this.classList.contains('selected')) {
        this.style.backgroundColor = 'var(--accent)';
        this.style.color = 'white';
        this.style.borderColor = 'var(--accent)';
      } else {
        this.style.backgroundColor = '';
        this.style.color = '';
        this.style.borderColor = '';
      }
    });
    
    // Add hover effect
    chip.style.cursor = 'pointer';
    chip.title = 'Click to highlight this skill';
  });
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text, message) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      showNotification(message);
    }).catch(function(err) {
      console.error('Failed to copy: ', err);
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification(message);
  }
}

/**
 * Show notification message
 */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Fade in
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 100);
  
  // Fade out and remove
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

/**
 * Track page load for analytics
 */
function trackPageLoad() {
  const loadTime = performance.now();
  console.log(`CV page loaded in ${Math.round(loadTime)}ms`);
  
  // Track scroll depth
  let maxScrollDepth = 0;
  
  window.addEventListener('scroll', function() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
    }
  });
  
  // Track when user leaves page
  window.addEventListener('beforeunload', function() {
    console.log(`Maximum scroll depth: ${maxScrollDepth}%`);
  });
}

/**
 * Utility function to format dates
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Chat System Implementation
 */
function initializeChat() {
  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendButton');
  const chatMessages = document.getElementById('chatMessages');
  const chatLoading = document.getElementById('chatLoading');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  const modeInputs = document.querySelectorAll('input[name="chatMode"]');

  if (!chatInput || !sendButton || !chatMessages) {
    console.log('Chat elements not found, skipping chat initialization');
    return;
  }

  // Session tracking for question limit
  const QUESTION_LIMIT = 5;
  const SESSION_KEY = 'jeremy_cv_question_count';
  const questionCounter = document.getElementById('questionCounter');
  
  // Get current question count from session storage
  function getQuestionCount() {
    return parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10);
  }
  
  // Increment question count
  function incrementQuestionCount() {
    const current = getQuestionCount();
    sessionStorage.setItem(SESSION_KEY, (current + 1).toString());
    updateQuestionCounter();
    return current + 1;
  }
  
  // Update question counter display
  function updateQuestionCounter() {
    const remaining = Math.max(0, QUESTION_LIMIT - getQuestionCount());
    const current = getQuestionCount();
    
    console.log(`Question tracking: ${current}/${QUESTION_LIMIT} used, ${remaining} remaining`);
    
    if (questionCounter) {
      questionCounter.textContent = `Questions remaining: ${remaining}/${QUESTION_LIMIT}`;
      if (remaining <= 1) {
        questionCounter.style.color = 'var(--warning, #ff6b6b)';
      } else if (remaining <= 2) {
        questionCounter.style.color = 'var(--caution, #ffa500)';
      }
    }
  }
  
  // Check if question limit is reached
  function isLimitReached() {
    return getQuestionCount() >= QUESTION_LIMIT;
  }
  
  // Show limit reached message
  function showLimitReachedMessage() {
    addMessage('If you would like to learn more about Jeremy, please contact him', 'bot');
    chatInput.disabled = true;
    sendButton.disabled = true;
    chatInput.placeholder = 'Question limit reached for this session';
    
    // Hide suggestion buttons
    suggestionBtns.forEach(btn => {
      btn.style.display = 'none';
    });
    
    // Update counter to show 0 remaining
    updateQuestionCounter();
  }
  
  // Check initial state on load
  updateQuestionCounter();
  if (isLimitReached()) {
    showLimitReachedMessage();
  }

  // Development helper: Reset question count with Ctrl+Shift+R
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
      e.preventDefault();
      sessionStorage.removeItem(SESSION_KEY);
      location.reload();
    }
  });

  // Enable/disable send button based on input
  function updateSendButton() {
    const hasText = chatInput.value.trim().length > 0;
    const limitReached = isLimitReached();
    sendButton.disabled = !hasText || limitReached;
  }

  // Handle input events
  chatInput.addEventListener('input', updateSendButton);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Handle send button click
  sendButton.addEventListener('click', handleSendMessage);

  // Handle suggestion button clicks
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (isLimitReached()) {
        showLimitReachedMessage();
        return;
      }
      
      const question = this.getAttribute('data-question');
      chatInput.value = question;
      updateSendButton();
      handleSendMessage();
    });
  });

  // Send message function
  async function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Check if question limit is reached
    if (isLimitReached()) {
      showLimitReachedMessage();
      return;
    }

    const selectedMode = document.querySelector('input[name="chatMode"]:checked')?.value || 'search-find';

    // Increment question count before processing
    const questionNumber = incrementQuestionCount();

    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input and disable send button
    chatInput.value = '';
    updateSendButton();
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      // Send request to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          mode: selectedMode
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove typing indicator
      hideTypingIndicator();

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';
      
      // Create message container for streaming
      const messageContainer = createBotMessageContainer();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        botMessage += chunk;
        updateBotMessage(messageContainer, botMessage);
      }
      
      // Ensure message is complete
      if (botMessage.trim()) {
        updateBotMessage(messageContainer, botMessage);
      } else {
        updateBotMessage(messageContainer, "I apologize, but I couldn't generate a response. Please try again.");
      }
      
      // Check if we've reached the limit after this response
      if (isLimitReached()) {
        showLimitReachedMessage();
      }
    } catch (error) {
      console.error('Chat error:', error);
      hideTypingIndicator();
      addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
    }
  }

  // Add message to chat
  function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = content;
    
    messageContent.appendChild(messageParagraph);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    
    const typingText = document.createElement('span');
    typingText.textContent = 'AI Jeremy is thinking';
    
    const typingDots = document.createElement('div');
    typingDots.className = 'typing-dots';
    typingDots.innerHTML = '<span></span><span></span><span></span>';
    
    typingContent.appendChild(typingText);
    typingContent.appendChild(typingDots);
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Hide typing indicator
  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Create bot message container for streaming
  function createBotMessageContainer() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = '';
    
    messageContent.appendChild(messageParagraph);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
  }

  // Update bot message content during streaming
  function updateBotMessage(container, content) {
    const paragraph = container.querySelector('p');
    paragraph.textContent = content;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Auto-resize textarea
  chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });

  // Initialize send button state
  updateSendButton();
}

/**
 * Export functions for potential external use
 */
window.CVApp = {
  copyToClipboard,
  showNotification,
  formatDate,
  initializeChat
};