import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useReadArticle } from "../../../hooks/article/useReadArticle";
import { useUpdateArticle } from "../../../hooks/article/useUpdateArticle";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../../features/alertSlice";
import { exitPageFullScreen } from "../../../hooks/utils/gobalFunctions";

import EditorForm from "../../../components/editorForm/EditorForm";
import Loading from "../../../components/loaders/loading/Loading";
import NotFound from "../../error/NotFound";

export default function Update() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  const [data, setData] = useState({
    topic: "",
    tags: [],
    content: "",
  });

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [showNotFound, setShowNotFound] = useState(false);

  const dispatch = useDispatch();

  const { updateArticle, isPending: updatePending } = useUpdateArticle();
  const { readArticle, isPending: readPending } = useReadArticle();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    exitPageFullScreen();
  };

  // Reading Article
  useEffect(() => {
    const fetch = async () => {
      const res = await readArticle(id);

      if (res?.ok) {
        setArticle(res?.data);
        setData(res?.data);
      } else if (res?.error) {
        dispatch(setError(res?.error?.message));
        if (res?.error?.status === 404) setShowNotFound(true);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const isSameData = () =>
    data.topic === article?.topic &&
    data.content === article?.content &&
    data.tags === article?.tags;

  const isEmptyData = () =>
    data.topic === "" || data.content === "" || data.tags?.length === 0;

  useEffect(() => {
    setDisableSubmit(isSameData() || isEmptyData());
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { topic, tags, content } = data;
    const updates = {
      ...(topic !== article?.topic && { topic }),
      ...(content !== article?.content && { content }),
      ...(tags !== article?.tags && { tags }),
    };

    if (Object.keys(updates).length === 0) {
      return;
    }

    const res = await updateArticle(id, updates);

    if (res.ok) {
      dispatch(setSuccess(res.ok));
      goBack();
    } else if (res.error) {
      dispatch(setError(res.error));
    }
  };

  return (
    <>
      {readPending && <Loading action={"read"} />}
      {showNotFound && <NotFound />}
      {article && (
        <EditorForm
          data={data}
          setData={setData}
          handleSubmit={handleSubmit}
          disableSubmit={disableSubmit}
          goBack={goBack}
          isPending={updatePending}
        />
      )}
    </>
  );
}
