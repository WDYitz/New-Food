import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type CategoryItemProps = {
  category: Category;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="min-w-[150px] h-16"
    >
      <div className="flex h-14 items-center justify-center gap-3 rounded-full bg-white px-6 shadow-md md:shadow-md">
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={30}
          width={30}
        />
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    </Link>
  );
};

export default CategoryItem;
