from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os
import socket
import requests 
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
from threading import Thread
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

NOTES_FOLDER = os.path.join(os.path.dirname(__file__), 'notes')
os.makedirs(NOTES_FOLDER, exist_ok=True)

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

def send_metadata_to_django(file_id, filename, course_name, course_id, semester, creator):
    django_server_url = "http://127.0.0.1:8000/notes/"  
    peer_ip = get_local_ip()
    metadata = {
        "id": file_id,  
        "course_name": course_name,
        "course_id": course_id,
        "semester": semester,
        "creator": creator,
        "filename": filename,
        "peer_ip": peer_ip
    }
    try:
        response = requests.post(django_server_url, json=metadata)
        print(f"Metadata sent to Django: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Failed to send metadata to Django: {e}")

class NotesFolderHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        filename = os.path.basename(event.src_path)
        if filename.endswith('.pdf'):
            file_id = os.path.splitext(filename)[0]
            course_name = "Default Course"  # Replace with actual logic if needed
            course_id = "0000"  # Replace with actual logic if needed
            semester = "Default Semester"  # Replace with actual logic if needed
            creator = "Default Creator"  # Replace with actual logic if needed
            print(f"New file detected: {filename}")
            send_metadata_to_django(file_id, filename, course_name, course_id, semester, creator)

def start_file_watcher():
    event_handler = NotesFolderHandler()
    observer = Observer()
    observer.schedule(event_handler, NOTES_FOLDER, recursive=False)
    observer.start()
    print(f"Watching for changes in: {NOTES_FOLDER}")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

@app.route('/')
def index():
    return "Hello, Peer Service!"

@app.route('/file/<file_id>', methods=['GET'])
def serve_file(file_id):
    # filename = f"{file_id}.pdf"
    filename = file_id
    return send_from_directory(NOTES_FOLDER, filename)

@app.route('/upload', methods=['POST'])
def upload_note():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file provided'}), 400

    course_name = request.form.get('courseName')
    course_id = request.form.get('courseId')
    semester = request.form.get('semester')
    creator = request.form.get('creator')
    peer_ip = request.form.get('peerIp')
    filename = secure_filename(file.filename)
    file_id = os.path.splitext(filename)[0]

    file.save(os.path.join(NOTES_FOLDER, filename))

    send_metadata_to_django(
        file_id=file_id,
        filename=filename,
        course_name=course_name,
        course_id=course_id,
        semester=semester,
        creator=creator
    )

    return jsonify({'message': 'File uploaded and metadata sent'}), 200

@app.route('/ping')
def ping():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    print(f"Server running on: http://{get_local_ip()}:5000")
    # Start the file watcher in a separate thread
    watcher_thread = Thread(target=start_file_watcher, daemon=True)
    watcher_thread.start()
    app.run(debug=True, host='0.0.0.0', port=5000)