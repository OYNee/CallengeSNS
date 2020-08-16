import React, { useState } from "react";
import CreateTextPostPresenter from "./CreateTextPostPresenter";
import useInput from "../../Hooks/useInput";
import useCaptionInput from "../../Hooks/useCaptionInput";

import { useMutation, useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import FormData from "form-data";
import { FOLLOW, UPLOAD } from "./CreateTextPostQueries";
import axios from "axios";
import { toast } from "react-toastify";

export default ({ cat, pid }) => {
  const [color, setColor] = useState("rgba(255, 255, 255, 1)");
  const [fcolor, setFColor] = useState("rgba(0, 0, 0, 1)");
  const [action, setAction] = useState("CreatePost");
  const [create, setCreate] = useState(false);
  const [relChallenger, setRelChallenger] = useState(``);
  const [tagChallenger, setTagChallenger] = useState(``);
  const caption = useCaptionInput("");
  const textContent = useInput("");
  let bgColor = [];
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
      category: "text",
      rel_challengers: "",
      pre_challengers: "",
      next_challengers: "",
      tag_challengers: "",
      files: bgColor,
      textContent: textContent.value,
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "CreatePost") {
      if (create) {
        try {
          bgColor.push(color);
          bgColor.push(fcolor);
          console.log(textContent.value);
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
    <CreateTextPostPresenter
      setColor={setColor}
      color={color}
      setFColor={setFColor}
      fcolor={fcolor}
      setAction={setAction}
      action={action}
      setCreate={setCreate}
      create={create}
      textContent={textContent}
      onSubmit={onSubmit}
      relChallenger={relChallenger}
      tagChallenger={tagChallenger}
      setRelChallenger={setRelChallenger}
      setTagChallenger={setTagChallenger}
      loading={loading}
      data={data}
      caption={caption}
      id={id}
    />
  );
};
