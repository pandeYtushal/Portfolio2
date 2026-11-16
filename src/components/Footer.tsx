import React from "react";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="font-sans text-xs uppercase tracking-widest text-app-text-secondary font-medium">
        © Tushal Anand.
      </div>
      <div className="font-mono text-xs tracking-widest text-app-text-secondary font-semibold uppercase">
        {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
