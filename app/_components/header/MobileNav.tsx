"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuSlide = {
    initial: { x: "100%" },
    enter: { x: 0, transition: { duration: 0.25, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.25, ease: "easeInOut" } },
  };

  return (
    <div className="md:hidden">
      <Menu size={24} onClick={toggleMenu} />

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-5 backdrop-blur-sm z-10 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            ></motion.div>
            <motion.aside
              className="fixed p-6 top-0 right-0 h-full w-80 z-50 bg-background md:hidden"
              variants={menuSlide}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className=" flex h-16 items-center justify-end ">
                <X size={24} onClick={toggleMenu} />
              </div>
              <div className="flex flex-col text-2xl space-y-12 font-medium py-2 px-10">
                <div className="flex flex-col space-y-4">
                  <h1>siema</h1>
                </div>
                <div className="text-lg">
                  <h1>siema</h1>
                </div>
                <div className="text-base font-semibold">
                  <h1>siema</h1>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
