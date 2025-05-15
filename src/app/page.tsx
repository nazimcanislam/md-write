"use client";

import { useEffect, useRef, useState } from "react";
import { Note } from "./types/note";
import Sidebar from "./components/sidebar";
import { useLang } from "@/context/LanguageContext";
import { saveNotes } from "./utils/storage";
import ReactMarkdown from "react-markdown";
import Button from "./components/button";
import GroupButton from "./components/group_button/group-button";
import classNames from "classnames";
import { NotebookPen } from "lucide-react";

export default function Home() {
  const { t, lang } = useLang();

  const [mobileButtonIsOpen, setMobileButtonIsOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<
    "onlyNote" | "split" | "onlyMarkdown"
  >("split");
  const [selectedViewNumber, setSelectedViewNumber] = useState<number>(1);

  const isFirstRender = useRef(true);

  function selectedNote(): Note | undefined {
    return notes.find((note) => note.id === selectedNoteId);
  }

  function updateSelectedNote(field: "title" | "content", value: string) {
    const updatedNotes = notes.map((note) =>
      note.id === selectedNoteId
        ? { ...note, [field]: value, updatedAt: Date.now() }
        : note
    );
    setNotes(updatedNotes);
  }

  function formatCreatedAt(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const isThisYear = date.getFullYear() === now.getFullYear();

    if (isToday) {
      return new Intl.DateTimeFormat(lang, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }

    if (isThisYear) {
      return new Intl.DateTimeFormat(lang, {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }

    return new Intl.DateTimeFormat(lang, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  function handleExportNote() {
    const note = selectedNote();
    if (!note || !note.content.trim()) return;

    const blob = new Blob([note.content], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileName = (note.title || "note")
      .trim()
      .replace(/[<>:"/\\|?*]+/g, "_");
    a.href = url;
    a.download = `${fileName}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleToggleMobileMenu() {
    setMobileButtonIsOpen(!mobileButtonIsOpen);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer: NodeJS.Timeout = setTimeout(() => {
      if (notes.length > 0) {
        saveNotes(notes);
        console.log(t("autoSaved"));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [notes]);

  useEffect(() => {
    if (selectedNoteId) {
      const noteTitle: string | undefined = selectedNote()?.title;
      document.title = `MDWrite | ${noteTitle}`;
      setMobileButtonIsOpen(false);
    } else {
      document.title = "MDWrite";
    }
  }, [selectedNoteId]);

  useEffect(() => {
    switch (selectedViewNumber) {
      case 0:
        setSelectedView("onlyNote");
        break;
      case 1:
        setSelectedView("split");
        break;
      case 2:
        setSelectedView("onlyMarkdown");
        break;
      default:
        break;
    }
  }, [selectedViewNumber]);

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

      <div style={{ width: "100%" }}>
        <section id="editor" className="flex-1 p-6">
          {selectedNoteId ? (
            <>
              <div className="editor-note-title">
                <div className="mobile-visible">
                  <Button
                    title={
                      mobileButtonIsOpen ? t("closeSidebar") : t("openSidebar")
                    }
                    iconName="menu"
                    variant="ghost"
                    onClick={handleToggleMobileMenu}
                    large
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <input
                    type="text"
                    value={selectedNote()?.title || ""}
                    autoCapitalize="words"
                    autoComplete="off"
                    className="editor-note-title-input"
                    placeholder={t("editorTitlePlaceholder")}
                    onChange={(e) =>
                      updateSelectedNote("title", e.target.value)
                    }
                  />
                  <p style={{ color: "var(--color-text-muted)" }}>
                    {t("createdAt")}:{" "}
                    {formatCreatedAt(selectedNote()!.createdAt)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <GroupButton
                    buttons={[
                      { title: t("onlyNote"), iconName: "notebook" },
                      { title: t("split"), iconName: "split" },
                      { title: t("onlyMarkdown"), iconName: "sparkles" },
                    ]}
                    selectedButtonNumber={selectedViewNumber}
                    setSelectedButtonNumber={setSelectedViewNumber}
                  />
                  <Button
                    title={t("downloadMarkdown")}
                    iconName="download"
                    variant="ghost"
                    onClick={handleExportNote}
                  />
                  <Button
                    title={t("deleteNote")}
                    iconName="trash"
                    variant="ghost"
                    onClick={() => {
                      const noteToDelete = notes.find(
                        (note) => note.id === selectedNoteId
                      );

                      if (!noteToDelete) return;

                      if (noteToDelete.content.trim() !== "") {
                        const confirmDelete = confirm(t("confirmDelete"));
                        if (!confirmDelete) return;
                      }

                      const updatedNotes = notes.filter(
                        (note) => note.id !== selectedNoteId
                      );
                      setNotes(updatedNotes);
                      saveNotes(updatedNotes);

                      if (selectedNoteId === selectedNoteId) {
                        if (updatedNotes.length > 0) {
                          setSelectedNoteId(updatedNotes[0].id);
                        } else {
                          setSelectedNoteId(null);
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div
                id="editor-sides"
                className={classNames({
                  "only-note": selectedView === "onlyNote",
                  "only-result": selectedView === "onlyMarkdown",
                })}
              >
                <textarea
                  value={selectedNote()?.content || ""}
                  onChange={(e) =>
                    updateSelectedNote("content", e.target.value)
                  }
                  autoCapitalize="sentences"
                  autoComplete="off"
                  placeholder={t("placeholder")}
                  style={{
                    display: selectedView === "onlyMarkdown" ? "none" : "block",
                  }}
                />

                <div
                  id="divider"
                  style={{
                    display: selectedView === "split" ? "block" : "none",
                  }}
                ></div>

                <div
                  className="markdown-body prose dark:prose-invert max-w-none"
                  style={{
                    display: selectedView === "onlyNote" ? "none" : "block",
                  }}
                >
                  <ReactMarkdown>{selectedNote()?.content || ""}</ReactMarkdown>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "grid",
                placeItems: "center",
                height: "calc(100vh - 48px)",
                fontSize: "1.5rem",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  color: "var(--color-text-muted)",
                }}
              >
                <NotebookPen />
                {t("selectOrCreateNote")}
              </p>
            </div>
          )}
        </section>
      </div>

      <div
        id="overlay"
        className={classNames({ visible: mobileButtonIsOpen })}
        onClick={() => setMobileButtonIsOpen(false)}
      ></div>
    </main>
  );
}
