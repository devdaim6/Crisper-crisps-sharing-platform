"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await res.json();
      setPrompts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, []);

  const handleEdit = async (prompt) => {
    router.push(`/update-crisp?id=${prompt._id}`)
  };
  const handleDelete = async (prompt) => {
    console.log("delete")
  };
  return (
    <Profile
      name={"Daim"}
      desc={"User Profile"}
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
