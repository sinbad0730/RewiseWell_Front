import { motion } from "framer-motion";
import { Card, CardContent } from "../challenge/component/card";
import { Avatar, AvatarImage } from "../challenge/component/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../challenge/component/carousel";

const testimonials = [
  {
    content: "ReviseWell transformed my learning experience. The personalized approach helped me achieve my academic goals faster than I thought possible.",
    author: "Sarah Johnson",
    role: "Medical Student",
    image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2"
  },
  {
    content: "The interactive learning tools and focused practice sessions made a huge difference in my exam preparation. Highly recommended!",
    author: "Michael Chen",
    role: "Engineering Student",
    image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2"
  },
  {
    content: "As an educator, I'm impressed by the platform's ability to engage students and track their progress effectively.",
    author: "Dr. Emily Williams",
    role: "University Professor",
    image: "https://images.unsplash.com/photo-1596496181848-3091d4878b24"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-background" id="testimo">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What our users say
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Join thousands of satisfied students who have transformed their learning journey with ReviseWell.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="md:w-full w-[70%] max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-background/50 backdrop-blur-sm border-border">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <blockquote className="flex-grow">
                          <p className="text-foreground">"{testimonial.content}"</p>
                        </blockquote>
                        <div className="flex items-center mt-6 pt-6 border-t border-border">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={testimonial.image} alt={testimonial.author} />
                          </Avatar>
                          <div className="ml-4">
                            <p className="text-base font-semibold text-foreground">{testimonial.author}</p>
                            <p className="text-sm text-foreground/80">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}