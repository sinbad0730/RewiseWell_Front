"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./component/card";
import { Button } from "./component/button";
import { Input } from "./component/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./component/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./component/select";
import { motion } from "framer-motion";
import { Swords, Send, Mail, Phone, Brain, } from "lucide-react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import { useUser } from "@/hooks/use-user";
import { useToast } from "./component/use-toast";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import WithAuth from "@/components/Layout/WithLayout";
import axios from "axios";
import { API_BASE_URL } from "@/utils/axios";
import { ChanlengeList } from "./component/challengeList";

const Challenge: React.FC = () => {

  const token = JSON.parse(localStorage.getItem('authtoken') as string).access_token
  const username = JSON.parse(localStorage.getItem('authtoken') as string).user.username

  const { toast } = useToast();

  const challengeSchema = z.object({
    contactType: z.enum(["whatsapp", "email", "phone"]),
    contact: z.string().refine((val) => {
      if (val.includes("@")) {
        return z.string().email().safeParse(val).success;
      } else {
        return z.string().regex(/^\+?[\d\s-]{10,}$/).safeParse(val).success;
      }
    }, "Invalid email or phone number"),
  });

  type ChallengeForm = z.infer<typeof challengeSchema>;

  const form = useForm<ChallengeForm>({
    // resolver: zodResolver(challengeSchema),
    defaultValues: {
      contactType: "email",
      contact: "",
    },
  });


  const handleChallenge = async (values: ChallengeForm) => {
    try {
      // const message = `Hi Friend,  I’m ${username}. \nI’ve got a challenge for you! Let’s see who knows their Computer Science better. 💻 \nHere’s the quiz link:  [Quiz Link] \nThink you can beat me? Let’s find out! 😎`;
      const message = "Hi! I’m ${username} 🎉 Got a CS challenge for you! 💻 Think you're smarter than me? Prove it! 😎 Visit Revisewell.com & let’s see! 🚀";
      console.log(values.contactType )
      if (values.contactType === 'phone') {
        const response = await axios.post(`${API_BASE_URL}/challenge/sms_send`, {
          toNumber: values.contact,
          message
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        toast({
          title: "Challenge Sent! 🎯",
          description: `Challenge sent to ${values.contact} via sms!`,
        });


      } else if (values.contactType === 'whatsapp') {

        const response = await axios.post(`${API_BASE_URL}/challenge/sms_whatsapp`, {
          toNumber: values.contact,
          message
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        toast({
          title: "Challenge Sent! 🎯",
          description: `Challenge sent to ${values.contact} via sms!`,
        });
      } else if (values.contactType === 'email') {
        console.log("here")
        const response = await axios.post(`${API_BASE_URL}/challenge/sms_email`, {
          toNumber: values.contact,
          message
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        toast({
          title: "Challenge Sent! 🎯",
          description: `Challenge sent to ${values.contact} via sms!`,
        });
      }

      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-primary" />
            Challenge a Friend
          </CardTitle>
          <CardDescription>
            Send a coding challenge to your friend via email or SMS and earn bonus points when they participate!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleChallenge)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="contactType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How to send the challenge?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="whatsapp">
                            <span className="flex items-center gap-2">
                              <WhatsAppIcon className="w-4 h-4" />
                              WhatsApp
                            </span>
                          </SelectItem>
                          <SelectItem value="email">
                            <span className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email
                            </span>
                          </SelectItem>
                          <SelectItem value="phone">
                            <span className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              SMS
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {form.watch("contactType") === "email" ? "Email Address" : "Phone Number"}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            {form.watch("contactType") === "email" ? (
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            ) : form.watch("contactType") === "phone" ? (
                              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            ) : (
                              <WhatsAppIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            )}
                            <Input
                              className="pl-10"
                              placeholder={
                                form.watch("contactType") === "email"
                                  ? "friend@example.com"
                                  : "+1 234 567 8900"
                              }
                              {...field}
                            />
                          </div>
                          <Button type="submit">
                            <Send className="w-4 h-4 mr-2" />
                            Send Challenge
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-white"
            >
              <p>🎮 Game Rules:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>You earn 5 points for sending a challenge</li>
                <li>Your friend earns 10 points for attempting</li>
                <li>Both get 25 bonus points for correct answers!</li>
              </ul>
            </motion.div>
          </div>
        </CardContent>
      </Card>


      <ChanlengeList />
    </div>
  );
}

export default WithAuth(Challenge);
