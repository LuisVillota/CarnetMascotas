"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Dog, 
  Cat, 
  ArrowLeft, 
  Syringe, 
  Pill, 
  Plus, 
  Calendar,
  Building2,
  User,
  FileText,
  Download,
  Share2
} from "lucide-react"
import { 
  demoPets, 
  demoVaccines, 
  demoDewormings, 
  calculateAge, 
  formatDate 
} from "@/lib/store"

export default function PetProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const pet = demoPets.find(p => p.id === id)
  const vaccines = demoVaccines.filter(v => v.petId === id)
  const dewormings = demoDewormings.filter(d => d.petId === id)

  if (!pet) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Mascota no encontrada</h1>
          <p className="mt-2 text-muted-foreground">No pudimos encontrar la mascota que buscas.</p>
          <Link href="/dashboard/mascotas">
            <Button className="mt-4">Volver a mis mascotas</Button>
          </Link>
        </div>
      </div>
    )
  }

  const Icon = pet.species === 'perro' ? Dog : Cat

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      {/* Back Button */}
      <Link href="/dashboard/mascotas" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a mis mascotas
      </Link>

      {/* Pet Header Card */}
      <Card className="mb-6 overflow-hidden">
        <div className="bg-primary p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20 sm:h-24 sm:w-24">
                <Icon className="h-10 w-10 text-primary-foreground sm:h-12 sm:w-12" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground sm:text-3xl">{pet.name}</h1>
                <p className="text-primary-foreground/80">{pet.breed}</p>
                <div className="mt-2 inline-flex rounded-full bg-primary-foreground/20 px-3 py-1">
                  <span className="text-sm font-medium text-primary-foreground">
                    {vaccines.length} vacunas registradas
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Edad</p>
              <p className="text-lg font-semibold text-foreground">{calculateAge(pet.birthDate)}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Fecha de nacimiento</p>
              <p className="text-lg font-semibold text-foreground">{formatDate(pet.birthDate)}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Peso</p>
              <p className="text-lg font-semibold text-foreground">{pet.weight ? `${pet.weight} kg` : 'No registrado'}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Especie</p>
              <p className="text-lg font-semibold capitalize text-foreground">{pet.species}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Vaccines and Dewormings */}
      <Tabs defaultValue="vacunas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-none">
          <TabsTrigger value="vacunas" className="gap-2">
            <Syringe className="h-4 w-4" />
            Vacunas ({vaccines.length})
          </TabsTrigger>
          <TabsTrigger value="desparasitaciones" className="gap-2">
            <Pill className="h-4 w-4" />
            Desparasitaciones ({dewormings.length})
          </TabsTrigger>
        </TabsList>

        {/* Vaccines Tab */}
        <TabsContent value="vacunas" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Historial de Vacunas</h2>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Vacuna
            </Button>
          </div>

          {vaccines.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Syringe className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Sin vacunas registradas</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Agrega la primera vacuna de {pet.name}
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Vacuna
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {vaccines.map((vaccine) => {
                const isUpToDate = !vaccine.nextDate || new Date(vaccine.nextDate) > new Date()
                
                return (
                  <Card key={vaccine.id}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                            isUpToDate ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <Syringe className={`h-6 w-6 ${isUpToDate ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{vaccine.name}</h3>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                isUpToDate 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {isUpToDate ? 'Vigente' : 'Vencida'}
                              </span>
                            </div>
                            
                            <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Aplicada: {formatDate(vaccine.date)}</span>
                              </div>
                              {vaccine.nextDate && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>Proxima: {formatDate(vaccine.nextDate)}</span>
                                </div>
                              )}
                              {vaccine.vetName && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <User className="h-4 w-4" />
                                  <span>{vaccine.vetName}</span>
                                </div>
                              )}
                              {vaccine.vetClinic && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Building2 className="h-4 w-4" />
                                  <span>{vaccine.vetClinic}</span>
                                </div>
                              )}
                              {vaccine.batch && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <FileText className="h-4 w-4" />
                                  <span>Lote: {vaccine.batch}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Dewormings Tab */}
        <TabsContent value="desparasitaciones" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Historial de Desparasitaciones</h2>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Desparasitacion
            </Button>
          </div>

          {dewormings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Pill className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Sin desparasitaciones registradas</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Agrega la primera desparasitacion de {pet.name}
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Desparasitacion
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {dewormings.map((deworming) => {
                const isUpToDate = !deworming.nextDate || new Date(deworming.nextDate) > new Date()
                
                return (
                  <Card key={deworming.id}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                            isUpToDate ? 'bg-primary/10' : 'bg-accent/20'
                          }`}>
                            <Pill className={`h-6 w-6 ${isUpToDate ? 'text-primary' : 'text-accent-foreground'}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{deworming.product}</h3>
                              {!isUpToDate && (
                                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-foreground">
                                  Proxima dosis pendiente
                                </span>
                              )}
                            </div>
                            
                            <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Aplicada: {formatDate(deworming.date)}</span>
                              </div>
                              {deworming.nextDate && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>Proxima: {formatDate(deworming.nextDate)}</span>
                                </div>
                              )}
                              {deworming.weight && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <span>Peso al aplicar: {deworming.weight} kg</span>
                                </div>
                              )}
                            </div>
                            
                            {deworming.notes && (
                              <p className="mt-2 text-sm text-muted-foreground">
                                {deworming.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
