"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Building2,
  Bell,
  Shield,
  Clock,
  Mail,
  Phone,
  MapPin,
  Save,
  Stethoscope
} from "lucide-react"
import { demoVetUser } from "@/lib/store"

export default function VetConfiguracionPage() {
  const [profile, setProfile] = useState({
    name: demoVetUser.name,
    email: demoVetUser.email,
    phone: '+57 300 456 7890',
    specialty: 'Medicina General Veterinaria',
    license: 'VET-2015-12345'
  })

  const [clinic, setClinic] = useState({
    name: 'Clinica Veterinaria del Valle',
    address: 'Calle 10 #25-30, Cali',
    phone: '+57 2 123 4567',
    email: 'contacto@clinicadelvalle.com',
    schedule: 'Lunes a Viernes 8:00 - 18:00, Sabados 8:00 - 13:00'
  })

  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    emailVaccines: true,
    pushNotifications: true,
    smsReminders: false,
    dailySummary: true
  })

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Configuracion</h1>
        <p className="text-muted-foreground">Administra tu perfil y preferencias</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="clinic" className="gap-2">
            <Building2 className="h-4 w-4" />
            Clinica
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informacion del Veterinario</CardTitle>
              <CardDescription>Actualiza tu informacion profesional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Stethoscope className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <Button variant="outline" size="sm">Cambiar Foto</Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input 
                    id="name" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electronico</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="license">Numero de Licencia</Label>
                  <Input 
                    id="license" 
                    value={profile.license}
                    onChange={(e) => setProfile({...profile, license: e.target.value})}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Input 
                    id="specialty" 
                    value={profile.specialty}
                    onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinic">
          <Card>
            <CardHeader>
              <CardTitle>Informacion de la Clinica</CardTitle>
              <CardDescription>Datos de la clinica veterinaria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                  <Building2 className="h-10 w-10 text-secondary-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm">Cambiar Logo</Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="clinicName">Nombre de la Clinica</Label>
                  <Input 
                    id="clinicName" 
                    value={clinic.name}
                    onChange={(e) => setClinic({...clinic, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="clinicAddress">Direccion</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="clinicAddress" 
                      value={clinic.address}
                      onChange={(e) => setClinic({...clinic, address: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clinicPhone">Telefono</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="clinicPhone" 
                      type="tel"
                      value={clinic.phone}
                      onChange={(e) => setClinic({...clinic, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clinicEmail">Correo</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="clinicEmail" 
                      type="email"
                      value={clinic.email}
                      onChange={(e) => setClinic({...clinic, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="clinicSchedule">Horario de Atencion</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="clinicSchedule" 
                      value={clinic.schedule}
                      onChange={(e) => setClinic({...clinic, schedule: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura como recibir alertas y recordatorios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Notificaciones de Citas</p>
                      <p className="text-sm text-muted-foreground">Recibe email cuando se agenda una cita</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.emailAppointments}
                    onCheckedChange={(v) => setNotifications({...notifications, emailAppointments: v})}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Alertas de Vacunas</p>
                      <p className="text-sm text-muted-foreground">Notificaciones de vacunas proximas a vencer</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.emailVaccines}
                    onCheckedChange={(v) => setNotifications({...notifications, emailVaccines: v})}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Bell className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Notificaciones Push</p>
                      <p className="text-sm text-muted-foreground">Recibe alertas en tu navegador</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.pushNotifications}
                    onCheckedChange={(v) => setNotifications({...notifications, pushNotifications: v})}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Phone className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Recordatorios SMS</p>
                      <p className="text-sm text-muted-foreground">Enviar SMS a propietarios</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.smsReminders}
                    onCheckedChange={(v) => setNotifications({...notifications, smsReminders: v})}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                      <Clock className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Resumen Diario</p>
                      <p className="text-sm text-muted-foreground">Email con resumen de actividad diaria</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.dailySummary}
                    onCheckedChange={(v) => setNotifications({...notifications, dailySummary: v})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:max-w-md">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Contrasena Actual</Label>
                  <Input 
                    id="currentPassword" 
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">Nueva Contrasena</Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Nueva Contrasena</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="mb-2 font-medium text-foreground">Requisitos de contrasena:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Minimo 8 caracteres</li>
                  <li>Al menos una letra mayuscula</li>
                  <li>Al menos un numero</li>
                  <li>Al menos un caracter especial</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Shield className="mr-2 h-4 w-4" />
                  {isSaving ? 'Guardando...' : 'Actualizar Contrasena'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
