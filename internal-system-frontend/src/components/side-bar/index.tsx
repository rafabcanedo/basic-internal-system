import * as React from "react"

import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "../logo"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Initial Steps",
      url: "#",
      items: [
        {
          title: "Home",
          url: "#",
          isActive: true,
        },
        {
          title: "My Schedule",
          url: "#",
        },
        {
          title: "My contacts",
          url: "#",
        },
      ],
    },
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "How Can I Start?",
          url: "#",
        },
        {
          title: "Item 1",
          url: "#",
        },
        {
          title: "Item 2",
          url: "#",
        },
        {
          title: "Item 3",
          url: "#",
        },
        {
          title: "Item 4",
          url: "#",
        },
        {
          title: "Contact Us",
          url: "#",
        },
      ],
    },
  ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <div className="flex items-center justify-center mt-4 mb-4">
       <Logo />
      </div>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
