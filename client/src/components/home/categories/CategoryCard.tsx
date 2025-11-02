import Image from "next/image";

interface CategoryCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export default function CategoryCard({
  name,
  image,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue rounded-lg"
      aria-label={`Browse ${name} events`}
    >
      <div className="rounded-lg transition-colors group-hover:bg-blue-100/30 p-3">
        <Image
          src={image}
          alt={`${name} category icon`}
          width={160}
          height={160}
          className="h-auto w-24 sm:w-32 md:w-40 object-contain"
        />
      </div>
      <span className="mt-2 text-center">{name}</span>
    </button>
  );
}
