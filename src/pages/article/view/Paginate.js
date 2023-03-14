import styles from "./paginate.module.css";

import ReactPaginate from "react-paginate";
import { useArticleContext } from "../../../hooks/useArticleContext";

export default function Paginate({ handlePageChange }) {
  const { articleCount, currPageNo } = useArticleContext();
  const articlePerPage = 10;
  const pages = Math.ceil(articleCount / articlePerPage);

  return (
    <ReactPaginate
      previousLabel="<<"
      pageCount={Math.max(1, pages)}
      pageRangeDisplayed={window.innerWidth < 600 ? 2 : 5}
      marginPagesDisplayed={2}
      nextLabel=">>"
      activeClassName={styles["active-page"]}
      onPageChange={handlePageChange}
      forcePage={currPageNo}
      className={styles["react-paginate"]}
    />
  );
}
