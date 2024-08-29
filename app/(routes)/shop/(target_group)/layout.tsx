import FilterForm from "@/app/(routes)/shop/(target_group)/_components/FilterForm";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[18rem_1fr] h-full">
      <FilterForm />
      <div className="px-12">{children}</div>
    </div>
  );
};

export default Layout;
