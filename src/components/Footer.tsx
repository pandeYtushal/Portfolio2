import React from "react";

export const Footer = () => {
  return (
    <footer className="py-8 pb-24 sm:pb-8 px-6 md:px-12 bg-transparent text-app-text-primary border-t border-app-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="font-sans text-xs uppercase tracking-widest text-app-text-secondary font-medium">
        © Tushal Pandey. Made with intention.
      </div>
      <div className="font-mono text-xs tracking-widest text-app-text-secondary font-semibold uppercase">
        {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
