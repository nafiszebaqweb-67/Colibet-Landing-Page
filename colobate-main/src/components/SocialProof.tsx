import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const SocialProof = () => {
  const reviews = [
    {
      name: "Rahul Singh",
      location: "Harmu, Ranchi",
      rating: 5,
      text: "Perfect fitting! Got my suit stitched overnight for an important meeting. The quality is outstanding!",
      image: "/src/assets/men-category.jpg", // Add customer image URL here
    },
    {
      name: "Priya Sharma",
      location: "Lalpur, Ranchi",
      rating: 5,
      text: "Blouse delivered next day — unbelievable speed! The stitching is flawless and the fit is perfect.",
      image: "/src/assets/women-category.jpg", // Add customer image URL here
    },
    {
      name: "Amit Kumar",
      location: "Morabadi, Ranchi",
      rating: 4,
      text: "Pickup and delivery was smooth. Great work on my kurta pajama. Will definitely come back!",
      image: "", // Add customer image URL here
    },
    {
      name: "Sneha Verma",
      location: "Doranda, Ranchi",
      rating: 5,
      text: "Best tailoring service in Ranchi! They understood exactly what I wanted. Highly recommended.",
      image: "", // Add customer image URL here
    },
    {
      name: "Deepak Mishra",
      location: "Kanke, Ranchi",
      rating: 5,
      text: "Amazing service! The attention to detail is incredible. My wedding sherwani turned out perfect!",
      image: "", // Add customer image URL here
    },
    {
      name: "Anjali Singh",
      location: "HEC, Ranchi",
      rating: 5,
      text: "Fast and professional. The quality exceeded my expectations. Highly recommend for custom stitching!",
      image: "", // Add customer image URL here
    },
  ];

  return (
    <section className="py-20" style={{ background: 'var(--gradient-section-blue-out)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block bg-accent/10 rounded-full px-6 py-2 mb-4">
            <p className="text-accent font-semibold">⭐ Trusted in Ranchi</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-accent mb-4">
            Loved by 500+ Ranchi Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers who trusted us with their perfect fit
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl h-full"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Reviewer Info at Top */}
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-2 border-accent/20">
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback className="bg-accent/10 text-accent text-lg font-semibold">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-primary text-base">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                        {/* Rating Stars */}
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground leading-relaxed text-sm flex-1">
                      "{review.text}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        {/* Social Proof Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "24hr", label: "Delivery Promise" },
            { number: "4.5★", label: "Average Rating" },
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
