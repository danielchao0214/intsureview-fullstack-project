import React from "react";
import "../styles/Footer.css"

const Footer: React.FC = () => {
  return (
    <footer className="py-4 bg-[#e3e0de] w-full">
      {/* Grid */}
      <div className="grid grid-cols-5 ">
        {/* Column 1 (FormApp) */}
        <div className="flex flex-col items-start mx-[33%]">
          <h1 className="text-xl font-bold text-text font-nunitosans">
            FormApp
          </h1>
          <a href="https://www.sureapp.com/company">Company</a>
          <a href="https://www.sureapp.com/careers">Careers</a>
          <a href="https://www.sureapp.com/contact">Contact</a>
        </div>
        {/* Column 2 (nothing) */}
        <div></div>
        {/* Column 3 (Enterprise Solutions) */}
        <div className="justify-self-center w-fit">
          <div className="flex flex-col items-start">
            <h2 className="font-bold">Enterprise Solutions</h2>
            <a href="https://www.sureapp.com/global-brands">Global Brands</a>
            <a href="https://www.sureapp.com/insurance-carriers">Insurance Carriers</a>
            <a href="https://www.sureapp.com/e-commerce-and-marketplace">eCommerce & marketplace</a>
          </div>
        </div>
        {/* Column 4 (Platform Features) */}
        <div className="justify-self-center w-fit">
          <div className="flex flex-col items-start">
            <h2 className="font-bold">Platform Features</h2>
            <a href="https://sureapp.com/platform-features#distribution">Distribution</a>
            <a href="https://sureapp.com/platform-features#policy">Policy</a>
            <a href="https://sureapp.com/platform-features#claims">Claims</a>
            <a href="https://sureapp.com/platform-features#agent">Agent</a>
            <a href="https://sureapp.com/platform-features#API">API</a>
          </div>
        </div>
        {/* Column 5 (Resources) */}
        <div className="justify-self-center w-fit">
          <div className="flex flex-col items-start">
            <h2 className="font-bold">Resources</h2>
            <a href="https://www.sureapp.com/newsroom">Newsroom</a>
            <a href="https://www.sureapp.com/blog">Blog</a>
            <a href="https://www.sureapp.com/press-releases">Press</a>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="container px-4 mx-auto">
        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} Daniel Chao. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
