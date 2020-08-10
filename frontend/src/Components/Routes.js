import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import SearchUser from "../Routes/SearchUser";
import Profile from "../Routes/Profile";
import Following from "../Routes/Following";
import Follower from "../Routes/Follower";
import Notification from "../Routes/Notification";
import ChangePasswd from "../Routes/ChangePasswd";
import SetScope from "../Routes/SetScope";
import SetCategory from "../Routes/SetCategory";
import DeleteAccount from "../Routes/DeleteAccount";
import RelChallenger from "../Routes/RelChallenger";
import CreatePost from "../Routes/CreatePost";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/following" component={Following} />
    <Route path="/follower" component={Follower} />
    <Route path="/search-user" component={SearchUser} />
    <Route path="/notifications" component={Notification} />
    <Route path="/setpasswd" component={ChangePasswd} />
    <Route path="/setscope" component={SetScope} />
    <Route path="/setcategory" component={SetCategory} />
    <Route path="/deleteacc" component={DeleteAccount} />
    <Route path="/relchallenger" component={RelChallenger} />
    <Route path="/createpost" component={CreatePost} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
