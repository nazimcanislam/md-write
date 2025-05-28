import { EditorProps } from "./editor.types";
import { useLoadEditor } from "./hooks/useLoadEditor";

import EditorTop from "./components/editor-top";
import SelectANote from "./components/select-a-note";

export default function Editor(props: EditorProps) {
  const {
    selectedNote,
    selectedViewNumber,
    setSelectedViewNumber,
    selectedView,
  } = useLoadEditor({ ...props });

  return (
    <div className="w-full">
      <section id="editor" className="flex-1 p-6">
        {selectedNote ? (
          <EditorTop
            selectedNote={selectedNote}
            selectedView={selectedView}
            selectedViewNumber={selectedViewNumber}
            setSelectedViewNumber={setSelectedViewNumber}
            {...props}
          />
        ) : (
          <SelectANote />
        )}
      </section>
    </div>
  );
}
