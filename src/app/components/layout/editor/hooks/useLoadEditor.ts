import { Note } from "@/app/types/note";
import { SelectView } from "@/app/types/view";
import { saveNotes } from "@/app/utils/storage";
import { useLang } from "@/context/LanguageContext";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface UseLoadEditorProps {
  notes: Note[];
  selectedNoteId: string | null;
  setMobileButtonIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function useLoadEditor({
  notes,
  selectedNoteId,
  setMobileButtonIsOpen,
}: UseLoadEditorProps) {
  const { t } = useLang();
  const isFirstRender = useRef(true);

  const [selectedViewNumber, setSelectedViewNumber] = useState<number>(1);
  const [selectedView, setSelectedView] = useState<SelectView>("split");

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId),
    [notes, selectedNoteId]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      if (notes.length > 0) {
        saveNotes(notes);
        console.log(t("autoSaved"));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [notes, t]);

  useEffect(() => {
    document.title = selectedNoteId
      ? `MDWrite | ${selectedNote?.title}`
      : "MDWrite";
    if (selectedNoteId) setMobileButtonIsOpen(false);
  }, [selectedNoteId, selectedNote]);

  useEffect(() => {
    setSelectedView(
      selectedViewNumber === 0
        ? "onlyNote"
        : selectedViewNumber === 2
        ? "onlyMarkdown"
        : "split"
    );
  }, [selectedViewNumber]);

  return {
    selectedNote,
    selectedViewNumber,
    setSelectedViewNumber,
    selectedView,
  };
}
