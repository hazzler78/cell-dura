export interface ResponseCategory {
  keywords: string[];
  responses: string[];
}

export const FALLBACK_RESPONSES: ResponseCategory[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'welcome', 'good morning', 'good afternoon', 'good evening'],
    responses: [
      "Welcome! I'm your AI solutions consultant, ready to help transform your business with cutting-edge technology. How can I assist you today?",
      "Hello! I specialize in helping businesses like yours implement AI solutions effectively. What challenges are you looking to address?",
      "Greetings! I'm here to help you navigate the world of AI implementation for your business. What would you like to know?"
    ]
  },
  {
    keywords: ['roi', 'return', 'benefit', 'advantages', 'why should', 'why get', 'why implement', 'worth'],
    responses: [
      "Companies implementing our AI solutions typically see: 1) 25-40% increase in operational efficiency, 2) 30% reduction in manual tasks, and 3) Significant improvement in decision-making accuracy. Would you like specific examples for your industry?",
      "Our AI implementation has shown clear benefits: reduced operational costs, improved customer satisfaction through faster response times, and data-driven insights for better decision-making. Let me share some case studies relevant to your business.",
      "The ROI of AI implementation typically manifests in three areas: operational efficiency, cost reduction, and competitive advantage. For example, our clients report 40% faster processing times and 30% lower operational costs within the first year."
    ]
  },
  {
    keywords: ['cost', 'price', 'expensive', 'money', 'pricing', 'budget', 'investment', 'package', 'how much'],
    responses: [
      "Our AI solutions are tailored to your business size and needs. We offer flexible pricing models starting from €5,000 for initial implementation, with customizable packages based on your specific requirements. Would you like to discuss your needs for a detailed quote?",
      "Investment in our AI solutions is scalable: 1) Basic package for SMEs (€5,000-15,000), 2) Professional package for growing businesses (€15,000-30,000), 3) Enterprise solutions (custom pricing). Each includes implementation, training, and support.",
      "We structure our pricing to ensure maximum ROI. A typical mid-size implementation costs between €15,000-30,000, including setup, training, and 6 months of support. Let's discuss your specific needs to provide an accurate quote."
    ]
  },
  {
    keywords: ['implement', 'start', 'begin', 'how to', 'setup', 'configure', 'install', 'process', 'steps', 'timeline'],
    responses: [
      "Our implementation process follows 4 key steps: 1) Initial assessment (1-2 weeks), 2) Custom solution design (2-3 weeks), 3) Implementation and testing (3-4 weeks), 4) Team training and optimization (2-3 weeks). Would you like to learn more about any specific phase?",
      "Implementation begins with a thorough assessment of your current processes, followed by a customized solution design. Typical timeline is 8-12 weeks from start to full deployment, including team training and optimization phases.",
      "We ensure smooth implementation through: 1) Dedicated project manager, 2) Phased rollout approach, 3) Comprehensive team training, 4) 24/7 support during critical phases. Let's discuss your timeline requirements."
    ]
  },
  {
    keywords: ['security', 'safety', 'privacy', 'protection', 'secure', 'safe', 'protect', 'data', 'compliance', 'gdpr'],
    responses: [
      "Our AI solutions meet the highest security standards: 1) GDPR compliance, 2) End-to-end encryption, 3) Regular security audits, 4) Data residency options. We can provide detailed documentation about our security measures.",
      "Security is paramount in our implementation: we ensure data protection through multiple layers of security, regular compliance checks, and strict access controls. All solutions are GDPR-compliant and include detailed security documentation.",
      "We implement comprehensive security measures including: encrypted data transmission, secure cloud storage, regular security updates, and full GDPR compliance. Would you like to discuss specific security requirements?"
    ]
  },
  {
    keywords: ['training', 'learn', 'education', 'workshop', 'teach', 'study', 'understand', 'knowledge', 'course', 'program', 'employees', 'staff', 'team'],
    responses: [
      "Our training program includes: 1) Comprehensive workshops for all skill levels, 2) Hands-on practical sessions, 3) Real-world case studies, 4) Ongoing support and resources. Training can be customized to your team's specific needs and schedule.",
      "We offer multi-level training programs: 1) Basic AI awareness for all staff (1 day), 2) Advanced user training (2-3 days), 3) Technical implementation training (1 week), 4) Ongoing support and updates. What level interests you?",
      "Employee training is crucial for successful AI implementation. Our program combines theoretical knowledge with practical applications, ensuring your team can effectively utilize and maintain AI systems. Shall we discuss your team's specific training needs?"
    ]
  },
  {
    keywords: ['support', 'help', 'assistance', 'maintain', 'maintenance', 'issue', 'problem', 'trouble'],
    responses: [
      "Our support package includes: 1) 24/7 technical assistance, 2) Regular system maintenance, 3) Monthly performance reviews, 4) Priority issue resolution. We ensure your AI systems run smoothly and efficiently.",
      "We provide comprehensive support through: dedicated support team, regular maintenance checks, performance optimization, and rapid issue resolution. Our average response time is under 2 hours for critical issues.",
      "Support is integral to our service: continuous monitoring, proactive maintenance, regular updates, and dedicated technical assistance. Would you like details about our support packages?"
    ]
  }
];

