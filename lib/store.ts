// Types for the pet vaccination app
export interface User {
  id: string
  email: string
  name: string
  role: 'owner' | 'vet'
}

export interface Pet {
  id: string
  ownerId: string
  name: string
  species: 'perro' | 'gato' | 'otro'
  breed: string
  birthDate: string
  weight?: number
  photo?: string
  createdAt: string
}

export interface Vaccine {
  id: string
  petId: string
  name: string
  date: string
  nextDate?: string
  vetName?: string
  vetClinic?: string
  batch?: string
  notes?: string
}

export interface Deworming {
  id: string
  petId: string
  product: string
  date: string
  nextDate?: string
  weight?: number
  notes?: string
}

export interface Appointment {
  id: string
  petId: string
  date: string
  time: string
  type: string
  status: 'programada' | 'completada' | 'cancelada'
  notes?: string
}

export interface Reminder {
  id: string
  petId: string
  type: 'vaccine' | 'deworming' | 'appointment'
  title: string
  date: string
  completed: boolean
  relatedId?: string
}

// Demo data for the application
export const demoUser: User = {
  id: '1',
  email: 'usuario@ejemplo.com',
  name: 'Maria Garcia',
  role: 'owner'
}

export const demoVetUser: User = {
  id: '2',
  email: 'veterinario@ejemplo.com',
  name: 'Dr. Carlos Rodriguez',
  role: 'vet'
}

// All demo users for login
export const demoUsers: User[] = [demoUser, demoVetUser]

// Additional owners for vet view
export const demoOwners: User[] = [
  demoUser,
  { id: '3', email: 'juan.perez@ejemplo.com', name: 'Juan Perez', role: 'owner' },
  { id: '4', email: 'ana.lopez@ejemplo.com', name: 'Ana Lopez', role: 'owner' },
  { id: '5', email: 'carlos.ruiz@ejemplo.com', name: 'Carlos Ruiz', role: 'owner' },
  { id: '6', email: 'sofia.martinez@ejemplo.com', name: 'Sofia Martinez', role: 'owner' },
  { id: '7', email: 'pedro.sanchez@ejemplo.com', name: 'Pedro Sanchez', role: 'owner' },
]

export const demoPets: Pet[] = [
  {
    id: '1',
    ownerId: '1',
    name: 'Max',
    species: 'perro',
    breed: 'Golden Retriever',
    birthDate: '2022-03-15',
    weight: 28,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    ownerId: '1',
    name: 'Luna',
    species: 'gato',
    breed: 'Siames',
    birthDate: '2023-06-20',
    weight: 4.5,
    createdAt: '2024-02-05'
  }
]

export const demoVaccines: Vaccine[] = [
  {
    id: '1',
    petId: '1',
    name: 'Rabia',
    date: '2026-01-15',
    nextDate: '2027-01-15',
    vetName: 'Dr. Carlos Rodriguez',
    vetClinic: 'Clinica Veterinaria del Valle',
    batch: 'RAB-2026-001'
  },
  {
    id: '2',
    petId: '1',
    name: 'Parvovirus',
    date: '2026-02-22',
    nextDate: '2027-02-22',
    vetName: 'Dr. Carlos Rodriguez',
    vetClinic: 'Clinica Veterinaria del Valle',
    batch: 'PAR-2026-045'
  },
  {
    id: '3',
    petId: '1',
    name: 'Moquillo',
    date: '2025-11-10',
    nextDate: '2026-11-10',
    vetName: 'Dra. Ana Martinez',
    vetClinic: 'PetCare Cali'
  },
  {
    id: '4',
    petId: '2',
    name: 'Triple Felina',
    date: '2026-01-08',
    nextDate: '2027-01-08',
    vetName: 'Dra. Laura Gomez',
    vetClinic: 'Clinica Felina Express'
  },
  {
    id: '5',
    petId: '2',
    name: 'Rabia',
    date: '2025-12-15',
    nextDate: '2026-12-15',
    vetName: 'Dra. Laura Gomez',
    vetClinic: 'Clinica Felina Express'
  }
]

export const demoDewormings: Deworming[] = [
  {
    id: '1',
    petId: '1',
    product: 'Drontal Plus',
    date: '2026-02-01',
    nextDate: '2026-05-01',
    weight: 28
  },
  {
    id: '2',
    petId: '1',
    product: 'Frontline Plus',
    date: '2026-03-01',
    nextDate: '2026-04-01',
    notes: 'Aplicacion externa - pulgas y garrapatas'
  },
  {
    id: '3',
    petId: '2',
    product: 'Revolution',
    date: '2026-02-15',
    nextDate: '2026-03-15',
    weight: 4.5
  }
]

// All pets across all owners (for vet view)
export const allDemoPets: Pet[] = [
  ...demoPets,
  {
    id: '3',
    ownerId: '3',
    name: 'Rocky',
    species: 'perro',
    breed: 'Bulldog Frances',
    birthDate: '2021-08-10',
    weight: 12,
    createdAt: '2024-03-15'
  },
  {
    id: '4',
    ownerId: '4',
    name: 'Mia',
    species: 'gato',
    breed: 'Persa',
    birthDate: '2023-01-05',
    weight: 3.8,
    createdAt: '2024-04-20'
  },
  {
    id: '5',
    ownerId: '5',
    name: 'Thor',
    species: 'perro',
    breed: 'Pastor Aleman',
    birthDate: '2020-11-22',
    weight: 35,
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    ownerId: '6',
    name: 'Cleo',
    species: 'gato',
    breed: 'Maine Coon',
    birthDate: '2022-07-14',
    weight: 6.2,
    createdAt: '2024-05-10'
  },
  {
    id: '7',
    ownerId: '7',
    name: 'Bruno',
    species: 'perro',
    breed: 'Labrador',
    birthDate: '2023-04-30',
    weight: 25,
    createdAt: '2024-06-01'
  },
]

