"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Calendar, 
  Plus,
  Dog,
  Cat,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Syringe,
  Stethoscope,
  Pill,
  Scissors
} from "lucide-react"
import { allDemoPets, demoOwners, demoAppointments, formatDate, Appointment } from "@/lib/store"

const appointmentTypes = [
  { value: 'vacunacion', label: 'Vacunacion', icon: Syringe },
  { value: 'control', label: 'Control', icon: Stethoscope },
  { value: 'desparasitacion', label: 'Desparasitacion', icon: Pill },
  { value: 'consulta', label: 'Consulta', icon: Stethoscope },
  { value: 'cirugia', label: 'Cirugia', icon: Scissors },
]

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
]

export default function VetAgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    petId: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    type: '',
    notes: ''
  })

  const formatDateKey = (date: Date) => date.toISOString().split('T')[0]

  const getAppointmentsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    return demoAppointments.filter(a => a.date === dateKey)
  }

  const getPetInfo = (petId: string) => {
    const pet = allDemoPets.find(p => p.id === petId)
    const owner = pet ? demoOwners.find(o => o.id === pet.ownerId) : null
    return { pet, owner }
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    }
    setSelectedDate(newDate)
  }

  const getWeekDays = () => {
    const start = new Date(selectedDate)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start)
      day.setDate(day.getDate() + i)
      return day
    })
  }

  const handleNewAppointment = () => {
    setIsNewAppointmentOpen(false)
    setNewAppointment({ petId: '', date: new Date().toISOString().split('T')[0], time: '', type: '', notes: '' })
  }

  const todayAppointments = getAppointmentsForDate(selectedDate)

  const getStatusColor = (status: string) => {
    if (status === 'completada') return 'bg-primary/10 text-primary border-primary/20'
    if (status === 'cancelada') return 'bg-destructive/10 text-destructive border-destructive/20'
    return 'bg-accent/10 text-accent-foreground border-accent/20'
  }

  const getTypeIcon = (type: string) => {
    const typeInfo = appointmentTypes.find(t => t.value === type)
    return typeInfo?.icon || Stethoscope
  }

  const stats = {
    hoy: demoAppointments.filter(a => a.date === formatDateKey(new Date())).length,
    semana: demoAppointments.filter(a => {
      const aptDate = new Date(a.date)
      const today = new Date()
      const weekLater = new Date(today)
      weekLater.setDate(weekLater.getDate() + 7)
      return aptDate >= today && aptDate <= weekLater
    }).length,
    pendientes: demoAppointments.filter(a => a.status === 'programada').length,
    completadas: demoAppointments.filter(a => a.status === 'completada').length,
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Agenda</h1>
          <p className="text-muted-foreground">Gestion de citas y calendario</p>
        </div>
        <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Agendar Nueva Cita</DialogTitle>
              <DialogDescription>
                Programa una cita para un paciente
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pet">Paciente</Label>
                <Select value={newAppointment.petId} onValueChange={(v) => setNewAppointment({...newAppointment, petId: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {allDemoPets.map(pet => {
                      const owner = demoOwners.find(o => o.id === pet.ownerId)
                      return (
                        <SelectItem key={pet.id} value={pet.id}>
                          {pet.name} - {owner?.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Cita</Label>
                <Select value={newAppointment.type} onValueChange={(v) => setNewAppointment({...newAppointment, type: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Hora</Label>
                  <Select value={newAppointment.time} onValueChange={(v) => setNewAppointment({...newAppointment, time: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea 
                  id="notes" 
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Motivo de la cita u observaciones..."
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>Cancelar</Button>
              <Button onClick={handleNewAppointment}>Agendar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.hoy}</p>
              <p className="text-sm text-muted-foreground">Citas Hoy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <Clock className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.semana}</p>
              <p className="text-sm text-muted-foreground">Esta Semana</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <AlertCircle className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pendientes}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.completadas}</p>
              <p className="text-sm text-muted-foreground">Completadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Navigation */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-48 text-center">
                <h2 className="text-lg font-semibold text-foreground">
                  {viewMode === 'day' 
                    ? selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                    : `Semana del ${getWeekDays()[0].toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })} al ${getWeekDays()[6].toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}`
                  }
                </h2>
              </div>
              <Button variant="outline" size="icon" onClick={() => navigateDate('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'day' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('day')}
              >
                Dia
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Semana
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedDate(new Date())}
              >
                Hoy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      {viewMode === 'day' ? (
        <Card>
          <CardHeader>
            <CardTitle>Citas del Dia</CardTitle>
            <CardDescription>{todayAppointments.length} citas programadas</CardDescription>
          </CardHeader>
          <CardContent>
            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(apt => {
                    const { pet, owner } = getPetInfo(apt.petId)
                    const TypeIcon = getTypeIcon(apt.type)
                    return (
                      <div key={apt.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-secondary text-center">
                          <span className="text-lg font-bold text-foreground">{apt.time.split(':')[0]}</span>
                          <span className="text-xs text-muted-foreground">{apt.time.split(':')[1]}</span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          {pet?.species === 'perro' ? (
                            <Dog className="h-6 w-6 text-primary" />
                          ) : (
                            <Cat className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{pet?.name}</span>
                            <Badge variant="outline" className="gap-1">
                              <TypeIcon className="h-3 w-3" />
                              {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{owner?.name} - {pet?.breed}</p>
                          {apt.notes && (
                            <p className="mt-1 text-xs text-muted-foreground">{apt.notes}</p>
                          )}
                        </div>
                        <Badge variant="outline" className={getStatusColor(apt.status)}>
                          {apt.status === 'completada' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {apt.status === 'cancelada' && <XCircle className="mr-1 h-3 w-3" />}
                          {apt.status === 'programada' && <Clock className="mr-1 h-3 w-3" />}
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </Badge>
                        {apt.status === 'programada' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Completar</Button>
                            <Button size="sm" variant="ghost" className="text-destructive">Cancelar</Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium text-foreground">Sin citas</h3>
                <p className="text-muted-foreground">No hay citas programadas para este dia</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Vista Semanal</CardTitle>
            <CardDescription>Citas de la semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-7">
              {getWeekDays().map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day)
                const isToday = formatDateKey(day) === formatDateKey(new Date())
                return (
                  <div 
                    key={index} 
                    className={`rounded-lg border p-3 ${isToday ? 'border-primary bg-primary/5' : 'border-border'}`}
                  >
                    <div className="mb-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        {day.toLocaleDateString('es-CO', { weekday: 'short' })}
                      </p>
                      <p className={`text-lg font-semibold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                        {day.getDate()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      {dayAppointments.slice(0, 3).map(apt => {
                        const { pet } = getPetInfo(apt.petId)
                        return (
                          <div 
                            key={apt.id} 
                            className="rounded bg-secondary p-1.5 text-xs"
                          >
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{apt.time}</span>
                            </div>
                            <p className="truncate text-muted-foreground">{pet?.name}</p>
                          </div>
                        )
                      })}
                      {dayAppointments.length > 3 && (
                        <p className="text-center text-xs text-muted-foreground">
                          +{dayAppointments.length - 3} mas
                        </p>
                      )}
                      {dayAppointments.length === 0 && (
                        <p className="text-center text-xs text-muted-foreground">-</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
