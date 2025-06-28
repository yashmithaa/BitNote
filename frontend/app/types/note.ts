export interface Note {
    id: string;
    courseName: string;
    courseId: string;
    semester: string;
    creator: string;
    filename: string;
    peerIp: string;
    uploadedDate: string;
    fileSize: string;
    fileType: string;
  }
  
  export interface FilterOptions {
    courseName: string;
    courseId: string;
    semester: string;
    creator: string;
    filename: string;
    peerIp: string;
    uploadedDate: string;
  }