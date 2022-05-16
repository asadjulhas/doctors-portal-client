import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
  <div className='footer_area mb-20'>
    <footer className="footer p-10 text-neutral-content text-[black]">
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </div>
</footer>
<div className="footer footer-center p-4 text-base-content">
  <div>
    <p className='font-bold'>Copyright 2022 All Rights Reserved</p>
  </div>
</div>
  </div>
  );
};

export default Footer;