'use client';

import { useEffect, useState } from 'react';

export default function ChatComponent() {
  const [questionCount, setQuestionCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "👋 Hi! I'm an AI version of Jeremy Edwards'. Ask me anything about my background, skills, or even personal questions."
    }
  ]);

  const QUESTION_LIMIT = 5;

  useEffect(() => {
    // Get question count from session storage
    const stored = parseInt(sessionStorage.getItem('jeremy_cv_question_count') || '0', 10);
    setQuestionCount(stored);
    setIsLimitReached(stored >= QUESTION_LIMIT);
  }, []);

  const updateQuestionCounter = (count: number) => {
    const remaining = Math.max(0, QUESTION_LIMIT - count);
    const counter = document.getElementById('questionCounter');
    if (counter) {
      counter.textContent = `Questions remaining: ${remaining}/${QUESTION_LIMIT}`;
      if (remaining <= 1) {
        counter.style.color = 'var(--warning, #ff6b6b)';
      } else if (remaining <= 2) {
        counter.style.color = 'var(--caution, #ffa500)';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLimitReached) return;

    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);
    sessionStorage.setItem('jeremy_cv_question_count', newQuestionCount.toString());
    updateQuestionCounter(newQuestionCount);

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setMessage('');
    setIsLoading(true);

    try {
      const selectedMode = (document.querySelector('input[name="chatMode"]:checked') as HTMLInputElement)?.value || 'search-find';
      
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

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          botMessage += chunk;
        }
      }

      // Add bot response
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: botMessage || "I apologize, but I couldn't generate a response. Please try again."
      }]);

      // Check if limit reached
      if (newQuestionCount >= QUESTION_LIMIT) {
        setIsLimitReached(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'If you would like to learn more about Jeremy, please contact him'
          }]);
        }, 1000);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    if (isLimitReached) return;
    setMessage(question);
  };

  useEffect(() => {
    updateQuestionCounter(questionCount);
  }, [questionCount]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, [messages]);

  return null; // This component only provides functionality, no UI
}