import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = ({ammount}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [carderror, setCarderror] = useState('')

  const handleSubmit = async (e) => {
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
  console.log('Hello 22')
  console.log('[PaymentMethod]', paymentMethod);
  setCarderror('')
}
    

  };

  return (
    <div className='pt-5'>
     <form onSubmit={handleSubmit}>
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
      <button class="btn btn-sm btn-primary my-5  bg-gradient-to-r from-primary to-secondary"  type="submit" disabled={!stripe}>Pay Now ${ammount}</button>
      <p className='text-[red] mb-5'>{carderror}</p>
    </form>
    </div>
  );
};

export default CheckoutForm;