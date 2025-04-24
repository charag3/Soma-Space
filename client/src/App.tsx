import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackgroundProvider } from "@/components/BackgroundProvider";
import NotFound from "@/pages/not-found";
import MainHome from "@/pages/Home";
import FlowHome from "@/pages/FlowHome";
import StudioHome from "@/pages/StudioHome";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/flow" element={<FlowHome />} />
        <Route path="/studio" element={<StudioHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BackgroundProvider>
          <Toaster />
          <Router />
        </BackgroundProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
