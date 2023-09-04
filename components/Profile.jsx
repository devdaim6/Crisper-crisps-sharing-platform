import { lazy } from "react";
import Loader from "@components/Loading";
const PromptCard = lazy(() => import("@components/PromptCard"));
import { Suspense } from "react";
const Profile = ({
  name,
  email,
  desc,
  data,
  handleEdit,
  handleDelete,
  Loading,
  Heading,
  profileName,
}) => {
  return (
    <section className="w-full glassmorphism">
      {Heading ? (
        <h1 className="text-satoshi text-semibold text-center">
          <span className="">{Heading}</span>
        </h1>
      ) : (
        <h1 className="desc text-left">
          <span className="blue_gradient">{desc}</span>
        </h1>
      )}
      {!profileName && (
        <p className="desc text-left">
          <span className="body_text">
            <span className="text-left orange_gradient">Name : </span>
            {name}
          </span>
        </p>
      )}
      {email ? (
        <p className="desc text-left">
          <span className="body_text">
            <span className="text-left orange_gradient">Email : </span>
            {email}
          </span>
        </p>
      ) : null}

      {data.length > 0 && (
        <p className="head_text text-center text-satoshi ">
          <span className=" orange_gradient ">{profileName && `${profileName}'s`} Crisps</span>
        </p>
      )}

      <Suspense
        fallback={
          <div className=" text-center">
            <Loader />
          </div>
        }
      >
        {Loading && <Loader /> ? null : (
          <div className="mt-16 prompt_layout">
            {Array.isArray(data) ? (
              data.map((prompt) => (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  handleEdit={() => {
                    handleEdit && handleEdit(prompt);
                  }}
                  handleDelete={() => {
                    handleDelete && handleDelete(prompt);
                  }}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        )}
      </Suspense>
    </section>
  );
};

export default Profile;
