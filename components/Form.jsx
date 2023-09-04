import React from "react";
import Link from "next/link";
const Form = ({ type, crisp, setCrisp, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Crisp</span>
      </h1>
      <p className="desc text-left max-w-md">{type} and Share Crisps</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-grey-700">
            Your Crisp
          </span>
        </label>
        <textarea
          value={crisp.prompt}
          onChange={(e) => {
            setCrisp({ ...crisp, prompt: e.target.value });
          }}
          placeholder="Your Crisp Here..."
          required
          className="form_textarea"
        ></textarea>
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-grey-700">
            HashTags{" "}
          </span>
        </label>
        <input
          value={crisp.tag}
          onChange={(e) => {
            setCrisp({ ...crisp, tag: e.target.value });
          }}
          placeholder="#coding , #website , #Next.js etc..."
          required
          className="form_input"
        ></input>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-grey-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white "
          >
            {submitting ? `...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
