import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { WarehouseModule } from "./components/modules/WarehouseModule";
import { AccountingModule } from "./components/modules/AccountingModule";
import { CRMModule } from "./components/modules/CRMModule";
import { PayrollModule } from "./components/modules/PayrollModule";
import { ReportsModule } from "./components/modules/ReportsModule";
import { SettingsModule } from "./components/modules/SettingsModule";
import { ThemeProvider } from "./components/ThemeProvider";
import { DataProvider } from "./components/DataProvider";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const renderContent = () => {
    const components = {
      dashboard: Dashboard,
      warehouse: WarehouseModule,
      accounting: AccountingModule,
      crm: CRMModule,
      payroll: PayrollModule,
      reports: ReportsModule,
      settings: SettingsModule,
    };

    const Component = components[activeModule] || Dashboard;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full"
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="flex h-screen bg-background overflow-hidden">
          <Sidebar
            activeModule={activeModule}
            setActiveModule={setActiveModule}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
          <motion.main
            className="flex-1 overflow-hidden"
            animate={{
              marginLeft: sidebarCollapsed ? "4rem" : "16rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.main>
          <Toaster />
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}