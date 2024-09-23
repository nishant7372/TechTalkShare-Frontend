import styles from "./Store.module.css";

import {
  useCreateFolder,
  useGetFolders,
  useGetPinned,
  useGetRecents,
  useGetStarred,
} from "../../hooks/store/storeApis";
import { useState, useEffect, useRef } from "react";
import { useFormatDate } from "../../hooks/utils/useFormatDate";
import { setError, setSuccess } from "../../features/alertSlice";
import { useDispatch } from "react-redux";
import File from "../../components/file/File";
import Folder from "../../components/folder/Folder";
import ContentBox from "../../components/contentBox/ContentBox";
import Button from "../../components/buttons/Button";
import { CSSTransition } from "react-transition-group";
import FolderModal from "../../components/modals/folderModal/FolderModal";
export default function Store() {
  const dispatch = useDispatch();
  const { getRecents, isPending: recentPending } = useGetRecents();
  const { getPinned, isPending: pinnedPending } = useGetPinned();
  const { getStarred, isPending: starredPending } = useGetStarred();
  const { getFolders, isPending: foldersPending } = useGetFolders();

  const [recentItems, setRecentItems] = useState(null);
  const [pinnedItems, setPinnedItems] = useState(null);
  const [starredItems, setStarredItems] = useState(null);
  const [folders, setFolders] = useState(null);

  const fetchRecent = async () => {
    const res = await getRecents({ limit: 20 });

    if (res?.ok) {
      setRecentItems(res?.recents);
    } else if (res?.error) {
      dispatch(setError(res?.error));
    }
  };
  const fetchPinned = async () => {
    const res = await getPinned({ limit: 20 });

    if (res?.ok) {
      setPinnedItems(res?.pinned);
    } else if (res?.error) {
      dispatch(setError(res?.error));
    }
  };
  const fetchStarred = async () => {
    const res = await getStarred({ limit: 20 });

    if (res?.ok) {
      setStarredItems(res?.starred);
    } else if (res?.error) {
      dispatch(setError(res?.error));
    }
  };

  const fetchFolders = async () => {
    const res = await getFolders({ limit: 20 });

    if (res?.ok) {
      setFolders(res?.folders);
    } else if (res?.error) {
      dispatch(setError(res?.error));
    }
  };

  useEffect(() => {
    fetchRecent();
    fetchPinned();
    fetchStarred();
    fetchFolders();
  }, []);

  return (
    <ContentBox heading={"Files"}>
      <div className={styles["mainBox"]}>
        <Row
          heading={"Pinned"}
          isPinned={true}
          data={pinnedItems}
          fetchPinned={fetchPinned}
          fetchStarred={fetchStarred}
          isPending={pinnedPending}
        />
        <Row
          heading={"Most Recent"}
          isRecent={true}
          data={recentItems}
          isPending={recentPending}
          showPinned={false}
          showStarred={false}
        />
        <RowFolder
          folders={folders}
          isPending={foldersPending}
          fetchFolders={fetchFolders}
        />
        <Row
          heading={"Starred"}
          isStarred={true}
          data={starredItems}
          fetchPinned={fetchPinned}
          fetchStarred={fetchStarred}
          isPending={starredPending}
        />
      </div>
    </ContentBox>
  );
}
const Row = ({
  data,
  heading,
  isRecent,
  fetchPinned,
  fetchStarred,
  showPinned,
  showStarred,
}) => {
  const { timeSince } = useFormatDate();
  return (
    <div className={styles["most-recent"]}>
      <div className={styles["sub-heading"]}>{heading}</div>
      <div className={styles["files"]}>
        {data?.map(({ topic, updatedAt, isStarred, isPinned, _id }) => (
          <File
            fileName={topic}
            date={`${timeSince(updatedAt)} ago`}
            isPinned={isPinned}
            isStarred={isStarred}
            isRecent={isRecent}
            key={_id}
            url={`/articles/${_id}`}
            fetchStarred={fetchStarred}
            fetchPinned={fetchPinned}
            id={_id}
            showPinned={showPinned}
            showStarred={showStarred}
          />
        ))}
      </div>
    </div>
  );
};

const RowFolder = ({ folders, isPending, fetchFolders }) => {
  const colors = ["yellow", "skyblue", "pink"];
  const { createFolder, isPending: createPending } = useCreateFolder();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const dispatch = useDispatch();
  const nodeRef = useRef();

  const createNewFolder = async (name) => {
    const res = await createFolder({ name });
    if (res?.ok) {
      dispatch(setSuccess(res?.ok));
      fetchFolders();
      setOpenCreateModal(false);
    } else if (res?.error) {
      dispatch(setError(res?.error));
    }
  };

  return (
    <div className={styles["folder"]}>
      <div className="flex-row">
        <div className={styles["sub-heading"]}>Folders</div>
        <Button
          icon={
            <i
              className="fa-solid fa-plus"
              style={{ color: "white", fontSize: "1.2rem" }}
            />
          }
          type={"customButton2"}
          content={" New"}
          buttonStyle={{
            fontSize: "1.6rem",
            padding: "0.4rem 1.6rem",
          }}
          action={() => setOpenCreateModal(true)}
        />
      </div>
      <div className={styles["folders"]}>
        <Folder
          folderName={"My Articles"}
          color={colors[0]}
          url={`/articles`}
        />
        <Folder folderName={"Shared"} color={colors[1]} url={`/shared`} />
        {folders?.map(({ name, _id }, index) => (
          <Folder
            folderName={name}
            key={_id}
            color={colors[index % colors.length]}
            url={`/store/folder/${_id}`}
          />
        ))}
      </div>
      <CSSTransition
        in={openCreateModal}
        timeout={300}
        nodeRef={nodeRef}
        classNames="movein"
        unmountOnExit
      >
        <FolderModal
          label={"New Folder"}
          nodeRef={nodeRef}
          setOpenModal={setOpenCreateModal}
          action={createNewFolder}
          isActionPending={createPending}
          buttonLabel={"Create"}
        />
      </CSSTransition>
    </div>
  );
};
