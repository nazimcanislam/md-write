import { Note } from "@/app/types/note";
import { Dispatch, SetStateAction } from "react";

export interface SidebarProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  selectedNoteId: string | null;
  setSelectedNoteId: Dispatch<SetStateAction<string | null>>;
  isOpenMobile?: boolean;
  setMobileButtonIsOpen: Dispatch<SetStateAction<boolean>>
}
