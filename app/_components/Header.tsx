import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="flex p-4 items-center gap-4 border-b border-secondary">
      <Logo />
      <Navigation />
    </header>
  );
};

export default Header;
