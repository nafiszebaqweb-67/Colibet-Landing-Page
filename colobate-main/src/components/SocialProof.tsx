import React from "react";
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
      image: "",
    },
    {
      name: "Priya Sharma",
      location: "Lalpur, Ranchi",
      rating: 5,
      text: "Blouse delivered next day — unbelievable speed! The stitching is flawless and the fit is perfect.",
      image: "",
    },
    {
      name: "Amit Kumar",
      location: "Morabadi, Ranchi",
      rating: 4,
      text: "Pickup and delivery was smooth. Great work on my kurta pajama.",
      image: "",
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

  const moreReviews = [
    {
  name: "Rohit Ranjan",
  location: "Kokar, Ranchi",
  rating: 5,
  text: "Absolutely satisfied! The kurta fit perfectly and the stitching is top-notch. Will definitely order again.",
  image: "", // Add customer image URL here
},
{
  name: "Neha Kumari",
  location: "Harmu, Ranchi",
  rating: 4,
  text: "The blouse design is beautiful and the delivery was quick. Slight alteration needed, but overall great service.",
  image: "", // Add customer image URL here
},
{
  name: "Vikram Patel",
  location: "Morabadi, Ranchi",
  rating: 5,
  text: "Excellent tailoring! My formal suit looked perfect at the event. Very happy with the attention to detail.",
  image: "", // Add customer image URL here
},
{
  name: "Ritu Verma",
  location: "Lalpur, Ranchi",
  rating: 5,
  text: "Super fast stitching and the fit is flawless. Highly recommend for anyone needing custom blouses or dresses.",
  image: "", // Add customer image URL here
},
{
  name: "Saurabh Kumar",
  location: "Doranda, Ranchi",
  rating: 4,
  text: "Good quality and timely delivery. The kurta pajama fits well, just wished for more fabric options.",
  image: "", // Add customer image URL here
},

  ];

  // Helper to render stars
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section
      className="py-20 overflow-hidden" // overflow-hidden prevents horizontal scrollbar if buttons poke out
      style={{ background: "var(--gradient-section-blue-out)" }}
    >
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block bg-blue-100 rounded-full px-6 py-2 mb-4">
            <p className="text-blue-950 font-semibold">⭐ Trusted in Ranchi</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-blue-900 mb-4">
            Loved by 5000+ Ranchi Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Best Custom Stitching Experience in Ranchi.
          </p>
        </div>

        {/* FIRST CAROUSEL */}
        {/* Added px-12 to wrapper or reduced max-width so buttons have room */}
        <div className="relative mx-auto max-w-6xl px-4 md:px-0">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-16 h-16 border-2 border-accent/20">
                          <AvatarImage src={review.image} alt={review.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-800 text-lg font-semibold">
                            {review.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-primary">
                            {review.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {review.location}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm italic leading-relaxed text-gray-600">
                        "{review.text}"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Buttons with Z-Index and Layout Fixes */}
            <CarouselPrevious className="hidden md:flex -left-12 bg-white border-blue-200 hover:bg-blue-50 hover:text-blue-600 z-20" />
            <CarouselNext className="hidden md:flex -right-12 bg-white border-blue-200 hover:bg-blue-50 hover:text-blue-600 z-20" />
          </Carousel>
        </div>

        {/* SECOND CAROUSEL */}
        <div className="mt-16 relative mx-auto max-w-6xl px-4 md:px-0">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {moreReviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-16 h-16 border-2 border-accent/20">
                          <AvatarImage src={review.image} alt={review.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-800 text-lg font-semibold">
                            {review.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-primary">
                            {review.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {review.location}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm italic leading-relaxed text-gray-600">
                        "{review.text}"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white border-blue-200 hover:bg-blue-50 hover:text-blue-600 z-20" />
            <CarouselNext className="hidden md:flex -right-12 bg-white border-blue-200 hover:bg-blue-50 hover:text-blue-600 z-20" />
          </Carousel>
        </div>

        {/* STATS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "5000+", label: "Happy Customers" },
            { number: "24hr", label: "Delivery Promise" },
            { number: "4.5★", label: "Average Rating" },
            { number: "100%", label: "Quality Guaranteed" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-blue-900 mb-2">
                {stat.number}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};