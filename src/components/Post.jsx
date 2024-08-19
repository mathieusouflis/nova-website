import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { TypographyMuted, TypographyP } from "./ui/Text";
import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { timeAgo } from "@/utils/timeAgo";
import UserCard from "./UserCard";

const Post = ({ author_id, text, creation_date, id }) => {
  const [user, setUser] = useState({ username: "" });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://nova-api-s2m2r.ondigitalocean.app//api/users/" + author_id,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        },
      );
      const userData = await response.json();
      setUser(userData);
    };

    const isPostLiked = async () => {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://nova-api-s2m2r.ondigitalocean.app/api/posts/${id}/likes/${author_id}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        },
      );
      if (!response.ok) {
        return;
      } else {
        setLiked(true);
      }
    };

    fetchUser();
    isPostLiked();
  }, [author_id, id]);

  const like = async () => {
    const access_token = localStorage.getItem("access_token");
    if (!liked) {
      const response = await fetch(
        `https://nova-api-s2m2r.ondigitalocean.app/api/users/${author_id}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + access_token,
          },
          body: JSON.stringify({
            post_id: id,
          }),
        },
      );

      if (!response.ok) return;

      setLiked(true);
    } else {
      const response = await fetch(
        `https://nova-api-s2m2r.ondigitalocean.app/api/users/${author_id}/likes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + access_token,
          },
        },
      );

      if (!response.ok) return;

      setLiked(false);
    }
  };

  return (
    <Card className="m-4 w-full max-w-4xl">
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
              username={user.username}
              description={user.description}
              id={user.id}
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
                  >
                    @{user.username}
                  </Link>
                </HoverCardTrigger>
                <TypographyMuted className="ml-2">
                  {timeAgo(creation_date)}
                </TypographyMuted>
              </div>
              <UserCard
                username={user.username}
                description={user.description}
                id={user.id}
              />
            </HoverCard>
            <span>
              <TypographyP className="mt-3">{text}</TypographyP>
            </span>
            <div className="mt-2 flex flex-row gap-2">
              <Button
                variant="ghost"
                className="group rounded-full p-2 w-fit h-fit hover:text-destructive"
                onClick={async () => {
                  await like();
                }}
              >
                <Heart
                  className={`w-5 h-5 text-muted-foreground group-hover:stroke-[#FF6363] ${liked ? "stroke-[#FF6363] fill-[#FF6363]" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                className="group rounded-full p-2 w-fit h-fit"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-[#63C9FF]" />
              </Button>
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
};

export default Post;
