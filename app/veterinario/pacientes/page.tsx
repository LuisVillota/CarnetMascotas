"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  PawPrint, 
  Search, 
  Plus,
  Dog,
  Cat,
  Eye,
  Syringe,
  Calendar,
  User,
  Filter
} from "lucide-react"
import Link from "next/link"
import { allDemoPets, demoOwners, calculateAge, formatDate, Pet } from "@/lib/store"

export default function VetPacientesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState<string>('all')
  const [isNewPetOpen, setIsNewPetOpen] = useState(false)
  const [newPet, setNewPet] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    weight: '',
    ownerId: ''
  })

  const getOwnerName = (ownerId: string) => {
    const owner = demoOwners.find(o => o.id === ownerId)
    return owner?.name || 'Desconocido'
  }

  const filteredPets = allDemoPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          getOwnerName(pet.ownerId).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecies = speciesFilter === 'all' || pet.species === speciesFilter
    return matchesSearch && matchesSpecies
  })

  const handleNewPet = () => {
    // Mock save - in real app would save to database
    setIsNewPetOpen(false)
    setNewPet({ name: '', species: '', breed: '', birthDate: '', weight: '', ownerId: '' })
  }

  const stats = {
    total: allDemoPets.length,
    dogs: allDemoPets.filter(p => p.species === 'perro').length,
    cats: allDemoPets.filter(p => p.species === 'gato').length,
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Pacientes</h1>
          <p className="text-muted-foreground">Gestion de mascotas registradas</p>
        </div>
        <Dialog open={isNewPetOpen} onOpenChange={setIsNewPetOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
              <DialogDescription>
                Ingresa los datos de la mascota
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="owner">Propietario</Label>
                <Select value={newPet.ownerId} onValueChange={(v) => setNewPet({...newPet, ownerId: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar propietario" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoOwners.map(owner => (
                      <SelectItem key={owner.id} value={owner.id}>{owner.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name" 
                  value={newPet.name}
                  onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                  placeholder="Nombre de la mascota"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="species">Especie</Label>
                  <Select value={newPet.species} onValueChange={(v) => setNewPet({...newPet, species: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Especie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perro">Perro</SelectItem>
                      <SelectItem value="gato">Gato</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="breed">Raza</Label>
                  <Input 
                    id="breed" 
                    value={newPet.breed}
                    onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                    placeholder="Raza"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <Input 
                    id="birthDate" 
                    type="date"
                    value={newPet.birthDate}
                    onChange={(e) => setNewPet({...newPet, birthDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({...newPet, weight: e.target.value})}
                    placeholder="0.0"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewPetOpen(false)}>Cancelar</Button>
              <Button onClick={handleNewPet}>Registrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <PawPrint className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Pacientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <Dog className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.dogs}</p>
              <p className="text-sm text-muted-foreground">Perros</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <Cat className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.cats}</p>
              <p className="text-sm text-muted-foreground">Gatos</p>
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
                placeholder="Buscar por nombre, raza o propietario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="perro">Perros</SelectItem>
                <SelectItem value="gato">Gatos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>{filteredPets.length} pacientes encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Especie/Raza</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>Propietario</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          {pet.species === 'perro' ? (
                            <Dog className="h-5 w-5 text-secondary-foreground" />
                          ) : (
                            <Cat className="h-5 w-5 text-secondary-foreground" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">{pet.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge variant="outline" className="mb-1">
                          {pet.species === 'perro' ? 'Perro' : pet.species === 'gato' ? 'Gato' : 'Otro'}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{pet.breed}</p>
                      </div>
                    </TableCell>
                    <TableCell>{calculateAge(pet.birthDate)}</TableCell>
                    <TableCell>{pet.weight ? `${pet.weight} kg` : '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{getOwnerName(pet.ownerId)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(pet.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/veterinario/pacientes/${pet.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/veterinario/vacunaciones?pet=${pet.id}`}>
                            <Syringe className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/veterinario/agenda?pet=${pet.id}`}>
                            <Calendar className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
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
