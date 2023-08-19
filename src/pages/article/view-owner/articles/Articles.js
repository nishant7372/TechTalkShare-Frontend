import { useEffect } from "react";

import { useReadArticles } from "../../../../hooks/article/useReadArticles";

import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../../../features/alertSlice";

import Loading from "../../../../components/loaders/loading/Loading";
import Table from "../../../../components/table/Table";
import { setFilters } from "../../../../features/articleSlice";

export default function Articles() {
  const { readArticles, isPending } = useReadArticles();

  const { filters } = useSelector((store) => store.article);

  const dispatch = useDispatch();

  const fetch = async () => {
    const res = await readArticles({
      limit: filters.limit,
      skip: filters.currPageNo * filters.limit,
      sortBy: filters.sortBy,
      ...(filters.searchText !== "" && { search: filters.searchText }),
      ...(filters.tag && { tag: filters.tag }),
    });

    if (res?.error) {
      dispatch(setError(res?.error));
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <>
      {isPending && <Loading action={"mainRead"} />}
      <Table query={"article"} setFilters={setFilters} />
    </>
  );
}
