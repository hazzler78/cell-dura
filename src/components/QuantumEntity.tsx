'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { getChatResponse } from '@/lib/openai';
import ReactMarkdown from 'react-markdown';

interface Position {
  x: number;
  y: number;
}

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AI_TIPS = [
  'Ready to explore AI solutions for your business? 💡',
  'Let\'s discuss your AI implementation strategy!',
  'Have questions about AI integration? I\'m here to help!',
  'Looking to boost efficiency with AI? Let\'s talk!',
  'Need insights on AI ROI? Ask me anything!',
  'Discover how AI can transform your operations!',
  'Ready to make data-driven decisions? Let\'s begin!',
  'Your AI implementation expert is here!'
];

const QuantumEntity: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Initialize random tip
  useEffect(() => {
    setCurrentTip(AI_TIPS[Math.floor(Math.random() * AI_TIPS.length)]);
  }, []);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Random movement animation
  useEffect(() => {
    const moveEntity = async () => {
      if (!containerRef.current) return;

      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      await controls.start({
        x: newX,
        y: newY,
        transition: {
          duration: 5,
          ease: "easeInOut",
        },
      });

      setCurrentTip(AI_TIPS[Math.floor(Math.random() * AI_TIPS.length)]);
    };

    const interval = setInterval(moveEntity, 10000);
    return () => clearInterval(interval);
  }, [controls]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage = userMessage.trim();
    setUserMessage('');
    setIsLoading(true);

    setChatHistory(prev => [...prev, {
      text: newUserMessage,
      isUser: true,
      timestamp: new Date()
    }]);

    try {
      const response = await getChatResponse(newUserMessage);
      
      setChatHistory(prev => [...prev, {
        text: response,
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, {
        text: "A quantum fluctuation occurred. Please try again.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        animate={controls}
        initial={{ x: 50, y: 50 }}
        className="absolute"
        style={{ width: 100, height: 100 }}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer pointer-events-auto"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => setIsChatOpen(true)}
        >
          {/* Quantum Entity SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-lg"
          >
            {/* Business-focused Orb */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="url(#business-gradient)"
              animate={{
                r: [40, 42, 40],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Professional Orbits */}
            <motion.ellipse
              cx="50"
              cy="50"
              rx="45"
              ry="20"
              fill="none"
              stroke="rgba(0, 102, 255, 0.3)"
              strokeWidth="1"
              animate={{ 
                transform: ["rotate(0deg)", "rotate(360deg)"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <motion.ellipse
              cx="50"
              cy="50"
              rx="20"
              ry="45"
              fill="none"
              stroke="rgba(123, 97, 255, 0.3)"
              strokeWidth="1"
              animate={{ 
                transform: ["rotate(0deg)", "rotate(-360deg)"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Business Particles */}
            <motion.circle
              cx="50"
              cy="10"
              r="2"
              fill="#0066FF"
              animate={{
                opacity: [0, 1, 0],
                y: [0, 80, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.circle
              cx="90"
              cy="50"
              r="2"
              fill="#7B61FF"
              animate={{
                opacity: [0, 1, 0],
                x: [-80, 0, -80],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Updated Gradient Definition */}
            <defs>
              <radialGradient id="business-gradient">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="50%" stopColor="#7B61FF" />
                <stop offset="100%" stopColor="#00FF9D" />
              </radialGradient>
            </defs>
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && !isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 px-4 py-2 bg-dark-lighter rounded-lg border border-primary/20 text-white text-sm whitespace-nowrap"
              >
                {currentTip}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-4 right-4 w-80 bg-dark-lighter rounded-lg shadow-xl border border-primary/20 pointer-events-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Atlas - AI Consultant</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div ref={chatRef} className="h-48 overflow-y-auto mb-4 p-3 bg-dark rounded-lg space-y-3">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`${
                      msg.isUser
                        ? 'ml-auto bg-primary/20 text-white'
                        : 'mr-auto bg-dark-lighter text-cyan-300'
                    } max-w-[80%] rounded-lg p-2`}
                  >
                    <ReactMarkdown components={{
                      p: ({node, ...props}) => <p className="prose prose-invert prose-sm" {...props} />
                    }}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ))}
                {isLoading && (
                  <motion.div
                    className="flex justify-center space-x-2"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    <div className="w-2 h-2 bg-fuchsia-500 rounded-full" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Enter your query..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 bg-dark rounded-lg border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-600 hover:to-fuchsia-600 text-white rounded-lg transition-all disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuantumEntity; 