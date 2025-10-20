import { useParams } from 'react-router-dom';
import { useNote } from '../hooks/useNote';
import { LoadingState, ErrorState } from './ui';
import { PatientInfoCard, NoteContentCard } from './cards';
import { PageHeader } from './layout';


export const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const noteId = id ? parseInt(id, 10) : 0;
  const { note, loading, error, refetch } = useNote(noteId);

  if (loading) return <LoadingState message="Loading note..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} title="Error loading note" />;
  if (!note) return <div className="text-center py-12">Note not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Note Details"
        subtitle="View complete note information and patient details"
        backTo={{ path: `/patients/${note.patient.id}`, label: "Back to Patient Notes" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NoteContentCard note={note} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <PatientInfoCard note={note} />
          </div>
        </div>
      </div>
    </div>
  );
};
