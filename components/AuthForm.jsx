import Link from "next/link";
import React from "react";

const AuthForm = ({ type, creds, setCreds, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Sign-{type}</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            email
          </span>
          <input
            value={creds.email}
            onChange={(e) => {
              setCreds({ ...creds, email: e.target.value });
            }}
            placeholder="example@indiratrade.com"
            required
            className="form_input"
          ></input>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            password{" "}
            {/* <span className="font-normal">
          (#product, #web-development, #yoga)
        </span> */}
          </span>
          <input
            id="hs-toggle-password"
            type="password"
            value={creds.password}
            onChange={(e) => {
              setCreds({ ...creds, password: e.target.value });
            }}
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `signing ${type}...` : `sign ${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
