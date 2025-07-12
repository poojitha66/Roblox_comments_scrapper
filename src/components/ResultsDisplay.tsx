import React from 'react';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { ScrapingJob } from '../App';

interface ResultsDisplayProps {
  jobs: ScrapingJob[];
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ jobs }) => {
  const completedJobs = jobs.filter(job => job.status === 'completed');
  
  if (completedJobs.length === 0) {
    return null;
  }

  const totalVideos = completedJobs.reduce((sum, job) => sum + job.videosFound, 0);
  const totalComments = completedJobs.reduce((sum, job) => sum + job.commentsCollected, 0);

  const handleDownload = (job: ScrapingJob) => {
    // In a real implementation, this would trigger the actual file download
    const csvContent = `year,date,videoId,videoUrl,title,description,publishedAt,viewCount,likeCount,dislikeCount,textDisplay,textOriginal
2023,2023-06-15,abc123,https://youtube.com/watch?v=abc123,Sample Video,Sample description,2023-06-15T10:00:00Z,1000,50,2,Great video!,Great video!`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job.hashtag}_combined_data.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Results Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{completedJobs.length}</div>
          <div className="text-sm text-blue-800">Hashtags Completed</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{totalVideos.toLocaleString()}</div>
          <div className="text-sm text-green-800">Total Videos</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{totalComments.toLocaleString()}</div>
          <div className="text-sm text-purple-800">Total Comments</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 mb-3">Download Results</h3>
        {completedJobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">#{job.hashtag}_combined_data.csv</h4>
                <p className="text-sm text-gray-600">
                  {job.videosFound} videos • {job.commentsCollected} comments
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(job)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-600">
          <strong>CSV Format:</strong> Each file contains columns for year, date, videoId, videoUrl, title, 
          description, publishedAt, viewCount, likeCount, dislikeCount, textDisplay, and textOriginal.
        </p>
      </div>
    </div>
  );
};