import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Counters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const stats = [
    { label: "Years Experience", value: 8, suffix: "+" },
    { label: "Projects Delivered", value: 50, suffix: "+" },
    { label: "Countries Served", value: 5, suffix: "" },
    { label: "Lives Impacted", value: 100000, suffix: "+" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) {
            setHasAnimated(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, value]);

    const formatNumber = (num: number) => {
      if (num >= 100000) {
        return Math.floor(num / 1000) + "K";
      }
      return num.toLocaleString();
    };

    return (
      <span className="animate-counter">
        {formatNumber(count)}{suffix}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className={`py-20 bg-primary text-primary-foreground transition-all duration-1000 ${titleVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-1000 ${titleVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}
              style={{ animationDelay: titleVisible ? `${index * 0.2}s` : '0s' }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;