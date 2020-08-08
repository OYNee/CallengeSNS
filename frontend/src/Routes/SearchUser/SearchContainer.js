import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  var limit = 8;
  var cur =0;
  var hasMore1=true;
  const { data, loading, fetchMore, hasMore } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term,
      limit,
      cur
    }
  });
  return <SearchPresenter searchTerm={term} loading={loading} data={data} fetchMore={fetchMore} hasMore={hasMore1}/>;
});