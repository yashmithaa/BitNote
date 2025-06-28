'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { FilterOptions } from '../types/note';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
}: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      courseName: '',
      courseId: '',
      semester: '',
      creator: '',
      filename: '',
      peerIp: '',
      uploadedDate: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center justify-between md:col-span-2 lg:col-span-3">
            <h3 className="text-sm font-medium">Filter Options</h3>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Course Name
            </label>
            <Input
              placeholder="e.g., Computer Networks"
              value={filters.courseName}
              onChange={(e) => handleFilterChange('courseName', e.target.value)}
              className="h-8"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Course ID
            </label>
            <Input
              placeholder="e.g., CS301"
              value={filters.courseId}
              onChange={(e) => handleFilterChange('courseId', e.target.value)}
              className="h-8"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Semester
            </label>
            <Input
              placeholder="e.g., Fall 2024"
              value={filters.semester}
              onChange={(e) => handleFilterChange('semester', e.target.value)}
              className="h-8"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Creator
            </label>
            <Input
              placeholder="e.g., John Doe"
              value={filters.creator}
              onChange={(e) => handleFilterChange('creator', e.target.value)}
              className="h-8"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Filename
            </label>
            <Input
              placeholder="e.g., networking-fundamentals"
              value={filters.filename}
              onChange={(e) => handleFilterChange('filename', e.target.value)}
              className="h-8"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Peer IP
            </label>
            <Input
              placeholder="e.g., 192.168.1.101"
              value={filters.peerIp}
              onChange={(e) => handleFilterChange('peerIp', e.target.value)}
              className="h-8"
            />
          </div>
        </div>
      )}
    </div>
  );
}