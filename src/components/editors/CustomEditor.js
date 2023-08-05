import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  createButton,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

import "./CustomEditor.css";
import { useDispatch } from "react-redux";
import { setError } from "../../features/alertSlice";

const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");

export default function CustomEditor({ value, onChange }) {
  const dispatch = useDispatch();
  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;

    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type.indexOf("image") !== -1) {
        e.preventDefault(); // Prevent the image from being pasted
        dispatch(setError("Image not Allowed!"));
        return;
      }
    }
  };

  return (
    <div className="rs-main">
      <EditorProvider>
        <Editor
          placeholder="Enter your message..."
          value={value}
          onChange={onChange}
          onPaste={handlePaste}
        ></Editor>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnAlignCenter />
        </Toolbar>
      </EditorProvider>
    </div>
  );
}
