import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ResourceFiltersProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  categories: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  years: number[];
}

const ResourceFilters = ({
  sortBy,
  setSortBy,
  selectedCategories,
  setSelectedCategories,
  categories,
  selectedYear,
  setSelectedYear,
  years
}: ResourceFiltersProps) => {

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  const resetFilters = () => {
    setSortBy('newest');
    setSelectedCategories([]);
    setSelectedYear('');
  };

  const hasActiveFilters = sortBy !== 'newest' || selectedCategories.length > 0 || selectedYear;

  return (
    <div className="sticky top-24">
      <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">A → Z</SelectItem>
                <SelectItem value="z-a">Z → A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Categories
            </label>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>

            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-secondary/80"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Year Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Publication Year
            </label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Resource Types */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Resource Types
            </label>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-primary/20"></div>
                <span>Articles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-accent/20"></div>
                <span>Case Studies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-secondary/20"></div>
                <span>Reports</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-muted"></div>
                <span>Tools & Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-green-200"></div>
                <span>Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceFilters;