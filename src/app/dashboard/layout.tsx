import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-0 flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] relative z-0 flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">{children}</div>
      </div>
    </div>
  );
}
