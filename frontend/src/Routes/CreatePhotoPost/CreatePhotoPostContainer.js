import React, { useState } from "react";
import CreatePhotoPostPresenter from "./CreatePhotoPostPresenter";
import useInput from "../../Hooks/useInput";
import useCaptionInput from "../../Hooks/useCaptionInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD } from "./CreatePhotoPostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("CreatePost");
  const [create, setCreate] = useState(false);
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const caption = useCaptionInput("");
  const photo = useInput("");
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
      category: "image",
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
        console.log(caption.value);

        let photoFile = document.getElementById("photo");
        // start for
        for (let i = 0; i < photoFile.files.length; i++) {
          try {
            let formData = new FormData();

            formData.append("file", photoFile.files[i]);

            const {
              data: { location },
            } = await axios.post("http://localhost:4000/api/upload", formData, {
              headers: {
                "content-type": "multipart/form-data",
              },
            });
            filePath.push(location);
          } catch (e) {
            toast.error("Cant upload, Try later");
          } finally {
          }
        } // end for
        try {
          const {
            data: { uploadChallenge },
          } = await uploadMutation();
          if (uploadChallenge.id) {
            window.location.href = "/";
          }
        } catch (e) {
          toast.error("챌린지 등록을 실패했습니다.");
        }
      }
    } else if (action === "relChallenger") {
    } else if (action === "tagChallenger") {
    }
  };
  return (
    <CreatePhotoPostPresenter
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
      caption={caption}
      id={id}
      cat="image"
    />
  );
};
