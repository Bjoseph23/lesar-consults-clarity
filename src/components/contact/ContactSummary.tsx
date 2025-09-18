import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactData {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  services: string[];
  description: string;
  budget: string;
  timeframe: string;
  file: File | null;
  consent: boolean;
}

interface ContactSummaryProps {
  data: ContactData;
}

const ContactSummary = ({ data }: ContactSummaryProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-elegant p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Your proposal request has been submitted successfully. We'll get back to you within 2 business days.
        </p>

        {/* Summary Details */}
        <div className="bg-muted/30 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4">
            Submission Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span> {data.fullName}
            </div>
            <div>
              <span className="font-medium">Organization:</span> {data.organization}
            </div>
            {data.role && (
              <div>
                <span className="font-medium">Role:</span> {data.role}
              </div>
            )}
            <div>
              <span className="font-medium">Email:</span> {data.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {data.phone}
            </div>
            {data.budget && (
              <div>
                <span className="font-medium">Budget:</span> {data.budget}
              </div>
            )}
            {data.timeframe && (
              <div>
                <span className="font-medium">Timeframe:</span> {data.timeframe}
              </div>
            )}
            {data.file && (
              <div>
                <span className="font-medium">File:</span> {data.file.name}
              </div>
            )}
          </div>
          
          {data.services.length > 0 && (
            <div className="mt-4">
              <span className="font-medium">Services:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {data.description && (
            <div className="mt-4">
              <span className="font-medium">Description:</span>
              <p className="mt-1 text-muted-foreground">{data.description}</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-serif font-semibold text-primary mb-3">
            What Happens Next?
          </h3>
          <div className="text-left space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">1</span>
              <span>We'll review your request and project requirements</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">2</span>
              <span>Our team will prepare a customized proposal for your needs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">3</span>
              <span>We'll reach out within 2 business days to discuss next steps</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            asChild
            className="flex items-center gap-2"
          >
            <a href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
          </Button>
          <Button
            asChild
            className="bg-accent hover:bg-accent/90"
          >
            <a href="/#projects">
              View Our Case Studies
            </a>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Redirecting to home page in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default ContactSummary;