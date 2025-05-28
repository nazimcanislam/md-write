import { Note } from "../types/note";

export const NOTES_STORAGE_KEY: string = "mdwrite-notes";
export const LAST_SELECTED_NOTE_UID_KEY: string = "mdwrite-last-note-uid";

export function getNotes(): Note[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(NOTES_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveNotes(notes: Note[]) {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

export function selectLastNote(lastNoteId: string | null): void {
  if (!lastNoteId) {
    localStorage.removeItem(LAST_SELECTED_NOTE_UID_KEY);
    return;
  }

  localStorage.setItem(LAST_SELECTED_NOTE_UID_KEY, lastNoteId);
}
