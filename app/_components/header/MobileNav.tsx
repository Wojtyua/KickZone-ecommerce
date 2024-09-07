"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, LogOut, Menu, ShoppingCart, UserRound, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toggleMenu();
  };

  const menuSlide = {
    initial: { x: "100%" },
    enter: { x: 0, transition: { duration: 0.25, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.25, ease: "easeInOut" } },
  };

  return (
    <div className="md:hidden">
      <Menu size={26} onClick={toggleMenu} />

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
              className="fixed p-2 top-0 right-0 h-full w-80 z-50 shadow-md bg-background md:hidden"
              variants={menuSlide}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className="flex justify-end items-center h-[84px] p-6">
                <X size={26} onClick={toggleMenu} />
              </div>
              <div className="flex flex-col space-y-14 py-5 px-7">
                <nav>
                  <ul className="uppercase flex flex-col space-y-6 text-2xl font-semibold">
                    <li onClick={toggleMenu}>
                      <Link href="/shop">Discover</Link>
                    </li>
                    <li onClick={toggleMenu}>
                      <Link href="/shop/mens">Mens</Link>
                    </li>
                    <li onClick={toggleMenu}>
                      <Link href="/shop/womens">Womens</Link>
                    </li>
                  </ul>
                </nav>

                <div>
                  {status === "authenticated" && session?.user ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl">
                          Hi,{" "}
                          <span className="font-semibold">
                            {session?.user?.name}
                          </span>
                        </h3>
                        <p>Great to see you!</p>
                      </div>

                      <Button onClick={handleSignOut}>
                        <LogOut className="size-4 mr-2" /> Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="tracking-wide">
                        Sign up or log in to explore our exclusive collection
                        and get access to special offers.
                      </h3>
                      <div className="flex gap-2">
                        <Link href="/login">
                          <Button variant="outline" onClick={toggleMenu}>
                            Log in
                          </Button>
                        </Link>
                        <Link href="/register">
                          <Button onClick={toggleMenu}>Sign up</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <nav>
                    <ul className="flex flex-col space-y-6">
                      <li>
                        <Link href="/favorites">
                          <div className="flex gap-3 font-semibold text-lg items-center">
                            <Heart /> Favorites
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/account">
                          <div className="flex gap-3 font-semibold text-lg items-center">
                            <UserRound /> Account
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/cart">
                          <div className="flex gap-3 font-semibold text-lg items-center">
                            <ShoppingCart /> Cart
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </nav>
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
