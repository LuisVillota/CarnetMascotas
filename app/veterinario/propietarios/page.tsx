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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Users, 
  Search, 
  Plus,
  User,
  Mail,
  Phone,
  PawPrint,
  Eye,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { demoOwners, allDemoPets } from "@/lib/store"

export default function VetPropietariosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isNewOwnerOpen, setIsNewOwnerOpen] = useState(false)
  const [newOwner, setNewOwner] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const getPetCount = (ownerId: string) => {
    return allDemoPets.filter(p => p.ownerId === ownerId).length
  }

  const getPets = (ownerId: string) => {
    return allDemoPets.filter(p => p.ownerId === ownerId)
  }

  const filteredOwners = demoOwners.filter(owner => 
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNewOwner = () => {
    // Mock save
    setIsNewOwnerOpen(false)
    setNewOwner({ name: '', email: '', phone: '', address: '' })
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Propietarios</h1>
          <p className="text-muted-foreground">Gestion de duenos de mascotas</p>
        </div>
        <Dialog open={isNewOwnerOpen} onOpenChange={setIsNewOwnerOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Propietario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Propietario</DialogTitle>
              <DialogDescription>
                Ingresa los datos del propietario
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input 
                  id="name" 
                  value={newOwner.name}
                  onChange={(e) => setNewOwner({...newOwner, name: e.target.value})}
                  placeholder="Nombre del propietario"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electronico</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newOwner.email}
                  onChange={(e) => setNewOwner({...newOwner, email: e.target.value})}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={newOwner.phone}
                  onChange={(e) => setNewOwner({...newOwner, phone: e.target.value})}
                  placeholder="+57 300 123 4567"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Direccion</Label>
                <Input 
                  id="address" 
                  value={newOwner.address}
                  onChange={(e) => setNewOwner({...newOwner, address: e.target.value})}
                  placeholder="Direccion del propietario"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewOwnerOpen(false)}>Cancelar</Button>
              <Button onClick={handleNewOwner}>Registrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{demoOwners.length}</p>
              <p className="text-sm text-muted-foreground">Total Propietarios</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <PawPrint className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{allDemoPets.length}</p>
              <p className="text-sm text-muted-foreground">Total Mascotas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <Calendar className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{(allDemoPets.length / demoOwners.length).toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Promedio Mascotas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Propietarios</CardTitle>
          <CardDescription>{filteredOwners.length} propietarios encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Propietario</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Mascotas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOwners.map((owner) => {
                  const pets = getPets(owner.id)
                  return (
                    <TableRow key={owner.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{owner.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{owner.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">+57 300 XXX XXXX</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {pets.length > 0 ? (
                            pets.map(pet => (
                              <Badge key={pet.id} variant="secondary" className="text-xs">
                                {pet.name}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">Sin mascotas</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/veterinario/propietarios/${owner.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
