import React from "react";
import { EditorState, convertToRaw } from "draft-js";

const CopyButton = ({ editorState }) => {
  const handleCopy = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    // Extract text while preserving inline styles
    let formattedText = "";
    rawContent.blocks.forEach((block) => {
      formattedText += block.text + "\n"; // Add line breaks for readability
    });

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
