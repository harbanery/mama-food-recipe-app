import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-recipe-yellow-normal text-recipe-blue flex flex-col justify-between font-normal">
      <div className="flex flex-col gap-12 text-center justify-center items-center px-10 py-24 sm:py-48 sm:font-light">
        <h1 className="text-3xl md:text-7xl">Eat, Cook, Repeat</h1>
        <h2 className="text-base md:text-2xl capitalize">
          Share your best recipe by uploading here !
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center text-base mt-4 mb-16 gap-10 font-light">
        <Link href={``}>Product</Link>
        <Link href={``}>Company</Link>
        <Link href={``}>Learn More</Link>
        <Link href={``}>Get In Touch</Link>
      </div>
    </footer>
  );
};

export default Footer;
