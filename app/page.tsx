import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Shield, 
  Bell, 
  Cloud, 
  Smartphone, 
  Stethoscope,
  CalendarCheck,
  FileText,
  Users,
  ChevronRight,
  PawPrint
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <PawPrint className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PetVax</span>
          </Link>
          
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#caracteristicas" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Caracteristicas
            </Link>
            <Link href="#como-funciona" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Como Funciona
            </Link>
            <Link href="#beneficios" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Beneficios
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesion
              </Button>
            </Link>
            <Link href="/registro">
              <Button size="sm">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-background to-background" />
        
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5">
                <span className="text-sm font-medium text-primary">100% Digital</span>
                <ChevronRight className="h-4 w-4 text-primary" />
              </div>
              
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                El carnet de vacunacion de tu mascota, 
                <span className="text-primary"> siempre contigo</span>
              </h1>
              
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Digitaliza el historial sanitario de tu mascota. Recibe recordatorios automaticos, 
                accede desde cualquier dispositivo y comparte informacion con tu veterinario en tiempo real.
              </p>
              
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href="/registro">
                  <Button size="lg" className="w-full sm:w-auto">
                    Comenzar Gratis
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#como-funciona">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Ver Demo
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="h-10 w-10 rounded-full border-2 border-background bg-muted"
                      style={{ backgroundColor: `oklch(0.${65 + i * 5} 0.1 ${170 + i * 20})` }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+2,500 mascotas</p>
                  <p className="text-sm text-muted-foreground">registradas este mes</p>
                </div>
              </div>
            </div>

            {/* Hero Card Preview */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <div className="absolute -inset-4 rounded-3xl bg-primary/5" />
              <Card className="relative overflow-hidden border-2 shadow-xl">
                <div className="bg-primary px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary-foreground/20 p-2">
                        <PawPrint className="h-full w-full text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary-foreground">Max</p>
                        <p className="text-sm text-primary-foreground/80">Golden Retriever</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-primary-foreground/20 px-3 py-1">
                      <span className="text-xs font-medium text-primary-foreground">Al dia</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Rabia</p>
                          <p className="text-xs text-muted-foreground">15 Ene 2026</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Vigente</span>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Parvovirus</p>
                          <p className="text-xs text-muted-foreground">22 Feb 2026</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Vigente</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-accent/50 bg-accent/10 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                          <Bell className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Desparasitacion</p>
                          <p className="text-xs text-accent-foreground">En 5 dias</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-foreground">Proximo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="border-t border-border bg-card px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Todo lo que necesitas para el cuidado de tu mascota
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Una plataforma completa que centraliza toda la informacion sanitaria 
              y te ayuda a mantener a tu mascota siempre protegida.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Historial Completo",
                description: "Registra vacunas, desparasitaciones, consultas y tratamientos en un solo lugar."
              },
              {
                icon: Bell,
                title: "Recordatorios Automaticos",
                description: "Recibe notificaciones antes de cada cita o vacuna pendiente."
              },
              {
                icon: Cloud,
                title: "Acceso en la Nube",
                description: "Tu informacion siempre disponible desde cualquier dispositivo."
              },
              {
                icon: Stethoscope,
                title: "Conexion con Veterinarias",
                description: "Comparte el historial con tu veterinario para una mejor atencion."
              },
              {
                icon: Shield,
                title: "Datos Seguros",
                description: "Informacion encriptada y protegida con los mas altos estandares."
              },
              {
                icon: Smartphone,
                title: "App Responsiva",
                description: "Diseñada para funcionar perfectamente en moviles y computadoras."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-border/50 transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comienza en 3 simples pasos
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Registra a tu mascota y comienza a disfrutar de todos los beneficios.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Crea tu cuenta",
                description: "Registrate con tu correo electronico y completa tu perfil de usuario."
              },
              {
                step: "02",
                title: "Añade tus mascotas",
                description: "Ingresa los datos basicos de tu mascota: nombre, especie, raza y fecha de nacimiento."
              },
              {
                step: "03",
                title: "Registra el historial",
                description: "Añade las vacunas y desparasitaciones. Nosotros te recordamos las proximas citas."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                    <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-border lg:block lg:w-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Vets */}
      <section id="beneficios" className="border-t border-border bg-secondary/50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Para Veterinarias</span>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Mejora la gestion de tus pacientes
              </h2>
              
              <p className="mt-4 text-lg text-muted-foreground">
                Conecta con los dueños de mascotas, accede a historiales completos 
                y mejora la calidad de atencion de tu clinica.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Acceso al historial sanitario en tiempo real",
                  "Registro automatico de procedimientos",
                  "Comunicacion directa con los dueños",
                  "Dashboard de gestion de pacientes"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <CalendarCheck className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/registro">
                  <Button size="lg">
                    Registrar mi Veterinaria
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/5" />
              <Card className="relative overflow-hidden shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Panel Veterinario</h3>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">Demo</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="text-2xl font-bold text-foreground">156</p>
                        <p className="text-sm text-muted-foreground">Pacientes activos</p>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <p className="text-2xl font-bold text-foreground">24</p>
                        <p className="text-sm text-muted-foreground">Citas hoy</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border border-border p-4">
                      <p className="mb-3 text-sm font-medium text-muted-foreground">Proximas citas</p>
                      <div className="space-y-3">
                        {[
                          { pet: "Luna", time: "09:00", type: "Vacunacion" },
                          { pet: "Rocky", time: "10:30", type: "Control" },
                          { pet: "Mia", time: "11:15", type: "Desparasitacion" }
                        ].map((appointment, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{appointment.pet}</p>
                                <p className="text-xs text-muted-foreground">{appointment.type}</p>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{appointment.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-0 bg-primary">
            <CardContent className="p-8 text-center sm:p-12">
              <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
                Comienza a proteger a tu mascota hoy
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                Unete a miles de dueños responsables que ya digitalizaron el carnet de vacunacion de sus mascotas.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Link href="/registro">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Crear Cuenta Gratis
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                    Ya tengo cuenta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <PawPrint className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">PetVax</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Terminos
              </Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacidad
              </Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Contacto
              </Link>
            </nav>
            
            <p className="text-sm text-muted-foreground">
              2026 PetVax. Universidad Autonoma de Occidente.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
