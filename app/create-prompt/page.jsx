"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [crisp, setCrisp] = useState({
    prompt: "",
    tag: "",
  });
  const router=useRouter();
  const {data:session}=useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    // console.log("form")
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: crisp.prompt,
          userId: session?.user.id,
          tag: crisp.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      crisp={crisp}
      setCrisp={setCrisp}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
