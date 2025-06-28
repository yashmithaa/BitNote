from flask import Flask, send_from_directory, request, jsonify
import os
import socket
import requests 

app = Flask(__name__)

NOTES_FOLDER = os.path.join(os.path.dirname(__file__), 'notes')
os.makedirs(NOTES_FOLDER, exist_ok=True)

def get_local_ip():
    try:
        return socket.gethostbyname_ex(socket.gethostname())[-1][-1]
    except Exception:
        return "127.0.0.1"

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

@app.route('/')
def index():
    return "Hello, Peer Service!"

@app.route('/file/<file_id>', methods=['POST'])
def save_file(file_id):
    
    filename = f"{file_id}.pdf"
    file_path = os.path.join(NOTES_FOLDER, filename)

    with open(file_path, 'wb') as f:
        f.write(request.data) 

    # Example metadata
    course_name = request.headers.get('Course-Name', 'Unknown Course')
    course_id = request.headers.get('Course-ID', 'Unknown Course ID')
    semester = request.headers.get('Semester', 'Unknown Semester')
    creator = request.headers.get('Creator', 'Unknown Creator')

    send_metadata_to_django(file_id, filename, course_name, course_id, semester, creator)
    return jsonify({"message": "File saved and metadata sent successfully."})

@app.route('/file/<file_id>', methods=['GET'])
def serve_file(file_id):
    filename = f"{file_id}.pdf"
    return send_from_directory(NOTES_FOLDER, filename)

if __name__ == '__main__':
    print(f"Server running on: http://{get_local_ip()}:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)