# youtube_comment_scrapper
This project provides a structured way to gather and analyze YouTube comments based on hashtags and keywords

#### Description:
This project contains a script for scraping comments from YouTube videos based on specified hashtags. The script uses the YouTube Data API to search for videos containing the specified hashtags, fetches comments from those videos, and optionally saves the comments to a CSV file. This project is useful for collecting and analyzing user comments for sentiment analysis, market research, or other data-driven purposes.

#### Key Features:
- **Hashtag Search**: Searches YouTube for videos containing specific hashtags.
- **Comment Fetching**: Retrieves comments from the identified videos, including replies.
- **Pagination Handling**: Manages pagination to ensure all comments are fetched.
- **CSV Export**: Saves the collected comments to a CSV file for further analysis.

#### Requirements:
- Python 3.x
- **Install virtualenv**: pip install virtualenv
- **Create the Virtual Environment**: python -m venv youtube
- **Activate the Virtual Environment**: cd youtube\Scripts\activate
- **Install Required Packages**: pip install google-api-python-client python-dotenv iteration_utilities
- `google-api-python-client` library
- `python-dotenv` library
- `iteration_utilities` library

#### Files:
- `youtube_data.py`: Main script to search videos, fetch comments, and save to CSV.
- `.env`: Environment file to store the YouTube API key.

#### Usage:
1. Ensure you have a YouTube Data API key and add it to the `.env` file.
2. Run the script `youtube_data.py`.
3. Enter hashtags separated by commas when prompted.
4. The script will fetch comments from videos containing the specified hashtags and save them to a CSV file named `comments.csv`.


