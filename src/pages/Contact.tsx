import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactWizard from "@/components/contact/ContactWizard";
import SuccessOptions from "@/components/contact/SuccessOptions";
import { Plane, ArrowLeft } from "lucide-react";
const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = (formData: any) => {
    // Log form data for development (remove in production)
    console.log("Form submitted:", formData);

    // Show success toast
    setShowSuccessToast(true);

    // Hide toast after 4 seconds and show success options
    setTimeout(() => {
      setShowSuccessToast(false);
      setIsSubmitted(true);
    }, 4000);
  };
  const handleNewRequest = () => {
    setIsSubmitted(false);
    setShowSuccessToast(false);
  };
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header with Logo and Progress */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Lesar Consults" className="h-12 sm:h-16 w-auto" />
            
          </div>
          
          {/* Progress bar placeholder - will be controlled by ContactWizard */}
          <div id="progress-container" className="flex items-center">
            {/* Progress bar will be rendered here by ContactWizard */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? <ContactWizard onSubmit={handleFormSubmit} /> : <SuccessOptions onNewRequest={handleNewRequest} />}
        </div>
      </main>

      {/* Success Toast */}
      {showSuccessToast && <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white border border-green-200 rounded-lg shadow-elegant p-6 max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">Thank you!</h3>
                <p className="text-sm text-muted-foreground">
                  Request received. We'll contact you within 2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>}

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-cream/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-navy/10 rounded-full blur-3xl"></div>
    </div>;
};
export default Contact;