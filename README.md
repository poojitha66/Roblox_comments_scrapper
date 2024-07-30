# YouTube Hashtag Analyzer

This Python script analyses YouTube videos associated with specific Roblox hashtags. It fetches video details, statistics, and comments for videos published within specified date ranges.

## Working

- Fetch video details for multiple hashtags
- Collect data for two distinct date ranges (2022-2023 and 2023-2024)
- Retrieve video statistics (view count, like count, dislike count)
- Gather comments for each video
- Combine all data into a single CSV file for each hashtag

## Prerequisites

- Python 3.7+
- `google-api-python-client` library
- `pandas` library
- YouTube Data API credentials

## Usage

1. Set up your YouTube Data API credentials and initialize the `youtube` object (not shown in the provided code).
2. Run the script:(ipynb file)
3. When prompted, enter the hashtags you want to analyze, separated by commas.
4. The script will fetch data for each hashtag and save it to a CSV file named `{hashtag}_combined_data.csv`.

## Main Functions

- `fetch_video_details`: Retrieves basic information about videos for a given hashtag and date range.
- `fetch_video_statistics`: Collects view counts, like counts, and dislike counts for the videos.
- `fetch_comments`: Gathers comments for each video.
- `main`: Orchestrates the data collection process and saves the results to a CSV file.

## Output

The script generates a CSV file for each hashtag with the following columns:

- year
- date
- videoId
- videoUrl
- title
- description
- publishedAt
- viewCount
- likeCount
- dislikeCount
- textDisplay (comment text)
- textOriginal (original comment text)


This script uses asynchronous programming to improve performance when making multiple API requests. Make sure to respect YouTube's API usage limits and terms of service when using this script.
