import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Plus, 
  Users, 
  Calculator, 
  Calendar, 
  FileText,
  CreditCard,
  TrendingUp
} from 'lucide-react';

const employees = [
  { id: 1, name: 'Иванов Иван Иванович', position: 'Менеджер по продажам', salary: 65000, worked: 22, bonus: 15000, total: 80000 },
  { id: 2, name: 'Петрова Анна Сергеевна', position: 'Бухгалтер', salary: 55000, worked: 22, bonus: 0, total: 55000 },
  { id: 3, name: 'Сидоров Петр Алексеевич', position: 'Программист', salary: 85000, worked: 20, bonus: 10000, total: 95000 },
  { id: 4, name: 'Козлова Елена Владимировна', position: 'Директор', salary: 120000, worked: 22, bonus: 30000, total: 150000 },
];

const payrolls = [
  { month: 'Июль 2025', status: 'Рассчитан', total: 380000, employees: 4, taxes: 114000 },
  { month: 'Июнь 2025', status: 'Выплачен', total: 365000, employees: 4, taxes: 109500 },
  { month: 'Май 2025', status: 'Выплачен', total: 358000, employees: 3, taxes: 107400 },
];

export const PayrollModule: React.FC = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Зарплата и кадры</h1>
          <p className="text-muted-foreground">Управление персоналом, расчет зарплаты</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Добавить сотрудника
          </Button>
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Рассчитать зарплату
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Сотрудников</p>
              <p className="text-xl font-semibold">4</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Фонд зарплаты</p>
              <p className="text-xl font-semibold">380 000 ₽</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Налоги и взносы</p>
              <p className="text-xl font-semibold">114 000 ₽</p>
            </div>
            <Calculator className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">К выплате</p>
              <p className="text-xl font-semibold">494 000 ₽</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Сотрудники</TabsTrigger>
          <TabsTrigger value="payroll">Расчет зарплаты</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
          <TabsTrigger value="schedule">График работы</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Список сотрудников</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить сотрудника
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Сотрудник</TableHead>
                  <TableHead>Должность</TableHead>
                  <TableHead>Оклад</TableHead>
                  <TableHead>Отработано дней</TableHead>
                  <TableHead>Премия</TableHead>
                  <TableHead>К выплате</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.salary.toLocaleString()} ₽</TableCell>
                    <TableCell>{employee.worked}</TableCell>
                    <TableCell>{employee.bonus.toLocaleString()} ₽</TableCell>
                    <TableCell className="font-medium">{employee.total.toLocaleString()} ₽</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Расчетные ведомости</h3>
              <Button>
                <Calculator className="w-4 h-4 mr-2" />
                Новый расчет
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Период</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Сотрудников</TableHead>
                  <TableHead>Зарплата</TableHead>
                  <TableHead>Налоги</TableHead>
                  <TableHead>Итого</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrolls.map((payroll, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{payroll.month}</TableCell>
                    <TableCell>
                      <Badge variant={payroll.status === 'Выплачен' ? 'default' : 'secondary'}>
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payroll.employees}</TableCell>
                    <TableCell>{payroll.total.toLocaleString()} ₽</TableCell>
                    <TableCell>{payroll.taxes.toLocaleString()} ₽</TableCell>
                    <TableCell className="font-medium">
                      {(payroll.total + payroll.taxes).toLocaleString()} ₽
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-6">
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Кадровые отчеты</h3>
              <p className="text-muted-foreground mb-4">
                Отчеты для ФНС, ПФР, табели учета рабочего времени
              </p>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Сформировать отчет
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="p-6">
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">График работы</h3>
              <p className="text-muted-foreground mb-4">
                Планирование графиков, отпуска, больничные
              </p>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Составить график
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};