"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  User,
  Bell,
  Shield,
  Mail,
  Save
} from "lucide-react"
import { demoUser } from "@/lib/store"

export default function ConfiguracionPage() {
  const [userData, setUserData] = useState({
    name: demoUser.name,
    email: demoUser.email
  })
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekBefore: true,
    dayBefore: true,
    sameDay: true
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-4 pt-16 md:p-8 md:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Configuracion
        </h1>
        <p className="mt-1 text-muted-foreground">
          Gestiona tu cuenta y preferencias de notificaciones
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informacion Personal
            </CardTitle>
            <CardDescription>
              Actualiza tus datos de contacto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configura como quieres recibir los recordatorios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">Canales de notificacion</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email-notif" className="text-sm font-medium">
                      Correo electronico
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Recibe recordatorios por email
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notif"
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="push-notif" className="text-sm font-medium">
                      Notificaciones push
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Recibe alertas en tu dispositivo
                    </p>
                  </div>
                </div>
                <Switch
                  id="push-notif"
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="mb-4 text-sm font-medium text-foreground">Frecuencia de recordatorios</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="week-before" className="text-sm font-medium">
                      Una semana antes
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Recordatorio 7 dias antes de la cita
                    </p>
                  </div>
                  <Switch
                    id="week-before"
                    checked={notifications.weekBefore}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weekBefore: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="day-before" className="text-sm font-medium">
                      Un dia antes
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Recordatorio 24 horas antes
                    </p>
                  </div>
                  <Switch
                    id="day-before"
                    checked={notifications.dayBefore}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, dayBefore: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="same-day" className="text-sm font-medium">
                      El mismo dia
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Recordatorio el dia de la cita
                    </p>
                  </div>
                  <Switch
                    id="same-day"
                    checked={notifications.sameDay}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, sameDay: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Seguridad
            </CardTitle>
            <CardDescription>
              Gestiona la seguridad de tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Contrasena actual</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva contrasena</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar nueva contrasena</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="********"
              />
            </div>
            <Button variant="outline" className="mt-2">
              Cambiar Contrasena
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  )
}
