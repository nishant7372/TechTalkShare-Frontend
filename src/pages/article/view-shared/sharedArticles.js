import styles from "./../view-owner/articles.module.css";

import { useEffect, useState, useRef } from "react";

import { useGetSharedArticles } from "../../../hooks/sharing/useGetSharedArticles";
import { useSharingContext } from "../../../hooks/context/useSharingContext";
import { useMessageContext } from "../../../hooks/context/useMessageContext";
import { CSSTransition } from "react-transition-group";

import SharedArticle from "./sharedArticle";
import Paginate from "../components/pagination/paginate";
import Loading from "../../../Components/loading-spinners/loading/loading";
import TagSelect from "../components/tags/tagSelect";
import ShareModal from "../components/modal/shareModal";

export default function SharedArticles() {
  const { getSharedArticles, isPending } = useGetSharedArticles();
  const {
    articles,
    currPageNo,
    activeFilter,
    dispatch: sharingDispatch,
  } = useSharingContext();

  const { dispatch: messageDispatch } = useMessageContext();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(null);

  const nodeRef = useRef(null);

  useEffect(() => {
    const fetch = async (sortBy) => {
      const res = await getSharedArticles({
        limit: 10,
        skip: currPageNo * 10,
        sortBy,
        ...(search !== "" && { search }),
        ...(tag && { tag }),
      });
      if (res.error) {
        messageDispatch({ type: "ERROR", payload: res.error });
      }
    };
    if (activeFilter === "Recently Updated") fetch("updatedAt:desc");
    if (activeFilter === "Recently Shared") fetch("createdAt:desc");
    // eslint-disable-next-line
  }, [currPageNo, activeFilter, search, tag]);

  const handlePageChange = (page) => {
    sharingDispatch({ type: "PAGE_CHANGED", payload: page.selected });
  };

  const handleFilterClick = async (option) => {
    if (activeFilter !== option) {
      sharingDispatch({ type: "PAGE_CHANGED", payload: 0 });
      sharingDispatch({ type: "FILTER", payload: option });
    }
  };

  const [openShareModal, setOpenShareModal] = useState(false);
  const [articleShare, setArticleShare] = useState(null);

  const handleShare = (articleID) => {
    setOpenShareModal(true);
    setArticleShare(articleID);
  };

  return (
    <>
      {isPending && <Loading action={"mainRead"} />}
      <div className={styles["article-container"]}>
        <div className={styles["article-header"]}>
          <div className="flex-row">
            <div
              className={`${styles["filterButton"]} ${
                activeFilter === "Recently Updated" ? styles["active"] : ""
              }`}
              onClick={() => handleFilterClick("Recently Updated")}
            >
              Recently Updated
            </div>
            <div
              className={`${styles["filterButton"]} ${
                activeFilter === "Recently Shared" ? styles["active"] : ""
              }`}
              onClick={() => handleFilterClick("Recently Shared")}
            >
              Recently Shared
            </div>
          </div>
          <div className="flex-row">
            <div className={styles["searchBar"]}>
              <input
                type="search"
                placeholder="🔍 Search..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                required
                maxLength={100}
              />
            </div>
            <div className={styles["tagSearch"]}>
              <TagSelect
                tags={tag}
                setTags={setTag}
                search={true}
                small={true}
              />
              <div className={styles["img"]}>
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => setTag(null)}
                ></i>
              </div>
            </div>
          </div>
        </div>
        {articles &&
          articles.map((article) => (
            <SharedArticle
              key={article._id}
              articleObj={article}
              updated={activeFilter === "Recently Updated"}
              handleShare={handleShare}
            />
          ))}
        {articles && articles.length === 0 && (
          <div className={styles["no-article-found"]}>
            Nothing is shared with you.
          </div>
        )}
        <div className={styles["article-footer"]}>
          <Paginate handlePageChange={handlePageChange} />
        </div>
      </div>
      <CSSTransition
        in={openShareModal}
        timeout={300}
        nodeRef={nodeRef}
        classNames="message"
        unmountOnExit
      >
        <ShareModal
          articleShare={articleShare}
          setOpenShareModal={setOpenShareModal}
          nodeRef={nodeRef}
        />
      </CSSTransition>
    </>
  );
}
