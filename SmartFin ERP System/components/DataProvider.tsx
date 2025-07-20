import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

interface Client {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  lastOrder: string;
  total: number;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  worked: number;
  bonus: number;
  total: number;
}

interface Deal {
  id: number;
  client: string;
  title: string;
  amount: number;
  stage: string;
  probability: number;
  manager: string;
  deadline: string;
}

interface DataContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: number, client: Partial<Client>) => void;
  deleteClient: (id: number) => void;
  
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: number, employee: Partial<Employee>) => void;
  deleteEmployee: (id: number) => void;
  
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  updateDeal: (id: number, deal: Partial<Deal>) => void;
  deleteDeal: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const initialProducts: Product[] = [
  { id: 1, name: 'Системный блок HP ProDesk', sku: 'HP-001', quantity: 25, unit: 'шт', price: 45000, total: 1125000 },
  { id: 2, name: 'Монитор Dell 24"', sku: 'DELL-MON-24', quantity: 15, unit: 'шт', price: 18000, total: 270000 },
  { id: 3, name: 'Клавиатура Logitech', sku: 'LOG-KB-01', quantity: 50, unit: 'шт', price: 2500, total: 125000 },
  { id: 4, name: 'Мышь беспроводная', sku: 'MS-WL-01', quantity: 35, unit: 'шт', price: 1200, total: 42000 },
];

const initialClients: Client[] = [
  { id: 1, name: 'ООО "Альфа Технологии"', contact: 'Иванов И.И.', phone: '+7 495 123-45-67', email: 'ivanov@alpha.ru', status: 'Активный', lastOrder: '15.07.2025', total: 450000 },
  { id: 2, name: 'ИП Петров С.С.', contact: 'Петров С.С.', phone: '+7 903 234-56-78', email: 'petrov@mail.ru', status: 'Новый', lastOrder: '10.07.2025', total: 125000 },
  { id: 3, name: 'ООО "БетаСофт"', contact: 'Сидорова А.В.', phone: '+7 812 345-67-89', email: 'info@betasoft.ru', status: 'В работе', lastOrder: '08.07.2025', total: 890000 },
];

const initialEmployees: Employee[] = [
  { id: 1, name: 'Иванов Иван Иванович', position: 'Менеджер по продажам', salary: 65000, worked: 22, bonus: 15000, total: 80000 },
  { id: 2, name: 'Петрова Анна Сергеевна', position: 'Бухгалтер', salary: 55000, worked: 22, bonus: 0, total: 55000 },
  { id: 3, name: 'Сидоров Петр Алексеевич', position: 'Программист', salary: 85000, worked: 20, bonus: 10000, total: 95000 },
];

const initialDeals: Deal[] = [
  { id: 1, client: 'ООО "Альфа Технологии"', title: 'Поставка компьютеров', amount: 450000, stage: 'Переговоры', probability: 80, manager: 'Смирнов А.А.', deadline: '25.07.2025' },
  { id: 2, client: 'ИП Петров С.С.', title: 'Продажа ПО', amount: 125000, stage: 'Предложение', probability: 60, manager: 'Кузнецова О.В.', deadline: '30.07.2025' },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Math.max(...products.map(p => p.id)) + 1 };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, product: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...product } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = { ...client, id: Math.max(...clients.map(c => c.id)) + 1 };
    setClients([...clients, newClient]);
  };

  const updateClient = (id: number, client: Partial<Client>) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...client } : c));
  };

  const deleteClient = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: Math.max(...employees.map(e => e.id)) + 1 };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: number, employee: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...employee } : e));
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const addDeal = (deal: Omit<Deal, 'id'>) => {
    const newDeal = { ...deal, id: Math.max(...deals.map(d => d.id)) + 1 };
    setDeals([...deals, newDeal]);
  };

  const updateDeal = (id: number, deal: Partial<Deal>) => {
    setDeals(deals.map(d => d.id === id ? { ...d, ...deal } : d));
  };

  const deleteDeal = (id: number) => {
    setDeals(deals.filter(d => d.id !== id));
  };

  return (
    <DataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      clients, addClient, updateClient, deleteClient,
      employees, addEmployee, updateEmployee, deleteEmployee,
      deals, addDeal, updateDeal, deleteDeal
    }}>
      {children}
    </DataContext.Provider>
  );
};