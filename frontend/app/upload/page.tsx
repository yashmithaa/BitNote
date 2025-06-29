'use client';

import { useState } from 'react';
import { Upload, FileText, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/card';
import { Input } from '../components/input';
import { Button } from '../components/button';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    courseName: '',
    courseId: '',
    semester: '',
    creator: '',
    filename: '',
    file: null as File | null,
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadDate, setUploadDate] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file, filename: file?.name || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) return;

    const data = new FormData();
    data.append('file', formData.file);
    data.append('courseName', formData.courseName);
    data.append('courseId', formData.courseId);
    data.append('semester', formData.semester);
    data.append('creator', formData.creator);

    try {
      const res = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setUploadSuccess(true);
        setUploadDate(new Date().toLocaleString());
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      alert('Error uploading note.');
    }
  };

  const isFormValid = formData.courseName && formData.courseId && formData.semester && 
                     formData.creator && formData.filename && formData.file && !uploadSuccess;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Notes</h1>
          <p className="text-muted-foreground">
            Share your notes with the peer-to-peer network
          </p>
        </div>

        <Card className='backdrop-filter backdrop-blur bg-opacity-90 bg-blend-overlay'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 p-2">
              <Upload className="h-5 w-5" />
              Notes Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="courseName" className="text-sm font-medium">
                      Course Name *
                    </label>
                    <Input
                      id="courseName"
                      placeholder="Computer Networks"
                      value={formData.courseName}
                      onChange={(e) => handleInputChange('courseName', e.target.value)}
                      required
                      disabled={uploadSuccess}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="courseId" className="text-sm font-medium">
                      Course ID *
                    </label>
                    <Input
                      id="courseId"
                      placeholder="CS301"
                      value={formData.courseId}
                      onChange={(e) => handleInputChange('courseId', e.target.value)}
                      required
                      disabled={uploadSuccess}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="semester" className="text-sm font-medium">
                      Semester *
                    </label>
                    <Input
                      id="semester"
                      placeholder="Fall 2024"
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      required
                      disabled={uploadSuccess}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="creator" className="text-sm font-medium">
                      Creator Name *
                    </label>
                    <Input
                      id="creator"
                      placeholder="John"
                      value={formData.creator}
                      onChange={(e) => handleInputChange('creator', e.target.value)}
                      required
                      disabled={uploadSuccess}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="file" className="text-sm font-medium">
                    Select File *
                  </label>
                  <div className="relative">
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md"
                      required
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      disabled={uploadSuccess}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, MD
                  </p>
                </div>

                {formData.filename && (
                  <div className="space-y-2 p-4">
                    <label htmlFor="filename" className="text-sm font-medium">
                      Filename
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formData.filename}</span>
                    </div>
                  </div>
                )}

                {uploadDate && (
                  <div className="space-y-2 p-4">
                    <label className="text-sm font-medium">Upload Date</label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{uploadDate}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 p-4">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1"
                >
                  {uploadSuccess ? (
                    <span className="flex items-center">
                      <svg className="mr-2 h-4 w-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Uploaded
                    </span>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Note
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  disabled={uploadSuccess}
                >
                  Cancel
                </Button>
              </div>

              {!isFormValid && !uploadSuccess && (
                <p className="text-sm text-muted-foreground p-4">
                  Please fill in all required fields and select a file to upload.
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
}