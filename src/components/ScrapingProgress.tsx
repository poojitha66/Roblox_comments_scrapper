import React from 'react';
import { Activity, CheckCircle, XCircle, Clock } from 'lucide-react';
import { ScrapingJob } from '../App';

interface ScrapingProgressProps {
  jobs: ScrapingJob[];
}

export const ScrapingProgress: React.FC<ScrapingProgressProps> = ({ jobs }) => {
  const getStatusIcon = (status: ScrapingJob['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'running':
        return <Activity className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: ScrapingJob['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getProgressBarColor = (status: ScrapingJob['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'running':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Scraping Progress</h2>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(job.status)}
                <div>
                  <h3 className="font-medium text-gray-900">#{job.hashtag}</h3>
                  <p className="text-sm text-gray-600">
                    {job.videosFound} videos found • {job.commentsCollected} comments collected
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(job.status)}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(job.status)}`}
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>

            {job.error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{job.error}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};