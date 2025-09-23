import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface SortFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  categories: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  years: number[];
  resultsCount: number;
}

const SortFilterModal = ({
  isOpen,
  onClose,
  sortBy,
  setSortBy,
  selectedCategories,
  setSelectedCategories,
  categories,
  selectedYear,
  setSelectedYear,
  years,
  resultsCount
}: SortFilterModalProps) => {
  // Local state for temporary changes
  const [tempSortBy, setTempSortBy] = useState(sortBy);
  const [tempSelectedCategories, setTempSelectedCategories] = useState(selectedCategories);
  const [tempSelectedYear, setTempSelectedYear] = useState(selectedYear);

  // Update local state when props change
  useEffect(() => {
    setTempSortBy(sortBy);
    setTempSelectedCategories(selectedCategories);
    setTempSelectedYear(selectedYear);
  }, [sortBy, selectedCategories, selectedYear, isOpen]);

  const handleCategoryToggle = (category: string) => {
    setTempSelectedCategories(
      tempSelectedCategories.includes(category)
        ? tempSelectedCategories.filter(c => c !== category)
        : [...tempSelectedCategories, category]
    );
  };

  const handleReset = () => {
    setTempSortBy('newest');
    setTempSelectedCategories([]);
    setTempSelectedYear('all');
  };

  const handleApply = () => {
    setSortBy(tempSortBy);
    setSelectedCategories(tempSelectedCategories);
    setSelectedYear(tempSelectedYear);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sort & Filter</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Sort By
            </label>
            <Select value={tempSortBy} onValueChange={setTempSortBy}>
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
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`modal-category-${category}`}
                    checked={tempSelectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <label
                    htmlFor={`modal-category-${category}`}
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors flex-1"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>

            {/* Selected Categories */}
            {tempSelectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tempSelectedCategories.map((category) => (
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
            <Select value={tempSelectedYear} onValueChange={setTempSelectedYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1"
          >
            Show ({resultsCount})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SortFilterModal;