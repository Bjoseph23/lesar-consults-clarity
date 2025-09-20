import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface StepSixProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isValid: boolean;
}

const StepSix = ({ formData, updateFormData }: StepSixProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-2">
          Almost done!
        </h2>
        <p className="text-muted-foreground">
          Please review and confirm your consent to proceed.
        </p>
      </div>

      {/* Privacy Section */}
      <div className="bg-muted/60 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-primary" />
          <h3 className="font-semibold text-navy">Privacy & Consent</h3>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => updateFormData("consent", checked)}
            className="mt-1 w-5 h-5"
          />
          <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
            I agree to be contacted by Lesar Consults to proceed with my request.
          </Label>
        </div>

        {!formData.consent && (
          <p className="text-sm text-destructive ml-6">
            Please tick the box to continue.
          </p>
        )}

        <div className="text-xs text-muted-foreground mt-4 pl-6">
          <p className="mb-2">
            <strong>We respect your privacy</strong> and will never share your information.
          </p>
          <p>
            We'll use your details solely to respond to your request and provide relevant information about our services.
          </p>
        </div>
      </div>


      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Step 6 of 6 • Final Review
        </p>
      </div>
    </div>
  );
};

export default StepSix;