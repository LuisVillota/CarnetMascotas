"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Syringe, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Building2,
  User,
  Dog,
  Cat
} from "lucide-react"
import { demoPets, demoVaccines, formatDate } from "@/lib/store"

export default function VacunasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPet, setFilterPet] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredVaccines = demoVaccines.filter(vaccine => {
    const pet = demoPets.find(p => p.id === vaccine.petId)
    const matchesSearch = vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet?.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPet = filterPet === 'all' || vaccine.petId === filterPet
    
    const isUpToDate = !vaccine.nextDate || new Date(vaccine.nextDate) > new Date()
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'vigente' && isUpToDate) ||
                         (filterStatus === 'vencida' && !isUpToDate)
    
    return matchesSearch && matchesPet && matchesStatus
  })

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Historial de Vacunas
          </h1>
          <p className="mt-1 text-muted-foreground">
            Consulta y gestiona todas las vacunas de tus mascotas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Vacuna
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Syringe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{demoVaccines.length}</p>
              <p className="text-sm text-muted-foreground">Total vacunas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Syringe className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {demoVaccines.filter(v => !v.nextDate || new Date(v.nextDate) > new Date()).length}
              </p>
              <p className="text-sm text-muted-foreground">Vigentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Calendar className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {demoVaccines.filter(v => v.nextDate && new Date(v.nextDate) <= new Date()).length}
              </p>
              <p className="text-sm text-muted-foreground">Por renovar</p>
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
                placeholder="Buscar por vacuna o mascota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterPet} onValueChange={setFilterPet}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Mascota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las mascotas</SelectItem>
                  {demoPets.map(pet => (
                    <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="vigente">Vigentes</SelectItem>
                  <SelectItem value="vencida">Vencidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vaccines List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {filteredVaccines.length} vacunas encontradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredVaccines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Syringe className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">No se encontraron vacunas</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta ajustar los filtros de busqueda
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVaccines.map((vaccine) => {
                const pet = demoPets.find(p => p.id === vaccine.petId)
                const isUpToDate = !vaccine.nextDate || new Date(vaccine.nextDate) > new Date()
                const PetIcon = pet?.species === 'perro' ? Dog : Cat
                
                return (
                  <div 
                    key={vaccine.id}
                    className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex gap-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                        isUpToDate ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Syringe className={`h-6 w-6 ${isUpToDate ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-foreground">{vaccine.name}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            isUpToDate 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {isUpToDate ? 'Vigente' : 'Vencida'}
                          </span>
                        </div>
                        
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <PetIcon className="h-4 w-4" />
                          <span>{pet?.name}</span>
                          <span className="text-border">|</span>
                          <span>{pet?.breed}</span>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Aplicada: {formatDate(vaccine.date)}</span>
                          </div>
                          {vaccine.nextDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Proxima: {formatDate(vaccine.nextDate)}</span>
                            </div>
                          )}
                        </div>
                        
                        {(vaccine.vetName || vaccine.vetClinic) && (
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            {vaccine.vetName && (
                              <div className="flex items-center gap-1">
                                <User className="h-3.5 w-3.5" />
                                <span>{vaccine.vetName}</span>
                              </div>
                            )}
                            {vaccine.vetClinic && (
                              <div className="flex items-center gap-1">
                                <Building2 className="h-3.5 w-3.5" />
                                <span>{vaccine.vetClinic}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 sm:flex-shrink-0">
                      <Button variant="outline" size="sm">
                        Ver detalles
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
  )
}
