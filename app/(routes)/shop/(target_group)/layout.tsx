const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full">
      <div className="bg-slate-500">navigation</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
