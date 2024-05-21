import { useEffect, useRef, useState } from "react";
import ContentBox from "../../components/contentBox/ContentBox";
import { useGetFolder, useRenameFolder } from "../../hooks/store/storeApis";
import { useParams } from "react-router-dom";
import File from "../../components/file/File";
import { useFormatDate } from "../../hooks/utils/useFormatDate";
import styles from "./FolderContents.module.css";
import { useHandleResponse } from "../../hooks/utils/useHandleResponse";
import { CSSTransition } from "react-transition-group";
import FolderModal from "../../components/modals/folderModal/FolderModal";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/alertSlice";

export default function FolderContents() {
  const { id } = useParams();
  const { getFolder, isPending: folderLoading } = useGetFolder();
  const [folder, setFolder] = useState(null);

  const fetchFolder = async () => {
    const res = await getFolder(id);
    if (res?.ok) {
      setFolder(res?.folder);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  const [selected, setSelected] = useState([]);
  const [selectOn, setSelectOn] = useState(false);

  const handleSelect = (val, id) => {
    let updated = [...selected];

    if (!val) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }
    setSelected(updated);
  };

  const { renameFolder, isPending: renamePending } = useRenameFolder();
  const dispatch = useDispatch();

  const handleRename = async (name) => {
    const res = await renameFolder({ name, id });
    if (res?.ok) {
      dispatch(setSuccess(res?.ok));
      setOpenRenameModal(false);
      fetchFolder();
    } else if (res?.error) {
      dispatch(setError(res?.error));
    }
  };

  const nodeRef = useRef();
  const [openRenameModal, setOpenRenameModal] = useState(false);

  const { timeSince } = useFormatDate();
  return (
    <ContentBox
      heading={folder?.name}
      editable={true}
      setOpenRenameModal={setOpenRenameModal}
    >
      <div className={styles["container"]}>
        {folder?.files?.map(
          ({ topic, updatedAt, _id, isStarred, isPinned }) => (
            <File
              fileName={topic}
              date={`${timeSince(updatedAt)} ago`}
              key={_id}
              url={`/articles/${_id}`}
              id={_id}
              handleSelect={handleSelect}
              isPinned={isPinned}
              isStarred={isStarred}
              selectOn={selectOn}
              fetchFolder={fetchFolder}
            />
          )
        )}
      </div>
      <CSSTransition
        in={openRenameModal}
        timeout={300}
        nodeRef={nodeRef}
        classNames="movein"
        unmountOnExit
      >
        <FolderModal
          label={"Rename"}
          nodeRef={nodeRef}
          setOpenModal={setOpenRenameModal}
          action={handleRename}
          isActionPending={renamePending}
          name={folder?.name}
          buttonLabel={"Rename"}
        />
      </CSSTransition>
    </ContentBox>
  );
}
