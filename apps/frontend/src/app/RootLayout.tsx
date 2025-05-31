import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from  "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <div className="font-[Inter] w-full flex justify-center">
        <AppSidebar />
        <SidebarInset>
          <Header/>
          <div className="mt-16">
          <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}