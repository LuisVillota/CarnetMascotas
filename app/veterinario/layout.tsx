"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  PawPrint, 
  LayoutDashboard, 
  Syringe, 
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope
} from "lucide-react"

const navItems = [
  { href: "/veterinario", label: "Dashboard", icon: LayoutDashboard },
  { href: "/veterinario/pacientes", label: "Pacientes", icon: PawPrint },
  { href: "/veterinario/vacunaciones", label: "Vacunaciones", icon: Syringe },
  { href: "/veterinario/propietarios", label: "Propietarios", icon: Users },
  { href: "/veterinario/agenda", label: "Agenda", icon: Calendar },
  { href: "/veterinario/configuracion", label: "Configuracion", icon: Settings },
]

export default function VetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/veterinario" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground">PetVax</span>
              <span className="text-xs text-muted-foreground">Portal Veterinario</span>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
              <LogOut className="h-5 w-5" />
              Cerrar Sesion
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            <span className="font-semibold">Portal Veterinario</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
