import React, { useEffect, useState } from 'react'
import CheckoutForm from './CheckoutForm.jsx'; 
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Stipe.css";


// import {
//     PaymentElement,
//     useStripe,
//     useElements
//   } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51ORTxJSC8zEakSrFmvCSfhVp3aXy4JXV2OtntxlZnfKAWmkSVSfyRVBr7WIdDBcVeDbQ9Lc9C4wuEJG0iLWKhphB00ClOXIo4e");

function Stripes() {
    const [clientSecret, setClientSecret] = useState("");


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:8086/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );

}
export default Stripes
