"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
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
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" className="h-10 w-10" type="submit">
        <SearchIcon size="18" />
      </Button>
    </form>
  );
};

export default Search;
