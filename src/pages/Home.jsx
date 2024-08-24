import Navbar from "@/components/Navbar.jsx";
import Post from "@/components/Post";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await fetchWithAuth(
        "/posts/query?max_results=100&is_comment=false",
      );
      const data = await result.json();
      console.log(data);
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-row">
      <Navbar />
      <Tabs
        defaultValue="foryou"
        className="flex flex-col items-center w-full mt-3"
      >
        <TabsList className="w-full max-w-4xl">
          <TabsTrigger value="foryou" className="w-full">
            For You
          </TabsTrigger>
          <TabsTrigger value="follow" className="w-full">
            Follow
          </TabsTrigger>
        </TabsList>
        <TabsContent value="foryou" className="w-full">
          <ScrollArea>
            <div className="flex flex-col items-center">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  author_id={post.author_id}
                  id={post.id}
                  text={post.text}
                  creation_date={post.creation_date}
                  likeCount={post._count.likes}
                  commentCount={post.numComment}
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
