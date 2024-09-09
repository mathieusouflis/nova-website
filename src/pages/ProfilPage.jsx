import FollowButton from "@/components/FollowButton";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH3, TypographyP } from "@/components/ui/Text";
import UserCard from "@/components/UserCard";
import useWindowSize from "@/hooks/screenSize";
import { useFetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProfilPage = () => {
  const fetchWithAuth = useFetchWithAuth();
  const { user_id } = useParams();
  const myId = localStorage.getItem("user_id");
  const isMe = user_id === myId ? true : false;
  const isMobile = useWindowSize().isPhone;
  const isTablet = useWindowSize().isTablet;
  const [user, setUser] = useState();

  const [userPosts, setUserPosts] = useState([]);
  const [following, setFollowing] = useState();
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    const getPosts = async (user_id) => {
      const response = await fetchWithAuth(
        "/posts/query?max_results=100&conversation_id=false&user_id=" + user_id,
      );
      if (!response.ok) return;
      const posts = await response.json();
      setUserPosts(posts.posts);
    };

    const getUser = async (user_id) => {
      const response = await fetchWithAuth("/users/" + user_id);
      if (!response.ok) return;
      const user = await response.json();
      setFollowing(
        user.users_followed.some(
          (follow) => follow.follower === "7231638401290604544",
        ),
      );
      setUser(user);
    };

    const getFollowers = async (user_id) => {
      const response = await fetchWithAuth(`/users/${user_id}/followers`);
      if (!response.ok) return;
      const data = await response.json();
      setFollowerList(data);
    };
    const getFollowings = async (user_id) => {
      const response = await fetchWithAuth(`/users/${user_id}/following`);
      if (!response.ok) return;
      const data = await response.json();
      setFollowingList(data);
    };

    getPosts(user_id);
    getUser(user_id);
    getFollowers(user_id);
    getFollowings(user_id);
  }, [user_id]);

  return (
    <div
      className={`flex h-screen ${isMobile || isTablet ? "flex-col-reverse items-center justify-between " : "flex-row"}`}
    >
      <Navbar />
      <ScrollArea className="w-full max-w-4xl h-full border-x border-solid border-secondary">
        <div className="w-full flex flex-col gap-5 border-b border-secondary">
          <img src={user?.banner} alt="Banner" className="aspect-[3/1]" />

          <div className="mx-14 flex flex-col  ">
            <div className="flex flex-row items-top justify-between h-20 ">
              <Avatar className="h-36 w-36 relative bottom-[92px] border-4 border-background">
                <AvatarImage src={user?.avatar} alt="Profil Picture" />
              </Avatar>
              {isMe ? (
                <Button variant="outline" size="lg">
                  Edit Profil
                </Button>
              ) : following !== undefined ? (
                <FollowButton
                  targetedId={user_id}
                  following={following}
                  size="lg"
                />
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col">
              <TypographyH3>@{user?.username}</TypographyH3>
              <div className="flex flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0">
                      <p>
                        {user?._count.users_following + " "}
                        <span className="text-muted-foreground">Following</span>
                      </p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Following</DialogTitle>
                    </DialogHeader>
                    <ScrollArea>
                      {followingList.map((following) => {
                        following = following.user_followed;
                        return (
                          <div key={following.id}>{following.username}</div>
                        );
                      })}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0">
                      <p>
                        {user?._count.users_followed + " "}
                        <span className="text-muted-foreground">Followers</span>
                      </p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Followers</DialogTitle>
                    </DialogHeader>
                    <ScrollArea>
                      {followerList.map((follower) => {
                        follower = follower.user_following;
                        return <div key={follower.id}>{follower.username}</div>;
                      })}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
              <TypographyP className="mb-4">{user?.description}</TypographyP>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center ">
          {userPosts.map((post) => (
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
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProfilPage;
