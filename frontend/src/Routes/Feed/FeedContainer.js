import React, { useState } from "react";
import withRouter from "react-router-dom/withRouter";
import { useQuery} from "react-apollo-hooks";
import FeedPresenter from "./FeedPresenter";
import {FEED_QUERY} from "./FeedQueries";


export default withRouter(() => {
  const [hasMore, setHasMore] = useState(true);
  var limit = 5;
  var cur =0;
  const { data, loading, fetchMore} = useQuery(FEED_QUERY, {
    variables: {
      limit,
      cur
    }
  });
  return <FeedPresenter loading={loading} data={data} fetchMore={fetchMore} hasMore={hasMore} setHasMore={setHasMore}/>;
});
