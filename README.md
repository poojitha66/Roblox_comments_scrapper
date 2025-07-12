# YouTube Hashtag Analyzer

A modern web application for analyzing YouTube videos associated with specific Roblox hashtags. This tool fetches video details, statistics, and comments for videos published within specified date ranges.

## 🚀 Live Demo

**[View Live Application](https://youtube-hashtag-analyzer.netlify.app)**

## 📸 Frontend Preview

### Main Interface
The application features a clean, modern interface with multiple sections for comprehensive hashtag analysis:

![YouTube Hashtag Analyzer Interface](https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

### Key Features Showcase

#### 🔑 API Configuration
- Secure YouTube Data API key input with show/hide functionality
- Direct links to Google Cloud Console for easy API key setup
- Clear instructions for obtaining API credentials

#### 🏷️ Hashtag Management
- Add hashtags individually or in bulk (comma-separated)
- Visual hashtag chips with easy removal
- Real-time validation and duplicate prevention

#### 📅 Date Range Selection
- Multiple customizable date ranges for comparative analysis
- Intuitive date picker interface
- Add/remove date ranges as needed

#### 📊 Real-time Progress Tracking
- Live progress bars for each hashtag being processed
- Status indicators (pending, running, completed, error)
- Real-time statistics showing videos found and comments collected

#### 📁 Results & Downloads
- Comprehensive results summary with total statistics
- Individual CSV file downloads for each hashtag
- Detailed file information showing video and comment counts

## ✨ Features

- **Multi-hashtag Analysis**: Analyze multiple Roblox hashtags simultaneously
- **Flexible Date Ranges**: Compare data across different time periods (2022-2023, 2023-2024, custom ranges)
- **Comprehensive Data Collection**: 
  - Video details (title, description, publish date)
  - Video statistics (view count, like count, dislike count)
  - Complete comment threads
- **Real-time Progress**: Live updates during the scraping process
- **CSV Export**: Download results in CSV format for further analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: YouTube Data API v3

## 📋 Prerequisites

- YouTube Data API v3 key from Google Cloud Console
- Modern web browser with JavaScript enabled

## 🚀 Getting Started

### Online Usage (Recommended)
1. Visit the [live application](https://youtube-hashtag-analyzer.netlify.app)
2. Enter your YouTube Data API key
3. Add hashtags you want to analyze
4. Configure date ranges
5. Click "Start Scraping" and wait for results
6. Download CSV files when complete

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open `http://localhost:5173` in your browser

## 📊 Output Format

The application generates CSV files with the following columns:

| Column | Description |
|--------|-------------|
| year | Year of video publication |
| date | Full publication date |
| videoId | YouTube video ID |
| videoUrl | Complete YouTube video URL |
| title | Video title |
| description | Video description |
| publishedAt | ISO timestamp of publication |
| viewCount | Number of views |
| likeCount | Number of likes |
| dislikeCount | Number of dislikes |
| textDisplay | Formatted comment text |
| textOriginal | Original comment text |

## 🔧 API Setup Guide

1. **Create Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable YouTube Data API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"

3. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated key

4. **Configure API Key**
   - Paste the key into the application's API key field
   - Optionally restrict the key to YouTube Data API for security

## 🎯 Use Cases

- **Content Research**: Analyze trending Roblox content and engagement patterns
- **Market Analysis**: Compare hashtag performance across different time periods
- **Community Insights**: Extract and analyze community feedback through comments
- **Competitive Analysis**: Study successful content strategies in the Roblox space

## 🔒 Privacy & Security

- API keys are stored locally in your browser session only
- No data is transmitted to external servers except YouTube's official API
- All processing happens client-side for maximum privacy

## 📈 Performance

- Asynchronous processing for optimal performance
- Rate limiting compliance with YouTube API guidelines
- Progress tracking for long-running operations
- Efficient memory usage for large datasets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Notes

- Respect YouTube's API usage limits and terms of service
- The application is designed specifically for Roblox-related hashtag analysis
- Ensure you have proper permissions for any data you collect
- API rate limits may affect processing speed for large datasets

---

**Built with ❤️ for the Roblox community**