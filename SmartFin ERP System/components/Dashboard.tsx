import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Users, 
  CreditCard, 
  FileText,
  Plus,
  Eye,
  ArrowRight,
  Zap,
  Target,
  Activity
} from 'lucide-react';

const statsCards = [
  {
    title: 'Общий оборот',
    value: '2 450 000 ₽',
    change: '+12.5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500',
    progress: 75
  },
  {
    title: 'Товары на складе',
    value: '1 247',
    change: '-2.1%',
    trend: 'down',
    icon: Package,
    color: 'from-green-500 to-emerald-500',
    progress: 68
  },
  {
    title: 'Активные клиенты',
    value: '89',
    change: '+5.3%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-violet-500',
    progress: 85
  },
  {
    title: 'Задолженность',
    value: '345 000 ₽',
    change: '-8.2%',
    trend: 'down',
    icon: CreditCard,
    color: 'from-red-500 to-pink-500',
    progress: 45
  }
];

const quickActions = [
  { label: 'Создать накладную', icon: FileText, color: 'bg-blue-500' },
  { label: 'Добавить товар', icon: Package, color: 'bg-green-500' },
  { label: 'Новый клиент', icon: Users, color: 'bg-purple-500' },
  { label: 'Выписать счет', icon: CreditCard, color: 'bg-orange-500' },
];

const recentDocuments = [
  { type: 'Накладная', number: '№001245', date: '18.07.2025', amount: '125 000 ₽', status: 'completed' },
  { type: 'Счет', number: '№000876', date: '17.07.2025', amount: '45 500 ₽', status: 'pending' },
  { type: 'Приход', number: '№000432', date: '16.07.2025', amount: '230 000 ₽', status: 'completed' },
  { type: 'Возврат', number: '№000321', date: '15.07.2025', amount: '12 300 ₽', status: 'processing' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface DashboardProps {
  setActiveModule?: (module: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveModule }) => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Главная панель
          </h1>
          <p className="text-muted-foreground mt-1">Обзор деятельности предприятия</p>
        </div>
        <motion.div 
          className="text-right p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-800/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Сегодня
          </p>
          <p className="font-semibold text-lg">18 июля 2025</p>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
                <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                     style={{ backgroundImage: `linear-gradient(135deg, var(--color-blue-500), var(--color-purple-500))` }} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                      <motion.p 
                        className="text-2xl font-bold"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className={`flex items-center text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <motion.div
                          animate={{ x: [0, 2, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          {stat.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                        </motion.div>
                        {stat.change}
                      </div>
                    </div>
                    
                    <motion.div 
                      className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Прогресс</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg">Быстрые действия</h3>
            </div>
            
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                                        <Button
                      variant="ghost"
                      className="w-full justify-start h-12 hover:bg-white/60 dark:hover:bg-gray-800/60 group"
                      onClick={() => {
                        if (setActiveModule) {
                          switch (action.label) {
                            case 'Создать накладную':
                              setActiveModule('warehouse');
                              break;
                            case 'Добавить товар':
                              setActiveModule('warehouse');
                              break;
                            case 'Новый клиент':
                              setActiveModule('crm');
                              break;
                            case 'Выписать счет':
                              setActiveModule('accounting');
                              break;
                          }
                        }
                      }}
                    >
                      <motion.div 
                        className={`p-2 ${action.color} rounded-lg mr-3 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="flex-1 text-left">{action.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recent Documents */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20 border-0 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Последние документы</h3>
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="hover:bg-purple-50 dark:hover:bg-purple-950/20">
                  <Eye className="w-4 h-4 mr-2" />
                  Все документы
                </Button>
              </motion.div>
            </div>
            
            <div className="space-y-3">
              {recentDocuments.map((doc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/40 rounded-xl border border-gray-200/50 dark:border-gray-700/50 cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
                      whileHover={{ rotate: 5 }}
                    >
                      <FileText className="w-4 h-4 text-white" />
                    </motion.div>
                    <div>
                      <p className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {doc.type} {doc.number}
                      </p>
                      <p className="text-sm text-muted-foreground">{doc.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">{doc.amount}</p>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        doc.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {doc.status === 'completed' ? 'Завершен' :
                         doc.status === 'pending' ? 'Ожидает' : 'В работе'}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
