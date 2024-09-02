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
import useWindowSize from "@/hooks/screenSize";

const Navbar = () => {
  const isMobile = useWindowSize().isPhone;
  const isTablet = useWindowSize().isTablet;
  const linkClass = navigationMenuTriggerStyle() + "flex gap-2 text-lg";
  return (
    <NavigationMenu
      orientation={isMobile || isTablet ? "vertical" : "horizontal"}
      className={
        isMobile || isTablet
          ? null
          : "ml-10 h-fit flex items-start mt-14 mr-10 sticky top-14"
      }
    >
      <NavigationMenuList
        className={
          isMobile || isTablet ? null : "flex-col items-start gap-3 space-x-0"
        }
      >
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={linkClass}>
              <House />
              {isMobile || isTablet ? null : "Home"}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={linkClass}>
              <Search />
              {isMobile || isTablet ? null : "Search"}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={linkClass}>
              <Bell />
              {isMobile || isTablet ? null : "Notifications"}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
          <Link to={`/u/${localStorage.getItem("user_id")}`}>
            <NavigationMenuLink className={linkClass}>
              <UserRound />
              {isMobile || isTablet ? null : "Profil"}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <Dialog>
            <DialogTrigger asChild className="w-full">
              <Button>Post</Button>
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
