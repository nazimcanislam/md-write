import { Note } from "@/app/types/note";
import { SelectView } from "@/app/types/view";
import { Dispatch, SetStateAction } from "react";

export interface EditorTopProps {
  mobileButtonIsOpen: boolean;
  setMobileButtonIsOpen: Dispatch<SetStateAction<boolean>>;
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  selectedNote: Note;
  selectedNoteId: string | null;
  setSelectedNoteId: Dispatch<SetStateAction<string | null>>;
  selectedViewNumber: number;
  setSelectedViewNumber: Dispatch<SetStateAction<number>>;
  selectedView: SelectView;
  noteStatus: NoteStatus;
}

export type NoteStatus = "idle" | "saving" | "saved" | "failed";
