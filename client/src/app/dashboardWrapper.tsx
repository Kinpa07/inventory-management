"use client";

import React, { useEffect, useMemo } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);


  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            default: isDarkMode ? "#171717" : "#f9fafb", 
            paper: isDarkMode ? "#262626" : "#ffffff",   
          },
          text: {
            primary: isDarkMode ? "#f5f5f5" : "#111827", 
            secondary: isDarkMode ? "#d4d4d8" : "#4b5563",
          },
          primary: {
            main: isDarkMode ? "#60a5fa" : "#2563eb", 
          },
          secondary: {
            main: isDarkMode ? "#a78bfa" : "#7c3aed", 
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: isDarkMode ? "#171717" : "#f9fafb",
                color: isDarkMode ? "#f5f5f5" : "#111827",
                transition: "background-color 0.3s ease, color 0.3s ease",
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="flex w-full min-h-screen bg-gray-50 text-gray-900">
        <Sidebar />
        <main
          className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
            isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
          }`}
        >
          <Navbar />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
