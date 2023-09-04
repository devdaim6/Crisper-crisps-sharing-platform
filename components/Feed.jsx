"use client";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Link from "next/link";
import PromptCard from "@components/PromptCard";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
const PromptCardList = ({ prompts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {Array.isArray(prompts) ? (
        prompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  // const [searchTimeout, setSearchTimeout] = useState(null);
  const router = useRouter();
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // clearTimeout(searchTimeout);

    filterCall(e);
  };

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return prompts.filter(
      (item) =>
        regex.test(item.creator.name) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const filterCall = (e) => {
    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
  };
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoadingState(true);
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPrompts(data);
      setLoadingState(false);
      // console.log(data)
    };
    fetchPrompts();
  }, []);

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full  flex-center">
        <input
          type="text"
          placeholder="Search for a @username or tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
    
      {loadingState && <Loading /> ? null : searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList prompts={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
