import React, { useState } from "react";
import UploadChallengePresenter from "./UploadChallengePresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD } from "./CreatePostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default ({ location: { search } }) => {
  const [action, setAction] = useState("UploadChallenge");
  const [create, setCreate] = useState(false);
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const caption = useInput("");
  const category = useInput("");
  const video = useInput("");
  const audio = useInput("");
  const photo = useInput("");
  var limit = 100;
  var cur = 0;
  const id = search.split("?")[1];
  const { data, loading } = useQuery(FOLLOW, {
    variables: {
      id,
      limit,
      cur,
    },
  });
  const uploadMutation = useMutation(UPLOAD, {
    variables: {
      caption: caption.value,
      category: category.value,
      rel_challengers: "D",
      pre_challengers: "C",
      next_challengers: "B",
      tag_challengers: "A",
      newPost: true,
      scope: true,
      files: `C:/Users/multicampus/Desktop`,
      postId: "1",
    },
  });
  const onSubmit = async (e) => {
    console.log(action, create);
    e.preventDefault();
    if (action === "CreatePost") {
      console.log(`main relChallenger = ${relChallenger}`);
      console.log(`main tagChallenger = ${tagChallenger}`);
      console.log(action);
      let fileCategory = document.getElementById("category")
      console.log(fileCategory)
      if (create) {
        console.log("ok");
        let formData = new FormData();
        let photoFile = document.getElementById("photo");

        formData.append("file", photoFile.files[0]);
        console.log(photoFile.files[0]);
        try {
          const {
            data: { path },
          } = await axios.post("http://localhost:4000/api/upload", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });

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
