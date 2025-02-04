import React, { useState } from "react";
import { EditorState } from "draft-js";
import Navbar from "./components/Navbar";
import TextEditor from "./components/TextEditor";
import CopyButton from "./components/CopyButton";
import "./components/CopyButton.css"; // Import CSS

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      <Navbar />
      <div className="content">
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <CopyButton editorState={editorState} />
      </div>
    </div>
  );
};

export default App;