// All vaccines across all pets (for vet view)
export const allDemoVaccines: Vaccine[] = [
  ...demoVaccines,
  {
    id: '6',
    petId: '3',
    name: 'Rabia',
    date: '2026-02-10',
    nextDate: '2027-02-10',
    vetName: 'Dr. Carlos Rodriguez',
    vetClinic: 'Clinica Veterinaria del Valle',
    batch: 'RAB-2026-012'
  },
  {
    id: '7',
    petId: '4',
    name: 'Triple Felina',
    date: '2026-03-05',
    nextDate: '2027-03-05',
    vetName: 'Dr. Carlos Rodriguez',
    vetClinic: 'Clinica Veterinaria del Valle'
  },
  {
    id: '8',
    petId: '5',
    name: 'Parvovirus',
    date: '2026-01-20',
    nextDate: '2027-01-20',
    vetName: 'Dr. Carlos Rodriguez',
    vetClinic: 'Clinica Veterinaria del Valle',
    batch: 'PAR-2026-078'
  },
  {
    id: '9',
    petId: '6',
    name: 'Rabia',
    date: '2026-03-18',
    nextDate: '2027-03-18',
    vetName: 'Dr. Carlos Rodriguez',
    vetClinic: 'Clinica Veterinaria del Valle'
  },
  {
    id: '10',
    petId: '7',
    name: 'Rabia',
    date: '2026-02-28',
    nextDate: '2027-02-28',
    vetName: 'Dr. Carlos Rodriguez',
    vetClinic: 'Clinica Veterinaria del Valle',
    batch: 'RAB-2026-034'
  },
]

// Demo appointments (for vet agenda view)
export const demoAppointments: Appointment[] = [
  {
    id: '1',
    petId: '1',
    date: '2026-04-09',
    time: '09:00',
    type: 'vacunacion',
    status: 'programada',
    notes: 'Refuerzo anual de rabia'
  },
  {
    id: '2',
    petId: '3',
    date: '2026-04-09',
    time: '10:30',
    type: 'consulta',
    status: 'programada',
    notes: 'Control de peso'
  },
  {
    id: '3',
    petId: '4',
    date: '2026-04-09',
    time: '11:00',
    type: 'desparasitacion',
    status: 'completada'
  },
  {
    id: '4',
    petId: '2',
    date: '2026-04-10',
    time: '09:30',
    type: 'vacunacion',
    status: 'programada',
    notes: 'Triple felina'
  },
  {
    id: '5',
    petId: '5',
    date: '2026-04-10',
    time: '14:00',
    type: 'cirugia',
    status: 'programada',
    notes: 'Esterilizacion'
  },
  {
    id: '6',
    petId: '6',
    date: '2026-04-11',
    time: '10:00',
    type: 'consulta',
    status: 'programada'
  },
  {
    id: '7',
    petId: '7',
    date: '2026-04-11',
    time: '16:00',
    type: 'vacunacion',
    status: 'programada',
    notes: 'Primera dosis parvovirus'
  },
  {
    id: '8',
    petId: '1',
    date: '2026-04-07',
    time: '09:00',
    type: 'consulta',
    status: 'completada',
    notes: 'Revision general'
  },
  {
    id: '9',
    petId: '3',
    date: '2026-04-06',
    time: '11:00',
    type: 'vacunacion',
    status: 'cancelada',
    notes: 'Propietario cancelo'
  },
]

export const demoReminders: Reminder[] = [
  {
    id: '1',
    petId: '1',
    type: 'deworming',
    title: 'Desparasitacion de Max',
    date: '2026-04-01',
    completed: false,
    relatedId: '2'
  },
  {
    id: '2',
    petId: '2',
    type: 'deworming',
    title: 'Desparasitacion de Luna',
    date: '2026-03-15',
    completed: false,
    relatedId: '3'
  },
  {
    id: '3',
    petId: '1',
    type: 'vaccine',
    title: 'Vacuna Moquillo - Max',
    date: '2026-11-10',
    completed: false,
    relatedId: '3'
  }
]

// Helper functions
const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} de ${month} de ${year}`
}

export function calculateAge(birthDate: string): string {
  const birth = new Date(birthDate)
  const today = new Date()
  const years = today.getFullYear() - birth.getFullYear()
  const months = today.getMonth() - birth.getMonth()
  
  if (years === 0) {
    return `${months} meses`
  } else if (months < 0) {
    return `${years - 1} años, ${12 + months} meses`
  }
  return `${years} años`
}

export function getDaysUntil(dateString: string): number {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getUpcomingReminders(reminders: Reminder[], days: number = 30): Reminder[] {
  const today = new Date()
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
  
  return reminders
    .filter(r => {
      const reminderDate = new Date(r.date)
      return !r.completed && reminderDate >= today && reminderDate <= futureDate
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
