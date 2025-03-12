import { motion } from "framer-motion";
import { Button } from "../challenge/component/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="relative py-20 bg-primary border-border border-t-[1px]" id="join-us">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your learning journey?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of students who are already learning smarter with ReviseWell. 
            Start your free trial today and experience the difference.
          </p>
          
          <div className="mt-10 flex  flex-col md:flex-row sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Get Started 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-blue-700"
            >
              Schedule a Demo
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-blue-100">
            No credit card required. Start learning in minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
