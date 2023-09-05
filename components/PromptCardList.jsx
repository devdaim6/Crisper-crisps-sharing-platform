import { lazy, Suspense } from "react";
import Loading from "./Loading";

const PromptCard = lazy(() => import("./PromptCard"));

const PromptCardList = ({ prompts, search, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      <Suspense fallback={<Loading/>}>
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
      </Suspense>
    </div>
  );
};

export default PromptCardList;
