import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../challenge/component/dialog";
import { Button } from "../../challenge/component/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../challenge/component/form";
import { Input } from "../../challenge/component/input";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/axios';
import { useToast } from "../../challenge/component/use-toast";
const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const router = useRouter();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            setIsLoading(true);
            // TODO: Implement login logic
            const payload: object = { username: values.email, password : values.password };
            const response = await axios.post(`${API_BASE_URL}/auth/login`, payload)

            toast({ title: "🎯 Revisewell.com", description: "Login successfully" });
            localStorage.setItem('authtoken', JSON.stringify(response.data))
            setEmail('');
            setPassword('');
            localStorage.removeItem('sessionStartTimestamp');
            router.push('/subjects')
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            toast({ title: "🎯 Revisewell.com", description: "Incorrect User Information" });
            setIsLoading(false);
            setEmail('');
            setPassword('');
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] top-[300px]">
                <DialogHeader>
                    <DialogTitle>Welcome back!</DialogTitle>
                    <DialogDescription>
                        Sign in to your ReviseWell account to continue learning.
                    </DialogDescription>
                </DialogHeader>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your@email.com" {...field} className="bg-transparent !ring-offset-background  !border-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} placeholder="password" className="text-primary bg-transparent !ring-offset-background  !border-white"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-4">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>
                                <div className="text-center text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Button variant="link" className="p-0" onClick={onClose}>
                                        Sign up
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
