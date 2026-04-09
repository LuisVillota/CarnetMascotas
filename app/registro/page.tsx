"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PawPrint, Mail, Lock, User, ArrowRight, Check, ArrowLeft } from "lucide-react"

export default function RegistroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      setStep(2)
      return
    }
    
    setIsLoading(true)
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    router.push('/dashboard')
  }

  const benefits = [
    "Historial sanitario digital seguro",
    "Recordatorios automaticos",
    "Acceso desde cualquier dispositivo",
    "Comparte con tu veterinario"
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Benefits (hidden on mobile) */}
      <div className="hidden w-1/2 bg-primary p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/20">
              <PawPrint className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">PetVax</span>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold text-primary-foreground">
            El carnet de vacunacion digital para tu mascota
          </h1>
          
          <p className="mb-8 text-primary-foreground/80">
            Unete a miles de dueños de mascotas que ya gestionan la salud de sus animales de forma digital.
          </p>
          
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-primary-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>

          {/* Mobile Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <PawPrint className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">PetVax</span>
          </Link>

          {/* Steps indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`h-1 w-12 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {step === 1 ? 'Crear Cuenta' : 'Configura tu contrasena'}
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? 'Ingresa tus datos para comenzar' 
                  : 'Elige una contrasena segura para tu cuenta'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          className="pl-10"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>

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
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contrasena</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Minimo 8 caracteres"
                          className="pl-10"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          minLength={8}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar contrasena</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Repite tu contrasena"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-sm text-destructive">Las contrasenas no coinciden</p>
                    )}
                  </>
                )}

                <div className="flex gap-3 pt-2">
                  {step === 2 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Atras
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={isLoading || (step === 2 && formData.password !== formData.confirmPassword)}
                  >
                    {isLoading ? 'Creando cuenta...' : step === 1 ? 'Continuar' : 'Crear Cuenta'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>

              {step === 1 && (
                <>
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">O registrate con</span>
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
                </>
              )}

              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground">Ya tienes una cuenta?</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">
                    Iniciar sesion
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Al registrarte, aceptas nuestros{' '}
            <Link href="#" className="hover:underline">Terminos de Servicio</Link>
            {' '}y{' '}
            <Link href="#" className="hover:underline">Politica de Privacidad</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
