import React, { useState } from "react";
import CreateAudioPostPresenter from "./CreateAudioPostPresenter";
import useInput from "../../Hooks/useInput";
import useCaptionInput from "../../Hooks/useCaptionInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD } from "./CreateAudioPostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default ({ create, setCreate, selHashtags, pid }) => {
  const [action, setAction] = useState("CreatePost");
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const caption = useCaptionInput("");
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
      category: "audio",
      rel_challengers: relChallenger.value,
      pre_challengers: "",
      next_challengers: "",
      tag_challengers: tagChallenger.value,
      files: filePath,
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "CreatePost") {
      if (create) {
        let photoFile = document.getElementById("photo");
        let audioFile = document.getElementById("audio");
        console.log(photoFile.files[0]);
        console.log(audioFile.files[0]);
        // start for
        for (let i = 0; i < 2; i++) {
          try {
            let formData = new FormData();

            if (i == 0) {
              formData.append("file", audioFile.files[0]);
            } else if (i == 1) {
              formData.append("file", photoFile.files[0]);
            }

            const {
              data: { location },
            } = await axios.post("http://localhost:4000/api/upload", formData, {
              headers: {
                "content-type": "multipart/form-data",
              },
            });
            console.log("두번", location);
            filePath.push(location);
          } catch (e) {
            toast.error("Cant upload", "Try later");
          } finally {
          }
        } // end for
        try {
          console.log(filePath);

          const {
            data: { uploadChallenge },
          } = await uploadMutation();
          if (uploadChallenge.id) {
            // window.location.href = "/";
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
    <CreateAudioPostPresenter
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
