import { Note } from "@/app/types/note";
import { getNotes, LAST_SELECTED_NOTE_UID_KEY } from "@/app/utils/storage";
import { useEffect } from "react";

interface UseLoadNotesProps {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setSelectedNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useLoadNotes({
  setNotes,
  setSelectedNoteId,
}: UseLoadNotesProps) {
  useEffect(() => {
    const storedNotes = getNotes();

    const lastSelectedId: string | null = localStorage.getItem(
      LAST_SELECTED_NOTE_UID_KEY
    );

    const isValidId: boolean = storedNotes.some(
      (note) => note.id === lastSelectedId
    );

    if (lastSelectedId && isValidId) {
      setSelectedNoteId(lastSelectedId);
    } else if (storedNotes.length > 0) {
      setSelectedNoteId(storedNotes[0].id);
    }
  }, [setNotes, setSelectedNoteId]);
}
