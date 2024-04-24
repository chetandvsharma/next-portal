"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}/`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt ?"
    ); // http browser api
    if (hasConfirmed) {
      try {
        if (!post?._id) return alert("Prompt Id not found", post);
        const response = await fetch(`/api/prompt/${post?._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/profile");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPost();
  }, []);

  return (
    <Profile
      name="My"
      desc="welcome to your personlised profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
