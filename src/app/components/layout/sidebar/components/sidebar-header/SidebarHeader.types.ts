import { Note } from "@/app/types/note";
import { Dispatch, SetStateAction } from "react";

export interface SidebarHeaderProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  setSelectedNoteId: Dispatch<SetStateAction<string | null>>;
  setMobileButtonIsOpen: Dispatch<SetStateAction<boolean>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
