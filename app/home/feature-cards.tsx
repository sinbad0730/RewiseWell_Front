import { motion } from "framer-motion";
import { Brain, BookOpen, Users, Target, Clock, LineChart } from "lucide-react";
import { Card, CardContent } from '../challenge/component/card';

const features = [
  {
    icon: Brain,
    title: "Smart Learning Paths",
    description: "Personalized learning journeys adapted to your pace and style",
  },
  {
    icon: BookOpen,
    title: "Interactive Content",
    description: "Engaging materials that make learning enjoyable and effective",
  },
  {
    icon: Users,
    title: "Collaborative Study",
    description: "Connect with peers and learn together in virtual study groups",
  },
  {
    icon: Target,
    title: "Focused Practice",
    description: "Targeted exercises to strengthen your understanding",
  },
  {
    icon: Clock,
    title: "Time Management",
    description: "Tools to help you study efficiently and stay on track",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Detailed insights into your learning journey",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-background" id="feature">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to excel
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Our comprehensive suite of learning tools is designed to help you achieve your educational goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-background/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/80">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}