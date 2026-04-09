"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Dog, 
  Cat,
  Syringe, 
  Bell, 
  Plus, 
  ChevronRight,
  Calendar,
  Shield,
  AlertCircle
} from "lucide-react"
import { 
  demoPets, 
  demoVaccines, 
  demoReminders, 
  formatDate, 
  getDaysUntil,
  getUpcomingReminders,
  calculateAge
} from "@/lib/store"

export default function DashboardPage() {
  const upcomingReminders = getUpcomingReminders(demoReminders, 60)
  
  const totalVaccines = demoVaccines.length
  const upToDateVaccines = demoVaccines.filter(v => {
    if (!v.nextDate) return true
    return new Date(v.nextDate) > new Date()
  }).length

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Bienvenida, Maria
        </h1>
        <p className="mt-1 text-muted-foreground">
          Aqui tienes un resumen del estado de salud de tus mascotas.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Dog className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{demoPets.length}</p>
              <p className="text-sm text-muted-foreground">Mascotas registradas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Syringe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalVaccines}</p>
              <p className="text-sm text-muted-foreground">Vacunas aplicadas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{upToDateVaccines}</p>
              <p className="text-sm text-muted-foreground">Vacunas vigentes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <Bell className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{upcomingReminders.length}</p>
              <p className="text-sm text-muted-foreground">Recordatorios proximos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Pets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Mis Mascotas</CardTitle>
            <Link href="/dashboard/mascotas">
              <Button variant="ghost" size="sm">
                Ver todas
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoPets.map((pet) => {
                const petVaccines = demoVaccines.filter(v => v.petId === pet.id)
                const Icon = pet.species === 'perro' ? Dog : Cat
                
                return (
                  <Link 
                    key={pet.id} 
                    href={`/dashboard/mascotas/${pet.id}`}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{pet.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pet.breed} - {calculateAge(pet.birthDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{petVaccines.length} vacunas</p>
                      <p className="text-xs text-muted-foreground">registradas</p>
                    </div>
                  </Link>
                )
              })}

              <Link href="/dashboard/mascotas/nueva">
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Mascota
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Proximos Recordatorios</CardTitle>
            <Link href="/dashboard/recordatorios">
              <Button variant="ghost" size="sm">
                Ver todos
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReminders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No tienes recordatorios proximos
                  </p>
                </div>
              ) : (
                upcomingReminders.slice(0, 4).map((reminder) => {
                  const pet = demoPets.find(p => p.id === reminder.petId)
                  const daysUntil = getDaysUntil(reminder.date)
                  const isUrgent = daysUntil <= 7
                  
                  return (
                    <div 
                      key={reminder.id}
                      className={`flex items-center justify-between rounded-lg p-4 ${
                        isUrgent 
                          ? 'border border-accent/50 bg-accent/10' 
                          : 'border border-border bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          isUrgent ? 'bg-accent/20' : 'bg-primary/10'
                        }`}>
                          {reminder.type === 'vaccine' ? (
                            <Syringe className={`h-5 w-5 ${isUrgent ? 'text-accent-foreground' : 'text-primary'}`} />
                          ) : (
                            <AlertCircle className={`h-5 w-5 ${isUrgent ? 'text-accent-foreground' : 'text-primary'}`} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{reminder.title}</p>
                          <p className="text-sm text-muted-foreground">{pet?.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${isUrgent ? 'text-accent-foreground' : 'text-foreground'}`}>
                          {formatDate(reminder.date)}
                        </p>
                        <p className={`text-xs ${isUrgent ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
                          En {daysUntil} dias
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vaccines */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Ultimas Vacunas Aplicadas</CardTitle>
          <Link href="/dashboard/vacunas">
            <Button variant="ghost" size="sm">
              Ver historial
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Mascota</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Vacuna</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Fecha</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Proxima</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {demoVaccines.slice(0, 5).map((vaccine) => {
                  const pet = demoPets.find(p => p.id === vaccine.petId)
                  const isUpToDate = !vaccine.nextDate || new Date(vaccine.nextDate) > new Date()
                  
                  return (
                    <tr key={vaccine.id} className="border-b border-border last:border-0">
                      <td className="py-4 text-sm text-foreground">{pet?.name}</td>
                      <td className="py-4 text-sm text-foreground">{vaccine.name}</td>
                      <td className="py-4 text-sm text-muted-foreground">{formatDate(vaccine.date)}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {vaccine.nextDate ? formatDate(vaccine.nextDate) : '-'}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          isUpToDate 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {isUpToDate ? 'Vigente' : 'Vencida'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
