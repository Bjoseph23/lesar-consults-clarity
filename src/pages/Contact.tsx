import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContactWizard from "@/components/contact/ContactWizard";
import SuccessOptions from "@/components/contact/SuccessOptions";
import { Plane, ArrowLeft } from "lucide-react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get service from URL parameters for prefilling
  const preselectedService = searchParams.get('service');

  // Lock body scroll while toast is visible
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (showSuccessToast) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [showSuccessToast]);

  const handleFormSubmit = (formData: any) => {
    // Log form data for development (remove in production)
    console.log("Form submitted:", formData);

    // Show success toast (modal-like)
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header with Logo and Progress */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src="/lesar-logoo.png" alt="Lesar Consults" className="h-12 sm:h-16 w-auto" />
          </div>
          
          {/* Progress bar placeholder - will be controlled by ContactWizard */}
          <div id="progress-container" className="flex items-center">
            {/* Progress bar will be rendered here by ContactWizard */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12"
        aria-hidden={showSuccessToast ? "true" : "false"} // hide from assistive tech while modal active
      >
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <ContactWizard onSubmit={handleFormSubmit} preselectedService={preselectedService} />
          ) : (
            <SuccessOptions onNewRequest={handleNewRequest} />
          )}
        </div>
      </main>

      {/* Modal overlay + Centered Toast */}
      {showSuccessToast && (
        <>
          {/* Backdrop: blocks interaction and dims background */}
          <div
            className="fixed inset-0 bg-black/45 z-40"
            aria-hidden="true"
          />

          {/* Toast / Modal */}
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="contact-toast-title"
            aria-describedby="contact-toast-desc"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white border border-green-200 rounded-xl shadow-elegant p-6 sm:p-8 max-w-md w-full">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 id="contact-toast-title" className="text-xl font-semibold text-navy mb-1">
                    Thank you!
                  </h3>
                  <p id="contact-toast-desc" className="text-base text-muted-foreground">
                    Request received. We'll contact you within 2 business days.
                  </p>

                  {/* Optional quick actions while toast is visible */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        // immediate transition to success options early if user clicks
                        setShowSuccessToast(false);
                        setIsSubmitted(true);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-dark-red text-white hover:bg-dark-red/90"
                    >
                      View next steps
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        // allow user to dismiss toast and remain on form (optional)
                        setShowSuccessToast(false);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 border border-green-200 text-navy bg-white hover:bg-green-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" aria-hidden="true"></div>
      
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-navy/20 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-destructive/15 rounded-full blur-3xl animate-pulse delay-700" aria-hidden="true"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse delay-300" aria-hidden="true"></div>
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-accent/25 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true"></div>
      <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-navy/15 rounded-full blur-3xl animate-pulse delay-500" aria-hidden="true"></div>
      <div className="absolute top-1/6 left-1/2 w-36 h-36 bg-destructive/20 rounded-full blur-2xl animate-pulse delay-1200" aria-hidden="true"></div>
    </div>
  );
};

export default Contact;
