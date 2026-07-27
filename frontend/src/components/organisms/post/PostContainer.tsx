import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from ".";
import { IPost, TPostView } from "../../../types/post";
import { cn } from "../../../utils";

interface IProps {
  postsView?: TPostView;
}

const PostContainer: React.FC<IProps> = ({ postsView }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get<IPost[]>(
        "http://localhost:5000/posts"
      );

      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="mt-4 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-4 h-full w-full">
      <div
        className={cn(
          "grid gap-2",
          postsView === "gridView"
            ? "grid-cols-2"
            : "grid-cols-1"
        )}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post._id} post={post} />
          ))
        ) : (
          <div className="py-10 text-center">
            <p>No posts yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContainer;