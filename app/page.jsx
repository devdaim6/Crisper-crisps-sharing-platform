import React from "react";
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className=" " />
        <span className="orange_gradient text-center">
          User-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Crisper is an Open-source Prompting platform for modern world to create
        and share their valuable prompts.
      </p>

      {/* feed */}
    
        <Feed/>
     
    </section>
  );
};

export default Home;
