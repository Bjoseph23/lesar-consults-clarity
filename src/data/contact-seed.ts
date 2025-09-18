// Contact form seed data and configuration
// This file contains default options, copy, and contact details for the contact page

export const contactData = {
  // Contact Information (from Lesar Consults Firm Profile)
  contact: {
    email: "lesarconsults@gmail.com",
    phone: {
      director: "+254 723 280 941",
      operations: "+254 710 715 132"
    },
    address: {
      postal: "P.O. Box 43239-80100, Mombasa",
      physical: "Tom Mboya Avenue, Nairobi"
    }
  },

  // Service options for the multi-select dropdown
  services: [
    "Health Systems Strengthening",
    "Financial Analysis and Economics", 
    "Customized Research, Analysis & Surveys",
    "Monitoring and Evaluation (M&E)",
    "Human Resource Management, Capacity Building & Training",
    "Policy & Advocacy Development",
    "Project Management",
    "Other"
  ],

  // Budget ranges in KSh
  budgetOptions: [
    "< KSh 500,000",
    "KSh 500,000 – 2,500,000", 
    "KSh 2,500,000 – 10,000,000",
    "> KSh 10,000,000",
    "Prefer not to say",
    "Custom"
  ],

  // Timeframe options
  timeframeOptions: [
    "ASAP",
    "Within 1 month",
    "1–3 months", 
    "3–6 months",
    "6+ months",
    "Undecided"
  ],

  // Copy and messaging
  copy: {
    heroTitle: "Let's discuss your project",
    heroSubtitle: "Tell us about your needs and we'll get back within 2 business days.",
    heroContact: "Contact us: lesarconsults@gmail.com | +254 710 715 132",
    
    privacyText: "We respect your privacy and will never share your information.",
    consentText: "I agree to be contacted and to Lesar Consults' privacy policy.",
    
    successTitle: "Thank you for your request!",
    successMessage: "Request received. We'll contact you within 2 business days.",
    
    // Step descriptions
    steps: {
      1: { title: "Let's start with your name", description: "Please enter your full name as you'd like us to call you." },
      2: { title: "Tell us about your organization", description: "Help us understand where you work." },
      3: { title: "How can we reach you?", description: "We'll use this information to send you our proposal." },
      4: { title: "What services do you need?", description: "Select all services that apply to your project." },
      5: { title: "Project timeline and budget", description: "Help us understand your project scope and timeline." },
      6: { title: "Almost done!", description: "Please review and confirm your consent to proceed." }
    }
  },

  // Validation rules
  validation: {
    description: {
      minLength: 50,
      maxLength: 600
    },
    file: {
      maxSize: 20 * 1024 * 1024, // 20MB in bytes
      allowedTypes: ['.pdf', '.doc', '.docx']
    }
  },

  // Calendly configuration (placeholder)
  calendly: {
    // TODO: Replace with your actual Calendly event URL
    eventUrl: "https://calendly.com/YOUR_CALENDLY_LINK",
    fallbackText: "Schedule a meeting with our team"
  }
};

export default contactData;