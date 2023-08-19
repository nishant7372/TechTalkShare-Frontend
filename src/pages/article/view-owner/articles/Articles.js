import styles from "./Articles.module.css";

import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { useReadArticles } from "../../../../hooks/article/useReadArticles";

import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../../../features/alertSlice";
import {
  setCurrPageNo,
  setActiveFilter,
} from "../../../../features/articleSlice";

import Article from "./article/Article";
import Paginate from "../../../../components/pagination/Paginate";
import Loading from "../../../../components/loaders/loading/Loading";
import TagSelect from "../../../../components/tags/TagSelect";
import ShareModal from "../../../../components/modals/sharemodal/ShareModal";
import AnimatedButton from "../../../../components/buttons/AnimatedButton";
import images from "../../../../constants/images";
import { enterPageFullScreen } from "../../../../hooks/utils/gobalFunctions";

export default function Articles() {
  const { readArticles, isPending } = useReadArticles();

  const { articles, currPageNo, activeFilter } = useSelector(
    (store) => store.article
  );

  const dispatch = useDispatch();

  const nodeRef = useRef(null);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(null);

  useEffect(() => {
    const fetch = async (sortBy) => {
      const res = await readArticles({
        limit: 10,
        skip: currPageNo * 10,
        sortBy,
        ...(search !== "" && { search }),
        ...(tag && { tag }),
      });

      if (res.error) {
        dispatch(setError(res.error));
      }
    };
    if (activeFilter === "Recently Updated") fetch("updatedAt:desc");
    if (activeFilter === "Newest to Oldest") fetch("createdAt:desc");
    // eslint-disable-next-line
  }, [currPageNo, activeFilter, search, tag]);

  useEffect(() => {
    if (tag) dispatch(setCurrPageNo(0));
  }, [tag]);

  const handlePageChange = (page) => {
    dispatch(setCurrPageNo(page.selected));
  };

  const handleFilterClick = async (option) => {
    if (activeFilter !== option) {
      dispatch(setCurrPageNo(0));
      dispatch(setActiveFilter(option));
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
                activeFilter === "Newest to Oldest" ? styles["active"] : ""
              }`}
              onClick={() => handleFilterClick("Newest to Oldest")}
            >
              Newest to Oldest
            </div>
          </div>
          <div className="flex-row">
            <div className={styles["searchBar"]}>
              <input
                type="search"
                placeholder="🔍 Search..."
                onChange={(e) => {
                  dispatch(setCurrPageNo(0));
                  setSearch(e.target.value);
                }}
                value={search}
                required
                maxLength={50}
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

            <AnimatedButton
              link={`/articles/create`}
              action={enterPageFullScreen}
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
        {articles?.length > 0 ? (
          articles.map((article) => (
            <Article
              key={article._id}
              article={article}
              updated={activeFilter === "Recently Updated"}
              handleShare={handleShare}
            />
          ))
        ) : (
          <div className={styles["no-article-found"]}>
            {search === "" && !tag ? (
              <img className={styles["empty"]} src={images.empty} alt="empty" />
            ) : (
              <>
                <img
                  className={styles["noResultsFound"]}
                  src={images.noResultsFound}
                  alt="noResultsFound"
                />
                <div
                  style={{
                    fontSize: "3rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    marginTop: "-3rem",
                  }}
                >
                  No Results Found
                </div>
              </>
            )}
          </div>
        )}

        <div className={styles["article-footer"]}>
          <Paginate handlePageChange={handlePageChange} type={"article"} />
        </div>
      </div>
      <CSSTransition
        in={openShareModal}
        timeout={300}
        nodeRef={nodeRef}
        classNames="movein"
        unmountOnExit
      >
        <ShareModal
          articleShare={articleShare}
          setOpenShareModal={setOpenShareModal}
          nodeRef={nodeRef}
          editPermission={true}
        />
      </CSSTransition>
    </>
  );
}
