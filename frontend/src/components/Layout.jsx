import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div classNa  me="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
