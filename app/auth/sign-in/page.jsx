"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthForm from "@components/AuthForm";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const signIn = async (e) => {
    e.preventDefault();
    console.log("creds ==> ", creds);
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({
          email: creds.email,
          password: creds.password,
        }),
      });
      console.log("response", response);
      if (response.status === 200) {
        router.push("/create-prompt");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      type="In"
      creds={creds}
      setCreds={setCreds}
      submitting={submitting}
      handleSubmit={signIn}
    />
  );
};

export default SignIn;
