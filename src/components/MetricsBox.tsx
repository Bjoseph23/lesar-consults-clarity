import { Badge } from "@/components/ui/badge";
import { formatCurrency, convertToUSD } from "@/lib/currency";

interface Metric {
  label: string;
  value: string;
  type?: "Reported" | "Estimated" | "Projected";
}

interface MetricsBoxProps {
  metrics: Metric[];
  valueOriginal?: { amount: number; currency: string };
  valueOriginalLocal?: { amount: number; currency: string };
  valueUsd?: number;
  tenderValue?: { amount: number; currency: string };
  tenderValueUsd?: number;
  className?: string;
  size?: "small" | "large";
}

const MetricsBox = ({ 
  metrics, 
  valueOriginal, 
  valueOriginalLocal, 
  valueUsd,
  tenderValue,
  tenderValueUsd,
  className = "",
  size = "small"
}: MetricsBoxProps) => {
  const getTypeColor = (type?: string) => {
    switch (type) {
      case "Reported":
        return "bg-green-100 text-green-800";
      case "Estimated":
        return "bg-blue-100 text-blue-800";
      case "Projected":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderProjectValue = () => {
    if (tenderValue && tenderValueUsd) {
      return (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600 mb-1">
            {formatCurrency(tenderValueUsd)}
          </div>
          <div className="text-xs text-navy/70">
            ({tenderValue.currency} {tenderValue.amount.toLocaleString()} — tender value)
          </div>
          <div className="text-xs text-navy font-medium">
            Tender Value
          </div>
        </div>
      );
    }

    if (valueOriginal) {
      return (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600 mb-1">
            {formatCurrency(valueOriginal.amount, valueOriginal.currency)}
          </div>
          <div className="text-xs text-navy font-medium">
            Project Value
          </div>
        </div>
      );
    }

    if (valueOriginalLocal) {
      const usdValue = valueUsd || convertToUSD(valueOriginalLocal.amount, valueOriginalLocal.currency);
      return (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600 mb-1">
            {formatCurrency(usdValue)}
            {!valueUsd && <span className="text-xs text-navy/50 ml-1">(approx.)</span>}
          </div>
          <div className="text-xs text-navy/70">
            ({valueOriginalLocal.currency} {valueOriginalLocal.amount.toLocaleString()} — original amount)
          </div>
          <div className="text-xs text-navy font-medium">
            Project Value
          </div>
        </div>
      );
    }

    return null;
  };

  const hasEstimatedMetrics = metrics.some(metric => metric.type === "Estimated" || metric.type === "Projected");

  return (
    <div className={`bg-white rounded-lg border border-navy/10 ${className}`}>
      <div className={`${size === "large" ? "p-6" : "p-4"}`}>
        <div className={`grid ${size === "large" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2"} gap-4`}>
          {renderProjectValue()}
          
          {metrics.slice(0, size === "large" ? 6 : 2).map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg font-bold text-green-600 mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-navy mb-2">
                {metric.label}
              </div>
              {metric.type && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getTypeColor(metric.type)}`}
                >
                  {metric.type}
                </Badge>
              )}
            </div>
          ))}
        </div>
        
        {hasEstimatedMetrics && (
          <div className="mt-4 pt-3 border-t border-navy/10">
            <p className="text-xs text-navy/60 text-center">
              Metrics marked 'Estimated' are conservative projections for display and are editable in data/projects.json.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsBox;