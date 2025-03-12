"use client";
import useUserActivity from "../hooks/useUserActivity";

import { ReactElement, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MixpanelTracking } from "@/services/mixpanel";
import HeroSection from "./home/hero-section";
import Testimonials from "./home/testimonials";
import FeatureCards from "./home/feature-cards";
import PricingTable from "./home/pricing-table";
import CtaSection from "./home/cta-section";
import LoginModal from "./auth/login/login-modal";

import PushNotification from "@/utils/pushNotification";

const Box = ({
    icon,
    title,
    exp,
    className,
}: {
    icon: ReactElement;
    title: string;
    exp: string;
    className?: string;
}) => (
    <div className="rounded-lg p-4 shadow-lg flex gap-6 items-start hover:scale-105 duration-300 cursor-pointer backdrop-blur-md bg-blue-800/30 hover:bg-blue-800/50 transition-colors">
        <div
            className={`rounded-full bg-slate-200 p-4 flex aspect-square items-center justify-center text-white shadow-xl ${className}`}
        >
            {icon}
        </div>
        <div>
            <h2 className="md:text-lg font-semibold dark:text-white">
                {title}
            </h2>
            <p className="text-sm md:text-base font-medium text-slate-500">
                {exp}
            </p>
        </div>
    </div>
);

export default function Home() {
    useEffect(() => {
        MixpanelTracking.getInstance().pageViewed("Home");
    }, []);
    useUserActivity();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <main className=" h-full">
                <Navbar onLoginClick={() => setIsLoginOpen(true)} />
                <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                />
                <HeroSection />
                <FeatureCards />
                <Testimonials />
                <PricingTable />
                <CtaSection />
                <PushNotification />
            </main>
        </>
    );
}
