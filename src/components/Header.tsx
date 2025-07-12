import React from 'react';
import { Youtube, Hash } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-red-600">
            <Youtube className="w-8 h-8" />
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              YouTube Hashtag Analyzer
            </h1>
            <p className="text-gray-600 text-sm">
              Analyze Roblox hashtags and extract video comments with ease
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};