import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useGetSharedArticle } from "../../../../hooks/sharing/useGetSharedArticle";

import { useDispatch } from "react-redux";
import { setError } from "../../../../features/alertSlice";

import NotFound from "../../../error/NotFound";
import Loading from "../../../../components/loaders/loading/Loading";
import Preview from "../../../../components/preview/Preview";

export default function SharedPreview() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getSharedArticle, isPending: readPending } = useGetSharedArticle();

  const [article, setArticle] = useState(null);
  const [sharing, setSharing] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await getSharedArticle(id);
      if (res?.ok) {
        setArticle(res?.data?.article);
        setSharing(res?.data?.sharing);
      } else if (res?.error) {
        dispatch(setError(res?.error?.message));
        if (res?.error?.status === 404) setShowNotFound(true);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {article && (
        <Preview goBack={goBack} article={article} sharing={sharing} id={id} />
      )}
      {readPending && <Loading action={"read"} />}
      {showNotFound && <NotFound />}
    </>
  );
}
