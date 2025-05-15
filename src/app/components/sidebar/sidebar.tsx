import { useLang } from "@/context/LanguageContext";
import { useEffect, MouseEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { getNotes, saveNotes } from "../../utils/storage";
import { Note } from "@/app/types/note";
import { SidebarProps } from "./sidebar.types";

import classNames from "classnames";
import Button from "../button";
import { Search } from "lucide-react";

export default function Sidebar({
  notes,
  setNotes,
  selectedNoteId,
  setSelectedNoteId,
  isOpenMobile,
  setMobileButtonIsOpen,
}: SidebarProps) {
  const { t, setLang, lang } = useLang();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleCreateNote(event: MouseEvent<HTMLButtonElement>): void {
    const newNote: Note = {
      id: uuidv4(),
      title: t("newNote"),
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedNotes: Note[] = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
  }

  function getSmartDate(timestamp: number): string {
    const now = Date.now();
    const date = new Date(timestamp);
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days < 7) {
      const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });

      if (seconds < 60) return rtf.format(-seconds, "second");
      if (minutes < 60) return rtf.format(-minutes, "minute");
      if (hours < 24) return rtf.format(-hours, "hour");

      return rtf.format(-days, "day");
    }

    const nowYear = new Date().getFullYear();
    const dateYear = date.getFullYear();

    if (nowYear === dateYear) {
      return new Intl.DateTimeFormat(lang, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }

    return new Intl.DateTimeFormat(lang, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  useEffect(() => {
    const storedNotes: Note[] = getNotes();
    setNotes(storedNotes);

    if (storedNotes.length > 0) {
      setSelectedNoteId(storedNotes[0].id);
    }
  }, []);

  return (
    <aside className={classNames({ "is-open-mobile": isOpenMobile })}>
      <div
        className="p-4"
        style={{
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          rowGap: 16,
        }}
      >
        <div>
          <div
            className="mb-4"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="flex gap-2 items-center">
              <div className="mobile-visible">
                <Button
                  title={"closeMobile"}
                  iconName="x"
                  variant="ghost"
                  onClick={() => setMobileButtonIsOpen(false)}
                />
              </div>
              <h1 className="app-title">MDWrite</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Button
                title={t("changeLang")}
                text={lang === "en" ? "🇺🇸 English" : "🇹🇷 Türkçe"}
                variant="ghost"
                onClick={() => setLang(lang === "en" ? "tr" : "en")}
              />
              <Button
                title={"GitHub Repo"}
                iconName="github"
                variant="ghost"
                onClick={() => {
                  window
                    .open(
                      "https://www.github.com/nazimcanislam/md-write",
                      "_blank"
                    )
                    ?.focus();
                }}
              />
            </div>
          </div>

          <div className="grid">
            <Button
              title={t("newNoteDescription")}
              variant="secondary"
              text={t("newNote")}
              iconName={"notebook-pen"}
              onClick={handleCreateNote}
            />

            {notes.length > 0 && (
              <div className="mt-4" style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder={t("searchNotes")}
                  className="primary-input"
                  style={{
                    width: "100%",
                    paddingLeft: "40px",
                    borderColor:
                      notes.length === 0
                        ? "var(--color-border)"
                        : "var(--color-primary)",
                  }}
                  disabled={notes.length === 0}
                  title={
                    notes.length === 0 ? t("noNoteCreated") : t("searchNotes")
                  }
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color:
                      notes.length === 0
                        ? "var(--color-border)"
                        : "var(--color-primary)",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ overflow: "auto" }}>
          {notes.length === 0 ? (
            <div style={{ color: "var(--color-text-muted)" }}>
              {t("noNoteCreated")}
            </div>
          ) : (
            <ul
              id="sidebar-note-items-holder"
              className="space-y-2"
              style={{ overflow: "auto", height: "100%" }}
            >
              {filteredNotes.map((note) => (
                <li
                  key={note.id}
                  className="sidebar-note-item"
                  onClick={() =>
                    setSelectedNoteId(
                      note.id === selectedNoteId ? null : note.id
                    )
                  }
                >
                  <button
                    title={`${t("selectThisNote")}: ${note.title}`}
                    className={classNames("sidebar-note-item-content", {
                      selected: note.id === selectedNoteId,
                    })}
                  >
                    {note.title ? (
                      <span className="sidebar-note-item-title">
                        {note.title}
                      </span>
                    ) : (
                      <span
                        className={classNames(
                          "sidebar-note-item-title",
                          note.id === selectedNoteId
                            ? "untitled-primary-text"
                            : "untitled"
                        )}
                      >
                        {t("untitled")}
                      </span>
                    )}

                    <div>
                      <span className="note-updated-date">
                        {getSmartDate(note.updatedAt)}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
