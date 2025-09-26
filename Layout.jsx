import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Compass, 
  Map, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Info,
  Menu,
  X,
  Globe,
  Mountain,
  Camera
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Discovery",
    url: createPageUrl("Discovery"),
    icon: Compass,
    description: "Explore destinations"
  },
  {
    title: "My Trips",
    url: createPageUrl("Trips"),
    icon: Map,
    description: "Plan your adventures"
  },
  {
    title: "Experiences",
    url: createPageUrl("Experiences"), 
    icon: Sparkles,
    description: "Find amazing activities"
  },
  {
    title: "Travel Journal",
    url: createPageUrl("Journal"),
    icon: BookOpen,
    description: "Document your journeys"
  },
  {
    title: "Bucket List",
    url: createPageUrl("BucketList"),
    icon: Heart,
    description: "Dream destinations"
  },
  {
    title: "Travel Guide",
    url: createPageUrl("Guide"),
    icon: Info,
    description: "Tips and insights"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-900">Wanderlust</h2>
                <p className="text-xs text-slate-500 font-medium">Premium Travel Explorer</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Explore
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`group hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl p-3 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200/50 shadow-sm' 
                            : 'text-slate-600 hover:shadow-sm'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${
                            location.pathname === item.url 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                          }`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-sm">{item.title}</span>
                            <p className="text-xs opacity-70">{item.description}</p>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/50">
                    <div className="flex items-center gap-3">
                      <Mountain className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm font-semibold text-emerald-900">Adventures</p>
                        <p className="text-xs text-emerald-600">3 upcoming trips</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/50">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900">Memories</p>
                        <p className="text-xs text-amber-600">127 photos captured</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">Travel Explorer</p>
                <p className="text-xs text-slate-500 truncate">Discover the world</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen">
          {/* Mobile header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                <h1 className="text-lg font-bold text-slate-900">Wanderlust</h1>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>

      <style>{`
        :root {
          --primary-50: #eff6ff;
          --primary-100: #dbeafe;
          --primary-600: #2563eb;
          --primary-700: #1d4ed8;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </SidebarProvider>
  );
}