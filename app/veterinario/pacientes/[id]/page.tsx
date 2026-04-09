"use client"

import { use } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  ArrowLeft,
  Dog,
  Cat,
  Syringe,
  Calendar,
  User,
  Phone,
  Mail,
  Weight,
  Cake,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react"
import Link from "next/link"
import { allDemoPets, demoOwners, allDemoVaccines, demoAppointments, demoDewormings, calculateAge, formatDate, getDaysUntil } from "@/lib/store"

export default function VetPacienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const pet = allDemoPets.find(p => p.id === id)
  const owner = pet ? demoOwners.find(o => o.id === pet.ownerId) : null
  const vaccines = allDemoVaccines.filter(v => v.petId === id)
  const appointments = demoAppointments.filter(a => a.petId === id)
  const dewormings = demoDewormings.filter(d => d.petId === id)

  if (!pet) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Paciente no encontrado</h2>
            <p className="mb-4 text-muted-foreground">El paciente que buscas no existe</p>
            <Button asChild>
              <Link href="/veterinario/pacientes">Volver a pacientes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getAppointmentTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      'vacunacion': 'default',
      'control': 'secondary',
      'desparasitacion': 'outline',
      'consulta': 'secondary',
      'cirugia': 'default'
    }
    return variants[type] || 'outline'
  }

  const getStatusBadge = (status: string) => {
    if (status === 'completada') return 'bg-primary/10 text-primary border-primary/20'
    if (status === 'cancelada') return 'bg-destructive/10 text-destructive border-destructive/20'
    return 'bg-accent/10 text-accent-foreground border-accent/20'
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/veterinario/pacientes">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a pacientes
        </Link>
      </Button>

      {/* Pet Info Header */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                {pet.species === 'perro' ? (
                  <Dog className="h-12 w-12 text-secondary-foreground" />
                ) : (
                  <Cat className="h-12 w-12 text-secondary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">{pet.name}</h1>
                  <Badge variant="outline">
                    {pet.species === 'perro' ? 'Perro' : pet.species === 'gato' ? 'Gato' : 'Otro'}
                  </Badge>
                </div>
                <p className="mb-4 text-lg text-muted-foreground">{pet.breed}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Cake className="h-4 w-4 text-muted-foreground" />
                    <span>{calculateAge(pet.birthDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Weight className="h-4 w-4 text-muted-foreground" />
                    <span>{pet.weight ? `${pet.weight} kg` : 'Sin registro'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Desde {formatDate(pet.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/veterinario/vacunaciones?pet=${pet.id}`}>
                    <Syringe className="mr-2 h-4 w-4" />
                    Vacunar
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/veterinario/agenda?pet=${pet.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Propietario</CardTitle>
          </CardHeader>
          <CardContent>
            {owner && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{owner.name}</p>
                    <p className="text-sm text-muted-foreground">Propietario</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{owner.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">+57 300 123 4567</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/veterinario/propietarios/${owner.id}`}>
                    Ver perfil completo
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="vaccines" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="vaccines" className="gap-2">
            <Syringe className="h-4 w-4" />
            Vacunas ({vaccines.length})
          </TabsTrigger>
          <TabsTrigger value="dewormings" className="gap-2">
            <FileText className="h-4 w-4" />
            Desparasitaciones ({dewormings.length})
          </TabsTrigger>
          <TabsTrigger value="appointments" className="gap-2">
            <Calendar className="h-4 w-4" />
            Citas ({appointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vaccines">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historial de Vacunas</CardTitle>
                <CardDescription>Registro completo de vacunacion</CardDescription>
              </div>
              <Button size="sm" asChild>
                <Link href={`/veterinario/vacunaciones?pet=${pet.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Vacuna
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {vaccines.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vacuna</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Proxima Dosis</TableHead>
                      <TableHead>Lote</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vaccines.map((vaccine) => {
                      const daysUntilNext = vaccine.nextDate ? getDaysUntil(vaccine.nextDate) : null
                      const isExpired = daysUntilNext !== null && daysUntilNext < 0
                      const isNearExpiry = daysUntilNext !== null && daysUntilNext <= 30 && daysUntilNext >= 0
                      return (
                        <TableRow key={vaccine.id}>
                          <TableCell className="font-medium">{vaccine.name}</TableCell>
                          <TableCell>{formatDate(vaccine.date)}</TableCell>
                          <TableCell>{vaccine.nextDate ? formatDate(vaccine.nextDate) : '-'}</TableCell>
                          <TableCell className="text-muted-foreground">{vaccine.batch || '-'}</TableCell>
                          <TableCell>
                            {isExpired ? (
                              <Badge variant="destructive">Vencida</Badge>
                            ) : isNearExpiry ? (
                              <Badge className="bg-accent text-accent-foreground">Proxima</Badge>
                            ) : (
                              <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Vigente
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No hay vacunas registradas
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dewormings">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historial de Desparasitaciones</CardTitle>
                <CardDescription>Registro de tratamientos antiparasitarios</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Desparasitacion
              </Button>
            </CardHeader>
            <CardContent>
              {dewormings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Proxima Dosis</TableHead>
                      <TableHead>Peso</TableHead>
                      <TableHead>Notas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dewormings.map((dew) => (
                      <TableRow key={dew.id}>
                        <TableCell className="font-medium">{dew.product}</TableCell>
                        <TableCell>{formatDate(dew.date)}</TableCell>
                        <TableCell>{dew.nextDate ? formatDate(dew.nextDate) : '-'}</TableCell>
                        <TableCell>{dew.weight ? `${dew.weight} kg` : '-'}</TableCell>
                        <TableCell className="text-muted-foreground">{dew.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No hay desparasitaciones registradas
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historial de Citas</CardTitle>
                <CardDescription>Todas las citas programadas y pasadas</CardDescription>
              </div>
              <Button size="sm" asChild>
                <Link href={`/veterinario/agenda?pet=${pet.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Cita
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Notas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>{formatDate(apt.date)}</TableCell>
                        <TableCell>{apt.time}</TableCell>
                        <TableCell>
                          <Badge variant={getAppointmentTypeBadge(apt.type)}>
                            {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusBadge(apt.status)}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{apt.notes || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No hay citas registradas
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
