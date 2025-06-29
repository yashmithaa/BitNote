import { useState } from 'react';
import { Download, Calendar, User, FileText, Server } from 'lucide-react';
import { Card, CardContent } from '../components/card';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
import { Note } from '../types/note';
import { formatDate } from '../lib/utils';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  console.log(note);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const peerUrl = `http://${note.peerIp}:5000`;
    try {
      // Ping the peer
      const pingRes = await fetch(`${peerUrl}/ping`, { method: 'GET' });
      if (!pingRes.ok) throw new Error('Peer offline');

      window.location.href = `${peerUrl}/file/${note.filename}`;
    } catch (err) {
      alert('This note is not available right now (peer offline).');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Card className="transition-shadow backdrop-filter backdrop-blur bg-opacity-90 bg-blend-overlay hover:shadow-[5px_10px_130px_31px_rgba(9,0,30,1)] hover:bg-slate-950/30 mb-7">
      <CardContent className='p-6'>
        
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg leading-tight">
                {note.filename}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {note.courseName}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {note.courseId}
                </Badge>
                <span>{note.semester}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{note.creator}</span>
              </div>

              <div className="flex items-center gap-1">
                <Server className="h-3 w-3" />
                <span>{note.peerIp}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(note.uploadedDate)}</span>
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {note.fileType}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {note.fileSize}
              </span>
            </div> */}
          </div>

          <Button
            onClick={handleDownload}
            className="ml-4 flex items-center gap-2"
            size="sm"
            disabled={downloading}
          >
            <Download className="h-4 w-4" />
            {downloading ? 'Checking...' : 'Download'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}