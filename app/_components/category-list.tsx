import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany();
  return (
    <div className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden  md:flex-wrap">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
