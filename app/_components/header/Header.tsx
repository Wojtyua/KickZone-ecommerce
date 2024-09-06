import IconsNav from "@/app/_components/header/IconsNav";
import Logo from "../Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <div className="p-6 flex justify-between align-middle">
        <Logo />
        <Nav />
        <IconsNav />
      </div>
    </header>
  );
};

export default Header;
