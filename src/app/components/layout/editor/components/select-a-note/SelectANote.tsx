import { useLang } from "@/context/LanguageContext";
import { NotebookPen } from "lucide-react";

export default function SelectANote() {
  const { t } = useLang();

  return (
    <div
      className="grid place-items-center"
      style={{
        height: "calc(100vh - 48px)",
        fontSize: "1.5rem",
      }}
    >
      <p
        className="flex items-center"
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          color: "var(--color-text-muted)",
        }}
      >
        <NotebookPen /> {t("selectOrCreateNote")}
      </p>
    </div>
  );
}