export const DEFAULT_RESPONSES: string[] = [
  "I understand you're interested in AI implementation. Could you tell me more about your specific business needs and challenges?",
  "That's an interesting question about AI solutions. To provide the most relevant information, could you share more about your business context?",
  "I'd be happy to explain how our AI solutions can address this. Could you provide more details about your current business processes?",
  "This is a common consideration in AI implementation. Let me understand your business requirements better to provide specific solutions."
];

// Add new industry categories
export const INDUSTRY_RESPONSES: ResponseCategory[] = [
  {
    keywords: ['manufacturing', 'factory', 'production', 'industry', 'industrial'],
    responses: [
      "For manufacturing businesses, our AI solutions focus on: 1) Predictive maintenance reducing downtime by 45%, 2) Quality control automation with 99.9% accuracy, 3) Supply chain optimization saving 20% in logistics costs. Would you like specific examples?",
      "Our manufacturing clients see significant improvements in: production efficiency, quality control, and inventory management. For example, one client reduced defect rates by 32% within 3 months of implementation.",
      "AI in manufacturing provides: real-time production monitoring, predictive maintenance, and automated quality control. Our solutions have helped clients achieve ISO 9001 compliance while reducing operational costs."
    ]
  },
  {
    keywords: ['healthcare', 'medical', 'hospital', 'clinic', 'patient'],
    responses: [
      "In healthcare, our AI solutions deliver: 1) 40% faster patient diagnostics, 2) 99% accuracy in medical image analysis, 3) Streamlined patient care workflows. All while maintaining strict HIPAA compliance.",
      "Healthcare providers using our AI report: reduced diagnostic times, improved patient outcomes, and more efficient resource allocation. Would you like to see case studies from similar institutions?",
      "Our healthcare AI solutions focus on: patient care optimization, diagnostic assistance, and administrative automation - all while ensuring complete regulatory compliance and data privacy."
    ]
  },
  {
    keywords: ['retail', 'shop', 'store', 'sales', 'customer'],
    responses: [
      "Retail businesses benefit from our AI through: 1) Inventory optimization reducing stockouts by 30%, 2) Personalized customer recommendations increasing sales by 25%, 3) Automated customer service handling 80% of routine queries.",
      "Our retail AI solutions provide: real-time inventory management, customer behavior analysis, and automated marketing optimization. Clients typically see ROI within 6-8 months.",
      "For retail operations, we offer: smart inventory management, customer behavior prediction, and automated marketing optimization. Would you like to hear about specific retail case studies?"
    ]
  },
  {
    keywords: ['finance', 'banking', 'financial', 'bank', 'investment'],
    responses: [
      "In the financial sector, our AI solutions provide: 1) 99.9% accurate fraud detection, 2) Automated risk assessment reducing processing time by 60%, 3) Personalized banking recommendations increasing customer engagement by 40%.",
      "Financial institutions using our AI systems report: enhanced security measures, faster transaction processing, and improved customer satisfaction through AI-driven insights.",
      "Our finance-focused AI solutions deliver: real-time fraud detection, automated compliance monitoring, and intelligent customer service systems - all while maintaining the highest security standards."
    ]
  }
];

// Enhance the getQuantumResponse function
export function getQuantumResponse(message: string): string {
  if (!message) {
    return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
  }

  const lowercaseMessage = message.toLowerCase();
  
  // First, check for industry-specific matches
  const industryMatch = INDUSTRY_RESPONSES.find(category =>
    category.keywords.some(keyword => lowercaseMessage.includes(keyword))
  );

  if (industryMatch) {
    console.log('Found industry match:', industryMatch.keywords[0]);
    const randomIndex = Math.floor(Math.random() * industryMatch.responses.length);
    return industryMatch.responses[randomIndex];
  }

  // Then check general categories
  const generalMatch = FALLBACK_RESPONSES.find(category =>
    category.keywords.some(keyword => {
      console.log(`Checking keyword: ${keyword} in message: ${lowercaseMessage}`);
      return lowercaseMessage.includes(keyword);
    })
  );

  if (generalMatch) {
    console.log('Found general category:', generalMatch.keywords[0]);
    const randomIndex = Math.floor(Math.random() * generalMatch.responses.length);
    return generalMatch.responses[randomIndex];
  }

  // If no specific match, return contextual default response
  console.log('No matching category found, using default response');
  const randomIndex = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
  return DEFAULT_RESPONSES[randomIndex];
} 