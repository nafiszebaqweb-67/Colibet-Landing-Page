import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface VideoTestimonial {
  id: string;
  videoUrl: string; // Can be local file path, YouTube URL, Instagram URL, or any direct video URL
  caption: string;
}

// Helper function to detect video type and extract necessary info
const getVideoType = (url: string) => {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('shorts/')) {
      videoId = url.split('shorts/')[1].split('?')[0];
    }
    return { type: 'youtube', id: videoId };
  }
  
  // Instagram
  if (url.includes('instagram.com')) {
    return { type: 'instagram', url };
  }
  
  // Direct video file or other platforms
  return { type: 'direct', url };
};

// Component to render video based on type
const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const videoInfo = getVideoType(videoUrl);

  if (videoInfo.type === 'youtube') {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoInfo.id}?autoplay=1&mute=1&loop=1&playlist=${videoInfo.id}&controls=0&modestbranding=1&rel=0`}
        className="w-full h-full object-cover"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{ border: 'none' }}
      />
    );
  }

  if (videoInfo.type === 'instagram') {
    // Instagram embed - note: Instagram videos in embeds don't autoplay by default
    const embedUrl = videoInfo.url.replace('/reel/', '/p/').replace('/tv/', '/p/') + 'embed/';
    return (
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allowFullScreen
        style={{ border: 'none' }}
      />
    );
  }

  // Direct video file (local or URL)
  return (
    <video
      src={videoInfo.url}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export const VideoTestimonials = () => {
  // You can add any combination of:
  // - Local video files: "/videos/my-video.mp4"
  // - YouTube URLs: "https://www.youtube.com/watch?v=VIDEO_ID" or "https://youtu.be/VIDEO_ID"
  // - YouTube Shorts: "https://www.youtube.com/shorts/VIDEO_ID"
  // - Instagram URLs: "https://www.instagram.com/reel/REEL_ID/"
  // - Direct video URLs from any platform: "https://example.com/video.mp4"
  
  const testimonials: VideoTestimonial[] = [
    {
      id: "1",
      videoUrl: "/video/stiching_process.mp4", // Local video file
      caption: "From Design to Stitch — Crafting Tailored Perfection",
    },
    {
      id: "2",
      videoUrl: "/video/perfect_measurement.mp4", // YouTube URL example
      caption: "Precise Measurements for a Perfect Fit",
    },
    {
      id: "3",
      videoUrl: "/video/quality.mp4", // Local video file
      caption: "Superior Quality. Flawless Fit.",
    },
    {
      id: "4",
      videoUrl: "/video/custome_outfit.mp4", // Local video file
      caption: "Masters of Tailoring with Perfectly Finished Stitching ",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-accent/10 rounded-full px-6 py-2 mb-4">
            <p className="text-accent font-semibold">📹 Our Customer Stories </p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            See What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear directly from our happy clients about their perfect custom outfits and service in Ranchi. 
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
                    {/* Video Card - Fixed 3:4 aspect ratio */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-card hover:shadow-card-hover transition-all duration-300">
                      {/* Video Player - supports local files, YouTube, Instagram, and other platforms */}
                      <VideoPlayer videoUrl={testimonial.videoUrl} />
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
