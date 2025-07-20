import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Calculator, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Printer,
  Download
} from 'lucide-react';

const accounts = [
  { code: '01', name: 'Основные средства', debit: 2500000, credit: 0, balance: 2500000 },
  { code: '10', name: 'Материалы', debit: 450000, credit: 120000, balance: 330000 },
  { code: '20', name: 'Основное производство', debit: 680000, credit: 580000, balance: 100000 },
  { code: '41', name: 'Товары', debit: 1200000, credit: 800000, balance: 400000 },
  { code: '50', name: 'Касса', debit: 125000, credit: 98000, balance: 27000 },
  { code: '51', name: 'Расчетные счета', debit: 2800000, credit: 2650000, balance: 150000 },
  { code: '60', name: 'Расчеты с поставщиками', debit: 50000, credit: 350000, balance: -300000 },
  { code: '62', name: 'Расчеты с покупателями', debit: 890000, credit: 750000, balance: 140000 },
];

const transactions = [
  { id: 1, date: '18.07.2025', debit: '51', credit: '62', amount: 125000, description: 'Поступление от покупателя ООО "Альфа"' },
  { id: 2, date: '17.07.2025', debit: '20', credit: '10', amount: 45000, description: 'Списание материалов в производство' },
  { id: 3, date: '16.07.2025', debit: '41', credit: '60', amount: 230000, description: 'Поступление товаров от поставщика' },
  { id: 4, date: '15.07.2025', debit: '26', credit: '70', amount: 85000, description: 'Начисление заработной платы' },
];

const reports = [
  { name: 'Оборотно-сальдовая ведомость', period: 'Июль 2025', status: 'Готов' },
  { name: 'Баланс (форма 1)', period: 'II квартал 2025', status: 'Готов' },
  { name: 'Отчет о прибылях и убытках', period: 'II квартал 2025', status: 'В работе' },
  { name: 'Справка по НДС', period: 'Июль 2025', status: 'Готов' },
];

export const AccountingModule: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('07.2025');

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Бухгалтерия</h1>
          <p className="text-muted-foreground">План счетов, проводки, отчеты</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Новая проводка
          </Button>
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Закрыть месяц
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Активы</p>
              <p className="text-xl font-semibold">3 507 000 ₽</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Обязательства</p>
              <p className="text-xl font-semibold">300 000 ₽</p>
            </div>
            <DollarSign className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Капитал</p>
              <p className="text-xl font-semibold">3 207 000 ₽</p>
            </div>
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Оборот за месяц</p>
              <p className="text-xl font-semibold">1 840 000 ₽</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">План счетов</TabsTrigger>
          <TabsTrigger value="transactions">Проводки</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
          <TabsTrigger value="taxes">Налоги</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Оборотно-сальдовая ведомость</h3>
              <div className="flex items-center space-x-2">
                <Input
                  type="month"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-36"
                />
                <Button variant="outline" size="icon">
                  <Printer className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Счет</TableHead>
                  <TableHead>Наименование</TableHead>
                  <TableHead>Дебет</TableHead>
                  <TableHead>Кредит</TableHead>
                  <TableHead>Сальдо</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.code}>
                    <TableCell className="font-medium">{account.code}</TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.debit.toLocaleString()} ₽</TableCell>
                    <TableCell>{account.credit.toLocaleString()} ₽</TableCell>
                    <TableCell className={account.balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {account.balance.toLocaleString()} ₽
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Журнал проводок</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить проводку
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Дебет</TableHead>
                  <TableHead>Кредит</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Описание</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.debit}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.credit}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.amount.toLocaleString()} ₽
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Бухгалтерские отчеты</h3>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Сформировать отчет
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Отчет</TableHead>
                  <TableHead>Период</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>
                      <Badge variant={report.status === 'Готов' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Просмотр
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="taxes">
          <Card className="p-6">
            <div className="text-center py-8">
              <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Налоговый учет</h3>
              <p className="text-muted-foreground mb-4">
                НДС, УСН, налог на прибыль, отчеты для ФНС
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Рассчитать налоги
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};