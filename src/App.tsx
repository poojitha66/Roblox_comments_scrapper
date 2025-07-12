import { useState } from 'react';
import { Header } from './components/Header';
import { HashtagInput } from './components/HashtagInput';
import { DateRangeSelector } from './components/DateRangeSelector';
import { ScrapingProgress } from './components/ScrapingProgress';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ApiKeyInput } from './components/ApiKeyInput';

export interface DateRange {
  start: string;
  end: string;
  label: string;
}

export interface ScrapingJob {
  id: string;
  hashtag: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  videosFound: number;
  commentsCollected: number;
  error?: string;
  downloadUrl?: string;
}

function App() {
  const [apiKey, setApiKey] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [dateRanges, setDateRanges] = useState<DateRange[]>([
    { start: '2022-01-01', end: '2022-12-31', label: '2022' },
    { start: '2023-01-01', end: '2023-12-31', label: '2023' }
  ]);
  const [jobs, setJobs] = useState<ScrapingJob[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleStartScraping = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your YouTube API key');
      return;
    }

    if (hashtags.length === 0) {
      alert('Please add at least one hashtag');
      return;
    }

    setIsRunning(true);
    
    // Create jobs for each hashtag
    const newJobs: ScrapingJob[] = hashtags.map(hashtag => ({
      id: `${hashtag}-${Date.now()}`,
      hashtag,
      status: 'pending',
      progress: 0,
      videosFound: 0,
      commentsCollected: 0
    }));

    setJobs(newJobs);

    // Simulate scraping process
    for (const job of newJobs) {
      setJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, status: 'running' } : j
      ));

      // Simulate progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setJobs(prev => prev.map(j => 
          j.id === job.id ? { 
            ...j, 
            progress,
            videosFound: Math.floor(Math.random() * 50) + 10,
            commentsCollected: Math.floor(Math.random() * 500) + 100
          } : j
        ));
      }

      // Mark as completed
      setJobs(prev => prev.map(j => 
        j.id === job.id ? { 
          ...j, 
          status: 'completed',
          downloadUrl: `/downloads/${job.hashtag}_combined_data.csv`
        } : j
      ));
    }

    setIsRunning(false);
  };

  const handleClearResults = () => {
    setJobs([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <ApiKeyInput 
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
          />

          <HashtagInput 
            hashtags={hashtags}
            onHashtagsChange={setHashtags}
            disabled={isRunning}
          />

          <DateRangeSelector 
            dateRanges={dateRanges}
            onDateRangesChange={setDateRanges}
            disabled={isRunning}
          />

          <div className="flex gap-4">
            <button
              onClick={handleStartScraping}
              disabled={isRunning || hashtags.length === 0 || !apiKey.trim()}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isRunning ? 'Scraping in Progress...' : 'Start Scraping'}
            </button>

            {jobs.length > 0 && (
              <button
                onClick={handleClearResults}
                disabled={isRunning}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
              >
                Clear Results
              </button>
            )}
          </div>

          {jobs.length > 0 && (
            <>
              <ScrapingProgress jobs={jobs} />
              <ResultsDisplay jobs={jobs} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;