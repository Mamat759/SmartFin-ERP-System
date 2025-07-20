import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import { useData } from '../DataProvider';
import { 
  Plus, 
  Search, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  RotateCcw,
  FileText,
  Printer,
  Edit,
  Trash,
  Save,
  X
} from 'lucide-react';

const movements = [
  { id: 1, type: 'Приход', document: 'ПН-001245', date: '18.07.2025', product: 'Системный блок HP ProDesk', quantity: 10, status: 'Проведен' },
  { id: 2, type: 'Расход', document: 'РН-000876', date: '17.07.2025', product: 'Монитор Dell 24"', quantity: -5, status: 'Проведен' },
  { id: 3, type: 'Перемещение', document: 'ПМ-000432', date: '16.07.2025', product: 'Клавиатура Logitech', quantity: 20, status: 'В обработке' },
];

export const WarehouseModule: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    quantity: 0,
    unit: 'шт',
    price: 0,
    total: 0
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku || newProduct.price <= 0) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    const total = newProduct.quantity * newProduct.price;
    addProduct({ ...newProduct, total });
    
    setNewProduct({ name: '', sku: '', quantity: 0, unit: 'шт', price: 0, total: 0 });
    setIsAddDialogOpen(false);
    toast.success('Товар успешно добавлен');
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
    toast.success('Товар удален');
  };

  const totalValue = products.reduce((sum, product) => sum + product.total, 0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-gradient-to-br from-background via-background to-green-50/20 dark:to-green-950/10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Управление складом
          </h1>
          <p className="text-muted-foreground mt-1">Учет товаров, движение, инвентаризация</p>
        </div>
        <div className="flex space-x-3">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить товар
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-500" />
                  Добавить новый товар
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Наименование</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Введите название товара"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">Артикул</Label>
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      placeholder="SKU"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Единица</Label>
                    <Input
                      id="unit"
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      placeholder="шт"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Количество</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Цена</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddProduct} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="shadow-lg">
              <FileText className="w-4 h-4 mr-2" />
              Создать документ
            </Button>
          </motion.div>
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
          { title: 'Общая стоимость', value: `${totalValue.toLocaleString()} ₽`, icon: Package, color: 'from-green-500 to-emerald-500' },
          { title: 'Позиций товаров', value: products.length.toString(), icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
          { title: 'Движений за день', value: '18', icon: RotateCcw, color: 'from-purple-500 to-violet-500' },
          { title: 'Требует внимания', value: '3', icon: TrendingDown, color: 'from-red-500 to-pink-500' }
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
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="movements">Движения</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
            <TabsTrigger value="inventory">Инвентаризация</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Товары на складе</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Поиск товаров..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-white/50 dark:bg-gray-800/50"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="icon" className="bg-white/50 dark:bg-gray-800/50">
                      <Printer className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableHead>Наименование</TableHead>
                      <TableHead>Артикул</TableHead>
                      <TableHead>Количество</TableHead>
                      <TableHead>Ед. изм.</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead className="w-24">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredProducts.map((product) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                        >
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.unit}</TableCell>
                          <TableCell>{product.price.toLocaleString()} ₽</TableCell>
                          <TableCell className="font-medium">{product.total.toLocaleString()} ₽</TableCell>
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
                                  onClick={() => handleDeleteProduct(product.id)}
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

          <TabsContent value="movements">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Движения товаров</h3>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Новое движение
                  </Button>
                </motion.div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableHead>Тип</TableHead>
                      <TableHead>Документ</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Товар</TableHead>
                      <TableHead>Количество</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movements.map((movement) => (
                      <motion.tr
                        key={movement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                      >
                        <TableCell>
                          <Badge variant={movement.type === 'Приход' ? 'default' : movement.type === 'Расход' ? 'destructive' : 'secondary'}>
                            {movement.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{movement.document}</TableCell>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>{movement.product}</TableCell>
                        <TableCell>{movement.quantity > 0 ? '+' : ''}{movement.quantity}</TableCell>
                        <TableCell>
                          <Badge variant={movement.status === 'Проведен' ? 'default' : 'secondary'}>
                            {movement.status}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
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
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                </motion.div>
                <h3 className="font-semibold mb-2">Документы склада</h3>
                <p className="text-muted-foreground mb-4">
                  Здесь будут отображаться накладные, акты, ТОРГ-12 и другие документы
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать документ
                  </Button>
                </motion.div>
              </motion.div>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-xl">
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  <RotateCcw className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                </motion.div>
                <h3 className="font-semibold mb-2">Инвентаризация</h3>
                <p className="text-muted-foreground mb-4">
                  Проведение инвентаризации остатков товаров на складе
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Начать инвентаризацию
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