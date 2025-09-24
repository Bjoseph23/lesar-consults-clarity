import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import StepSix from "./steps/StepSix";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


interface FormData {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  countryCode: string;
  services: string[];
  otherService: string;
  description: string;
  budget: string;
  customBudget: string;
  timeframe: string;
  file: File | null;
  consent: boolean;
}

interface ContactWizardProps {
  onSubmit: (data: FormData) => void;
  preselectedService?: string | null;
}

const ContactWizard = ({ onSubmit, preselectedService }: ContactWizardProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    countryCode: "+254",
    services: preselectedService ? [preselectedService] : [],
    otherService: "",
    description: "",
    budget: "",
    customBudget: "",
    timeframe: "",
    file: null,
    consent: false,
  });

  const totalSteps = 6;

  // Update form data
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validate current step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName.trim().length > 0;
      case 2:
        return formData.organization.trim().length > 0;
      case 3:
        return formData.email.trim().length > 0 && 
               formData.phone.trim().length > 0 &&
               /\S+@\S+\.\S+/.test(formData.email);
      case 4:
        return formData.services.length > 0 && 
               formData.description.trim().length > 0;
      case 5:
        return formData.timeframe.length > 0;
      case 6:
        return formData.consent;
      default:
        return false;
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (isStepValid() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isStepValid() || isSubmitted) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for Supabase
      const leadData = {
        name: formData.fullName,
        email: formData.email,
        organization: formData.organization || null,
        role: formData.role || null,
        phone: formData.phone || null,
        country_code: formData.countryCode || null,
        interested_in: formData.services.join(', ') || null,
        other_service: formData.otherService || null,
        message: formData.description || null,
        budget: formData.budget || formData.customBudget || null,
        timeframe: formData.timeframe || null,
        file_path: formData.file ? formData.file.name : null,
        consent: formData.consent
      };

      // Submit to Supabase
      const { error } = await supabase
        .from('leads')
        .insert([leadData]);

      if (error) {
        console.error('Supabase error:', error);
        toast.error('Failed to submit form. Please try again.');
        setIsSubmitting(false);
        return;
      }

      toast.success('Form submitted successfully!');
      setIsSubmitted(true);
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Render current step
  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      isValid: isStepValid(),
    };

    switch (currentStep) {
      case 1:
        return <StepOne {...stepProps} />;
      case 2:
        return <StepTwo {...stepProps} />;
      case 3:
        return <StepThree {...stepProps} />;
      case 4:
        return <StepFour {...stepProps} />;
      case 5:
        return <StepFive {...stepProps} />;
      case 6:
        return <StepSix {...stepProps} />;
      default:
        return <StepOne {...stepProps} />;
    }
  };

  // Mount progress bar in header
  useEffect(() => {
    const container = document.getElementById("progress-container");
    if (container) {
      container.innerHTML = "";
      const progressElement = document.createElement("div");
      container.appendChild(progressElement);
      
      // You would render the ProgressBar component here
      // For now, we'll add it inline
    }
  }, [currentStep]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative">
      {/* Back Button */}
      <div className="flex justify-start mb-6">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="group flex items-center space-x-2 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
          <span className="group-hover:text-white transition-colors">
            Back
          </span>
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Main Form Container */}
      <div className="border border-border rounded-2xl bg-background shadow-card p-8 mb-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-navy mb-4">
            Let's discuss your project
          </h1>
        </div>

        {/* Form Steps Container */}
        <div className="relative">
          <div className="max-w-2xl mx-auto w-full">
            <div key={currentStep} className="animate-fade-in">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
          Step {currentStep} of {totalSteps}
        </div>

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="btn-primary flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isStepValid() || isSubmitting || isSubmitted}
            className="btn-accent flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isSubmitted ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{isSubmitted ? 'Submitted' : 'Submitting...'}</span>
              </>
            ) : (
              <>
                <span>Submit Request</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContactWizard;
