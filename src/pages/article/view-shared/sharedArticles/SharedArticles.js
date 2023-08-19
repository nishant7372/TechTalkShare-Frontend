import { useEffect } from "react";

import { useGetSharedArticles } from "../../../../hooks/sharing/useGetSharedArticles";

import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../../../features/alertSlice";
import { setFilters } from "../../../../features/sharingSlice";

import Loading from "../../../../components/loaders/loading/Loading";
import Table from "../../../../components/table/Table";

export default function SharedArticles() {
  const { filters } = useSelector((store) => store.sharing);
  const dispatch = useDispatch();

  const { getSharedArticles, isPending } = useGetSharedArticles();

  const fetch = async () => {
    const res = await getSharedArticles({
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
      <Table query="sharing" setFilters={setFilters} />
    </>
  );
}
