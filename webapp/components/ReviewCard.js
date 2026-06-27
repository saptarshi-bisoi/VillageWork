import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-white/5">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex flex-shrink-0 items-center justify-center font-bold text-gray-400">
          {review.reviewerName.charAt(0)}
        </div>
        <div>
          <div className="text-white font-bold">{review.reviewerName}</div>
          <div className="text-gray-500 text-xs">{review.village}</div>
        </div>
        <div className="ml-auto text-gray-500 text-xs">{review.date}</div>
      </div>
      <div className="flex text-gold mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold' : 'fill-transparent opacity-30'}`} strokeWidth={1.5} />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">
        &quot;{review.text}&quot;
      </p>
    </div>
  );
}
