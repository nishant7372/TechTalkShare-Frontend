import { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "./ArticleEditor.css";

export default function ArticleEditor({ content, setContent }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };
  return (
    <div
      className="article-editor"
      data-color-mode="dark"
      style={
        isFullScreen
          ? {
              position: "absolute",
              top: "50px",
              left: 0,
              height: "calc(100vh - 50px)",
              width: "100%",
              padding: 0,
            }
          : {}
      }
    >
      <MarkdownEditor
        visible={true}
        value={content}
        onChange={(value) => setContent(value)}
        theme={"dark"}
        enableScroll={true}
        placeholder={"Start Writing..."}
        toolbarsMode={[
          "preview",
          {
            icon: <i className="fa-solid fa-expand" />,
            name: "fullscreen",
            execute: handleFullScreen,
          },
        ]}
      />
    </div>
  );
}
