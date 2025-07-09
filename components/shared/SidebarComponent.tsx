import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { MENU, PROTECTED_MENU } from "@/constants/endpoints";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";


export default async function SidebarComponent() {
  const user = await currentUser();

  return (

    <Sidebar className="w-50">
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SignedIn>
                {PROTECTED_MENU.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SignedIn>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SignedIn>
            <div className="flex items-center gap-3 p-3 rounded-lg shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <UserButton />
              <span className="font-medium text-gray-800 dark:text-gray-100">{user?.firstName} {user?.lastName}</span>
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>


  )
}