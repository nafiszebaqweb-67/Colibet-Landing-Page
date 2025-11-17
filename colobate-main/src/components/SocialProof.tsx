import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const SocialProof = () => {
  const reviews = [
    {
      name: "Rahul Singh",
      location: "Harmu, Ranchi",
      rating: 5,
      text: "Perfect fitting! Got my suit stitched overnight for an important meeting. The quality is outstanding!",
      avatar: "👨‍💼",
    },
    {
      name: "Priya Sharma",
      location: "Lalpur, Ranchi",
      rating: 5,
      text: "Blouse delivered next day — unbelievable speed! The stitching is flawless and the fit is perfect.",
      avatar: "👩",
    },
    {
      name: "Amit Kumar",
      location: "Morabadi, Ranchi",
      rating: 4,
      text: "Pickup and delivery was smooth. Great work on my kurta pajama. Will definitely come back!",
      avatar: "👨",
    },
    {
      name: "Sneha Verma",
      location: "Doranda, Ranchi",
      rating: 5,
      text: "Best tailoring service in Ranchi! They understood exactly what I wanted. Highly recommended.",
      avatar: "👩‍🦰",
    },
  ];

  return (
    <section className="py-20" style={{ background: 'var(--gradient-section-blue-out)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2 mb-4">
            <p className="text-accent font-semibold">⭐ Trusted in Ranchi</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4">
             Trusted by 500+ Ranchi Patrons
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers who trusted us with their perfect fit
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <Card 
              key={index}
              className="border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground mb-4 leading-relaxed text-sm">
                  "{review.text}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-accent/10">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "24hr", label: "Delivery Promise" },
            { number: "4.8★", label: "Average Rating" },
            { number: "100%", label: "Quality Guaranteed" },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <p className="text-4xl font-bold text-gradient-gold mb-2">{stat.number}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
