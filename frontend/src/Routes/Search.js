import React from "react";
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import {gql} from "apollo-boost";
import FatText from "../Components/FatText";

const Wrapper = styled.div`
    height:50vh;
    text-align: center;
`;

const  SEARCH_POSTS = gql`
    searchPost($term:String!){
        searchPost(term:$term){
            files{
                url
            }
            likeCount
        }
    }
`
export default withRouter(({location:{search}}) =>{
    const searchTerm = search.split("=")[1];
    if(searchTerm === undefined)
    {
        console.log("no search");
    }
    return (<Wrapper>
        {searchTerm === undefined && <FatText text={"Search for something"}/>}
    </Wrapper>);
});