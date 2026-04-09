"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dog, Cat, Plus, ChevronRight, Calendar, Syringe } from "lucide-react"
import { demoPets, demoVaccines, demoDewormings, calculateAge, formatDate } from "@/lib/store"

export default function MascotasPage() {
  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Mis Mascotas
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gestiona la informacion de tus mascotas
          </p>
        </div>
        <Link href="/dashboard/mascotas/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Mascota
          </Button>
        </Link>
      </div>

      {/* Pets Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demoPets.map((pet) => {
          const petVaccines = demoVaccines.filter(v => v.petId === pet.id)
          const petDewormings = demoDewormings.filter(d => d.petId === pet.id)
          const Icon = pet.species === 'perro' ? Dog : Cat
          
          // Find next vaccine date
          const nextVaccine = petVaccines
            .filter(v => v.nextDate && new Date(v.nextDate) > new Date())
            .sort((a, b) => new Date(a.nextDate!).getTime() - new Date(b.nextDate!).getTime())[0]
          
          return (
            <Card key={pet.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="bg-primary p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-foreground">{pet.name}</h2>
                    <p className="text-sm text-primary-foreground/80">{pet.breed}</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Edad:</span>
                    <span className="font-medium text-foreground">{calculateAge(pet.birthDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Peso:</span>
                    <span className="font-medium text-foreground">{pet.weight ? `${pet.weight} kg` : 'No registrado'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Especie:</span>
                    <span className="font-medium capitalize text-foreground">{pet.species}</span>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-secondary p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Syringe className="h-4 w-4 text-primary" />
                      <span className="text-lg font-bold text-foreground">{petVaccines.length}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Vacunas</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-lg font-bold text-foreground">{petDewormings.length}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Desparasitaciones</p>
                  </div>
                </div>

                {nextVaccine && (
                  <div className="mb-4 rounded-lg border border-accent/50 bg-accent/10 p-3">
                    <p className="text-xs font-medium text-accent-foreground">Proxima vacuna</p>
                    <p className="text-sm text-foreground">{nextVaccine.name} - {formatDate(nextVaccine.nextDate!)}</p>
                  </div>
                )}

                <Link href={`/dashboard/mascotas/${pet.id}`}>
                  <Button variant="outline" className="w-full">
                    Ver Perfil Completo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}

        {/* Add New Pet Card */}
        <Link href="/dashboard/mascotas/nueva">
          <Card className="flex h-full min-h-[300px] cursor-pointer items-center justify-center border-2 border-dashed border-border transition-colors hover:border-primary hover:bg-muted/50">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Agregar Mascota</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Registra una nueva mascota en tu cuenta
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
