import * as React from "react";

import { SearchForm } from "@/components/search-form";
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
} from "@/components/ui/sidebar";
import { Logo } from "../logo";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Initial Steps",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/dashboard",
          isActive: true,
        },
        {
          title: "My wallet",
          url: "/my-wallet",
        },
        {
          title: "Costs",
          url: "/costs",
        },
        {
          title: "Groups",
          url: "/groups"
        },
        {
          title: "Payments",
          url: "/payments",
        },
        {
          title: "My contacts",
          url: "my-contacts",
        },
      ],
    },
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "How can I start?",
          url: "#",
        },
        {
          title: "How it works",
          url: "#",
        },
        {
          title: "Contact Us",
          url: "#",
        },
      ],
    },
    {
      title: "My Account",
      url: "#",
      items: [
        {
          title: "My Account",
          url: "/profile",
        },
      ],
    },
  ],
};

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
  );
}
