import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 mt-6 md:mt-8">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-primary transition-colors"
            aria-label="Go to homepage"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2" aria-hidden="true" />
            {item.href && index < items.length - 1 ? (
              <Link 
                to={item.href} 
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;