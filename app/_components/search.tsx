"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { cn } from "../_lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form
      className={cn(
        "flex gap-2 md:relative md:h-20 md:w-[540px]  md:items-center md:gap-0 md:bg-white md:px-6 md:rounded-lg",
        className,
      )}
      onSubmit={handleSearchSubmit}
    >
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button
        size="icon"
        className="h-10 w-10 md:absolute md:right-[25px] md:bg-yellow-500"
        type="submit"
      >
        <SearchIcon size="18" />
      </Button>
    </form>
  );
};

export default Search;
