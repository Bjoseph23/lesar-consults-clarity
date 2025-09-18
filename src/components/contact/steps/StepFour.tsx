import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface StepFourProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isValid: boolean;
}

const StepFour = ({ formData, updateFormData }: StepFourProps) => {
  const services = [
    "Health Systems Strengthening",
    "Financial Analysis and Economics", 
    "Customized Research, Analysis & Surveys",
    "Monitoring and Evaluation (M&E)",
    "Human Resource Management, Capacity Building & Training",
    "Policy & Advocacy Development",
    "Project Management",
    "Other"
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    const currentServices = formData.services || [];
    if (checked) {
      updateFormData("services", [...currentServices, service]);
    } else {
      updateFormData("services", currentServices.filter((s: string) => s !== service));
      if (service === "Other") {
        updateFormData("otherService", "");
      }
    }
  };

  const characterCount = formData.description?.length || 0;
  const isDescriptionValid = characterCount >= 50 && characterCount <= 600;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-2">
          What services do you need?
        </h2>
        <p className="text-muted-foreground">
          Select all services that apply to your project.
        </p>
      </div>

      <div className="space-y-6">
        {/* Services Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Services Interested *</Label>
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service} className="flex items-start space-x-3">
                <Checkbox
                  id={service}
                  checked={formData.services?.includes(service) || false}
                  onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                />
                <Label htmlFor={service} className="text-sm leading-relaxed cursor-pointer">
                  {service}
                </Label>
              </div>
            ))}
          </div>
          
          {formData.services?.includes("Other") && (
            <div className="mt-3">
              <Input
                placeholder="Please specify other service"
                value={formData.otherService}
                onChange={(e) => updateFormData("otherService", e.target.value)}
                className="ml-6"
              />
            </div>
          )}

          {formData.services?.length === 0 && (
            <p className="text-sm text-destructive">Please select at least one service.</p>
          )}
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Brief Description of Project *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            placeholder="Please describe your project needs, objectives, timeline, and any specific requirements..."
            rows={4}
            maxLength={600}
            className="resize-none"
          />
          <div className="flex justify-between text-xs">
            <span className={characterCount < 50 ? "text-destructive" : "text-muted-foreground"}>
              {characterCount < 50 ? `${50 - characterCount} more characters needed` : ""}
            </span>
            <span className={characterCount > 600 ? "text-destructive" : "text-muted-foreground"}>
              {characterCount}/600 characters
            </span>
          </div>
          {characterCount > 0 && !isDescriptionValid && (
            <p className="text-sm text-destructive">
              Description must be between 50-600 characters.
            </p>
          )}
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Step 4 of 6 • Project Details
        </p>
      </div>
    </div>
  );
};

export default StepFour;