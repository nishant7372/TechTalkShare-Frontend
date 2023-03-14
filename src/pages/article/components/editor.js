import "./editor.css";
import MarkdownEditor from "@uiw/react-markdown-editor";

export default function Editor({ content, setContent }) {
  const handleMarkDownChange = (value) => {
    setContent(value);
  };

  return (
    <MarkdownEditor
      visible={true}
      value={content}
      onChange={(value, viewUpdate) => handleMarkDownChange(value)}
      theme={"dark"}
      enableScroll={true}
    />
  );
}
