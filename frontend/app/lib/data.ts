import { Note } from '../types/note';

function mapNoteFromApi(apiNote: any): Note {
  return {
    id: apiNote.id,
    courseName: apiNote.course_name,
    courseId: apiNote.course_id,
    semester: apiNote.semester,
    creator: apiNote.creator,
    filename: apiNote.filename,
    peerIp: apiNote.peer_ip,
    uploadedDate: apiNote.uploaded_at,
    fileSize: apiNote.file_size ?? '', 
    fileType: apiNote.file_type ?? '', 
  };
}

export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/notes/');
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(mapNoteFromApi);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}