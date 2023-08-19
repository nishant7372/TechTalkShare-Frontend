import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useReadArticle } from "../../../../hooks/article/useReadArticle";
import { useDeleteArticle } from "../../../../hooks/article/useDeleteArticle";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../../../features/alertSlice";

import Loading from "../../../../components/loaders/loading/Loading";
import NotFound from "../../../error/NotFound";
import Preview from "../../../../components/preview/Preview";

export default function ArticlePreview() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { readArticle, isPending: readPending } = useReadArticle();
  const { deleteArticle, isPending: deletePending } = useDeleteArticle();

  const [article, setArticle] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await readArticle(id);

      if (res?.ok) {
        setArticle(res?.data);
      } else if (res?.error) {
        dispatch(setError(res?.error?.message));
        if (res?.error?.status === 404) setShowNotFound(true);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (response) => {
    if (!response) {
      setShowConfirm(false);
      return;
    }
    const res = await deleteArticle(id);
    if (res.ok) {
      dispatch(setSuccess(res.ok));
      goBack();
    } else if (res.error) {
      dispatch(setError(res.error));
    }
    setShowConfirm(false);
  };

  return (
    <>
      {readPending && <Loading action={"read"} />}
      {showNotFound && <NotFound />}
      {article && (
        <Preview
          article={article}
          handleDelete={handleDelete}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          deletePending={deletePending}
          goBack={goBack}
          id={id}
        />
      )}
    </>
  );
}
