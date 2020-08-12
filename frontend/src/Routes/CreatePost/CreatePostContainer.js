import React, { useState } from "react";
import CreatePostPresenter from "./CreatePostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD } from "./CreatePostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default ({ cat, pid }) => {
  const [preAction, setPreAction] = useState(cat);
  const [action, setAction] = useState("CreatePost");
  const [create, setCreate] = useState(false);
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const caption = useInput("");
  const photo = useInput("");
  const postId = pid;
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
    loading = FOLLOWQuery.loading;
  }

  const uploadMutation = useMutation(UPLOAD, {
    variables: {
      caption: caption.value,
      // category: preAction,
      category: "image",
      rel_challengers: "",
      pre_challengers: "",
      next_challengers: "",
      tag_challengers: "",
      files: filePath,
      postId: "",
    },
  });
  const onSubmit = async (e) => {
    console.log(action, create);
    e.preventDefault();
    if (action === "CreatePost") {
      console.log(`main relChallenger = ${relChallenger}`);
      console.log(`main tagChallenger = ${tagChallenger}`);
      console.log(action);
      if (create) {
        console.log("ok");
        let formData = new FormData();
        let photoFile = document.getElementById("photo");

        formData.append("file", photoFile.files[0]);
        console.log(photoFile.files[0]);
        try {
          const {
            data: { location },
          } = await axios.post("http://localhost:4000/api/upload", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });
          filePath[0] = location;
          console.log("file", filePath);
          const {
            data: { uploadChallenge },
          } = await uploadMutation();
          if (uploadChallenge.id) {
            window.location.href = "/";
          }
        } catch (e) {
          toast.error("Cant upload", "Try later");
        } finally {
          console.log("ss");
        }
      }
    } else if (action === "relChallenger") {
      console.log(action);
      console.log(`relChallenger = ${relChallenger}`);
    } else if (action === "tagChallenger") {
      console.log(action);
      console.log(`tagChallenger = ${tagChallenger}`);
    }
  };
  console.log(`1`);
  return (
    <CreatePostPresenter
      setAction={setAction}
      action={action}
      setCreate={setCreate}
      create={create}
      photo={photo}
      onSubmit={onSubmit}
      relChallenger={relChallenger}
      tagChallenger={tagChallenger}
      setRelChallenger={setRelChallenger}
      setTagChallenger={setTagChallenger}
      loading={loading}
      data={data}
      id={id}
    />
  );
};
