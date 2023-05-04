import styles from "./articles.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useReadArticles } from "../../../hooks/article/useReadArticles";
import { useArticleContext } from "../../../hooks/context/useArticleContext";
import { useMessageContext } from "../../../hooks/context/useMessageContext";

import Article from "./article";
import Paginate from "../components/pagination/paginate";
import Loading from "../../../Components/loading-spinners/loading/loading";
import TagSelect from "../components/tags/tagSelect";
import ShareModal from "../components/modal/shareModal";
import AnimatedButton from "../../../Components/button/animatedButton";

export default function Articles() {
  const { readArticles, isPending } = useReadArticles();
  const {
    articles,
    currPageNo,
    activeFilter,
    dispatch: articleDispatch,
  } = useArticleContext();

  const { dispatch: messageDispatch } = useMessageContext();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("topic");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetch = async (sortBy) => {
      const res = await readArticles({
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
    if (activeFilter === "Newest to Oldest") fetch("createdAt:desc");
    // eslint-disable-next-line
  }, [currPageNo, activeFilter, search, tags]);

  const handlePageChange = (page) => {
    articleDispatch({ type: "PAGE_CHANGED", payload: page.selected });
  };

  const handleFilterClick = async (option) => {
    if (activeFilter !== option) {
      articleDispatch({ type: "PAGE_CHANGED", payload: 0 });
      articleDispatch({ type: "FILTER", payload: option });
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
                activeFilter === "Newest to Oldest" ? styles["active"] : ""
              }`}
              onClick={() => handleFilterClick("Newest to Oldest")}
            >
              Newest to Oldest
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
            <AnimatedButton
              link={`/articles/create`}
              content="+ Create"
              buttonStyle={{
                fontSize: "1.6rem",
                height: "calc(3rem - 0.3rem - 2px)",
                padding: "0.15rem 0.8rem",
              }}
              type="createBt"
            />
          </div>
        </div>
        {articles &&
          articles.map((article) => (
            <Article
              key={article._id}
              article={article}
              updated={activeFilter === "Recently Updated"}
              handleShare={handleShare}
            />
          ))}
        {articles && articles.length === 0 && (
          <div className={styles["no-article-found"]}>
            No article found. Click on create to add new one.
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
