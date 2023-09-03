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
    const hasConfirmed=confirm("Are you sure to Delete this Crisp ?")
    if(hasConfirmed){
        try {
            await fetch(`/api/prompt/${prompt._id.toString()}`, {method:"DELETE"})
            const filteredCrisps=prompts.filter((p)=>{
                p._id!==prompt._id
            })
            setPrompts(filteredCrisps)
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
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
