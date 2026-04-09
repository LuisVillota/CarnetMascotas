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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Syringe, 
  Search, 
  Plus,
  Dog,
  Cat,
  CheckCircle2,
  AlertCircle,
  Filter,
  Calendar,
  FileText
} from "lucide-react"
import { allDemoPets, demoOwners, allDemoVaccines, formatDate, getDaysUntil } from "@/lib/store"

const vaccineTypes = [
  'Rabia',
  'Parvovirus',
  'Moquillo',
  'Triple Felina',
  'Leptospirosis',
  'Hepatitis',
  'Bordetella',
  'Leucemia Felina'
]

export default function VetVacunacionesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isNewVaccineOpen, setIsNewVaccineOpen] = useState(false)
  const [newVaccine, setNewVaccine] = useState({
    petId: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    nextDate: '',
    batch: '',
    notes: ''
  })

  const getPetInfo = (petId: string) => {
    const pet = allDemoPets.find(p => p.id === petId)
    const owner = pet ? demoOwners.find(o => o.id === pet.ownerId) : null
    return { pet, owner }
  }

  const vaccinesWithInfo = allDemoVaccines.map(v => {
    const { pet, owner } = getPetInfo(v.petId)
    const daysUntilNext = v.nextDate ? getDaysUntil(v.nextDate) : null
    return {
      ...v,
      pet,
      owner,
      isExpired: daysUntilNext !== null && daysUntilNext < 0,
      isNearExpiry: daysUntilNext !== null && daysUntilNext <= 30 && daysUntilNext >= 0
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filteredVaccines = vaccinesWithInfo.filter(v => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.pet?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.owner?.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (statusFilter === 'vigente') matchesStatus = !v.isExpired && !v.isNearExpiry
    if (statusFilter === 'proxima') matchesStatus = v.isNearExpiry
    if (statusFilter === 'vencida') matchesStatus = v.isExpired
    
    return matchesSearch && matchesStatus
  })

  const handleNewVaccine = () => {
    // Mock save
    setIsNewVaccineOpen(false)
    setNewVaccine({ petId: '', name: '', date: new Date().toISOString().split('T')[0], nextDate: '', batch: '', notes: '' })
  }

  const stats = {
    total: allDemoVaccines.length,
    vigentes: vaccinesWithInfo.filter(v => !v.isExpired && !v.isNearExpiry).length,
    proximas: vaccinesWithInfo.filter(v => v.isNearExpiry).length,
    vencidas: vaccinesWithInfo.filter(v => v.isExpired).length,
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Vacunaciones</h1>
          <p className="text-muted-foreground">Registro y seguimiento de vacunas</p>
        </div>
        <Dialog open={isNewVaccineOpen} onOpenChange={setIsNewVaccineOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Vacuna
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Vacuna</DialogTitle>
              <DialogDescription>
                Completa los datos de la vacunacion
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pet">Paciente</Label>
                <Select value={newVaccine.petId} onValueChange={(v) => setNewVaccine({...newVaccine, petId: v})}>
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
                <Label htmlFor="vaccine">Vacuna</Label>
                <Select value={newVaccine.name} onValueChange={(v) => setNewVaccine({...newVaccine, name: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar vacuna" />
                  </SelectTrigger>
                  <SelectContent>
                    {vaccineTypes.map(vac => (
                      <SelectItem key={vac} value={vac}>{vac}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Fecha de Aplicacion</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={newVaccine.date}
                    onChange={(e) => setNewVaccine({...newVaccine, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nextDate">Proxima Dosis</Label>
                  <Input 
                    id="nextDate" 
                    type="date"
                    value={newVaccine.nextDate}
                    onChange={(e) => setNewVaccine({...newVaccine, nextDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="batch">Lote de Vacuna</Label>
                <Input 
                  id="batch" 
                  value={newVaccine.batch}
                  onChange={(e) => setNewVaccine({...newVaccine, batch: e.target.value})}
                  placeholder="Ej: RAB-2026-001"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea 
                  id="notes" 
                  value={newVaccine.notes}
                  onChange={(e) => setNewVaccine({...newVaccine, notes: e.target.value})}
                  placeholder="Observaciones adicionales..."
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewVaccineOpen(false)}>Cancelar</Button>
              <Button onClick={handleNewVaccine}>Registrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Syringe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Aplicadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.vigentes}</p>
              <p className="text-sm text-muted-foreground">Vigentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <Calendar className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.proximas}</p>
              <p className="text-sm text-muted-foreground">Proximas a Vencer</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.vencidas}</p>
              <p className="text-sm text-muted-foreground">Vencidas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Buscar por vacuna, mascota o propietario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="vigente">Vigentes</SelectItem>
                <SelectItem value="proxima">Proximas a vencer</SelectItem>
                <SelectItem value="vencida">Vencidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Vacunaciones</CardTitle>
          <CardDescription>{filteredVaccines.length} vacunas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Vacuna</TableHead>
                  <TableHead>Fecha Aplicacion</TableHead>
                  <TableHead>Proxima Dosis</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVaccines.map((vaccine) => (
                  <TableRow key={vaccine.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          {vaccine.pet?.species === 'perro' ? (
                            <Dog className="h-5 w-5 text-secondary-foreground" />
                          ) : (
                            <Cat className="h-5 w-5 text-secondary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{vaccine.pet?.name}</p>
                          <p className="text-sm text-muted-foreground">{vaccine.owner?.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Syringe className="h-4 w-4 text-primary" />
                        <span className="font-medium">{vaccine.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(vaccine.date)}</TableCell>
                    <TableCell>{vaccine.nextDate ? formatDate(vaccine.nextDate) : '-'}</TableCell>
                    <TableCell className="text-muted-foreground">{vaccine.batch || '-'}</TableCell>
                    <TableCell>
                      {vaccine.isExpired ? (
                        <Badge variant="destructive">Vencida</Badge>
                      ) : vaccine.isNearExpiry ? (
                        <Badge className="bg-accent text-accent-foreground">Proxima</Badge>
                      ) : (
                        <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Vigente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
