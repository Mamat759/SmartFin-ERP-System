import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  FileText, 
  Download,
  Printer,
  Calendar,
  Filter
} from 'lucide-react';

const reportCategories = [
  {
    title: 'Финансовые отчеты',
    icon: TrendingUp,
    reports: [
      'Отчет о прибылях и убытках',
      'Баланс предприятия',
      'Движение денежных средств',
      'Анализ рентабельности'
    ]
  },
  {
    title: 'Складские отчеты',
    icon: BarChart3,
    reports: [
      'Оборотная ведомость по складу',
      'Инвентаризационная опись',
      'Анализ движения товаров',
      'Отчет по остаткам'
    ]
  },
  {
    title: 'CRM отчеты',
    icon: PieChart,
    reports: [
      'Анализ продаж по клиентам',
      'Воронка продаж',
      'Эффективность менеджеров',
      'План-факт анализ'
    ]
  },
  {
    title: 'Кадровые отчеты',
    icon: FileText,
    reports: [
      'Расчетная ведомость',
      'Табель учета времени',
      'Справки для ФНС',
      'Отчеты в ПФР'
    ]
  }
];

const recentReports = [
  { name: 'Оборотно-сальдовая ведомость', date: '18.07.2025', type: 'Бухгалтерия', status: 'Готов' },
  { name: 'Анализ продаж за месяц', date: '17.07.2025', type: 'CRM', status: 'Готов' },
  { name: 'Отчет по складским остаткам', date: '16.07.2025', type: 'Склад', status: 'В работе' },
  { name: 'Расчетная ведомость', date: '15.07.2025', type: 'Зарплата', status: 'Готов' },
];

export const ReportsModule: React.FC = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Отчеты и аналитика</h1>
          <p className="text-muted-foreground">Формирование отчетов по всем направлениям деятельности</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Создать отчет
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Настроить расписание
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Отчетов создано</p>
              <p className="text-xl font-semibold">47</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">За этот месяц</p>
              <p className="text-xl font-semibold">12</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Автоотчеты</p>
              <p className="text-xl font-semibold">5</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">В очереди</p>
              <p className="text-xl font-semibold">2</p>
            </div>
            <Filter className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.reports.map((report, reportIndex) => (
                  <Button
                    key={reportIndex}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 text-left"
                  >
                    <div>
                      <p className="font-medium">{report}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Reports */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Последние отчеты</h3>
          <Button variant="outline">
            Все отчеты
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">{report.date} • {report.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={report.status === 'Готов' ? 'default' : 'secondary'}>
                  {report.status}
                </Badge>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};