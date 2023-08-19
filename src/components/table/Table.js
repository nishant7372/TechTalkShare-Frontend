import styles from "./Table.module.css";
import { useState, useRef } from "react";
import images from "../../constants/images";

import Row from "./Row";
import TagSelect from "../tags/TagSelect";
import Paginate from "../pagination/Paginate";
import AnimatedButton from "../buttons/AnimatedButton";
import ShareModal from "../modals/sharemodal/ShareModal";

import { enterPageFullScreen } from "../../hooks/utils/gobalFunctions";
import { CSSTransition } from "react-transition-group";

import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../messageBox/MessageBox";

export default function Table({ query, setFilters }) {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  const { articles, filters } = useSelector((store) => store[query]);

  const { searchText, tag, sortBy } = filters;

  const handlePageChange = (page) => {
    dispatch(setFilters({ currPageNo: page.selected }));
  };

  const handleFilterClick = (option) => {
    dispatch(setFilters({ sortBy: option, currPageNo: 0 }));
  };

  const [openShareModal, setOpenShareModal] = useState(false);
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [articleShare, setArticleShare] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleShare = (articleID) => {
    setOpenShareModal(true);
    setArticleShare(articleID);
  };

  const handleShowMessage = (flag, data) => {
    setOpenMessageBox(flag);
    setModalData(data);
  };

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-header"]}>
        <div className="flex-row">
          <button
            className={`${styles["filterButton"]} ${
              sortBy === "updatedAt:desc" ? styles["active"] : ""
            }`}
            disabled={sortBy === "updatedAt:desc"}
            onClick={() => handleFilterClick("updatedAt:desc")}
          >
            Recently Updated
          </button>
          <button
            className={`${styles["filterButton"]} ${
              sortBy === "createdAt:desc" ? styles["active"] : ""
            }`}
            disabled={sortBy === "createdAt:desc"}
            onClick={() => handleFilterClick("createdAt:desc")}
          >
            Newest to Oldest
          </button>
        </div>
        <div className="flex-row">
          <div className={styles["searchBar"]}>
            <input
              type="search"
              placeholder="🔍 Search..."
              onChange={(e) => {
                dispatch(
                  setFilters({ currPageNo: 0, searchText: e.target.value })
                );
              }}
              value={searchText}
              required
              maxLength={200}
            />
          </div>
          <div className={styles["tagSearch"]}>
            <TagSelect
              tags={tag}
              setTags={setFilters}
              search={true}
              small={true}
            />
            <div
              className={styles["img"]}
              onClick={() => dispatch(setFilters({ currPageNo: 0, tag: null }))}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          {query !== "sharing" && (
            <AnimatedButton
              link={`/articles/create`}
              action={enterPageFullScreen}
              content="+ Create"
              buttonStyle={customStyles.createButton}
              type="createBt"
            />
          )}
        </div>
      </div>
      {articles?.length > 0 ? (
        articles.map((article) => (
          <Row
            key={article._id}
            article={article}
            updated={sortBy === "updatedAt:desc"}
            handleShare={handleShare}
            query={query}
            handleShowMessage={handleShowMessage}
          />
        ))
      ) : (
        <div className={styles["no-data-found"]}>
          {searchText === "" && !tag ? (
            <img className={styles["empty"]} src={images.empty} alt="empty" />
          ) : (
            <>
              <img
                className={styles["noResultsFound"]}
                src={images.noResultsFound}
                alt="noResultsFound"
              />
              <div style={customStyles.empty}>No Results Found</div>
            </>
          )}
        </div>
      )}

      <div className={styles["table-footer"]}>
        <Paginate handlePageChange={handlePageChange} query={query} />
      </div>
      <CSSTransition
        in={query === "sharing" ? openMessageBox : openShareModal}
        timeout={300}
        nodeRef={nodeRef}
        classNames="movein"
        unmountOnExit
      >
        {query === "sharing" ? (
          <MessageBox
            handleShowMessage={handleShowMessage}
            nodeRef={nodeRef}
            modalData={modalData}
          />
        ) : (
          <ShareModal
            articleShare={articleShare}
            setOpenShareModal={setOpenShareModal}
            nodeRef={nodeRef}
            editPermission={true}
          />
        )}
      </CSSTransition>
    </div>
  );
}

const customStyles = {
  createButton: {
    fontSize: "1.6rem",
    height: "calc(3rem - 0.3rem - 2px)",
    padding: "0.15rem 0.8rem",
  },
  empty: {
    fontSize: "3rem",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: "-3rem",
  },
};
