import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDesktopFocus } from "@/hooks/useDesktopFocus";

interface StepTwoProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isValid: boolean;
}

const StepTwo = ({ formData, updateFormData }: StepTwoProps) => {
  const shouldAutoFocus = useDesktopFocus();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-2">
          Tell us about your organization
        </h2>
        <p className="text-muted-foreground">
          Help us understand where you work.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="organization" className="text-sm font-medium">
            Organization / Institution *
          </Label>
          <Input
            id="organization"
            type="text"
            value={formData.organization}
            onChange={(e) => updateFormData("organization", e.target.value)}
            placeholder="Enter your organization name"
            className="text-lg py-3"
            autoFocus={shouldAutoFocus}
          />
          {formData.organization && formData.organization.length < 2 && (
            <p className="text-sm text-destructive">Please enter your organization name.</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium">
            Role / Job Title
          </Label>
          <Input
            id="role"
            type="text"
            value={formData.role}
            onChange={(e) => updateFormData("role", e.target.value)}
            placeholder="e.g. Project Manager, Director, Consultant"
            className="text-lg py-3"
          />
          <p className="text-xs text-muted-foreground">Optional</p>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Step 2 of 6 • Organization Details
        </p>
      </div>
    </div>
  );
};

export default StepTwo;