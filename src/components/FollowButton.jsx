import { useState } from "react";
import { Button } from "./ui/button";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

const FollowButton = ({ targetedId, following = false, size = "xs" }) => {
  const [followingState, setFollowingState] = useState(following);
  const [hovering, setHovering] = useState(false);

  const onClickEvent = async (e) => {
    e.stopPropagation();
    const userId = localStorage.getItem("user_id");
    setFollowingState((oldState) => (oldState ? false : true));
    if (followingState) {
      const response = await fetchWithAuth(
        `/users/${userId}/following/${targetedId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok)
        setFollowingState((oldState) => (oldState ? false : true));
    } else {
      const response = await fetchWithAuth(`/users/${userId}/following`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          targeted_id: targetedId,
        }),
      });

      if (!response.ok)
        setFollowingState((oldState) => (oldState ? false : true));
    }
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <Button
      className="rounded-full"
      size={size}
      variant={
        followingState ? (hovering ? "destructive" : "secondary") : "default"
      }
      onClick={(e) => onClickEvent(e)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {followingState ? (hovering ? "Unfollow" : "Followed") : "Follow"}
    </Button>
  );
};

export default FollowButton;
