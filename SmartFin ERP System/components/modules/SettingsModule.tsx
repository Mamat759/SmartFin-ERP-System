import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Settings, 
  Users, 
  Database, 
  Shield, 
  Bell,
  Palette,
  Upload,
  Download
} from 'lucide-react';

export const SettingsModule: React.FC = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Настройки системы</h1>
          <p className="text-muted-foreground">Конфигурация SmartFin ERP</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="database">База данных</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="backup">Резервная копия</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-5 h-5" />
                <h3 className="font-semibold">Основные настройки</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Название организации</Label>
                  <Input id="company-name" defaultValue="ООО &quot;СмартФин&quot;" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inn">ИНН</Label>
                  <Input id="inn" defaultValue="1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kpp">КПП</Label>
                  <Input id="kpp" defaultValue="123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input id="address" defaultValue="г. Москва, ул. Примерная, д. 1" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-5 h-5" />
                <h3 className="font-semibold">Интерфейс</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Темная тема</Label>
                    <p className="text-sm text-muted-foreground">
                      Использовать темное оформление
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Компактный режим</Label>
                    <p className="text-sm text-muted-foreground">
                      Уменьшенные отступы и размеры
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Анимации</Label>
                    <p className="text-sm text-muted-foreground">
                      Плавные переходы и анимации
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5" />
                <h3 className="font-semibold">Управление пользователями</h3>
              </div>
              <Button>
                Добавить пользователя
              </Button>
            </div>
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Пользователи и роли</h3>
              <p className="text-muted-foreground mb-4">
                Настройка пользователей, ролей и прав доступа
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-5 h-5" />
              <h3 className="font-semibold">Настройки базы данных</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Тип базы данных</Label>
                  <div className="p-3 bg-muted rounded border">
                    SQLite (локальная)
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Размер базы</Label>
                  <div className="p-3 bg-muted rounded border">
                    45.2 МБ
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Путь к базе данных</Label>
                <Input defaultValue="/data/smartfin.db" readOnly />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  Проверить подключение
                </Button>
                <Button variant="outline">
                  Оптимизировать базу
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5" />
              <h3 className="font-semibold">Безопасность</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Двухфакторная аутентификация</Label>
                  <p className="text-sm text-muted-foreground">
                    Дополнительная защита учетных записей
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Аудит действий пользователей</Label>
                  <p className="text-sm text-muted-foreground">
                    Журнал всех действий в системе
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Автоблокировка</Label>
                  <p className="text-sm text-muted-foreground">
                    Блокировка после 5 неудачных попыток входа
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-5 h-5" />
              <h3 className="font-semibold">Уведомления</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Отправка важных уведомлений на email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Уведомления о задолженности</Label>
                  <p className="text-sm text-muted-foreground">
                    Напоминания о просроченных платежах
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Уведомления о низких остатках</Label>
                  <p className="text-sm text-muted-foreground">
                    Предупреждения о заканчивающихся товарах
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-5 h-5" />
              <h3 className="font-semibold">Резервное копирование</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Автоматическое резервное копирование</Label>
                  <p className="text-sm text-muted-foreground">
                    Ежедневное создание резервных копий
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Последняя резервная копия</Label>
                <div className="p-3 bg-muted rounded border">
                  18.07.2025 в 03:00 (успешно)
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Создать копию
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Восстановить
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};