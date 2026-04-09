"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Dog, Cat, PawPrint } from "lucide-react"

export default function NuevaMascotaPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    weight: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to pets list
    router.push('/dashboard/mascotas')
  }

  const speciesIcons = {
    perro: Dog,
    gato: Cat,
    otro: PawPrint
  }

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      {/* Back Button */}
      <Link href="/dashboard/mascotas" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a mis mascotas
      </Link>

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registrar Nueva Mascota</CardTitle>
            <p className="text-muted-foreground">
              Ingresa los datos de tu mascota para comenzar a gestionar su historial sanitario.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Species Selection */}
              <div className="space-y-3">
                <Label>Tipo de mascota</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['perro', 'gato', 'otro'] as const).map((species) => {
                    const Icon = speciesIcons[species]
                    const isSelected = formData.species === species
                    
                    return (
                      <button
                        key={species}
                        type="button"
                        onClick={() => setFormData({ ...formData, species })}
                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`h-8 w-8 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-medium capitalize ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {species}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la mascota</Label>
                <Input
                  id="name"
                  placeholder="Ej: Max, Luna, Rocky..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Breed */}
              <div className="space-y-2">
                <Label htmlFor="breed">Raza</Label>
                {formData.species === 'perro' ? (
                  <Select
                    value={formData.breed}
                    onValueChange={(value) => setFormData({ ...formData, breed: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una raza" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Golden Retriever">Golden Retriever</SelectItem>
                      <SelectItem value="Labrador">Labrador</SelectItem>
                      <SelectItem value="Pastor Aleman">Pastor Aleman</SelectItem>
                      <SelectItem value="Bulldog Frances">Bulldog Frances</SelectItem>
                      <SelectItem value="Poodle">Poodle</SelectItem>
                      <SelectItem value="Beagle">Beagle</SelectItem>
                      <SelectItem value="Chihuahua">Chihuahua</SelectItem>
                      <SelectItem value="Yorkshire Terrier">Yorkshire Terrier</SelectItem>
                      <SelectItem value="Schnauzer">Schnauzer</SelectItem>
                      <SelectItem value="Mestizo">Mestizo</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                ) : formData.species === 'gato' ? (
                  <Select
                    value={formData.breed}
                    onValueChange={(value) => setFormData({ ...formData, breed: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una raza" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Siames">Siames</SelectItem>
                      <SelectItem value="Persa">Persa</SelectItem>
                      <SelectItem value="Maine Coon">Maine Coon</SelectItem>
                      <SelectItem value="Angora">Angora</SelectItem>
                      <SelectItem value="Bengala">Bengala</SelectItem>
                      <SelectItem value="British Shorthair">British Shorthair</SelectItem>
                      <SelectItem value="Ragdoll">Ragdoll</SelectItem>
                      <SelectItem value="Mestizo">Mestizo</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="breed"
                    placeholder="Ingresa la raza"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    required
                  />
                )}
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Si no conoces la fecha exacta, ingresa una aproximada.
                </p>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg) - Opcional</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Ej: 12.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                <Link href="/dashboard/mascotas">
                  <Button type="button" variant="outline" className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={isSubmitting || !formData.name || !formData.species || !formData.breed || !formData.birthDate}
                >
                  {isSubmitting ? 'Guardando...' : 'Registrar Mascota'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
