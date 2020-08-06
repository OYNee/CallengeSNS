import React from "react";
import { withRouter } from "react-router-dom";
import FollowerPresenter from "./FollowerPresenter";
import { useQuery } from "react-apollo-hooks";
import { FOLLOW } from "./FollowerQueries";

export default withRouter(({ location: { following } }) => {
  const id= "ckdh4qxg7k1nt0a50gvgeyp5h";
  var limit = 8;
  var cur =0;
  const { data, loading, fetchMore } = useQuery(FOLLOW, {
    variables: {
      id,
      limit,
      cur
    }
  });
  return <FollowerPresenter userid={id} loading={loading} data={data} fetchMore={fetchMore}/>;
});