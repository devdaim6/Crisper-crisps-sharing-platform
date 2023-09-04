"use client";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import PromptCard from "@components/PromptCard";
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
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
      {loadingState && <Loading /> ? null : (
        <PromptCardList prompts={prompts} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
