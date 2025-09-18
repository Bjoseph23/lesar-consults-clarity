interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-muted-foreground">
        {currentStep}/{totalSteps}
      </span>
      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default ProgressBar;