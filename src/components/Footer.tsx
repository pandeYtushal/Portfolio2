import React from "react";
import { Typography } from "@cred/neopop-web/lib/components";
import { fontNameSpaces } from "@cred/neopop-web/lib/primitives";

export const Footer = () => {
  return (
    <footer className="footer flex items-center justify-between py-6 pr-16 sm:pr-0">
      <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
        © TUSHAL ANAND.
      </Typography>
      <Typography {...fontNameSpaces.tc12b} color="#9e9e9b">
        {new Date().getFullYear()}
      </Typography>
    </footer>
  );
};

export default Footer;
