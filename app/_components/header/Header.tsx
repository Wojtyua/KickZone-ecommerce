import IconsNav from "@/app/_components/header/IconsNav";
import Logo from "../Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <div className="bg-accent-400 w-full h-12 rounded-lg"></div>
      <div className="p-6 flex justify-between">
        <Logo />
        <Nav />
        <IconsNav />
      </div>
    </header>
  );
};

export default Header;
