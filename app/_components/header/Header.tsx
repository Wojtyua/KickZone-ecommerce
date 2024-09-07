import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/header/Nav";
import IconsNav from "@/app/_components/header/IconsNav";

const Header = () => {
  return (
    <header>
      <div className="p-6 flex justify-between items-center">
        <Logo />
        <Navigation />
        <IconsNav />
      </div>
    </header>
  );
};

export default Header;
