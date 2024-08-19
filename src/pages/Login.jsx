import LoginForm from "@/components/Forms/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <Card className="w-96 flex flex-col items-stretch absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <CardHeader className="text-center">Login</CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <Separator className="max-w-xs self-center" />
      <CardFooter className="flex flex-col justify-center">
        <Link to="/forgot" className={buttonVariants({ variant: "link" })}>
          Forgot password ?
        </Link>
        <Link
          to="/register"
          className={` ${buttonVariants({ variant: "link" })} py-0 px-0 `}
        >
          Don't have an account ?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Auth;
