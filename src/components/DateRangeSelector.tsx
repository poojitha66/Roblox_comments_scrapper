import React from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { DateRange } from '../App';

interface DateRangeSelectorProps {
  dateRanges: DateRange[];
  onDateRangesChange: (dateRanges: DateRange[]) => void;
  disabled?: boolean;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRanges,
  onDateRangesChange,
  disabled = false
}) => {
  const addDateRange = () => {
    const newRange: DateRange = {
      start: '2024-01-01',
      end: '2024-12-31',
      label: '2024'
    };
    onDateRangesChange([...dateRanges, newRange]);
  };

  const updateDateRange = (index: number, field: keyof DateRange, value: string) => {
    const updated = dateRanges.map((range, i) => 
      i === index ? { ...range, [field]: value } : range
    );
    onDateRangesChange(updated);
  };

  const removeDateRange = (index: number) => {
    if (dateRanges.length > 1) {
      onDateRangesChange(dateRanges.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Date Ranges</h2>
        </div>
        <button
          onClick={addDateRange}
          disabled={disabled}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Range
        </button>
      </div>

      <div className="space-y-4">
        {dateRanges.map((range, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={range.label}
                  onChange={(e) => updateDateRange(index, 'label', e.target.value)}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={range.start}
                  onChange={(e) => updateDateRange(index, 'start', e.target.value)}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={range.end}
                  onChange={(e) => updateDateRange(index, 'end', e.target.value)}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeDateRange(index)}
                  disabled={disabled || dateRanges.length <= 1}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
        <p className="text-sm text-purple-800">
          <strong>Note:</strong> The scraper will analyze videos published within each date range. 
          Multiple date ranges allow you to compare data across different time periods.
        </p>
      </div>
    </div>
  );
};