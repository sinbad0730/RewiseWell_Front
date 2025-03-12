"use client";
import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Container from "@/components/Container";
import { PathTool, Star1, Moon, Sun1 } from "iconsax-react";
import Link from "next/link";
import { Modal, notification } from "antd";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";
import useUserActivity from "@/hooks/useUserActivity";
import MonkeyImg from "../assets/imgs/monkeyProfile.jpg";
import { motion } from "framer-motion";
import { Button } from "@/app/challenge/component/button";
import EventBus from "./EventBus";
import { Menu as HamburgerMenu, AlignJustify } from "lucide-react";
const A = ({
    href,
    children,
    className,
    onClick,
}: {
    href: string;
    children: any;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => (
    <Link
        href={href}
        className={`hover:text-sky-700 duration-300 ${className || ""}`}
    >
        {children}
    </Link>
);

interface NavbarProps {
    onLoginClick: () => void;
}


const Navbar = ({ onLoginClick }: NavbarProps) => {
    const [user, setUser] = useState<any>(null);
    const [starCount, setStarCount] = useState(0);
    const [isDark, setIsDark] = useState(false);
    const [feedbackModal, setFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [showHelp, setShowHelp] = useState(false);
    const [scores, setScores] = useState(0);
    const token =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("authtoken") || "{}")
            : {};

    useUserActivity();
    useEffect(() => {
        const token = localStorage.getItem("authtoken");
        const userData = JSON.parse(localStorage.getItem("authtoken") as string);

        if (token) {
            const parsedToken = JSON.parse(token);
            setStarCount(parsedToken.user?.gpt_times || 0);
            setUser(parsedToken.user);
            setScores(userData.user.scores);
        }
        const handleScoresUpdate = (event: any) => {
            setScores(event.detail); // Update state when event is emitted
        };

        EventBus.on('scoresUpdated', handleScoresUpdate);

        return () => {
            EventBus.off('scoresUpdated', handleScoresUpdate); // Cleanup
        };
    }, []);

    const Star = () => (
        <>
            {[...Array(starCount)].map((_, i) => (
                <Star1 variant="Bulk" color="darkorange" size={20} key={i} />
            ))}
        </>
    );


    // useEffect(() => {
    //     // Check localStorage first
    //     // const theme = localStorage.getItem('theme');

    //     // // Only set dark mode if explicitly set in localStorage
    //     // const isDarkMode = theme === 'dark';
    //     // setIsDark(isDarkMode);
    //     localStorage.setItem("theme", "dark");
    //     // Apply theme class
    //     // if (isDarkMode) {
    //     //   document.documentElement.classList.add('dark');
    //     // } else {
    //     //   document.documentElement.classList.remove('dark');
    //     //   localStorage.setItem('theme', 'light');
    //     // }
    // }, []);

    // const toggleTheme = () => {
    //   setIsDark(!isDark);
    //   if (isDark) {
    //     document.documentElement.classList.remove('dark');
    //     localStorage.setItem('theme', 'light');
    //   } else {
    //     document.documentElement.classList.add('dark');
    //     localStorage.setItem('theme', 'dark');
    //   }
    // };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/feedback`, {
                user_id: token.user.email,
                feedback: feedback,
            });
            if (response.status === 200) {
                notification.success({
                    message: "Feedback submitted successfully",
                    duration: 3,
                    description: "Thank you for your feedback!",
                });
                setFeedback("");
                setFeedbackModal(false);
            }
        } catch (error) {
            notification.error({
                message: "Error submitting feedback",
                duration: 3,
                description: "Please try again later!",
            });
        }
    };

    return (
        <div >
            <Modal
                open={feedbackModal}
                onCancel={() => setFeedbackModal(false)}
                footer={null}
            >
                <div className="text-white flex flex-col">
                    <h1 className="text-xl font-bold">Feedback</h1>
                    <textarea
                        className="w-full h-40 bg-transparent border-2 rounded-md p-2 mt-4 text-black focus:outline-none focus:border-slate-500 focus:ring-0"
                        placeholder="Please share your feedback here..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button
                            className="bg-sky-600 text-white py-2 px-6 rounded-full hover:bg-sky-700 duration-300 font-medium"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
            >
                <Container className="container mx-auto px-4 relative">
                    <div className="flex items-center justify-around h-16">
                        <div className="flex items-center">
                            <div className="flex sm:flex md:hidden">
                                {
                                    user ? (
                                        <Menu>
                                            <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
                                                <AlignJustify className="w-6 h-6 text-white" />
                                            </MenuButton>
                                            <MenuItems
                                                anchor="bottom"
                                                className="text-center w-40 bg-[#0C1813] shadow-lg origin-top-right rounded-xl border z-[1000] p-1 text-md text-transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                            >
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="/" className="ml-4 text-white">
                                                            <p>Home</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="/subjects" className="ml-4 text-white">
                                                            <p>Tracker</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="/exam" className="ml-4 text-white">
                                                            <p>Exam Questions</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="/flashcard" className="ml-4 text-white">
                                                            <p>Flashcards</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <A href="/recall" className="ml-4 text-white">
                                                        <p>Study Buddy</p>
                                                    </A>
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    ) : (
                                        <Menu>
                                            <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
                                                <AlignJustify className="w-6 h-6 text-white" />
                                            </MenuButton>
                                            <MenuItems
                                                anchor="bottom"
                                                className="text-center w-40 bg-[#0C1813] shadow-lg origin-top-right rounded-xl border z-[1000] p-1 text-md text-transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                            >
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="/" className="ml-4 text-white">
                                                            <p>Home</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="#feature" className="ml-4 text-white">
                                                            <p>Features</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="/testimo" className="ml-4 text-white">
                                                            <p>Testimonials</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div className="pb-2 border-b border-gray-500">
                                                        <A href="#pricing" className="ml-4 text-white">
                                                            <p>Pricing</p>
                                                        </A>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <A href="#join-us" className="ml-4 text-white">
                                                        <p>+ Contact us</p>
                                                    </A>
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    )
                                }
                            </div>
                            {
                                user ? (
                                    <div className="flex">
                                        <a className="flex items-center space-x-2" href="/">
                                            <span className="text-2xl font-bold text-primary">ReviseWell</span>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <a className="flex items-center space-x-2" href="/">
                                            <span className="text-2xl font-bold text-primary">ReviseWell</span>
                                        </a>
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            {user ? (
                                <ul className="gap-8 items-center font-medium hidden md:flex text-white">
                                    <li className="flex items-center gap-2 ">
                                        <A
                                            href="/subjects"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setTimeout(
                                                    () =>
                                                    (window.location.href =
                                                        "/subjects"),
                                                    100
                                                );
                                            }}
                                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                                        >
                                            Tracker
                                        </A>
                                    </li>
                                    <li>
                                        <A href="/exam" className="text-muted-foreground hover:text-primary transition-colors font-medium">Exam Questions</A>
                                    </li>
                                    <li>
                                        <A href="/flashcard" className="text-muted-foreground hover:text-primary transition-colors font-medium">Flashcards</A>
                                    </li>
                                    <li>
                                        <A href="/recall" className="text-muted-foreground hover:text-primary transition-colors font-medium">Study Buddy</A>
                                    </li>
                                    <li></li>

                                    <li className="text-white font-bold px-2 py-1 list-none text-[15px]">
                                        {" "}
                                        Points: {scores}
                                    </li>
                                </ul>
                            ) : (
                                <ul className="hidden md:flex items-center space-x-8">
                                    <li>
                                        <A href="#feature" className="text-muted-foreground hover:text-primary transition-colors font-medium">Features</A>
                                    </li>
                                    <li>
                                        <A href="#testimo" className="text-muted-foreground hover:text-primary transition-colors font-medium">Testimonials</A>
                                    </li>
                                    <li>
                                        <A href="#pricing" className="text-muted-foreground hover:text-primary transition-colors font-medium">Pricing</A>
                                    </li>
                                    <li>
                                        <A
                                            href="#join-us"
                                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                                        >
                                            + Contact us
                                        </A>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <div className=" gap-2">
                            {user ? (
                                <div className="flex items-center">
                                    <Menu>
                                        <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
                                            <img
                                                src={"/coin.png"}
                                                alt="monkeyProfile"
                                                className="h-10 hover:cursor-pointer hover:opacity-80 w-full"
                                            />
                                        </MenuButton>
                                        <MenuItems
                                            anchor="bottom end"
                                            className="w-52 bg-white shadow-lg origin-top-right rounded-xl border z-[1000] p-1 text-sm/6 text-transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                        >
                                            <MenuItem>
                                                <A
                                                    href="/profile"
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                                                >
                                                    <img
                                                        src="/coin.png"
                                                        alt="Coin"
                                                        className="h-10 hover:cursor-pointer hover:opacity-80"
                                                    />
                                                    {/* {user && user.username} */}
                                                    Profile
                                                </A>
                                            </MenuItem>
                                            <MenuItem>
                                                <A href="/challenge" className="ml-4">
                                                    Friend Challenger
                                                </A>
                                            </MenuItem>

                                            <div>
                                                <a
                                                    href="/"
                                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:text-sky-700 duration-300"
                                                    onClick={() => {
                                                        localStorage.removeItem(
                                                            "authtoken"
                                                        );
                                                        setUser(null);
                                                        setStarCount(0);
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="size-4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Logout
                                                </a>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                    <img
                                        src="/feedback.png"
                                        alt="feedback"
                                        className="h-10 hover:cursor-pointer hover:opacity-80"
                                        onClick={() => setFeedbackModal(true)}
                                    />
                                </div>
                            ) : (
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90"
                                    onClick={onLoginClick}
                                >
                                    Log in
                                </Button>
                            )}
                        </div>

                        {/* This is connected and should pull the gpt-times (column + scores column) from the mysql db columns */}
                    </div>
                </Container>
            </motion.nav>
        </div >
    );
};

export default Navbar;
