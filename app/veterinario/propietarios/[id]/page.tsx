"use client"

import { use } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Dog,
  Cat,
  Syringe,
  Calendar,
  AlertCircle,
  PawPrint
} from "lucide-react"
import Link from "next/link"
import { demoOwners, allDemoPets, allDemoVaccines, demoAppointments, calculateAge, formatDate } from "@/lib/store"

export default function VetPropietarioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const owner = demoOwners.find(o => o.id === id)
  const pets = allDemoPets.filter(p => p.ownerId === id)
  const appointments = demoAppointments.filter(a => a.ownerId === id)

  if (!owner) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Propietario no encontrado</h2>
            <p className="mb-4 text-muted-foreground">El propietario que buscas no existe</p>
            <Button asChild>
              <Link href="/veterinario/propietarios">Volver a propietarios</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getVaccineCount = (petId: string) => {
    return allDemoVaccines.filter(v => v.petId === petId).length
  }

  const upcomingAppointments = appointments.filter(a => {
    const aptDate = new Date(a.date)
    const today = new Date()
    return aptDate >= today && a.status === 'programada'
  }).slice(0, 3)

  return (
    <div className="p-4 lg:p-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/veterinario/propietarios">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a propietarios
        </Link>
      </Button>

      {/* Owner Info */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold text-foreground">{owner.name}</h1>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{owner.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+57 300 123 4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Cali, Valle del Cauca</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="gap-1">
                    <PawPrint className="h-3 w-3" />
                    {pets.length} mascota{pets.length !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {upcomingAppointments.length} cita{upcomingAppointments.length !== 1 ? 's' : ''} pendiente{upcomingAppointments.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/veterinario/agenda?owner=${owner.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar Cita
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mascotas registradas</span>
              <span className="text-lg font-semibold text-foreground">{pets.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total vacunas</span>
              <span className="text-lg font-semibold text-foreground">
                {pets.reduce((acc, pet) => acc + getVaccineCount(pet.id), 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Citas totales</span>
              <span className="text-lg font-semibold text-foreground">{appointments.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pets Grid */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Mascotas</CardTitle>
            <CardDescription>Mascotas registradas de este propietario</CardDescription>
          </div>
          <Button size="sm" asChild>
            <Link href={`/veterinario/pacientes?owner=${owner.id}`}>
              Ver todas
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {pets.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pets.map(pet => (
                <Link key={pet.id} href={`/veterinario/pacientes/${pet.id}`}>
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                          {pet.species === 'perro' ? (
                            <Dog className="h-6 w-6 text-secondary-foreground" />
                          ) : (
                            <Cat className="h-6 w-6 text-secondary-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{pet.name}</h3>
                          <p className="text-sm text-muted-foreground">{pet.breed}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {calculateAge(pet.birthDate)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Syringe className="mr-1 h-3 w-3" />
                              {getVaccineCount(pet.id)} vacunas
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No hay mascotas registradas
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Proximas Citas</CardTitle>
            <CardDescription>Citas programadas para este propietario</CardDescription>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/veterinario/agenda?owner=${owner.id}`}>
              Ver agenda
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map(apt => {
                const pet = allDemoPets.find(p => p.id === apt.petId)
                return (
                  <div key={apt.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                      {pet?.species === 'perro' ? (
                        <Dog className="h-6 w-6 text-secondary-foreground" />
                      ) : (
                        <Cat className="h-6 w-6 text-secondary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{pet?.name}</span>
                        <Badge variant="outline">{apt.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(apt.date)} a las {apt.time}
                      </p>
                    </div>
                    <Badge className="bg-accent/10 text-accent-foreground border-accent/20">
                      Programada
                    </Badge>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No hay citas programadas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
