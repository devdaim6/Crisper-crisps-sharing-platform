import React from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ prompts, search, handleTagClick }) => {
  // useEffect(() => {
  // }, []);

  const capture = () => {
    console.log(search);
  };
  return (
    <div className="mt-16 prompt_layout" onClick={capture}>
      {search ? (
        search ? (
            search.map((res) => (
            <PromptCard
              key={res._id}
              prompt={res}
              handleTagClick={handleTagClick}
            />
          ))
        ) : (
          <></>
        )
      ) : Array.isArray(prompts) ? (
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

export default PromptCardList;
