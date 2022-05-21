import { jsonEval } from '@firebase/util';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({service}) => {
  const {price: amount, userName, email, serviceId} = service;
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const [loader, setLoader] = useState(false)
  const elements = useElements();
  const [carderror, setCarderror] = useState('')
  const [success, setSuccess] = useState('')
  const [tnID, setTnID] = useState('')
  const accessToken = localStorage.getItem('accessToken')
  

  useEffect(() => {
    fetch('https://sheltered-beyond-38485.herokuapp.com/create-payment-intent', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        'authorization': `Bearer ${accessToken}`

      },
      body: JSON.stringify({amount})
    })
    .then(res => res.json())
    .then(data => {
      if(data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    })
  },[amount])

  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();
    if(!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
 // Use your card Element with other Stripe.js APIs
 const {error, paymentMethod} = await stripe.createPaymentMethod({
  type: 'card',
  card,
});

if (error) {
  setCarderror(error.message);
} else {
  setCarderror('')
}
    
// Confirm payment

const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
   clientSecret,
  {
    payment_method: {
      card: card,
      billing_details: {
        name: userName,
        email: email

      },
    },
  },
);

if(intentError) {
  setCarderror(intentError.message);
  
  setSuccess('')
} else{
  setCarderror('')
  setSuccess(`Your Payment is Completed!`);
  setTnID(paymentIntent.id)
}

  };

  return (
    <div className='pt-5'>
     {!success && <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button class={`btn btn-sm btn-primary my-5  bg-gradient-to-r from-primary to-secondary ${loader ? 'loading' : ''}`}  type="submit" disabled={!stripe || !clientSecret}>Pay Now ${amount}</button>
      {carderror && <p className='text-red-500 mb-5'>{carderror}</p>}
    </form>}
      {success && <p className='text-green-500 mb-5'>{success} <span className='text-orange-700'>Transaction ID: <b>{tnID}</b></span></p>}
    </div>
  );
};

export default CheckoutForm;