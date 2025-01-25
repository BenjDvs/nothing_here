import yt_dlp
import sys
import json

def download_video(url, quality="720p", format_type="mp4"):
    options = {
        'format': f'bestvideo[height<={quality[:-1]}]+bestaudio/best',
        'merge_output_format': format_type,
        'outtmpl': '%(title)s.%(ext)s',
        'progress_hooks': [progress_hook],
        'retries': 10,  # Retry downloads
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        'force_generic_extractor': True,  # Use a generic extractor
    }

    with yt_dlp.YoutubeDL(options) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        print(json.dumps(info_dict))  # Send video info as JSON

def progress_hook(d):
    if d['status'] == 'downloading':
        print(f"Progress: {d['_percent_str']}")  # Show download progress
    elif d['status'] == 'finished':
        print("Download completed")

if __name__ == '__main__':
    url = sys.argv[1]
    download_video(url)
