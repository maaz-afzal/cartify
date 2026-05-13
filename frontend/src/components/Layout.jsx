import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, searchTerm, setSearchTerm }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
