const FALLBACK_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'welcome'],
    responses: [
      "Welcome! I'm your AI assistant, ready to help optimize your business processes with innovative solutions.",
      "Hello! I'm here to help you explore AI implementation strategies for your business needs.",
      "Greetings! Let's discuss how AI can transform your business operations efficiently."
    ]
  },
  {
    keywords: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'ml', 'deep learning'],
    responses: [
      "AI technology creates powerful connections across business systems, enhancing efficiency and decision-making. Would you like to explore specific applications?",
      "Modern AI solutions can process multiple scenarios simultaneously, helping businesses find optimal paths forward. What challenges are you looking to address?",
      "AI is transforming business operations through advanced data processing and automation. Let's discuss your specific needs."
    ]
  },
  {
    keywords: ['cost', 'price', 'expensive', 'money', 'pricing', 'budget', 'investment'],
    responses: [
      "AI investment often shows exponential returns - small, strategic implementations can lead to significant operational improvements.",
      "While initial AI costs may seem significant, the ROI typically manifests through improved efficiency, reduced errors, and enhanced decision-making.",
      "We can explore cost-effective AI implementation strategies that align with your budget and business goals."
    ]
  },
  {
    keywords: ['implement', 'start', 'begin', 'how to', 'setup', 'configure', 'install'],
    responses: [
      "Let's start with a focused implementation in one key area, measure the results, and scale based on success metrics.",
      "We can begin by identifying your highest-impact opportunities for AI integration, ensuring measurable results.",
      "Implementation typically starts with data assessment, followed by pilot programs in specific departments."
    ]
  },
  {
    keywords: ['security', 'safety', 'privacy', 'protection', 'secure', 'safe', 'protect'],
    responses: [
      "We implement robust security protocols to protect your AI systems and data, ensuring compliance with industry standards.",
      "Data security is fundamental to our AI implementations, with multiple layers of protection and continuous monitoring.",
      "Our security approach combines advanced encryption with comprehensive access controls to protect your business assets."
    ]
  },
  {
    keywords: ['training', 'learn', 'education', 'workshop', 'teach', 'study', 'understand', 'knowledge', 'what can i learn', 'what can i know'],
    responses: [
      "Our training programs combine theoretical knowledge with practical applications, ensuring your team can effectively utilize AI tools.",
      "We offer comprehensive workshops that build both technical understanding and practical implementation skills.",
      "Training is customized to your team's needs, focusing on relevant AI applications and real-world scenarios."
    ]
  }
];

const DEFAULT_RESPONSES = [
  "I understand your interest in AI solutions. Could you tell me more about your specific business challenges?",
  "That's an interesting point. Let's explore how AI can address this particular aspect of your business.",
  "I'd be happy to explain how modern AI solutions can help with this challenge.",
  "This is a common business concern where AI can provide significant improvements. Would you like to discuss specific solutions?"
];

function getQuantumResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  
  // Find matching category based on keywords
  const matchingCategory = FALLBACK_RESPONSES.find(category =>
    category.keywords.some(keyword => {
      console.log(`Checking keyword: ${keyword} in message: ${lowercaseMessage}`);
      return lowercaseMessage.includes(keyword);
    })
  );

  if (matchingCategory) {
    console.log('Found matching category:', matchingCategory.keywords[0]);
    const randomIndex = Math.floor(Math.random() * matchingCategory.responses.length);
    return matchingCategory.responses[randomIndex];
  }

  console.log('No matching category found, using default response');
  const randomIndex = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
  return DEFAULT_RESPONSES[randomIndex];
}

// Test the function
const testMessage = "What can I learn";
console.log("\nTesting message:", testMessage);
console.log("\nResponse:", getQuantumResponse(testMessage)); 