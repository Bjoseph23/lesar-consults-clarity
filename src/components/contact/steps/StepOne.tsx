import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepOneProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isValid: boolean;
}

const StepOne = ({ formData, updateFormData }: StepOneProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-2">
          Let's start with your name
        </h2>
        <p className="text-muted-foreground">
          Please enter your full name as you'd like us to call you.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name *
        </Label>
        <Input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => updateFormData("fullName", e.target.value)}
          placeholder="Enter your full name"
          className="text-lg py-3 placeholder:text-sm sm:placeholder:text-base"
          autoFocus
        />
        {formData.fullName && formData.fullName.length < 2 && (
          <p className="text-sm text-destructive">Please enter your full name.</p>
        )}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Step 1 of 6 • Contact Information
        </p>
      </div>
    </div>
  );
};

export default StepOne;