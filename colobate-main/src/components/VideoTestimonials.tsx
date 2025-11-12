import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface VideoTestimonial {
  id: string;
  videoUrl: string;
  caption: string;
}

export const VideoTestimonials = () => {
  const testimonials: VideoTestimonial[] = [
    {
      id: "1",
      videoUrl: "/video/3888261-hd_1080_2048_25fps.mp4", // Replace with your local video file path
      caption: "Hi! from the founder and How it works",
    },
    {
      id: "2",
      videoUrl: "/video/3894725-hd_1080_2048_25fps.mp4", // Replace with your local video file path
      caption: "Online ordering but Measurements?",
    },
    {
      id: "3",
      videoUrl: "/video/4008365-hd_1080_2048_25fps.mp4", // Replace with your local video file path
      caption: "Are you serviceable in my city?",
    },
    {
      id: "4",
      videoUrl: "/video/3894725-hd_1080_2048_25fps.mp4", // Replace with your local video file path
      caption: "Delivery time & Express options",
    },
    {
      id: "5",
      videoUrl: "/video/3682815-hd_1080_2048_25fps.mp4", // Replace with your local video file path
      caption: "Delivery time & Express options",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-accent/10 rounded-full px-6 py-2 mb-4">
            <p className="text-accent font-semibold">📹 Video Testimonials</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            See What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real customers about their experience with Collibet Tailoring
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={testimonial.id} 
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Video Card */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-card hover:shadow-card-hover transition-all duration-300">
                      {/* Video Element */}
                      <video
                        src={testimonial.videoUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>

                    {/* Caption Below Card */}
                    <div className="mt-4 text-center">
                      <p className="text-foreground font-medium text-sm leading-tight">
                        {testimonial.caption}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-12" />
              <CarouselNext className="right-0 translate-x-12" />
            </div>
          </Carousel>

          {/* Mobile: Scroll indicator */}
          <div className="mt-8 text-center md:hidden">
            <p className="text-sm text-muted-foreground">
              Swipe to see more →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
