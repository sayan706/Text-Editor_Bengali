import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css"; // Import CSS file

const TextEditor = ({
  textColor,
  setTextColor,
  setEditorState,
  editorState,
}) => {
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
        <input type="color" onChange={(e) => setTextColor(e.target.value)} />
      </div>

      {/* Editor */}
      <div
        className="editor-box"
        style={{ color: textColor }}
        onClick={() => setEditorState(EditorState.moveFocusToEnd(editorState))}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default TextEditor;
