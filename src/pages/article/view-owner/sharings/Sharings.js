import styles from "./Sharings.module.css";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { useGetSharings } from "../../../../hooks/sharing/useGetSharings";

import { useDispatch } from "react-redux";
import { setError } from "../../../../features/alertSlice";

import Sharing from "./sharing/Sharing";
import NotFound from "../../../error/NotFound";
import ShareModal from "../../../../components/modals/sharemodal/ShareModal";
import AnimatedButton from "../../../../components/buttons/AnimatedButton";
import Loading from "../../../../components/loaders/loading/Loading";
import Tag from "../../../../components/tags/Tag";
import images from "../../../../constants/images";

export default function Sharings() {
  const { id } = useParams();

  const { getSharings, isPending } = useGetSharings();

  const [data, setData] = useState(null);
  const [sharings, setSharings] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Newest to Oldest");
  const [openShareModal, setOpenShareModal] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  const handleShare = () => {
    setOpenShareModal(true);
  };

  const fetchSharings = async () => {
    const res = await getSharings(id);
    if (res?.ok) setData(res?.data?.sharings);
    else if (res?.error) {
      dispatch(setError(res?.error?.message));
      if (res?.error?.status === 404) setShowNotFound(true);
    }
  };

  const applySortedData = (dataToSort) => {
    let sortedData;
    if (activeFilter === "Recently Updated") {
      sortedData = [...dataToSort].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    }
    if (activeFilter === "Newest to Oldest") {
      sortedData = [...dataToSort].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    setSharings(sortedData);
  };

  useEffect(() => {
    fetchSharings();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      const filteredData = data.filter(({ sharedWith }) =>
        sharedWith?.userName?.startsWith(searchTerm)
      );
      applySortedData(filteredData);
    } else {
      if (data) applySortedData(data);
    }
    // eslint-disable-next-line
  }, [data, activeFilter, searchTerm]);

  return (
    <>
      {isPending && <Loading action={"mainRead"} />}
      {data && (
        <div className={styles["sharing-container"]}>
          <div className={styles["sharing-header"]}>
            <div className="flex-row">
              <div
                className={`${styles["filterButton"]} ${
                  activeFilter === "Recently Updated" ? styles["active"] : ""
                }`}
                onClick={() => setActiveFilter("Recently Updated")}
              >
                Recently Updated
              </div>
              <div
                className={`${styles["filterButton"]} ${
                  activeFilter === "Newest to Oldest" ? styles["active"] : ""
                }`}
                onClick={() => setActiveFilter("Newest to Oldest")}
              >
                Newest to Oldest
              </div>
            </div>
            <div className="flex-row">
              <div className={styles["searchBar"]}>
                <input
                  type="searchTerm"
                  placeholder="🔍 Username"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  required
                  maxLength={50}
                />
              </div>

              <AnimatedButton
                content="+ Share"
                buttonStyle={{
                  fontSize: "1.6rem",
                  height: "calc(3rem - 0.3rem - 2px)",
                  padding: "0.15rem 0.8rem",
                }}
                action={() => handleShare()}
                type="createBt"
              />
            </div>
          </div>
          <div>
            <div className={styles["sharing-subheader"]}>
              <div className={styles["top-container"]}>
                <div className={styles["col1"]}>SharedWith</div>
                <div className={styles["col2"]}>Edit</div>

                <div className={styles["col3"]}>
                  {activeFilter === "Recently Updated" && (
                    <div className={styles["h4"]}>Updated At</div>
                  )}
                  {activeFilter === "Newest to Oldest" && (
                    <div className={styles["h4"]}>Shared At</div>
                  )}
                </div>
                <div className={styles["col4"]}>Changes</div>
                <div className={styles["col5"]}>Access</div>
              </div>
            </div>
          </div>
          {sharings?.map((sharing) => (
            <Sharing
              key={sharing._id}
              sharing={sharing}
              updated={activeFilter === "Recently Updated"}
              updateSharings={fetchSharings}
            />
          ))}
          {sharings?.length === 0 && (
            <div className={styles["no-sharings-found"]}>
              <img
                className={styles["empty"]}
                style={{ height: "45rem" }}
                src={images.empty}
                alt="empty"
              />
              <div className="flex-row">
                {" "}
                No Sharing found. Click on
                <Tag tag={{ value: "+ Share" }} color={"transparent"} />
                to share this article.
              </div>
            </div>
          )}
          <div className={styles["sharing-footer"]}></div>
        </div>
      )}

      <CSSTransition
        in={openShareModal}
        timeout={300}
        nodeRef={nodeRef}
        classNames="movein"
        unmountOnExit
      >
        <ShareModal
          articleShare={id}
          setOpenShareModal={setOpenShareModal}
          nodeRef={nodeRef}
          editPermission={true}
          updateSharings={fetchSharings}
        />
      </CSSTransition>
      {showNotFound && <NotFound />}
    </>
  );
}
