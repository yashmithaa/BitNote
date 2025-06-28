'use client';

import { useState, useEffect, useMemo } from 'react';
import { SearchFilter } from './components/filter';
import { NoteCard } from './components/noteCard';
import { fetchNotes } from './lib/data';
import { Note, FilterOptions } from './types/note';

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    courseName: '',
    courseId: '',
    semester: '',
    creator: '',
    filename: '',
    peerIp: '',
    uploadedDate: '',
  });

  useEffect(() => {
    async function loadNotes() {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
    }
    loadNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Search term filter
      const matchesSearch =
        !searchTerm ||
        Object.values(note).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilters =
        (!filters.courseName || note.courseName.toLowerCase().includes(filters.courseName.toLowerCase())) &&
        (!filters.courseId || note.courseId.toLowerCase().includes(filters.courseId.toLowerCase())) &&
        (!filters.semester || note.semester.toLowerCase().includes(filters.semester.toLowerCase())) &&
        (!filters.creator || note.creator.toLowerCase().includes(filters.creator.toLowerCase())) &&
        (!filters.filename || note.filename.toLowerCase().includes(filters.filename.toLowerCase())) &&
        (!filters.peerIp || note.peerIp.includes(filters.peerIp)) &&
        (!filters.uploadedDate || note.uploadedDate.includes(filters.uploadedDate));

      return matchesSearch && matchesFilters;
    });
  }, [notes, searchTerm, filters]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Notes</h1>
          <p className="text-muted-foreground">
            Browse and download notes shared by your peers
          </p>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredNotes.length} of {notes.length} notes
            </p>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No notes found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}