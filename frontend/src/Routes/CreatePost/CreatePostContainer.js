import React, { useState } from "react";
import CreatePostPresenter from "./CreatePostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation,useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQueries";
import { FOLLOW } from "./CreatePostQueries";

export default ({ location: { search } }) => {
    const [action, setAction] = useState("CreatePost");
    const [relChallenger, setRelChallenger]=useState(``);
    const [tagChallenger,setTagChallenger]=useState(``);
    var limit = 100;
    var cur =0;
    const id= search.split('?')[1];
    const { data, loading} = useQuery(FOLLOW, {
        variables: {
          id,
          limit,
          cur
        }
      });
    const onSubmit = async (e) => {
      e.preventDefault();
      if (action === "CreatePost") {
        console.log(`main relChallenger = ${relChallenger}`)
        console.log(`main tagChallenger = ${tagChallenger}`)
      } else if (action === "relChallenger") {

        console.log(`relChallenger = ${relChallenger}`)
      } else if (action === "tagChallenger") {
        console.log(`tagChallenger = ${tagChallenger}`)
    } 

    };
    console.log(`1`);
    return (
      <CreatePostPresenter
        setAction={setAction}
        action={action}
        onSubmit={onSubmit}
        relChallenger = {relChallenger}
        tagChallenger = {tagChallenger}
        setRelChallenger={setRelChallenger}
        setTagChallenger={setTagChallenger}
        loading={loading}
        data={data}
        id={id}
      />
    );
  };
  