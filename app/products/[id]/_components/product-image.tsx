"use client";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProductImageProps = {
  product: Pick<Product, "name" | "imageUrl">;
  className?: string;
};

const ProductImage = ({ product, className }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className={cn("relative h-[368px] w-full", className)}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="100%"
        className="max-w-[100%] object-cover md:rounded-lg"
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white md:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
