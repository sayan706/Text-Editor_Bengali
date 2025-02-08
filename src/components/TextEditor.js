import React, { useState } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";

const TextEditor = ({ editorState, setEditorState }) => {
  const [textColor, setTextColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Arial");

  const bengaliFonts = ["Kalpurush", "BenSenHandwriting", "mitra"];
  const englishFonts = [
    "Arial",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
  ];

  const customStyleMap = {
    "FONT-Kalpurush": { fontFamily: "Kalpurush" },
    "FONT-BenSenHandwriting": { fontFamily: "BenSenHandwriting" },
    "FONT-mitra": { fontFamily: "mitra" },
    "FONT-Arial": { fontFamily: "Arial" },
    "FONT-Times New Roman": { fontFamily: "Times New Roman" },
    "FONT-Georgia": { fontFamily: "Georgia" },
    "FONT-Verdana": { fontFamily: "Verdana" },
    "FONT-Courier New": { fontFamily: "Courier New" },
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyTextColor = (color) => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) return;

    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.applyInlineStyle(
      contentState,
      selection,
      `COLOR`
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-inline-style"
    );
    setEditorState(newEditorState);
    setTextColor(color);
  };

  const applyFontFamily = (font) => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) return;

    let contentState = editorState.getCurrentContent();
    const allFonts = [...bengaliFonts, ...englishFonts];
    allFonts.forEach((f) => {
      contentState = Modifier.removeInlineStyle(
        contentState,
        selection,
        `FONT-${f}`
      );
    });

    const newContentState = Modifier.applyInlineStyle(
      contentState,
      selection,
      `FONT-${font}`
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-inline-style"
    );

    setEditorState(newEditorState);
    setSelectedFont(font);
  };

  return (
    <div className="editor-container">
      <h2>Bangla & English Text Formatter</h2>
      <div className="toolbar">
        <button onClick={() => toggleInlineStyle("BOLD")}>Bold</button>
        <button onClick={() => toggleInlineStyle("ITALIC")}>Italic</button>
        <button onClick={() => toggleInlineStyle("UNDERLINE")}>
          Underline
        </button>
        <input
          type="color"
          value={textColor}
          onChange={(e) => applyTextColor(e.target.value)}
        />
        <select
          onChange={(e) => applyFontFamily(e.target.value)}
          value={selectedFont}
        >
          <option disabled>--- Bengali Fonts ---</option>
          {bengaliFonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
          <option disabled>--- English Fonts ---</option>
          {englishFonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-box" style={{ color: textColor }}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          customStyleMap={customStyleMap}
        />
      </div>
    </div>
  );
};

export default TextEditor;
