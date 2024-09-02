import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TypographyH1 } from "@/components/ui/Text";
import useWindowSize from "@/hooks/screenSize";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const isMobile = useWindowSize().isPhone;
  const isTablet = useWindowSize().isTablet;
  const { post_id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetchWithAuth("/posts/" + post_id);
      if (!response.ok) return;
      const data = await response.json();
      setPost(data);
    };
    const fetchComments = async () => {
      const response = await fetchWithAuth(
        "/posts/query?max_results=100&conversation_id=" + post_id,
      );
      if (!response.ok) return;
      const comments = await response.json();
      setComments(comments ? comments.posts : []);
    };

    fetchPost();
    fetchComments();
  }, [post_id]);
  return (
    <div
      className={`flex h-screen ${isMobile || isTablet ? "flex-col-reverse items-center justify-between" : "flex-row"}`}
    >
      <Navbar />
      <ScrollArea className="w-full max-w-4xl">
        <div className="flex flex-col items-center">
          {post ? (
            <Post
              key={post.id}
              author_id={post.author_id}
              id={post.id}
              text={post.text}
              creation_date={post.creation_date}
              likeCount={post._count.likes}
              isLiking={post.likes.length > 0}
              isFollowing={
                post.author._count.users_followed === 1 ? true : false
              }
              commentCount={post._count.comments}
              author_name={post.author.username}
              author_description={post.author.description}
              author_avatar={post.author.avatar}
            />
          ) : (
            <></>
          )}

          <TypographyH1 className="self-start">Comments </TypographyH1>
          <Separator className="w-full" />
          {comments.map((comment) => (
            <Post
              key={comment.id}
              author_id={comment.author_id}
              id={comment.id}
              text={comment.text}
              creation_date={comment.creation_date}
              likeCount={comment._count.likes}
              isLiking={comment.likes.length > 0}
              isFollowing={
                post.author._count.users_followed === 1 ? true : false
              }
              commentCount={comment._count.comments}
              author_name={comment.author.username}
              author_description={comment.author.description}
              author_avatar={post.author.avatar}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PostPage;
