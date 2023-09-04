import PromptCard from "./PromptCard";
const Profile = ({ name, email, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{desc}</span>
      </h1>
      <p className="desc text-left">
        <span className="body_text">
          <span className="text-left orange_gradient">Name : </span>
          {name}
        </span>
      </p>
      <p className="desc text-left">
        <span className="body_text">
          <span className="text-left orange_gradient">Email : </span>
          {email}
        </span>
      </p>

      {data.length > 0 && (
        <p className="head_text text-center text-satoshi ">
          <span className=" orange_gradient ">Crisps</span>
        </p>
      )}
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
    </section>
  );
};

export default Profile;
