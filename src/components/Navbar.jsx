import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Bell, House, Search, UserRound } from "lucide-react";

import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

import PostForm from "./Forms/PostForm";
import { DialogTitle } from "@radix-ui/react-dialog";

const Navbar = () => {
  const linkClass = navigationMenuTriggerStyle() + "flex gap-2 text-lg";
  return (
    <NavigationMenu
      orientation="vertical"
      className="ml-10 h-screen items-start mt-14 mr-10"
    >
      <NavigationMenuList className="flex-col items-start gap-3 space-x-0">
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={linkClass}>
              <House />
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={linkClass}>
              <Search />
              Search
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={linkClass}>
              <Bell />
              Notifications
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={linkClass}>
              <UserRound />
              Profil
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <Dialog>
            <DialogTrigger asChild className="w-full">
              <Button variant="outline">Post</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Post</DialogTitle>
              </DialogHeader>
              <PostForm />
            </DialogContent>
          </Dialog>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
