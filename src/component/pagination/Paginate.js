import styles from "./Paginate.module.css";

import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export default function Paginate({ handlePageChange, type }) {
  const { articleCount, currPageNo } = useSelector((store) => store[type]);

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
