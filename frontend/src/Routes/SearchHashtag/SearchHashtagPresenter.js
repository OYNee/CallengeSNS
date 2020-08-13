import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import HashtagCard from "../../Components/HashtagCard";
import Input from "../../Components/Input";
import useInput from "../../Hooks/useInput";
import { withRouter,Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

const Wrapper = styled.div`
  height: 50vh;
`;
const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
  margin: 10px auto;
  display: block;
`;
const Section = styled.div`
  margin-bottom: 50px;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;
export default withRouter(({ searchTerm, loading, data, history, fetchMore,hasMore,setHasMore }) => {
  const search =(searchTerm?useInput(searchTerm):useInput(""));
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=`+encodeURIComponent(search.value));
    window.location.reload();
  };
  const onSearchbutton = (e) => {
    e.preventDefault();
    history.push(`/search?term=`+encodeURIComponent(searchTerm));
    window.location.reload();
  };
  const onLoadMore = () => {

    fetchMore({
      variables: {
        cur: data.searchHashtag.length,
        limit:8,
        term: search.value
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if(fetchMoreResult.searchHashtag.length<8)
        {
          console.log(`1 = ${hasMore}`);
          setHasMore(false);
          console.log(`2 = ${hasMore}`);
        }
        if (!fetchMoreResult){ 
          return prev;}
        return Object.assign({}, prev, {
          searchHashtag: [...prev.searchHashtag, ...fetchMoreResult.searchHashtag]
        });
      }
    })

  };
  if (searchTerm === undefined) {
    return (  
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
      <SearchInput
        value={search.value}
        onChange={search.onChange}
        placeholder="Search..."
      />
      </form>
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchHashtag) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="Search..."
          />
        </form>
          <button onClick={onSearchbutton}>
          <FatText text="< 뒤로 가기" />
          </button>

        <Section>
          {data.searchHashtag.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            <InfiniteScroll
            dataLength={data.searchHashtag.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<Wrapper>
              <Loader />
            </Wrapper>}
          >{
            data.searchHashtag.map((hashtag,idx) => (
              <HashtagCard
              key={idx}
              username={hashtag.tag_name}
            />
            ))}
            </InfiniteScroll>
          )}
        </Section>
      </Wrapper>
    );
  }
});

