"use client"
import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        paypal: any;
    }
}

const PayPalButton: React.FC = () => {
    const paypalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.paypal && paypalRef.current) {
            window.paypal
                .Buttons({
                    style: {
                        shape: 'rect',
                        layout: 'vertical',
                    },
                    createOrder: async () => {
                        try {
                            const response = await fetch('/api/orders', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    cart: [
                                        {
                                            id: 'YOUR_PRODUCT_ID',
                                            quantity: 'YOUR_PRODUCT_QUANTITY',
                                        },
                                    ],
                                }),
                            });

                            const orderData = await response.json();

                            if (orderData.id) {
                                return orderData.id;
                            } else {
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);

                                throw new Error(errorMessage);
                            }
                        } catch (error) {
                            console.error(error);
                            resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
                        }
                    },
                    onApprove: async (data: any, actions: any) => {
                        try {
                            const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            const orderData = await response.json();

                            const errorDetail = orderData?.details?.[0];

                            if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                                return actions.restart();
                            } else if (errorDetail) {
                                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                            } else if (!orderData.purchase_units) {
                                throw new Error(JSON.stringify(orderData));
                            } else {
                                const transaction =
                                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                                    orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                                resultMessage(
                                    `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
                                );
                                console.log(
                                    'Capture result',
                                    orderData,
                                    JSON.stringify(orderData, null, 2),
                                );
                            }
                        } catch (error) {
                            console.error(error);
                            resultMessage(
                                `Sorry, your transaction could not be processed...<br><br>${error}`,
                            );
                        }
                    },
                })
                .render(paypalRef.current);
        }
    }, []);

    return (
        <>
            <div ref={paypalRef} id="paypal-button-container"></div>
            <div id="result-message"></div>
        </>
    );
};

const resultMessage = (message: string) => {
    const container = document.querySelector('#result-message');
    if (container) {
        container.innerHTML = message;
    }
};

export default PayPalButton;