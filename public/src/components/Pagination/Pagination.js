import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const totalPage = props.pages.totalPage;
  const currentPage = props.pages.currentPage;

  const pageHandler = (i) => {
    props.currentPageHandler(i);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPage <= maxPagesToShow) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(
          <button
            type="button"
            key={i}
            className={`${styles.page} ${
              i === currentPage ? styles.activePage : ""
            }`}
            onClick={() => pageHandler(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pageNumbers.push(
          <button
            type="button"
            key={1}
            className={`${styles.page} ${
              1 === currentPage ? styles.activePage : ""
            }`}
            onClick={() => pageHandler(1)}
          >
            1
          </button>
        );

        if (startPage > 2) {
          pageNumbers.push(<span key="ellipsis-before">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            type="button"
            key={i}
            className={`${styles.page} ${
              i === currentPage ? styles.activePage : ""
            }`}
            onClick={() => pageHandler(i)}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPage) {
        if (endPage < totalPage - 1) {
          pageNumbers.push(<span key="ellipsis-after">...</span>);
        }

        pageNumbers.push(
          <button
            type="button"
            key={totalPage}
            className={`${styles.page} ${
              totalPage === currentPage ? styles.activePage : ""
            }`}
            onClick={() => pageHandler(totalPage)}
          >
            {totalPage}
          </button>
        );
      }
    }
    return pageNumbers;
  };
  return <div className={styles["pagination-main"]}>{renderPageNumbers()}</div>;
};

export default Pagination;
