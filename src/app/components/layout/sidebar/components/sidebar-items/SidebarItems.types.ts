import { Note } from "@/app/types/note";
import { Dispatch, SetStateAction } from "react";

export interface SidebarItemProps {
  notes: Note[];
  filteredNotes: Note[];
  selectedNoteId: string | null;
  setSelectedNoteId: Dispatch<SetStateAction<string | null>>;
}
