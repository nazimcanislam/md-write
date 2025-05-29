"use client";

import { useState } from "react";
import { Note } from "./types/note";

import classNames from "classnames";
import Editor from "./components/layout/editor";
import Sidebar from "./components/layout/sidebar";
import { getNotes } from "./utils/storage";

export default function Home() {
  const [mobileButtonIsOpen, setMobileButtonIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(getNotes());
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  return (
    <main>
      <Sidebar
        notes={notes}
        setNotes={setNotes}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
        isOpenMobile={mobileButtonIsOpen}
        setMobileButtonIsOpen={setMobileButtonIsOpen}
      />

      <Editor
        notes={notes}
        setNotes={setNotes}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
        mobileButtonIsOpen={mobileButtonIsOpen}
        setMobileButtonIsOpen={setMobileButtonIsOpen}
      />

      <div
        id="overlay"
        className={classNames({ visible: mobileButtonIsOpen })}
        onClick={() => setMobileButtonIsOpen(false)}
      ></div>
    </main>
  );
}
