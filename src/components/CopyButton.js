import React from "react";
import { convertToRaw } from "draft-js";

const unicodeMap = {
  BOLD: { start: "𝗕", end: "" }, // Unicode bold
  ITALIC: { start: "𝘪", end: "" }, // Unicode italic
  UNDERLINE: { start: "̲", end: "" }, // Unicode underline
};

const CopyButton = ({ editorState }) => {
  const handleCopy = () => {
    if (!editorState) return;

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    let formattedText = rawContent.blocks
      .map((block) => {
        let text = block.text;
        block.inlineStyleRanges.forEach((style) => {
          const { offset, length, style: type } = style;
          const styledText = text.substring(offset, offset + length);
          if (unicodeMap[type]) {
            text = text.replace(
              styledText,
              `${unicodeMap[type].start}${styledText}${unicodeMap[type].end}`
            );
          }
        });
        return text;
      })
      .join("\n");

    navigator.clipboard
      .writeText(formattedText)
      .then(() => alert("Text copied to clipboard! 🎉"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div className="copy-container">
      <button className="copy-btn" onClick={handleCopy}>
        Copy Formatted Text
      </button>
    </div>
  );
};

export default CopyButton;
