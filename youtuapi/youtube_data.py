import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
import csv
from iteration_utilities import unique_everseen
from datetime import datetime as dt

# Load API key from .env file
load_dotenv()
API_KEY = os.getenv("API_KEY")

# Initialize YouTube API client
youtube = build("youtube", "v3", developerKey=API_KEY)

# Get today's date for CSV filenames
today = dt.today().strftime('%d-%m-%Y')

def search_videos_by_hashtag(hashtag):
    """
    Search for all videos using a hashtag and handle pagination to retrieve all video IDs.
    """
    video_ids = []
    try:
        request = youtube.search().list(
            part="snippet",
            q=f"#{hashtag}",
            maxResults=50  # Maximum results per request
        )
        response = request.execute()
        video_ids.extend([item['id']['videoId'] for item in response['items'] if 'videoId' in item['id']])
        
        while 'nextPageToken' in response:
            request = youtube.search().list(
                part="snippet",
                q=f"#{hashtag}",
                maxResults=50,
                pageToken=response['nextPageToken']
            )
            response = request.execute()
            video_ids.extend([item['id']['videoId'] for item in response['items'] if 'videoId' in item['id']])
    except Exception as e:
        print(f"Error fetching videos for #{hashtag}: {e}")
    
    return video_ids

def comment_threads(videoID):
    """
    Fetch comments for a given video ID.
    """
    comments_list = []
    try:
        request = youtube.commentThreads().list(
            part='id,replies,snippet',
            videoId=videoID,
            maxResults=100  # Maximum results per request
        )
        response = request.execute()
        comments_list.extend(process_comments(response['items']))

        # if there is nextPageToken, then keep calling the API
        while response.get('nextPageToken', None):
            request = youtube.commentThreads().list(
                part='id,replies,snippet',
                videoId=videoID,
                pageToken=response['nextPageToken'],
                maxResults=100
            )
            response = request.execute()
            comments_list.extend(process_comments(response['items']))

        comments_list = list(unique_everseen(comments_list))
        print(f"Finished fetching comments for {videoID}. {len(comments_list)} comments found.")

    except Exception as e:
        print(f"Error fetching comments for {videoID}: {e}")

    return comments_list

def process_comments(response_items):
    """
    Process comments from the API response.
    """
    comments = []
    for res in response_items:
        # Handle replies
        if 'replies' in res.keys():
            for reply in res['replies']['comments']:
                comment = reply['snippet']
                comment['commentId'] = reply['id']
                comments.append(comment)
        else: # Handle top-level comments
            comment = res['snippet']['topLevelComment']['snippet']
            comment['parentId'] = None
            comment['commentId'] = res['snippet']['topLevelComment']['id']
            comments.append(comment)
    return comments

def make_csv(comments, filename):
    """
    Save comments to a CSV file.
    """
    if not comments:
        print("No comments to write to CSV.")
        return

    header = comments[0].keys()
    with open(filename, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(comments)

def fetch_comments(videoIDs, to_csv=False):
    """
    Fetch comments for multiple video IDs.
    """
    all_comments = []
    for videoID in videoIDs:
        comments = comment_threads(videoID)
        all_comments.extend(comments)
    
    if to_csv:
        filename = f'comments_{today}.csv'
        make_csv(all_comments, filename)
    
    return all_comments

if __name__ == '__main__':
    hashtags = input("Enter hashtags separated by commas: ").split(',')
    hashtags = [hashtag.strip() for hashtag in hashtags]  # Clean up whitespace

    all_video_ids = []
    for hashtag in hashtags:
        video_ids = search_videos_by_hashtag(hashtag)
        print(f"Video IDs for #{hashtag}: {video_ids}")
        all_video_ids.extend(video_ids)

    response = fetch_comments(all_video_ids, to_csv=True)
    print(response)
