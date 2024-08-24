import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button.jsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { ToastAction } from "../ui/toast";
import { DialogClose } from "../ui/dialog";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

const formSchema = z.object({
  content: z.string().min(1),
});

const PostForm = ({ conversation = null }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("Form values:", values);

    const accessToken = localStorage.getItem("access_token");
    console.log("Access Token:", accessToken);

    try {
      const response = await fetchWithAuth("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          text: values.content,
          conversation: conversation,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Response data:", data);

      toast({
        title: "Post Created!",
        action: (
          <ToastAction
            altText="Go to post."
            onClick={() => {
              navigate("/p/" + data.id);
            }}
          >
            View
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("There was an error!", error);
      toast({
        title: "Error",
        description: "There was an issue creating the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col content-center"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  type="content"
                  placeholder="Dites bonjour !"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Post !</Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default PostForm;
