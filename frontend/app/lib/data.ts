import { Note } from '../types/note';

// export const mockNotes: Note[] = [
//   {
//     id: '1',
//     courseName: 'Computer Networks',
//     courseId: 'CS301',
//     semester: 'Fall 2024',
//     creator: 'John Doe',
//     filename: 'networking-fundamentals.pdf',
//     peerIp: '192.168.1.101',
//     uploadedDate: '2024-06-15',
//     fileSize: '2.5 MB',
//     fileType: 'PDF'
//   },
//   {
//     id: '2',
//     courseName: 'Database Management Systems',
//     courseId: 'CS302',
//     semester: 'Fall 2024',
//     creator: 'Jane Smith',
//     filename: 'sql-queries-cheatsheet.docx',
//     peerIp: '192.168.1.102',
//     uploadedDate: '2024-06-14',
//     fileSize: '1.8 MB',
//     fileType: 'DOCX'
//   },
//   {
//     id: '3',
//     courseName: 'Algorithms and Data Structures',
//     courseId: 'CS201',
//     semester: 'Spring 2024',
//     creator: 'Mike Johnson',
//     filename: 'sorting-algorithms-notes.pdf',
//     peerIp: '192.168.1.103',
//     uploadedDate: '2024-06-13',
//     fileSize: '3.2 MB',
//     fileType: 'PDF'
//   },
//   {
//     id: '4',
//     courseName: 'Operating Systems',
//     courseId: 'CS303',
//     semester: 'Fall 2024',
//     creator: 'Sarah Wilson',
//     filename: 'process-management.pptx',
//     peerIp: '192.168.1.104',
//     uploadedDate: '2024-06-12',
//     fileSize: '4.1 MB',
//     fileType: 'PPTX'
//   },
//   {
//     id: '5',
//     courseName: 'Machine Learning',
//     courseId: 'CS401',
//     semester: 'Spring 2024',
//     creator: 'Alex Brown',
//     filename: 'linear-regression-tutorial.pdf',
//     peerIp: '192.168.1.105',
//     uploadedDate: '2024-06-11',
//     fileSize: '5.7 MB',
//     fileType: 'PDF'
//   },
//   {
//     id: '6',
//     courseName: 'Web Development',
//     courseId: 'CS304',
//     semester: 'Fall 2024',
//     creator: 'Emily Davis',
//     filename: 'react-components-guide.md',
//     peerIp: '192.168.1.106',
//     uploadedDate: '2024-06-10',
//     fileSize: '890 KB',
//     fileType: 'MD'
//   },
//   {
//     id: '7',
//     courseName: 'Computer Graphics',
//     courseId: 'CS402',
//     semester: 'Spring 2024',
//     creator: 'David Lee',
//     filename: '3d-modeling-basics.pdf',
//     peerIp: '192.168.1.107',
//     uploadedDate: '2024-06-09',
//     fileSize: '6.3 MB',
//     fileType: 'PDF'
//   },
//   {
//     id: '8',
//     courseName: 'Software Engineering',
//     courseId: 'CS305',
//     semester: 'Fall 2024',
//     creator: 'Lisa Chen',
//     filename: 'agile-methodology.docx',
//     peerIp: '192.168.1.108',
//     uploadedDate: '2024-06-08',
//     fileSize: '2.1 MB',
//     fileType: 'DOCX'
//   }
// ];

export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/notes/'); 
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    const data: Note[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}