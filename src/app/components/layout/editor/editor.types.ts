import { Note } from "@/app/types/note";
import { Dispatch, SetStateAction } from "react";

export interface EditorProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  selectedNoteId: string | null;
  setSelectedNoteId: Dispatch<SetStateAction<string | null>>;
  mobileButtonIsOpen: boolean;
  setMobileButtonIsOpen: Dispatch<SetStateAction<boolean>>;
}
