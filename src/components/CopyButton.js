import React from "react";
import { convertToRaw } from "draft-js"; // Removed unused EditorState

const CopyButton = ({ editorState }) => {
  const handleCopy = () => {
    if (!editorState) return;

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    // Extract text while preserving inline styles
    let formattedText = rawContent.blocks.map((block) => block.text).join("\n");

    // Copy text to clipboard
    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        alert("Text copied to clipboard! 🎉");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <button className="copy-btn" onClick={handleCopy}>
      Copy Formatted Text
    </button>
  );
};

export default CopyButton;
