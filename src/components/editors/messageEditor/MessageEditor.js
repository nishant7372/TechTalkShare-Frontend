import "./MessageEditor.css";

import MarkdownEditor from "@uiw/react-markdown-editor";

export default function MessageEditor({ value, onChange }) {
  return (
    <div className="message-editor" data-color-mode="dark">
      <MarkdownEditor
        style={{ borderRadius: "6px" }}
        visible={true}
        value={value}
        onChange={(val) => onChange(val)}
        theme={"dark"}
        enableScroll={true}
        placeholder={"Write your message..."}
        renderPreview={null}
        basicSetup={false}
        toolbarBottom={true}
        previewProps={{
          className: "msg-editor-preview",
        }}
        toolbarsMode={[]}
        toolbars={["bold", "italic", "underline"]}
      />
    </div>
  );
}
