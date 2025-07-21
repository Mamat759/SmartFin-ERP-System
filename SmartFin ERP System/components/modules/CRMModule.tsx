import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { useData } from '../DataProvider';
import { 
  Plus, 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  TrendingUp,
  Search,
  Filter,
  Edit,
  Trash,
  Save,
  X,
  UserPlus,
  Target
} from 'lucide-react';

const orders = [
  { id: 1, number: 'З-001245', client: 'ООО "Альфа Технологии"', date: '15.07.2025', amount: 450000, status: 'Выполнен', manager: 'Смирнов А.А.' },
  { id: 2, number: 'З-001244', client: 'ИП Петров С.С.', date: '10.07.2025', amount: 125000, status: 'В работе', manager: 'Кузнецова О.В.' },
  { id: 3, number: 'З-001243', client: 'ООО "БетаСофт"', date: '08.07.2025', amount: 200000, status: 'Новый', manager: 'Попов В.И.' },
];

export const CRMModule: React.FC = () => {
  const { clients, addClient, deleteClient, deals, addDeal } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [isAddDealDialogOpen, setIsAddDealDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    status: 'Новый',
    lastOrder: new Date().toLocaleDateString('ru-RU'),
    total: 0
  });
  const [newDeal, setNewDeal] = useState({
    client: '',
    title: '',
    amount: 0,
    stage: 'Предложение',
    probability: 50,
    manager: '',
    deadline: ''
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.contact || !newClient.email) {
      toast.error('Заполните все обязательные по��я');
      return;
    }

    addClient(newClient);
    setNewClient({
      name: '',
      contact: '',
      phone: '',
      email: '',
      status: 'Новый',
      lastOrder: new Date().toLocaleDateString('ru-RU'),
      total: 0
    });
    setIsAddClientDialogOpen(false);
    toast.success('Клиент успешно добавлен');
  };

  const handleAddDeal = () => {
    if (!newDeal.client || !newDeal.title || newDeal.amount <= 0) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    addDeal(newDeal);
    setNewDeal({
      client: '',
      title: '',
      amount: 0,
      stage: 'Предложение',
      probability: 50,
      manager: '',
      deadline: ''
    });
    setIsAddDealDialogOpen(false);
    toast.success('Сделка успешно создана');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активный': return 'default';
      case 'Новый': return 'secondary';
      case 'В работе': return 'outline';
      default: return 'secondary';
    }
  };

  const totalClientsValue = clients.reduce((sum, client) => sum + client.total, 0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-gradient-to-br from-background via-background to-orange-50/20 dark:to-orange-950/10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            CRM и продажи
          </h1>
          <p className="text-muted-foreground mt-1">Управление клиентами, сделками и продажами</p>
        </div>
        <div className="flex space-x-3">
          <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Новый клиент
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Добавить нового клиента
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="client-name">Название организации</Label>
                  <Input
                    id="client-name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    placeholder="ООО 'Название'"
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Контактное лицо</Label>
                  <Input
                    id="contact"
                    value={newClient.contact}
                    onChange={(e) => setNewClient({...newClient, contact: e.target.value})}
                    placeholder="Фамилия И.О."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                      placeholder="+7 900 000-00-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Статус</Label>
                  <Select value={newClient.status} onValueChange={(value) => setNewClient({...newClient, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Новый">Новый</SelectItem>
                      <SelectItem value="В работе">В работе</SelectItem>
                      <SelectItem value="Активный">Активный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddClient} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddClientDialogOpen(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDealDialogOpen} onOpenChange={setIsAddDealDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="shadow-lg">
                  <Target className="w-4 h-4 mr-2" />
                  Создать сделку
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Создать новую сделку
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deal-client">Клиент</Label>
                  <Select value={newDeal.client} onValueChange={(value) => setNewDeal({...newDeal, client: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите клиента" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deal-title">Название сделки</Label>
                  <Input
                    id="deal-title"
                    value={newDeal.title}
                    onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                    placeholder="Поставка оборудования"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Сумма</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newDeal.amount}
                      onChange={(e) => setNewDeal({...newDeal, amount: Number(e.target.value)})}
                      placeholder="100000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="probability">Вероятность (%)</Label>
                    <Input
                      id="probability"
                      type="number"
                      min="0"
                      max="100"
                      value={newDeal.probability}
                      onChange={(e) => setNewDeal({...newDeal, probability: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="manager">Менеджер</Label>
                    <Input
                      id="manager"
                      value={newDeal.manager}
                      onChange={(e) => setNewDeal({...newDeal, manager: e.target.value})}
                      placeholder="Иванов И.И."
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Срок</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newDeal.deadline}
                      onChange={(e) => setNewDeal({...newDeal, deadline: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddDeal} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Создать
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDealDialogOpen(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { title: 'Всего клиентов', value: clients.length.toString(), icon: Users, color: 'from-blue-500 to-cyan-500' },
          { title: 'Активные сделки', value: deals.length.toString(), icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
          { title: 'Продаж за месяц', value: `${totalClientsValue.toLocaleString()} ₽`, icon: FileText, color: 'from-purple-500 to-violet-500' },
          { title: 'Конверсия', value: '68%', icon: Calendar, color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-4 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="clients" className="space-y-4">
          <TabsList className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="deals">Сделки</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">База клиентов</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Поиск клиентов..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-white/50 dark:bg-gray-800/50"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableHead>Клиент</TableHead>
                      <TableHead>Контактное лицо</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Последний заказ</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead className="w-24">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredClients.map((client) => (
                        <motion.tr
                          key={client.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <motion.div whileHover={{ scale: 1.1 }}>
                                <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500">
                                  <AvatarFallback className="text-white">
                                    {client.name.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>
                              <div>
                                <p className="font-medium">{client.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{client.contact}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                              {client.phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                              {client.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(client.status)}>
                              {client.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{client.lastOrder}</TableCell>
                          <TableCell className="font-medium">{client.total.toLocaleString()} ₽</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    deleteClient(client.id);
                                    toast.success('Клиент удален');
                                  }}
                                >
                                  <Trash className="w-3 h-3" />
                                </Button>
                              </motion.div>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deals">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Воронка продаж</h3>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => setIsAddDealDialogOpen(true)} className="bg-gradient-to-r from-blue-500 to-purple-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Новая сделка
                  </Button>
                </motion.div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableHead>Клиент</TableHead>
                      <TableHead>Сделка</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Этап</TableHead>
                      <TableHead>Вероятность</TableHead>
                      <TableHead>Менеджер</TableHead>
                      <TableHead>Срок</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {deals.map((deal) => (
                        <motion.tr
                          key={deal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                        >
                          <TableCell className="font-medium">{deal.client}</TableCell>
                          <TableCell>{deal.title}</TableCell>
                          <TableCell className="font-medium">{deal.amount.toLocaleString()} ₽</TableCell>
                          <TableCell>
                            <Badge variant="outline">{deal.stage}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-12 bg-muted rounded-full h-2">
                                <motion.div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${deal.probability}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                              <span className="text-sm">{deal.probability}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{deal.manager}</TableCell>
                          <TableCell>{deal.deadline}</TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Заказы клиентов</h3>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Новый заказ
                  </Button>
                </motion.div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableHead>Номер</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Менеджер</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                      >
                        <TableCell className="font-medium">{order.number}</TableCell>
                        <TableCell>{order.client}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="font-medium">{order.amount.toLocaleString()} ₽</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'Выполнен' ? 'default' : order.status === 'В работе' ? 'secondary' : 'outline'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.manager}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                </motion.div>
                <h3 className="font-semibold mb-2">Аналитика продаж</h3>
                <p className="text-muted-foreground mb-4">
                  Графики, диаграммы, план-факт анализ
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Построить отчет
                  </Button>
                </motion.div>
              </motion.div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
