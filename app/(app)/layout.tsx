const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-10 px-8 md:px-32">
      {children}
    </div>
  );
};

export default AppLayout;
