import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import HeroEditor from "./pages/admin/sections/HeroEditor";
import AboutEditor from "./pages/admin/sections/AboutEditor";
import ContactEditor from "./pages/admin/sections/ContactEditor";
import HeaderEditor from "./pages/admin/sections/HeaderEditor";
import FooterEditor from "./pages/admin/sections/FooterEditor";
import ProductsEditor from "./pages/admin/ProductsEditor";
import TestimonialsEditor from "./pages/admin/TestimonialsEditor";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="sections/hero" element={<HeroEditor />} />
            <Route path="sections/about" element={<AboutEditor />} />
            <Route path="sections/contact" element={<ContactEditor />} />
            <Route path="sections/header" element={<HeaderEditor />} />
            <Route path="sections/footer" element={<FooterEditor />} />
            <Route path="products" element={<ProductsEditor />} />
            <Route path="testimonials" element={<TestimonialsEditor />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
