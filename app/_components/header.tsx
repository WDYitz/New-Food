"use client";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../_lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Header = ({ className }: { className?: string }) => {
  const { data } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div
      className={cn(
        "xlg:px-48 flex justify-between px-5 pt-6 md:px-20 md:pb-6 lg:px-36",
        className,
      )}
    >
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image src="/logo.png" alt="New Food" fill sizes="100%" />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[80vw] font-semibold md:w-[40vw] lg:w-[20vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user.image as string | undefined} />
                    <AvatarFallback>
                      {data?.user.name?.split(" ")[0][0]}
                      {data?.user.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {data.user.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2>Faça seu login</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon size={18} />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator className="bg-gray-300" />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block">Inicio</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/favorite-restaurant">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>

                <div className="py-6">
                  <Separator className="bg-gray-300" />
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  onClick={() => setIsLoggingOut(true)}
                >
                  <LogOutIcon size={16} />
                  <span className="block">Sair da conta</span>
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isLoggingOut} onOpenChange={setIsLoggingOut}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Sair da conta</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo sair da plataforma?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 grid-rows-1 items-center justify-center gap-2">
            <AlertDialogCancel className="mt-0 border-0 bg-gray-200">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOutClick}>
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Header;
