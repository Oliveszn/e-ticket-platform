interface ReviewCardProps {
  content: string;
  title: string;
}

export default function ReviewCard({ content, title }: ReviewCardProps) {
  return (
    <div className="flex-shrink-0 w-full px-4 text-center">
      <blockquote className="mb-6 leading-relaxed text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
        "{content}"
      </blockquote>
      <cite className="font-semibold text-sm sm:text-base md:text-lg not-italic">
        {title}
      </cite>
    </div>
  );
}
