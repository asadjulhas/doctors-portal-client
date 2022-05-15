import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./BookingMOdal.css";

const BookingMOdal = ({ apponinent, date, setApponinent }) => {
  const { _id, name, slots } = apponinent;
  const [alert, setAlert] = useState("");

  // booking form
  const handleBooking = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const serviceId = _id;
    if (!slot) {
      setAlert(
        <p className="text-[red] mt-3">Please select appointment time</p>
      );
      return;
    }
    const data = { serviceId, date, slot, name, email, phone };
    axios.post("http://localhost:5000/booking", data).then((res) => {
      if (res.data.acknowledged) {
        setApponinent(null);
        toast.success('Booking confirmed!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      }
    });
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative max-w-sm">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse p-0">
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body bookingForm">
                  <form onSubmit={handleBooking}>
                    <div className="form-control mb-3">
                      <input
                        disabled
                        readOnly
                        name="date"
                        type="text"
                        placeholder={date}
                        value={date}
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control mb-3">
                      <select
                        required
                        name="slot"
                        className="select select-bordered w-full max-w-xs"
                      >
                        <option disabled>Select appointment time </option>
                        {slots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control mb-3">
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Full name"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control mb-3">
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control mb-5">
                      <input
                        required
                        name="phone"
                        type="text"
                        placeholder="Phone number"
                        className="input input-bordered"
                      />
                      {alert}
                    </div>
                    <div className="form-control mt-3">
                      <button className="btn btn-primary">SUBMIT</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMOdal;
