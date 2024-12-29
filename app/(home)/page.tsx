import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import ReviewCard from "@/components/card/ReviewCard";
import { features, reviews, workflow } from "@/constants";
import FeatureCard from "@/components/card/FeatureCard";
import WorkflowCard from "@/components/card/WorkflowCard";

export default function Home() {
  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-b from-[#9b7bf7] to-white py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Boost Your Link Engagement
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            LinkToIt is your all-in-one Link Engagement Tool. Track, analyze,
            and optimize your links across various platforms.
          </p>
          <Button className="bg-white text-[#9b7bf7] hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#9b7bf7] mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#9b7bf7] mb-12">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <WorkflowCard workflow={workflow[0]} />
            <ChevronRight className="hidden md:block h-8 w-8 text-[#9b7bf7]" />
            <WorkflowCard workflow={workflow[1]} />
            <ChevronRight className="hidden md:block h-8 w-8 text-[#9b7bf7]" />
            <WorkflowCard workflow={workflow[2]} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#9b7bf7] mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#9b7bf7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Boost Your Link Engagement?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join LinkToIt today and start optimizing your links for better
            performance across all your marketing channels.
          </p>
          <Button
            variant="outline"
            className="bg-white text-[#9b7bf7] hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </main>
  );
}
