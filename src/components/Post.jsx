import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { TypographyMuted, TypographyP } from "./ui/Text";
import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { timeAgo } from "@/utils/timeAgo";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PostForm from "./Forms/PostForm";

const Post = ({
  author_id,
  text,
  creation_date,
  id,
  likeCount = 0,
  commentCount = 0,
  author_name,
  author_description,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCounter, setLinkeCounter] = useState(likeCount);
  const [commentCounter, setCommentCounter] = useState(commentCount);
  const navigate = useNavigate();

  useEffect(() => {
    const isPostLiked = async () => {
      const user_id = localStorage.getItem("user_id");
      const response = await fetchWithAuth(`/posts/${id}/likes/${user_id}`);
      if (!response.ok) {
        return;
      } else {
        setLiked(true);
      }
    };
    isPostLiked();
  }, [author_id, id]);

  const like = async (e) => {
    stopPropagation(e);
    const user_id = localStorage.getItem("user_id");
    setLiked((previouce_like) => (previouce_like ? false : true));
    if (!liked) {
      setLinkeCounter((previouceLikeCount) => previouceLikeCount + 1);
      const response = await fetchWithAuth(`/users/${user_id}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          post_id: id,
        }),
      });

      if (!response.ok) {
        setLiked(false);
        setLinkeCounter((previouceLikeCount) => previouceLikeCount - 1);
        return;
      }

      setLiked(true);
    } else {
      setLinkeCounter((previouceLikeCount) => previouceLikeCount - 1);
      const response = await fetchWithAuth(`/users/${user_id}/likes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setLiked(true);
        setLinkeCounter((previouceLikeCount) => previouceLikeCount + 1);
        return;
      }

      setLiked(false);
    }
  };

  const onPostClick = async () => {
    navigate("/p/" + id);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Card
      className="m-4 w-full max-w-4xl hover:bg-secondary transition-all cursor-pointer"
      onClick={onPostClick}
    >
      <CardContent className="pt-6 pb-3">
        <div className="flex flex-row">
          <HoverCard>
            <HoverCardTrigger asChild className="justify-start">
              <Avatar>
                <AvatarImage
                  src="https://cdn.discordapp.com/avatars/731235072400949289/e1ec09b164ebd19b9dfa7ef2c4fa1c17.png?size=512"
                  alt="avatar"
                />
              </Avatar>
            </HoverCardTrigger>
            <UserCard
              username={author_name}
              description={author_description}
              id={author_id}
            />
          </HoverCard>
          <div className="flex flex-col ml-2">
            <HoverCard>
              <div className="flex flex-row items-center">
                <HoverCardTrigger asChild>
                  <Link
                    to={"/u/" + author_id}
                    className={
                      buttonVariants({ variant: "link" }) + "ml-0 pl-0"
                    }
                    onClick={stopPropagation}
                  >
                    @{author_name}
                  </Link>
                </HoverCardTrigger>
                <TypographyMuted className="ml-2">
                  {timeAgo(creation_date)}
                </TypographyMuted>
              </div>
              <UserCard
                username={author_name}
                description={author_description}
                id={author_id}
              />
            </HoverCard>
            <span>
              <TypographyP className="mt-3">{text}</TypographyP>
            </span>
            <div className="mt-2 flex flex-row gap-3">
              <div className="flex flex-row gap-1 items-center">
                <Button
                  variant="ghost"
                  className="group rounded-full p-2 w-fit h-fit hover:text-destructive"
                  onClick={async (e) => {
                    await like(e);
                  }}
                >
                  <Heart
                    className={`w-5 h-5 text-muted-foreground group-hover:stroke-[#FF6363] ${liked ? "stroke-[#FF6363] fill-[#FF6363]" : ""}`}
                  />
                </Button>
                <span>
                  <TypographyP>{likeCounter}</TypographyP>
                </span>
              </div>
              <Dialog>
                <div className="flex flex-row gap-1 items-center">
                  <DialogTrigger
                    asChild
                    className="w-full"
                    onClick={stopPropagation}
                  >
                    <Button
                      variant="ghost"
                      className="group rounded-full p-2 w-fit h-fit"
                    >
                      <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-[#63C9FF]" />
                    </Button>
                  </DialogTrigger>
                  <span>
                    <TypographyP>{commentCounter}</TypographyP>
                  </span>
                </div>
                <DialogContent onClick={stopPropagation}>
                  <DialogHeader>
                    <DialogTitle>New Post</DialogTitle>
                  </DialogHeader>
                  <PostForm
                    conversation={id}
                    commentCounter={setCommentCounter}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  author_id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  creation_date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  author_name: PropTypes.string.isRequired,
  author_description: PropTypes.string,
};

export default Post;
