import { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useGA4, trackPageView } from "./hooks/useGA4";
import { SEO_META, SCHEMA_ORG } from "./const/seo-meta";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ROICalculator from "./components/ROICalculator";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import TrafficService from "./pages/TrafficService";
import InstagramService from "./pages/InstagramService";
import AuditService from "./pages/AuditService";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";

function Router() {
  const [location] = useLocation();
  
  // Track page views
  useEffect(() => {
    trackPageView(location, document.title);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/sobre" component={About} />
          <Route path="/servicos" component={Services} />
          <Route path="/servicos/trafego-pago" component={TrafficService} />
          <Route path="/servicos/instagram" component={InstagramService} />
          <Route path="/servicos/auditoria" component={AuditService} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/contato" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogArticle} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ROICalculator />
    </div>
  );
}

function App() {
  // Initialize Google Analytics 4
  useGA4(import.meta.env.VITE_GA4_ID || '');

  // Set meta tags
  useEffect(() => {
    document.title = SEO_META.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', SEO_META.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', SEO_META.ogTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', SEO_META.ogDescription);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', SEO_META.ogImage);
    
    // Add schema.org
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(SCHEMA_ORG.organization);
    document.head.appendChild(script);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
