import styles from "./../view/articles.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useGetSharedArticles } from "../../../hooks/sharing/useGetSharedArticles";
import { useSharedContext } from "../../../hooks/context/useSharedContext";
import { useMessageContext } from "../../../hooks/useMessageContext";

import SharedArticle from "./sharedArticle";
import Paginate from "../view/Paginate";
import Loading from "../../../Components/loading-spinners/loading/loading";
import TagSelect from "../components/tagSelect";
import ShareModal from "../components/shareModal";

export default function SharedArticles() {
  const { getSharedArticles, isPending } = useGetSharedArticles();
  const {
    articles,
    currPageNo,
    activeFilter,
    dispatch: sharedDispatch,
  } = useSharedContext();

  const { dispatch: messageDispatch } = useMessageContext();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("topic");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetch = async (sortBy) => {
      const res = await getSharedArticles({
        limit: 10,
        skip: currPageNo * 10,
        sortBy,
        ...(search !== "" && { search }),
        ...(tags.length !== 0 && { tag: tags[0] }),
      });

      if (res.error) {
        messageDispatch({ type: "ERROR", payload: res.error });
      }
    };
    if (activeFilter === "Recently Updated") fetch("updatedAt:desc");
    if (activeFilter === "Recently Shared") fetch("createdAt:desc");
  }, [currPageNo, activeFilter, search, tags]);

  const handlePageChange = (page) => {
    sharedDispatch({ type: "PAGE_CHANGED", payload: page.selected });
  };

  const handleFilterClick = async (option) => {
    if (activeFilter !== option) {
      sharedDispatch({ type: "PAGE_CHANGED", payload: 0 });
      sharedDispatch({ type: "FILTER", payload: option });
    }
  };

  const handleSearchTypeChange = (e) => {
    const res = e.target.checked;
    if (res) setSearchBy("tag");
    else setSearchBy("topic");
    if (tags.length !== 0) setTags([]);
    if (search !== "") setSearch("");
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
            <div
              className={`${styles["searchSelect"]} ${
                styles[searchBy === "tag" ? "active" : ""]
              }`}
            >
              <input
                type="checkbox"
                vlaue={searchBy}
                onChange={handleSearchTypeChange}
              />
              <span>Tag Search</span>
            </div>
            {searchBy === "topic" && (
              <div className={styles["searchBar"]}>
                <input
                  type="text"
                  placeholder="🔍 Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  required
                  maxLength={100}
                />
                <div className={styles["img"]}>
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => setSearch("")}
                  ></i>
                </div>
              </div>
            )}
            {searchBy === "tag" && (
              <div className={styles["tagSearch"]}>
                <TagSelect tags={tags} setTags={setTags} search={true} />
              </div>
            )}
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
      {openShareModal && (
        <ShareModal
          articleShare={articleShare}
          setOpenShareModal={setOpenShareModal}
        />
      )}
    </>
  );
}
