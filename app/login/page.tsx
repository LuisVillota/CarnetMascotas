"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PawPrint, Mail, Lock, ArrowRight, User, Stethoscope, ArrowLeft } from "lucide-react"
import { demoUsers } from "@/lib/store"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Find user by email
    const user = demoUsers.find(u => u.email === formData.email)
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect based on role
    if (user?.role === 'vet') {
      router.push('/veterinario')
    } else {
      router.push('/dashboard')
    }
  }

  const handleDemoLogin = async (email: string) => {
    setFormData({ email, password: 'demo123' })
    setIsLoading(true)
    
    const user = demoUsers.find(u => u.email === email)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (user?.role === 'vet') {
      router.push('/veterinario')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-background to-background" />
      
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>

        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <PawPrint className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">PetVax</span>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Iniciar Sesion</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electronico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contrasena</Label>
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Olvidaste tu contrasena?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Ingresar'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">O continua con</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" type="button">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                  </svg>
                  Apple
                </Button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              No tienes una cuenta?{' '}
              <Link href="/registro" className="font-medium text-primary hover:underline">
                Registrate gratis
              </Link>
            </p>

            {/* Demo Users Section */}
            <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-4">
              <p className="mb-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Usuarios de prueba
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleDemoLogin('usuario@ejemplo.com')}
                  disabled={isLoading}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Maria Garcia</span>
                    <span className="text-xs text-muted-foreground">usuario@ejemplo.com</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleDemoLogin('veterinario@ejemplo.com')}
                  disabled={isLoading}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Dr. Carlos Rodriguez</span>
                    <span className="text-xs text-muted-foreground">veterinario@ejemplo.com</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Al continuar, aceptas nuestros{' '}
          <Link href="#" className="hover:underline">Terminos de Servicio</Link>
          {' '}y{' '}
          <Link href="#" className="hover:underline">Politica de Privacidad</Link>
        </p>
      </div>
    </div>
  )
}
