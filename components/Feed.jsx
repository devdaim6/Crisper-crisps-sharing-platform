"use client";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Link from "next/link";
import PromptCard from "@components/PromptCard";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import PromptCardList from "@components/PromptCardList";
const Feed = () => {
  // States
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [searchedState, setSearchedState] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);

  // Onclick Search Method
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchedState(true);
    setSearchedResults(filterPrompts(searchText));
  };

  // filtering Prompts
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return prompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.creator.email) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // Fetching Data
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

  // Toggle onClick on Tags
  const handleTagClick = (tagName) => {
    setSearchedState(true);
    setSearchedResults(filterPrompts(tagName));
  };

  return (
    <section className="feed">
      <form className="relative w-full  flex-center">
        <input
          type="text"
          placeholder="Search for a @username or tag"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          required
          className="search_input peer"
        />
        <button
          className="mx-2 outline_btn"
          onClick={handleSearchChange}
          type="button"
        >
          Search
        </button>
      </form>

      {searchedState ? (
        <PromptCardList
          search={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList prompts={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
