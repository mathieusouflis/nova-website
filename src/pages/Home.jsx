import Navbar from "@/components/Navbar.jsx";
import Post from "@/components/Post";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useWindowSize from "@/hooks/screenSize";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const isMobile = useWindowSize().isPhone;
  const isTablet = useWindowSize().isTablet;

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await fetchWithAuth(
        "/posts/query?max_results=100&conversation_id=false",
      );
      const data = await result.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div
      className={`flex ${isMobile || isTablet ? "flex-col-reverse items-center justify-between h-screen" : "flex-row h-screen"}`}
    >
      <Navbar />
      <Tabs
        defaultValue="foryou"
        className="flex flex-col items-center w-full h-full"
      >
        <TabsList className="w-full max-w-4xl mt-5">
          <TabsTrigger value="foryou" className="w-full">
            For You
          </TabsTrigger>
          <TabsTrigger value="follow" className="w-full">
            Follow
          </TabsTrigger>
        </TabsList>
        <TabsContent value="foryou" className="w-full h-full">
          <ScrollArea className="h-full">
            <div className="flex flex-col items-center h-0">
              {posts.map((post) => (
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
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
