import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HoverCardContent } from "./ui/hover-card";
import { TypographyP } from "./ui/Text";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";

const UserCard = ({ username, description, id }) => {
  const [followed, setFollowed] = useState(false);
  return (
    <HoverCardContent className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center">
        <Avatar>
          <AvatarImage
            src="https://cdn.discordapp.com/avatars/731235072400949289/e1ec09b164ebd19b9dfa7ef2c4fa1c17.png?size=512"
            alt="avatar"
          />
        </Avatar>
        <Link
          to={`/u/${id}`}
          className={
            buttonVariants({ variant: "link" }) + "ml-0 pl-0 text-base"
          }
          onClick={(e) => e.stopPropagation()}
        >
          @{username}
        </Link>
          size="xs"
      </div>
      <Separator />
      <span>
        <TypographyP>{description}</TypographyP>
      </span>
    </HoverCardContent>
  );
};

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default UserCard;
