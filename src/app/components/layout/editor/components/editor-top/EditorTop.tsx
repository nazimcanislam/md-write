import { saveNotes, selectLastNote } from "@/app/utils/storage";
import { useLang } from "@/context/LanguageContext";
import { useCallback } from "react";
import { EditorTopProps } from "./editor-top.types";

import Button from "@/app/components/common/button";
import GroupButton from "@/app/components/common/group-button";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";

export default function EditorTop({
  mobileButtonIsOpen,
  setMobileButtonIsOpen,
  notes,
  setNotes,
  selectedNote,
  selectedNoteId,
  setSelectedNoteId,
  selectedViewNumber,
  setSelectedViewNumber,
  selectedView,
  noteStatus,
}: EditorTopProps) {
  const { t, lang } = useLang();

  const updateSelectedNote = useCallback(
    (field: "title" | "content", value: string) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === selectedNoteId
            ? { ...note, [field]: value, updatedAt: Date.now() }
            : note
        )
      );
    },
    [selectedNoteId]
  );

  const formatCreatedAt = useCallback(
    (timestamp: number): string => {
      const date = new Date(timestamp);
      const now = new Date();

      const isToday = date.toDateString() === now.toDateString();
      const isThisYear = date.getFullYear() === now.getFullYear();

      const baseFormat = {
        hour: "2-digit",
        minute: "2-digit",
      } as const;

      if (isToday)
        return new Intl.DateTimeFormat(lang, baseFormat).format(date);

      if (isThisYear)
        return new Intl.DateTimeFormat(lang, {
          day: "numeric",
          month: "short",
          ...baseFormat,
        }).format(date);

      return new Intl.DateTimeFormat(lang, {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...baseFormat,
      }).format(date);
    },
    [lang]
  );

  const handleExportNote = useCallback(() => {
    if (!selectedNote || !selectedNote.content.trim()) return;
    const blob = new Blob([selectedNote.content], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const fileName = (selectedNote.title || "note")
      .trim()
      .replace(/[<>:"/\\|?*]+/g, "_");

    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedNote]);

  const handleDeleteNote = useCallback(() => {
    if (!selectedNote) return;
    if (selectedNote.content.trim() && !confirm(t("confirmDelete"))) return;

    const updatedNotes = notes.filter((note) => note.id !== selectedNoteId);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);

    setSelectedNoteId(updatedNotes[0]?.id || null);
    selectLastNote(null);
  }, [selectedNote, notes, selectedNoteId, t]);

  return (
    <>
      <div className="editor-note-title">
        <div className="mobile-visible">
          <Button
            title={mobileButtonIsOpen ? t("closeSidebar") : t("openSidebar")}
            iconName="menu"
            variant="ghost"
            onClick={() => setMobileButtonIsOpen((prev) => !prev)}
            large
          />
        </div>

        <div className="w-full">
          <input
            type="text"
            value={selectedNote.title}
            autoCapitalize="words"
            autoComplete="off"
            className="editor-note-title-input"
            placeholder={t("editorTitlePlaceholder")}
            onChange={(e) => updateSelectedNote("title", e.target.value)}
          />
          <div className="flex gap-4">
            <p style={{ color: "var(--color-text-muted)" }}>
              {t("createdAt")}: {formatCreatedAt(selectedNote.createdAt)}
            </p>

            {noteStatus !== "idle" && (
              <p style={{ color: "var(--color-text-muted)" }}>
                {t(noteStatus)}
              </p>
            )}
          </div>
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
            onClick={handleDeleteNote}
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
          value={selectedNote.content}
          onChange={(e) => updateSelectedNote("content", e.target.value)}
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
          <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
