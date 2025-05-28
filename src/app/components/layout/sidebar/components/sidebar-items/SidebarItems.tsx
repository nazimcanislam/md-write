import { getSmartDate } from "@/app/utils/format-dates";
import { selectLastNote } from "@/app/utils/storage";
import { useLang } from "@/context/LanguageContext";
import { SidebarItemProps } from "./SidebarItems.types";

import { Note } from "@/app/types/note";
import classNames from "classnames";

export default function SidebarItems(props: SidebarItemProps) {
  const { t, lang } = useLang();

  function handleSelectNote(note: Note) {
    const noteId: string | null =
      note.id === props.selectedNoteId ? null : note.id;

    props.setSelectedNoteId(noteId);
    selectLastNote(noteId);
  }

  return (
    <div className="overflow-auto">
      {props.notes.length === 0 ? (
        <div style={{ color: "var(--color-text-muted)" }}>
          {t("noNoteCreated")}
        </div>
      ) : (
        <ul
          id="sidebar-note-items-holder"
          className="space-y-2"
          style={{ overflow: "auto", height: "100%" }}
        >
          {props.filteredNotes.map((note) => (
            <li
              key={note.id}
              className="sidebar-note-item"
              onClick={() => handleSelectNote(note)}
            >
              <button
                title={`${t("selectThisNote")}: ${note.title}`}
                className={classNames("sidebar-note-item-content", {
                  selected: note.id === props.selectedNoteId,
                })}
              >
                {note.title ? (
                  <span className="sidebar-note-item-title">{note.title}</span>
                ) : (
                  <span
                    className={classNames(
                      "sidebar-note-item-title",
                      note.id === props.selectedNoteId
                        ? "untitled-primary-text"
                        : "untitled"
                    )}
                  >
                    {t("untitled")}
                  </span>
                )}

                <div>
                  <span className="note-updated-date">
                    {getSmartDate(note.updatedAt, lang)}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
