import React from "react";
import { withRouter } from "react-router-dom";
import ChallengePresenter from "./ChallengePresenter";
import { useQuery } from "react-apollo-hooks";
import { CHALLENGE } from "./ChallengeQueries";

export default withRouter(({ location: { search } }) => {
  const id= search.split('?')[1];
  const { data, loading} = useQuery(CHALLENGE, {
    variables: {
      id
    }
  });
  return <ChallengePresenter loading={loading} data={data}/>;
});