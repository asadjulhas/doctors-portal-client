import React from "react";
import './ContactUs.css'

const ContactUs = () => {
  return (
    <div className="contact_us text-center mt-20 py-12">
      <h4 className="text-primary text-sm">Contact Us</h4>
      <h3 className="text-secondary text-2xl">Stay connected with us</h3>
      <div className="contact_form">
        <form>
          <div className="my-5">
        <input required name="email" type="email" placeholder="Email Address" className="input w-full max-w-xs" />
        </div>
        <div className="my-5">
        <input name="subject" type="text" placeholder="Subject" className="input w-full max-w-xs" />
        </div>
        <div className="my-5">
        <textarea required className="textarea w-full max-w-xs" placeholder="Your message"></textarea>
        </div>
        <div className="my-5">
        <button className="btn btn-success bg-gradient-to-r from-secondary to-primary text-bold text-white">Submit</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
