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
    peerIp: '',
    file: null as File | null,
  });

  const [currentDate] = useState(new Date().toISOString().split('T')[0]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file, filename: file?.name || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for upload functionality
    console.log('Uploading note:', formData);
    console.log('Upload date:', currentDate);
    // Here you would typically send the data to your Flask server
    alert('Note uploaded successfully! (UI only - no backend integration)');
  };

  const isFormValid = formData.courseName && formData.courseId && formData.semester && 
                     formData.creator && formData.filename && formData.peerIp && formData.file;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Notes</h1>
          <p className="text-muted-foreground">
            Share your notes with the peer-to-peer network
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Note Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="courseName" className="text-sm font-medium">
                      Course Name *
                    </label>
                    <Input
                      id="courseName"
                      placeholder="e.g., Computer Networks"
                      value={formData.courseName}
                      onChange={(e) => handleInputChange('courseName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="courseId" className="text-sm font-medium">
                      Course ID *
                    </label>
                    <Input
                      id="courseId"
                      placeholder="e.g., CS301"
                      value={formData.courseId}
                      onChange={(e) => handleInputChange('courseId', e.target.value)}
                      required
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
                      placeholder="e.g., Fall 2024"
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="creator" className="text-sm font-medium">
                      Creator Name *
                    </label>
                    <Input
                      id="creator"
                      placeholder="e.g., John Doe"
                      value={formData.creator}
                      onChange={(e) => handleInputChange('creator', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="peerIp" className="text-sm font-medium">
                    Peer IP Address *
                  </label>
                  <Input
                    id="peerIp"
                    placeholder="e.g., 192.168.1.101"
                    value={formData.peerIp}
                    onChange={(e) => handleInputChange('peerIp', e.target.value)}
                    required
                  />
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
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, MD
                  </p>
                </div>

                {formData.filename && (
                  <div className="space-y-2">
                    <label htmlFor="filename" className="text-sm font-medium">
                      Filename
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formData.filename}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Date</label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(currentDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Note
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </div>

              {!isFormValid && (
                <p className="text-sm text-muted-foreground">
                  Please fill in all required fields and select a file to upload.
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium mb-2">Upload Guidelines</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ensure your files are academic notes and appropriate for sharing</li>
            <li>• Use descriptive filenames that help others identify the content</li>
            <li>• Make sure your peer IP address is correct for file sharing</li>
            <li>• Files will be shared directly from your device to other peers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}