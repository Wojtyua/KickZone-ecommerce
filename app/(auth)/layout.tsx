const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid justify-center py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
      {children}
    </section>
  );
};

export default Layout;
