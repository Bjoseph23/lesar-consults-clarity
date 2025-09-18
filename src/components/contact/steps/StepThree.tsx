import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepThreeProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isValid: boolean;
}

const StepThree = ({ formData, updateFormData }: StepThreeProps) => {
  const isEmailValid = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isPhoneValid = (phone: string) => {
    return /[\d\s\-\+\(\)]{8,}/.test(phone);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-2">
          How can we reach you?
        </h2>
        <p className="text-muted-foreground">
          We'll use this information to send you our proposal.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="your.email@organization.com"
            className="text-lg py-3"
            autoFocus
          />
          {formData.email && !isEmailValid(formData.email) && (
            <p className="text-sm text-destructive">Please enter a valid email address.</p>
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
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="+254 XXX XXX XXX"
            className="text-lg py-3"
          />
          {formData.phone && !isPhoneValid(formData.phone) && (
            <p className="text-sm text-destructive">Please enter a valid phone number.</p>
          )}
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Step 3 of 6 • Contact Information
        </p>
      </div>
    </div>
  );
};

export default StepThree;