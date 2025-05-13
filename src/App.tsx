import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import OutboundCalls from './pages/OutboundCalls';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex selection:bg-slate-300 selection:text-primary">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 ml-64 p-6 bg-background text-foreground">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/outbound-calls" element={<OutboundCalls />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
