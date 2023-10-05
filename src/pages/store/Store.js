import styles from "./Store.module.css";

import {
  useGetFolders,
  useGetPinned,
  useGetRecents,
  useGetStarred,
} from "../../hooks/store/storeApis";
import { useState, useEffect } from "react";
import { useFormatDate } from "../../hooks/utils/useFormatDate";
import { setError } from "../../features/alertSlice";
import { useDispatch } from "react-redux";
import File from "../../components/file/File";
import Folder from "../../components/folder/Folder";
import ContentBox from "../../components/contentBox/ContentBox";
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
        <RowFolder folders={folders} isPending={foldersPending} />
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

const RowFolder = ({ folders, isPending }) => {
  const colors = ["yellow", "skyblue", "pink"];
  return (
    <div className={styles["folder"]}>
      <div className={styles["sub-heading"]}>Folders</div>
      <div className={styles["folders"]}>
        <Folder
          folderName={"My Articles"}
          color={colors[0]}
          url={`/articles`}
        />
        <Folder folderName={"Shared"} color={colors[1]} url={`/shared`} />
        <Folder folderName={"Downloads"} color={colors[2]} url={`/downloads`} />
        {folders?.map(({ name, _id }, index) => (
          <Folder
            folderName={name}
            key={_id}
            color={colors[index % colors.length]}
            url={`/store/folder/${_id}`}
          />
        ))}
      </div>
    </div>
  );
};
