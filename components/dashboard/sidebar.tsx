"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  PawPrint,
  LayoutDashboard,
  Dog,
  Syringe,
  Bell,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mis Mascotas", href: "/dashboard/mascotas", icon: Dog },
  { name: "Vacunas", href: "/dashboard/vacunas", icon: Syringe },
  { name: "Recordatorios", href: "/dashboard/recordatorios", icon: Bell },
  { name: "Configuracion", href: "/dashboard/configuracion", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <PawPrint className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">PetVax</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent">
              <span className="text-sm font-semibold text-sidebar-accent-foreground">MG</span>
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Maria Garcia</p>
              <p className="truncate text-xs text-muted-foreground">usuario@ejemplo.com</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesion
            </Button>
          </Link>
        </div>
      </aside>
    </>
  )
}
