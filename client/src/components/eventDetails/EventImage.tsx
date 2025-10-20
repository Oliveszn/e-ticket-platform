import Image from "next/image";

interface EventImageProps {
  imageUrl?: string;
  title: string;
}

export default function EventImage({ imageUrl, title }: EventImageProps) {
  console.log(imageUrl);
  return (
    <div className="relative bg-blue-100 h-72 sm:h-[36rem] w-full rounded">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={160}
          height={160}
          className="rounded absolute w-full h-full inset-0 object-contain"
          priority
          unoptimized
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <svg
            className="w-24 h-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
