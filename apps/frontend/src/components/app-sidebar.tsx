import { Users, HandPlatter, User , LogOut, Banknote, NotebookText, WashingMachine, Moon, Sun } from "lucide-react"


import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useTheme } from "./theme-provider";
import { Switch } from "./ui/switch";

// Menu items.
const items = [
  { title: "Employees", url: "employees", icon: Users },
  { title: "Services", url: "services", icon: HandPlatter },
  { title: "Customers", url: "customers", icon: User },
  { title: "Transactions", url: "transactions", icon: Banknote },
  { title: "History", url: "history", icon: NotebookText },
]

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const {setOpen, open} = useSidebar()
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="z-50">
      <SidebarHeader className="mb-2">
        <SidebarMenuButton className={` flex h-14`} size={"lg"}>
          <div onClick={()=> setOpen(false)} className={` ml-2 mt-4 flex h-full ${open? "flex" : "hidden"}`}>
          <WashingMachine className=" text-primary"/>
          <span className="text-nowrap ml-3.5 my-0.5 text-center">Esemka Laundry</span>
          </div>
            <div>
          <WashingMachine onClick={()=> setOpen(true)} className={`mt-2 ml-1 size-6 text-primary ${open? "hidden" : "flex"} w-full ml-[5px]`}/>
            </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>

            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-10 mx-3">
                  <SidebarMenuButton asChild size={"lg"} >
                    <Link className={`${currentPath === "/" + item.url ? "text-primary" : "text-muted-foreground"}`} to={`${item.url}`}>
                      <item.icon className="mx-2"/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="gap-0">
        <SidebarMenuButton
          size={"lg"}
          className={`mx-1 ${open? "text-muted-foreground": "text-muted-foreground"}`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? 
            <>
              <Sun className="mx-2" />
            </>
            : 
            <>
              <Moon className="mx-2" />
            </>
          }
          <Switch  checked={theme === "dark"}/>
        </SidebarMenuButton>
        <SidebarMenuButton size={"lg"}           className={`mx-1 ${open? "text-muted-foreground": "text-muted-foreground"}`}>
          <LogOut className="mx-2"/>
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
