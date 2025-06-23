import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from 'react-router-dom';
import RootLayout from "./app/RootLayout";
import HomePage from "./app/RootPage";
import LoginPage from "./app/login/LoginPage";
import EmployeesPage from "./app/EmployeesPage";
import ServicesPage from "./app/ServicesPage";
import CustomersPage from "./app/CustomersPage";
import TransactionsPage from "./app/TransactionsPage";
import HistoryPage from "./app/HistoryPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/App.css'
import { ThemeProvider } from "./components/theme-provider";
import NotFoundPage from "./app/NotFoundPage";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient()

const router = createHashRouter([
  {
    path: "/sign-in",
    element: <LoginPage />, // Tidak menggunakan layout
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      
      {
        path: "transactions",
        element: <TransactionsPage />,
      },   
      {
        path: "*",
        element: <NotFoundPage />,
      }   
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode >
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
