import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PageTitle from '../../hooks/PageTitle';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L1cHwAAX8jorUm97rVngApkylkvtoBRz8n8zNSHnNp5eSZ1CecJBkITNnU3OA5EDnTY4VQMF1QDyoDNgPHTL7Yk00hXgBEurM');
const Payment = () => {
  const {id} = useParams();

  const accessToken = localStorage.getItem('accessToken')
  const {data, isLoading, refetch} = useQuery([`booking-${id}`], () => fetch(`https://sheltered-beyond-38485.herokuapp.com/booking/${id}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
.then(res => res.json())
)
if(isLoading) {
  return <div className="min-h-screen flex items-center user_loading">
    <LoadingSpinnerSmall/>
  </div>
}
  return (
    <div className='mt-5'>
    <PageTitle title='Payment'/>
    <div class="card w-100 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title"><span className='text-orange-700'>${data.price}</span> Pay for {data.serviceName}</h2>
    <p>We will see you on <span className='text-orange-700'>{data.date}</span> at {data.slot}</p>
  </div>
  <div class="card w-100 bg-orange-100 shadow-xl">
  <div class="card-body  py-0">
  <Elements stripe={stripePromise}>
    <CheckoutForm ammount={data.price} />
  </Elements>
  </div>
</div>
</div>
    </div>
  );
};

export default Payment;