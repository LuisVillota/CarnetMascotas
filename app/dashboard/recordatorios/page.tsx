"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  Plus, 
  Calendar,
  Syringe,
  AlertCircle,
  Check,
  Clock,
  Dog,
  Cat
} from "lucide-react"
import { 
  demoPets, 
  demoReminders, 
  demoVaccines,
  demoDewormings,
  formatDate, 
  getDaysUntil
} from "@/lib/store"
import type { Reminder } from "@/lib/store"

export default function RecordatoriosPage() {
  const [reminders, setReminders] = useState<Reminder[]>(demoReminders)

  // Generate automatic reminders from vaccines and dewormings
  const autoReminders: Reminder[] = [
    ...demoVaccines
      .filter(v => v.nextDate && getDaysUntil(v.nextDate) > 0 && getDaysUntil(v.nextDate) <= 90)
      .map(v => {
        const pet = demoPets.find(p => p.id === v.petId)
        return {
          id: `auto-vaccine-${v.id}`,
          petId: v.petId,
          type: 'vaccine' as const,
          title: `Vacuna ${v.name} - ${pet?.name}`,
          date: v.nextDate!,
          completed: false,
          relatedId: v.id
        }
      }),
    ...demoDewormings
      .filter(d => d.nextDate && getDaysUntil(d.nextDate) > 0 && getDaysUntil(d.nextDate) <= 90)
      .map(d => {
        const pet = demoPets.find(p => p.id === d.petId)
        return {
          id: `auto-deworming-${d.id}`,
          petId: d.petId,
          type: 'deworming' as const,
          title: `Desparasitacion ${d.product} - ${pet?.name}`,
          date: d.nextDate!,
          completed: false,
          relatedId: d.id
        }
      })
  ]

  // Combine and sort all reminders
  const allReminders = [...reminders, ...autoReminders]
    .filter((r, index, self) => 
      index === self.findIndex(t => t.id === r.id)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pendingReminders = allReminders.filter(r => !r.completed)
  const completedReminders = allReminders.filter(r => r.completed)

  const toggleComplete = (id: string) => {
    setReminders(prev => 
      prev.map(r => 
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    )
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 7) return 'border-destructive/50 bg-destructive/5'
    if (daysUntil <= 14) return 'border-accent/50 bg-accent/10'
    return 'border-border bg-muted/30'
  }

  const getUrgencyBadge = (daysUntil: number) => {
    if (daysUntil <= 7) return { text: 'Urgente', color: 'bg-destructive/10 text-destructive' }
    if (daysUntil <= 14) return { text: 'Proximo', color: 'bg-accent/20 text-accent-foreground' }
    return { text: 'Programado', color: 'bg-secondary text-secondary-foreground' }
  }

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Recordatorios
          </h1>
          <p className="mt-1 text-muted-foreground">
            Mantente al dia con las citas y tratamientos de tus mascotas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Recordatorio
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingReminders.length}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {pendingReminders.filter(r => getDaysUntil(r.date) <= 7).length}
              </p>
              <p className="text-sm text-muted-foreground">Esta semana</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedReminders.length}</p>
              <p className="text-sm text-muted-foreground">Completados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Proximos Recordatorios
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingReminders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium text-foreground">No hay recordatorios pendientes</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tus mascotas estan al dia
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingReminders.map((reminder) => {
                  const pet = demoPets.find(p => p.id === reminder.petId)
                  const daysUntil = getDaysUntil(reminder.date)
                  const urgency = getUrgencyBadge(daysUntil)
                  const PetIcon = pet?.species === 'perro' ? Dog : Cat
                  
                  return (
                    <div 
                      key={reminder.id}
                      className={`rounded-lg border p-4 transition-colors ${getUrgencyColor(daysUntil)}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                            reminder.type === 'vaccine' ? 'bg-primary/10' : 'bg-accent/20'
                          }`}>
                            {reminder.type === 'vaccine' ? (
                              <Syringe className="h-5 w-5 text-primary" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-accent-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{reminder.title}</p>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <PetIcon className="h-3.5 w-3.5" />
                              <span>{pet?.name}</span>
                              <span className="text-border">|</span>
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{formatDate(reminder.date)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${urgency.color}`}>
                            {urgency.text}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {daysUntil === 0 ? 'Hoy' : daysUntil === 1 ? 'Manana' : `En ${daysUntil} dias`}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleComplete(reminder.id)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Marcar completado
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Check className="h-5 w-5 text-green-600" />
              Completados Recientemente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedReminders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Check className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium text-foreground">Sin recordatorios completados</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Aqui veran los recordatorios que marques como completados
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedReminders.map((reminder) => {
                  const pet = demoPets.find(p => p.id === reminder.petId)
                  const PetIcon = pet?.species === 'perro' ? Dog : Cat
                  
                  return (
                    <div 
                      key={reminder.id}
                      className="rounded-lg border border-border bg-muted/30 p-4 opacity-75"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground line-through">{reminder.title}</p>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <PetIcon className="h-3.5 w-3.5" />
                              <span>{pet?.name}</span>
                              <span className="text-border">|</span>
                              <span>{formatDate(reminder.date)}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleComplete(reminder.id)}
                        >
                          Deshacer
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Calendar Preview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Proximos 30 dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, weekIndex) => {
              const weekStart = new Date()
              weekStart.setDate(weekStart.getDate() + weekIndex * 7)
              const weekEnd = new Date(weekStart)
              weekEnd.setDate(weekEnd.getDate() + 6)
              
              const weekReminders = pendingReminders.filter(r => {
                const date = new Date(r.date)
                return date >= weekStart && date <= weekEnd
              })
              
              return (
                <div 
                  key={weekIndex}
                  className={`rounded-lg border p-4 ${
                    weekReminders.length > 0 ? 'border-primary/30 bg-primary/5' : 'border-border'
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">
                    Semana {weekIndex + 1}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(weekStart.toISOString())} - {formatDate(weekEnd.toISOString())}
                  </p>
                  <div className="mt-2">
                    {weekReminders.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Sin citas</p>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Bell className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {weekReminders.length} {weekReminders.length === 1 ? 'cita' : 'citas'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
