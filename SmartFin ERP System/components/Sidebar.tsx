import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Calculator, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
// Beautiful SmartFin logo with modern design
const smartFinLogo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGF4ZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMzg5NEY1Ii8+CjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjNTg1NUQ5Ii8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzhCNUNGNiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InNoaW5lIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9InJnYmEoMjU1LDI1NSwyNTUsMCkiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9InJnYmEoMjU1LDI1NSwyNTUsMC4zKSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9InJnYmEoMjU1LDI1NSwyNTUsMCkiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIxMiIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMTIiIGZpbGw9InVybCgjc2hpbmUpIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTQlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgbGV0dGVyLXNwYWNpbmc9IjAuNXB4Ij5TRjwvdGV4dD4KPGNpcmNsZSBjeD0iMzIiIGN5PSI4IiByPSIzIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNSkiLz4KPC9zdmc+";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Главная', icon: LayoutDashboard, color: 'text-blue-500' },
  { id: 'warehouse', label: 'Склад', icon: Package, color: 'text-green-500' },
  { id: 'accounting', label: 'Бухгалтерия', icon: Calculator, color: 'text-purple-500' },
  { id: 'crm', label: 'CRM/Продажи', icon: Users, color: 'text-orange-500' },
  { id: 'payroll', label: 'Зарплата', icon: CreditCard, color: 'text-pink-500' },
  { id: 'reports', label: 'Отчеты', icon: BarChart3, color: 'text-indigo-500' },
  { id: 'settings', label: 'Настройки', icon: Settings, color: 'text-gray-500' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  setActiveModule,
  collapsed,
  setCollapsed
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      className="fixed left-0 top-0 h-full bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border z-10 shadow-xl"
      animate={{ width: collapsed ? '4rem' : '16rem' }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border/50">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <motion.div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden bg-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={smartFinLogo} 
                  alt="SmartFin Logo" 
                  className="w-8 h-8 object-contain"
                />
              </motion.div>
              <span className="text-sidebar-foreground font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartFin
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {collapsed && (
          <motion.div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg overflow-hidden bg-white mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img 
              src={smartFinLogo} 
              alt="SmartFin Logo" 
              className="w-6 h-6 object-contain"
            />
          </motion.div>
        )}
        
        {!collapsed && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 hover:bg-sidebar-accent/50"
            >
              <motion.div
                animate={{ rotate: collapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </motion.div>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-3 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start mb-1 h-11 transition-all duration-200 ${
                    collapsed ? 'px-2' : 'px-3'
                  } ${isActive ? 'bg-sidebar-accent shadow-sm' : 'hover:bg-sidebar-accent/50'}`}
                  onClick={() => setActiveModule(item.id)}
                >
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      rotate: isActive ? 5 : 0 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? item.color : 'text-sidebar-foreground/70'}`} />
                  </motion.div>
                  
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {isActive && (
                    <motion.div
                      className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </Button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <div className="absolute bottom-4 left-2 right-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            className={`w-full justify-start h-11 hover:bg-sidebar-accent/50 ${
              collapsed ? 'px-2' : 'px-3'
            }`}
            onClick={toggleTheme}
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 shrink-0 text-sidebar-foreground/70" />
              ) : (
                <Sun className="h-5 w-5 shrink-0 text-sidebar-foreground/70" />
              )}
            </motion.div>
            
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3"
                >
                  {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
