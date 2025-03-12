import { motion } from "framer-motion";
import { Button } from "../challenge/component/button";
import { Card, CardContent, CardHeader, CardTitle } from "../challenge/component/card";
import { CheckCircle2 } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Access to basic study materials",
      "Progress tracking",
      "Limited practice exercises",
      "Community forum access"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "Best for serious students",
    features: [
      "Everything in Basic",
      "Unlimited practice exercises",
      "Personalized learning paths",
      "Advanced progress analytics",
      "Priority support"
    ],
    cta: "Start Free Trial",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For institutions & teams",
    features: [
      "Everything in Pro",
      "Custom learning paths",
      "Dedicated support manager",
      "Team analytics dashboard",
      "API access",
      "SSO integration"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

export default function PricingTable() {
  return (
    <section className="py-20 bg-background" id="pricing">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Choose the perfect plan for your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex ${
                plan.highlighted ? 'lg:-mt-8 lg:mb-8' : ''
              }`}
            >
              <Card 
                className={`flex flex-col w-full relative overflow-hidden border-[1px] ${
                  plan.highlighted 
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'border-border'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-bl-lg">
                      Popular
                    </div>
                  </div>
                )}
                <CardHeader className="flex flex-col gap-4 p-6">
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-2 text-foreground/80">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground/80">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 flex-grow p-6 pt-0">
                  <ul className="space-y-3 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className={`h-5 w-5 ${
                          plan.highlighted ? 'text-primary' : 'text-foreground/60'
                        } flex-shrink-0`} />
                        <span className="text-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full transition-all duration-200 ${
                      plan.highlighted 
                        ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105' 
                        : 'bg-background text-foreground border-2 border-border hover:bg-primary/10 hover:border-primary'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}