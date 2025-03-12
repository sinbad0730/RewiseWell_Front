import { useEffect } from "react";
import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";
import { API_BASE_URL } from "./axios";
const PushNotification = () => {
    useEffect(() => {
        const setupPushNotifications = async () => {
            const permStatus = await PushNotifications.requestPermissions();

            if (permStatus.receive === "granted") {
                await PushNotifications.register();
            }

            PushNotifications.addListener("registration", (token) => {
                console.log("Push registration success:", token.value);
                sendTokenToServer(token.value);
            });

            PushNotifications.addListener("registrationError", (error) => {
                console.error("Push registration error:", error);
            });

            PushNotifications.addListener(
                "pushNotificationReceived",
                (notification) => {
                    console.log("Push received:", notification);
                }
            );

            PushNotifications.addListener(
                "pushNotificationActionPerformed",
                (notification) => {
                    console.log("Push action performed:", notification);
                }
            );
        };

        setupPushNotifications();
    }, []);

    const sendTokenToServer = async (token: string) => {
        await axios
            .post(
                `${API_BASE_URL}/firebase-notification/save`,
                {
                    token: token,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res: any) => {
                console.log("Token saved to server", res.data.message);
            })
            .catch((err: any) => {
                console.log("Error saving token to server", err);
            });
    };

    return null; // This component doesn't render anything
};

export default PushNotification;
