import React from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white py-3">
      
      {/* Icons Row */}
      <div className="flex justify-center items-center gap-6">
        {socialLinks.map((social) =>
          social.link.startsWith("/") ? (
            <Link
              key={social.name}
              to={social.link}
              className="hover:scale-110 transition-transform"
            >
              <img
                src={social.iconUrl}
                alt={social.name}
                className="w-5 h-5 object-contain"
              />
            </Link>
          ) : (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={social.iconUrl}
                alt={social.name}
                className="w-5 h-5 object-contain"
              />
            </a>
          )
        )}
      </div>

      {/* Copyright */}
      <p className="text-center text-slate-400 text-xs mt-2">
      bctg75 © {new Date().getFullYear()} All rights reserved.
      </p>

    </footer>
  );
};

export default Footer;
