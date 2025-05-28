import { Note } from "@/app/types/note";
import { useMemo, useState } from "react";
import { useLoadNotes } from "./hooks/useLoadNotes";
import { SidebarProps } from "./sidebar.types";

import classNames from "classnames";
import SidebarHeader from "./components/sidebar-header";
import SidebarItems from "./components/sidebar-items";

export default function Sidebar(props: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredNotes: Note[] = useMemo(
    () =>
      props.notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [props.notes, searchQuery]
  );

  useLoadNotes({
    setNotes: props.setNotes,
    setSelectedNoteId: props.setSelectedNoteId,
  });

  return (
    <aside className={classNames({ "is-open-mobile": props.isOpenMobile })}>
      <div className="p-4 overflow-hidden gap-y-4 grid [grid-template-rows:auto_1fr]">
        <SidebarHeader setSearchQuery={setSearchQuery} {...props} />
        <SidebarItems filteredNotes={filteredNotes} {...props} />
      </div>
    </aside>
  );
}
