"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  PawPrint, 
  Syringe, 
  Users, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Dog,
  Cat
} from "lucide-react"
import Link from "next/link"
import { demoVetUser, demoPets, demoVaccines, formatDate } from "@/lib/store"

// Simulated vet data
const todayAppointments = [
  { id: '1', time: '09:00', petName: 'Max', ownerName: 'Maria Garcia', type: 'Vacunacion', species: 'perro' },
  { id: '2', time: '10:30', petName: 'Luna', ownerName: 'Maria Garcia', type: 'Control', species: 'gato' },
  { id: '3', time: '11:00', petName: 'Rocky', ownerName: 'Juan Perez', type: 'Desparasitacion', species: 'perro' },
  { id: '4', time: '14:00', petName: 'Michi', ownerName: 'Ana Lopez', type: 'Vacunacion', species: 'gato' },
  { id: '5', time: '15:30', petName: 'Thor', ownerName: 'Carlos Ruiz', type: 'Vacunacion', species: 'perro' },
]

const recentVaccinations = [
  { id: '1', petName: 'Max', vaccine: 'Rabia', date: '2026-03-25', ownerName: 'Maria Garcia' },
  { id: '2', petName: 'Luna', vaccine: 'Triple Felina', date: '2026-03-24', ownerName: 'Maria Garcia' },
  { id: '3', petName: 'Rocky', vaccine: 'Parvovirus', date: '2026-03-24', ownerName: 'Juan Perez' },
  { id: '4', petName: 'Bella', vaccine: 'Moquillo', date: '2026-03-23', ownerName: 'Sofia Martinez' },
]

export default function VetDashboardPage() {
  const stats = [
    { label: 'Pacientes Registrados', value: '127', icon: PawPrint, change: '+12 este mes' },
    { label: 'Vacunas Aplicadas', value: '342', icon: Syringe, change: '+28 este mes' },
    { label: 'Propietarios', value: '89', icon: Users, change: '+8 este mes' },
    { label: 'Citas Hoy', value: todayAppointments.length.toString(), icon: Calendar, change: '3 pendientes' },
  ]

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Bienvenido, {demoVetUser.name}
        </h1>
        <p className="text-muted-foreground">
          Resumen de tu actividad en la clinica
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Citas de Hoy</CardTitle>
              <CardDescription>Agenda del dia</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/veterinario/agenda">
                Ver agenda
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((apt, index) => (
                <div 
                  key={apt.id}
                  className={`flex items-center gap-3 rounded-lg border border-border p-3 ${index < 2 ? 'bg-muted/30' : ''}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    {apt.species === 'perro' ? (
                      <Dog className="h-5 w-5 text-secondary-foreground" />
                    ) : (
                      <Cat className="h-5 w-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{apt.petName}</p>
                      <Badge variant={apt.type === 'Vacunacion' ? 'default' : 'secondary'} className="text-xs">
                        {apt.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{apt.ownerName}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{apt.time}</span>
                  </div>
                  {index < 2 ? (
                    <Badge variant="outline" className="border-accent text-accent-foreground bg-accent/10">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Proximo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Pendiente
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Vaccinations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Vacunaciones Recientes</CardTitle>
              <CardDescription>Ultimas vacunas aplicadas</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/veterinario/vacunaciones">
                Ver todas
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentVaccinations.map((vac) => (
                <div 
                  key={vac.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{vac.petName}</p>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-sm text-primary">{vac.vaccine}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{vac.ownerName}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(vac.date)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Acciones Rapidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/veterinario/vacunaciones">
                <Syringe className="h-6 w-6" />
                <span>Registrar Vacuna</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/veterinario/pacientes">
                <PawPrint className="h-6 w-6" />
                <span>Nuevo Paciente</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/veterinario/propietarios">
                <Users className="h-6 w-6" />
                <span>Nuevo Propietario</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/veterinario/agenda">
                <Calendar className="h-6 w-6" />
                <span>Agendar Cita</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
