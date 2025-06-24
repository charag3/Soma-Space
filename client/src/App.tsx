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
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import BlogHome from "@/pages/blog/BlogHome";
import BlogPost from "@/pages/blog/[slug]";
import SomaExpressLanding from "./pages/express";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <BackgroundProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<MainHome />} />
              <Route path="/flow" element={<FlowHome />} />
              <Route path="/studio" element={<StudioHome />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/express" element={<SomaExpressLanding />} /> {/* ← Agrega esta línea */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BackgroundProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;