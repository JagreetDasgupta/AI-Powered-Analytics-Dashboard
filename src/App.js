import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Audiences from "./pages/Audiences";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/audiences" element={<Audiences />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}