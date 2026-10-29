import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteContentProvider } from './content/siteContent';
import CreativeSite from './creative/CreativeSite';
import './creative/creative.css';
const AdminPanel = lazy(() => import('./components/AdminPanel'));
export default function App() {
  return <SiteContentProvider><BrowserRouter><Suspense fallback={<div className="j-loading">4Me Lanka Tours <span>Opening your island…</span></div>}><Routes><Route path="/admin/*" element={<AdminPanel />} /><Route path="*" element={<CreativeSite />} /></Routes></Suspense></BrowserRouter></SiteContentProvider>;
}
