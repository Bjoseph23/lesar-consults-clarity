import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Loader2 } from "lucide-react";
import { validateEmail, validatePhone, validateFile } from "@/lib/contact-helpers";

const SERVICES = [
  "Health Systems Strengthening",
  "Financial Analysis and Economics", 
  "Customized Research, Analysis & Surveys",
  "Monitoring and Evaluation (M&E)",
  "Human Resource Management, Capacity Building & Training",
  "Policy & Advocacy Development",
  "Project Management",
  "Other"
];

const BUDGETS = [
  "< KSh 500,000",
  "KSh 500,000 – 2,500,000", 
  "KSh 2,500,000 – 10,000,000",
  "> KSh 10,000,000",
  "Prefer not to say"
];

const TIMEFRAMES = [
  "Within 1 month",
  "1–3 months",
  "3–6 months", 
  "6+ months",
  "TBD"
];

interface ContactFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  prefillService?: string;
  prefillSource?: string;
}

const ContactForm = ({ onSubmit, isSubmitting, prefillService = '', prefillSource = '' }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    services: [] as string[],
    description: '',
    budget: '',
    timeframe: '',
    file: null as File | null,
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [charCount, setCharCount] = useState(0);

  // Prefill service if provided in URL
  useEffect(() => {
    if (prefillService && SERVICES.includes(prefillService)) {
      setFormData(prev => ({
        ...prev,
        services: [prefillService]
      }));
    }
  }, [prefillService]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Handle description character count
    if (field === 'description') {
      setCharCount(value.length);
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, file: validation.error || '' }));
      return;
    }

    setFormData(prev => ({ ...prev, file }));
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Please enter your organization.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your project needs.';
    } else if (formData.description.length > 600) {
      newErrors.description = 'Description must be 600 characters or less.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please agree to be contacted.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const isFormValid = formData.fullName && formData.organization && formData.email && 
                     formData.phone && formData.services.length > 0 && formData.description && 
                     formData.consent && Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name *
        </Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Enter your full name"
          className={errors.fullName ? 'border-destructive' : ''}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-sm text-destructive">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Organization & Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="organization" className="text-sm font-medium">
            Organization / Institution *
          </Label>
          <Input
            id="organization"
            value={formData.organization}
            onChange={(e) => handleInputChange('organization', e.target.value)}
            placeholder="Enter your organization"
            className={errors.organization ? 'border-destructive' : ''}
            aria-invalid={!!errors.organization}
            aria-describedby={errors.organization ? 'organization-error' : undefined}
          />
          {errors.organization && (
            <p id="organization-error" className="text-sm text-destructive">
              {errors.organization}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium">
            Role / Job Title
          </Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            placeholder="Your role or position"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            className={errors.email ? 'border-destructive' : ''}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+254 XXX XXX XXX"
            className={errors.phone ? 'border-destructive' : ''}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-destructive">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Services Interested */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Services of Interest *
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICES.map((service) => (
            <label
              key={service}
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={formData.services.includes(service)}
                onCheckedChange={() => handleServiceChange(service)}
              />
              <span className="text-sm">{service}</span>
            </label>
          ))}
        </div>
        {formData.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.services.map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleServiceChange(service)}
                />
              </Badge>
            ))}
          </div>
        )}
        {errors.services && (
          <p className="text-sm text-destructive">{errors.services}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Brief Description of Needs *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Please provide a brief description of your project, timeline, and specific requirements..."
          rows={4}
          maxLength={600}
          className={errors.description ? 'border-destructive' : ''}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : 'description-help'}
        />
        <div className="flex justify-between">
          <span id="description-help" className="text-xs text-muted-foreground">
            300-600 characters recommended
          </span>
          <span className={`text-xs ${charCount > 600 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {charCount}/600
          </span>
        </div>
        {errors.description && (
          <p id="description-error" className="text-sm text-destructive">
            {errors.description}
          </p>
        )}
      </div>

      {/* Budget & Timeframe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-medium">
            Estimated Budget
          </Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {BUDGETS.map((budget) => (
                <SelectItem key={budget} value={budget}>
                  {budget}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframe" className="text-sm font-medium">
            Proposed Timeframe
          </Label>
          <Select value={formData.timeframe} onValueChange={(value) => handleInputChange('timeframe', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {TIMEFRAMES.map((timeframe) => (
                <SelectItem key={timeframe} value={timeframe}>
                  {timeframe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label htmlFor="file" className="text-sm font-medium">
          Upload a File (Optional)
        </Label>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          {formData.file ? (
            <div className="flex items-center justify-between bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{formData.file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(formData.file.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label htmlFor="file" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Choose a file to upload</p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF or DOCX only. Max 20MB.
              </p>
              <input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        {errors.file && (
          <p className="text-sm text-destructive">{errors.file}</p>
        )}
      </div>

      {/* Consent */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) => handleInputChange('consent', checked)}
          className={errors.consent ? 'border-destructive' : ''}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
        />
        <Label htmlFor="consent" className="text-sm leading-relaxed">
          I agree to be contacted and to Lesar Consults' 
          <a href="#" className="text-primary hover:underline ml-1">privacy policy</a>. *
        </Label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="text-sm text-destructive ml-7">
          {errors.consent}
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-white py-3"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </Button>
    </form>
  );
};

export default ContactForm;