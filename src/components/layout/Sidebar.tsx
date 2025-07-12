
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Shield, MapPin, MessageCircle, Plus, User } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Shield,
    },
    {
      title: 'Safety Map',
      url: '/map',
      icon: MapPin,
    },
    {
      title: 'Incident Reporting',
      url: '/report',
      icon: Plus,
    },
    {
      title: 'Emergency Chat',
      url: '/chat',
      icon: MessageCircle,
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: User,
    },
  ];
  
  return (
    <SidebarUI className="w-64">
      <SidebarContent>
        <div className="p-2">
          <SidebarTrigger />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  );
};

export default Sidebar;
