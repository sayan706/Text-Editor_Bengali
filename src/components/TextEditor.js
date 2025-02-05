import React, { useState } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css"; // Import CSS file

const TextEditor = ({ editorState, setEditorState }) => {
  const [textColor, setTextColor] = useState("#000000");

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
    if (selection.isCollapsed()) return; // Prevent applying color if no text is selected

    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.applyInlineStyle(
      contentState,
      selection,
      `COLOR-${color}`
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-inline-style"
    );
    setEditorState(newEditorState);
    setTextColor(color);
  };

  return (
    <div className="editor-container">
      <h2>Bangla & English Text Formatter</h2>

      {/* Toolbar */}
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
      </div>

      {/* Editor */}
      <div className="editor-box">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          customStyleMap={{
            [`COLOR-${textColor}`]: { color: textColor },
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
