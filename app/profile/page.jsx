"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false);
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoadingState(true);
      const res = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await res.json();
      setPrompts(data);
      setLoadingState(false);

      // console.log(data)
    };

    if (session?.user.id) fetchPrompts();
  }, []);

  const handleEdit = async (prompt) => {
    router.push(`/update-crisp?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure to Delete this Crisp ?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        const filteredCrisps = prompts.filter((p) => {
          p._id !== prompt._id;
        });
        setPrompts(filteredCrisps);
        router.back();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name={session?.user.name}
      email={session?.user.email}
      desc={"User Profile"}
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      Loading={loadingState}
    />
  );
};

export default MyProfile;
