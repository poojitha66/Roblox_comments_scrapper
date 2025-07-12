import React, { useState } from 'react';
import { Hash, Plus, X } from 'lucide-react';

interface HashtagInputProps {
  hashtags: string[];
  onHashtagsChange: (hashtags: string[]) => void;
  disabled?: boolean;
}

export const HashtagInput: React.FC<HashtagInputProps> = ({ 
  hashtags, 
  onHashtagsChange, 
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState('');

  const addHashtag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !hashtags.includes(trimmed)) {
      onHashtagsChange([...hashtags, trimmed]);
      setInputValue('');
    }
  };

  const removeHashtag = (index: number) => {
    onHashtagsChange(hashtags.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHashtag();
    }
  };

  const handleBulkAdd = () => {
    const bulkHashtags = inputValue
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !hashtags.includes(tag));
    
    if (bulkHashtags.length > 0) {
      onHashtagsChange([...hashtags, ...bulkHashtags]);
      setInputValue('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Hashtags to Analyze</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter hashtag (e.g., roblox, robux, gaming)"
            disabled={disabled}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={addHashtag}
            disabled={disabled || !inputValue.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {inputValue.includes(',') && (
          <button
            onClick={handleBulkAdd}
            disabled={disabled}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors disabled:text-gray-400"
          >
            Add multiple hashtags separated by commas
          </button>
        )}

        {hashtags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Selected Hashtags ({hashtags.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  #{hashtag}
                  <button
                    onClick={() => removeHashtag(index)}
                    disabled={disabled}
                    className="text-green-600 hover:text-green-800 transition-colors disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Tip:</strong> Enter hashtags without the # symbol. You can add multiple hashtags 
            by separating them with commas, or add them one by one.
          </p>
        </div>
      </div>
    </div>
  );
};