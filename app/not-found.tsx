import { PizzaIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center space-y-4 ">
      <div className="flex">
        <span className="text-6xl text-red-500">404</span>
        <PizzaIcon size={30} className="text-red-500" />
      </div>
      <h2 className="text-center text-lg space-y-4 text-muted-foreground">
        Não conseguimos encontrar esta página
      </h2>
      <Button asChild className="mt-8">
        <Link href="/" className="">
          Voltar para tela inicial
        </Link>
      </Button>
    </div>
  );
}
