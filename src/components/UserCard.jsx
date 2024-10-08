import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HoverCardContent } from "./ui/hover-card";
import { TypographyP } from "./ui/Text";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import FollowButton from "./FollowButton";

const UserCard = ({ username, description, id, isFollowing, avatar }) => {
  return (
    <HoverCardContent className="flex flex-col gap-2 max-w-lg">
      <div className="flex flex-row gap-2 items-center">
        <Avatar>
          <AvatarImage src={avatar} alt="avatar" />
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
        <FollowButton following={isFollowing} targetedId={id} />
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
