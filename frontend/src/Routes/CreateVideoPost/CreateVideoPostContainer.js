import React, { useState } from "react";
import CreateVideoPostPresenter from "./CreateVideoPostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD } from "./CreateVideoPostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("CreatePost");
  const [create, setCreate] = useState(false);
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const caption = useInput("");
  let filePath = [];
  var limit = 100;
  var cur = 0;
  var id = "";
  const meQuery = useQuery(ME);
  var data = "",
    loading = "";
  if (meQuery.data.me) {
    id = meQuery.data.me.id;

    const FOLLOWQuery = useQuery(FOLLOW, {
      variables: {
        id,
        limit,
        cur,
      },
    });
    data = FOLLOWQuery.data;
    console.log(data);
    loading = FOLLOWQuery.loading;
  }

  const uploadMutation = useMutation(UPLOAD, {
    variables: {
      caption: caption.value,
      category: "video",
      rel_challengers: "",
      pre_challengers: "",
      next_challengers: "",
      tag_challengers: "",
      files: filePath,
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "CreatePost") {
      if (create) {
        let formData = new FormData();
        let videoFile = document.getElementById("video");
        console.log(videoFile.files[0]);
        formData.append("file", videoFile.files[0]);
        try {
          const {
            data: { location },
          } = await axios.post("http://localhost:4000/api/upload", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });
          filePath.push(location);

          const {
            data: { uploadChallenge },
          } = await uploadMutation();
          if (uploadChallenge.id) {
            window.location.href = "/";
          }
        } catch (e) {
          toast.error("Cant upload", "Try later");
        } finally {
        }
      }
    } else if (action === "relChallenger") {
    } else if (action === "tagChallenger") {
    }
  };
  return (
    <CreateVideoPostPresenter
      setAction={setAction}
      action={action}
      setCreate={setCreate}
      create={create}
      onSubmit={onSubmit}
      relChallenger={relChallenger}
      tagChallenger={tagChallenger}
      setRelChallenger={setRelChallenger}
      setTagChallenger={setTagChallenger}
      loading={loading}
      caption={caption}
      data={data}
      id={id}
    />
  );
};
