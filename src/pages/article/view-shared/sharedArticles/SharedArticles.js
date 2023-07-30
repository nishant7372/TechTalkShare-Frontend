import styles from "./../../view-owner/articles/Articles.module.css";

import { useEffect, useState } from "react";

import { useGetSharedArticles } from "../../../../hooks/sharing/useGetSharedArticles";

import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../../../features/alertSlice";
import {
  setActiveFilter,
  setCurrPageNo,
} from "../../../../features/sharingSlice";

import SharedArticle from "./sharedArticle/SharedArticle";
import TagSelect from "../../../../components/tags/TagSelect";
import Paginate from "../../../../components/pagination/Paginate";
import Loading from "../../../../components/loaders/loading/Loading";
import images from "../../../../constants/images";

export default function SharedArticles() {
  const { articles, currPageNo, activeFilter } = useSelector(
    (store) => store.sharing
  );
  const dispatch = useDispatch();

  const { getSharedArticles, isPending } = useGetSharedArticles();

  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(null);

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
        dispatch(setError(res.error));
      }
    };

    if (activeFilter === "Recently Updated") fetch("updatedAt:desc");
    if (activeFilter === "Recently Shared") fetch("createdAt:desc");
    // eslint-disable-next-line
  }, [currPageNo, activeFilter, search, tag]);

  const handlePageChange = (page) => {
    dispatch(setCurrPageNo(page.selected));
  };

  useEffect(() => {
    if (tag) dispatch(setCurrPageNo(0));
  }, [tag]);

  const handleFilterClick = async (option) => {
    if (activeFilter !== option) {
      dispatch(setCurrPageNo(0));
      dispatch(setActiveFilter(option));
    }
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
                onChange={(e) => {
                  dispatch(setCurrPageNo(0));
                  setSearch(e.target.value);
                }}
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
        {articles?.length > 0 ? (
          articles.map((article) => (
            <SharedArticle
              key={article._id}
              articleObj={article}
              updated={activeFilter === "Recently Updated"}
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
          <Paginate handlePageChange={handlePageChange} type={"sharing"} />
        </div>
      </div>
    </>
  );
}
