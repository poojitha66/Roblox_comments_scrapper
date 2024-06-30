# -*- coding: utf-8 -*-

# Sample Python code for youtube.commentThreads.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/code-samples#python

import os

import googleapiclient.discovery

def main():
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    DEVELOPER_KEY = "YOUR_API_KEY"

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey = DEVELOPER_KEY)

    request = youtube.commentThreads().list(
        part="id,snippet,replies",
        maxResults=40,
        order="time",
        pageToken="Z2V0X25ld2VzdF9maXJzdC0tQ2dnSWdBUVZGN2ZST0JJRkNJZ2dHQUFTQlFpb0lCZ0FFZ1VJblNBWUFSSUZDSWtnR0FBU0JRaUhJQmdBR0FBaURRb0xDTFg5OGJJR0VOaWgxQkE=",
        videoId="Bvl4jG-c3fQ"
    )
    response = request.execute()

    print(response)

if __name__ == "__main__":
    main()