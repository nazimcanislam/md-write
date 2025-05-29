import { Note } from "@/app/types/note";
import { saveNotes } from "@/app/utils/storage";
import { useLang } from "@/context/LanguageContext";
import { Search } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { SidebarHeaderProps } from "./SidebarHeader.types";

import Button from "@/app/components/common/button";

export default function SidebarHeader({
  notes,
  setNotes,
  setSelectedNoteId,
  setMobileButtonIsOpen,
  setSearchQuery,
}: SidebarHeaderProps) {
  const { t, lang, setLang } = useLang();

  function handleCreateNote(event: React.MouseEvent<HTMLButtonElement>): void {
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

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="mobile-visible">
            <Button
              title={t("closeMenu")}
              iconName="x"
              variant="ghost"
              onClick={() => setMobileButtonIsOpen(false)}
            />
          </div>
          <a href="/">
            <h1 className="app-title">MDWrite</h1>
          </a>
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
                .open("https://www.github.com/nazimcanislam/md-write", "_blank")
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

        {notes && notes.length > 0 && (
          <div className="mt-4 relative">
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
              title={notes.length === 0 ? t("noNoteCreated") : t("searchNotes")}
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
  );
}
