import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateArticle } from "../../../hooks/article/useCreateArticle";
import { useDispatch } from "react-redux";

import { setError, setSuccess } from "../../../features/alertSlice";
import {
  addItemtoLocalStorage,
  exitPageFullScreen,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../../hooks/utils/gobalFunctions";
import EditorForm from "../../../components/editorForm/EditorForm";

export default function Create() {
  const { createArticle, isPending } = useCreateArticle();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const dispatch = useDispatch();

  const item = getItemFromLocalStorage("newFormData");

  const [data, setData] = useState(
    item || {
      topic: "",
      tags: [],
      content: "",
    }
  );

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    exitPageFullScreen();
    removeItemFromLocalStorage("newFormData");
  };

  const isEmptyData = () =>
    data.topic === "" || data.content === "" || data.tags?.length === 0;

  useEffect(() => {
    addItemtoLocalStorage({ key: "newFormData", value: data });
    setDisableSubmit(isEmptyData());
    // eslint-disable-next-line
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createArticle(data);

    if (res.ok) {
      dispatch(setSuccess(res.ok));
      goBack();
    } else if (res.error) {
      dispatch(setError(res.error));
    }
  };

  return (
    <EditorForm
      data={data}
      setData={setData}
      handleSubmit={handleSubmit}
      isPending={isPending}
      goBack={goBack}
      disableSubmit={disableSubmit}
    />
  );
}
