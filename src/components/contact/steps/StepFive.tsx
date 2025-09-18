import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface StepFiveProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isValid: boolean;
}

const StepFive = ({ formData, updateFormData }: StepFiveProps) => {
  const budgetOptions = [
    "< KSh 500,000",
    "KSh 500,000 – 2,500,000", 
    "KSh 2,500,000 – 10,000,000",
    "> KSh 10,000,000",
    "Prefer not to say",
    "Custom"
  ];

  const timeframeOptions = [
    "ASAP",
    "Within 1 month",
    "1–3 months", 
    "3–6 months",
    "6+ months",
    "Undecided"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        alert("File size must be less than 20MB");
        return;
      }
      
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        alert("Please upload a PDF, DOC, or DOCX file");
        return;
      }
      
      updateFormData("file", file);
    }
  };

  const removeFile = () => {
    updateFormData("file", null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-navy mb-2">
          Project timeline and budget
        </h2>
        <p className="text-muted-foreground">
          Help us understand your project scope and timeline.
        </p>
      </div>

      <div className="space-y-6">
        {/* Budget */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Estimated Budget</Label>
          <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {formData.budget === "Custom" && (
            <div className="mt-3">
              <Input
                placeholder="Enter budget amount in KSh"
                value={formData.customBudget}
                onChange={(e) => updateFormData("customBudget", e.target.value)}
                type="text"
              />
            </div>
          )}
          <p className="text-xs text-muted-foreground">Optional</p>
        </div>

        {/* Timeframe */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Proposed Timeframe *</Label>
          <Select value={formData.timeframe} onValueChange={(value) => updateFormData("timeframe", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!formData.timeframe && (
            <p className="text-sm text-destructive">Please select a timeframe.</p>
          )}
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Upload File</Label>
          <div className="space-y-3">
            {!formData.file ? (
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload project documents, RFP, or requirements
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PDF, DOC, or DOCX • Max 20MB
                </p>
                <Button variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="border border-muted rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{formData.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(formData.file.size)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Optional</p>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Step 5 of 6 • Project Scope
        </p>
      </div>
    </div>
  );
};

export default StepFive;