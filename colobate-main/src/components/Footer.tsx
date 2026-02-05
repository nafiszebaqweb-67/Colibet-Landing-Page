import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Collibet Team, I'd like to know more about your tailoring services."
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl mb-4 text-accent">
              Collibet Tailoring
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Premium custom tailoring for men & women in Ranchi. Your perfect
              fit, delivered in 24 hours.
            </p>

            <Button variant="gold" size="sm" onClick={handleWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-accent">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a
                  href="https://collibet.com/category-details?category=men-tailoring-service-ranchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition"
                >
                  • Men's Tailoring
                </a>
              </li>
              <li>
                <a
                  href="https://collibet.com/category-details?category=saree-tailoring-services-ranchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition"
                >
                  • Women's Saree
                </a>
              </li>
              <li>
                <a
                  href="https://collibet.com/category-details?category=ladies-tailoring-service-ranchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition"
                >
                  • Women's Suit Stitching
                </a>
              </li>
              <li>
                <a
                  href="https://collibet.com/category-details?category=lehenga-tailoring-services-ranchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition"
                >
                  • Lehenga Stitching
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-accent">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                <p>
                  City Grocery Bazar, Near, Kadru Main Rd, Kadru, Ranchi,
                  Jharkhand 834002
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-accent transition-colors"
                >
                   +91 7260030404
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href="mailto:info@collibet.com"
                  className="hover:text-accent transition-colors"
                >
                  support@collibet.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-accent">
              Working Hours
            </h4>

            <div className="space-y-4 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                <div>
                  <p className="font-medium text-primary-foreground">
                    Monday - Saturday
                  </p>
                  <p>9:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                <div>
                  <p className="font-medium text-primary-foreground">
                    Sunday
                  </p>
                  <p>10:00 AM - 6:00 PM</p>

                  {/* Social Icons */}
                  <div className="flex gap-4 mt-3">
                    <a
                      href="https://www.instagram.com/collibet_tailor?igsh=YnZ0Z2IzYjZvd28z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>

                    <a
                      href="https://www.facebook.com/collibettailoring/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/collibet-info-services-pvt-ltd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>

                    <a
                      href="https://x.com/collibetsupport"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>

                    <a
                      href="https://www.youtube.com/@CollibetPvtLtd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 Collibet Tailoring. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://collibet.com/Policy" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="https://collibet.com/Term&Condition" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a
  href="https://collibet.com"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-accent transition-colors"
>
  collibet.com
</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
