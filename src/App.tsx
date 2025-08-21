import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../src/components/ui/toaster";
import { usePageLoader, useInitialLoader } from "../src/hooks/usePageLoader";
import { usePerformance } from "../src/hooks/usePerformance";

// Lazy load heavy components
const Navigation = lazy(() => import("../src/components/Navigation"));
const Footer = lazy(() => import("../src/components/Footer"));
const GoToTop = lazy(() => import("../src/components/GoToTop"));
const LoadingBar = lazy(() => import("../src/components/LoadingBar"));
const InitialLoader = lazy(() => import("../src/components/InitialLoader"));
// Lazy load all components
const Home = lazy(() => import("../src/pages/Home"));
const Services = lazy(() => import("../src/pages/Services"));
const About = lazy(() => import("../src/pages/About"));
const Careers = lazy(() => import("../src/pages/Careers"));
const Blog = lazy(() => import("../src/pages/Blog"));
const BlogDetail = lazy(() => import("../src/pages/BlogDetail"));
const FAQ = lazy(() => import("../src/pages/FAQ"));
const Contact = lazy(() => import("../src/pages/Contact"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Solutions = lazy(() => import("../src/pages/Solutions"));
const CaseStudies = lazy(() => import("../src/pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("../src/pages/CaseStudyDetail"));
const UseCases = lazy(() => import("../src/pages/UseCases"));
const SuccessStories = lazy(() => import("../src/pages/SuccessStories"));
const ECommerceStory = lazy(() => import("../src/pages/success-stories/ECommerce"));
const FoodDeliveryStory = lazy(() => import("../src/pages/success-stories/FoodDelivery"));
const OnDemandStory = lazy(() => import("../src/pages/success-stories/OnDemand"));
const DatingStory = lazy(() => import("../src/pages/success-stories/Dating"));
const TaxiBookingStory = lazy(() => import("../src/pages/success-stories/TaxiBooking"));
const CmsLogin = lazy(() => import("../src/pages/CmsLogin"));
const Dashboard = lazy(() => import("../src/pages/Dashboard"));
const ServicePreview = lazy(() => import("../src/pages/ServicePreview"));
const NotFound = lazy(() => import("../src/pages/not-found"));
import CriticalCSS from './components/CriticalCSS';

// Service Pages - Lazy loaded
const UIUXDesign = lazy(() => import("../src/pages/services/UIUXDesign"));
const CustomSoftware = lazy(() => import("../src/pages/services/CustomSoftware"));
const WebDevelopment = lazy(() => import("../src/pages/services/WebDevelopment"));
const MobileApp = lazy(() => import("../src/pages/services/MobileApp"));
const QATesting = lazy(() => import("../src/pages/services/QATesting"));
const TalentSolutions = lazy(() => import("../src/pages/services/TalentSolutions"));

import HomeSkeleton from "./components/HomeSkeleton";
import EnterPriseSolution from './pages/usecase/EnterPriseSolution';
import EcommercePlateform from './pages/usecase/EcommercePlateform';
import HealthCareSystem from './pages/usecase/HealthCareSystem';
import EducationTechnology from './pages/usecase/EducationTechnology';
import AiPoweredDevlopement from './pages/solution/AiPoweredDevlopement';
import EnterpriseSecurity from './pages/solution/EnterpriseSecurity';
import TeamCollaboration from './pages/solution/TeamCollaboration';
import AnalyticsInsight from './pages/solution/AnalyticsInsight';
import GlobalInfrastructure from './pages/solution/GlobalInfrastructure';
import RapidDeployment from './pages/solution/RapidDeployment';
import ProtectedRoute from './layout/protectedRoutes';

function AppRouter() {
  const { isLoading } = usePageLoader();
  const { isInitialLoading, completeInitialLoad } = useInitialLoader();

  if (isInitialLoading) {
    return (
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <InitialLoader onComplete={completeInitialLoad} />
      </Suspense>
    );
  }


  // Minimal fallback that doesn't compete with your custom loader
  const MinimalFallback = ({ isHomePage }: { isHomePage?: boolean }) => {
    if (isHomePage) {
      return <HomeSkeleton />;
    }
    return <div className="h-4"></div>;
  };

  return (
    <Routes>
      {/* Auth Routes - No navigation/footer */}
      <Route path="/login" element={<Suspense fallback={<MinimalFallback />}><CmsLogin /></Suspense>} />
      <Route path="/cms/login" element={<Suspense fallback={<MinimalFallback />}><CmsLogin /></Suspense>} />


      <Route path="/dashboard" element={<ProtectedRoute><Suspense fallback={<MinimalFallback />}><Dashboard /></Suspense></ProtectedRoute>} />
      <Route path="/cms/dashboard" element={<ProtectedRoute> <Suspense fallback={<MinimalFallback />}><Dashboard /></Suspense></ProtectedRoute>} />
      <Route path="/crm" element={<ProtectedRoute><Suspense fallback={<MinimalFallback />}><Dashboard /></Suspense></ProtectedRoute>} />


      {/* Dashboard Routes - No navigation/footer */}
      {/* <Route path="/dashboard" element={<Suspense fallback={<MinimalFallback />}><Dashboard /></Suspense>} />
      <Route path="/cms/dashboard" element={<Suspense fallback={<MinimalFallback />}><Dashboard /></Suspense>} />
      <Route path="/crm" element={<Suspense fallback={<MinimalFallback />}><Dashboard /></Suspense>} /> */}

      {/* Main Website Routes - With navigation/footer */}
      <Route
        path="/"
        element={
          <div key="home" className="min-h-screen flex flex-col">
            <Suspense fallback={<div className="h-16 bg-white"></div>}>
              <LoadingBar isLoading={isLoading} />
              <Navigation />
            </Suspense>
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback isHomePage={true} />}>
                <Home />
              </Suspense>
            </main>
            <Suspense fallback={<div className="h-32 bg-gray-50"></div>}>
              <Footer />
            </Suspense>
          </div>
        }
      />
      <Route
        path="/services"
        element={
          <div key="services" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>
                <Services />
              </Suspense>
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/service-preview"
        element={
          <div key="service-preview" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <ServicePreview />
              </Suspense>

            </main>
            <Footer />
          </div>
        }
      />

      {/* Service Pages */}
      <Route
        path="/services/ui-ux-design"
        element={
          <div key="ui-ux-design" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <UIUXDesign />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/services/custom-software"
        element={
          <div key="custom-software" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <CustomSoftware />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/services/web-development"
        element={
          <div key="web-development" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <WebDevelopment />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/services/mobile-app"
        element={
          <div key="mobile-app" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <MobileApp />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/services/qa-testing"
        element={
          <div key="qa-testing" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <QATesting />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/services/talent-solutions"
        element={
          <div key="talent-solutions" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <TalentSolutions />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div key="about" className="min-h-screen flex flex-col">
            <LoadingBar isLoading={isLoading} />
            <Navigation />

            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>
                <About />
              </Suspense>

            </main>
            <Footer />
          </div>
        }
      />
      < Route
        path="/careers"
        element={
          < div key="careers" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <Careers />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/blog"
        element={
          < div key="blog" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <Blog />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/blog/:slug"
        element={
          < div key="blog-detail" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1">
              <Suspense fallback={<MinimalFallback />}>

                <BlogDetail />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/faq"
        element={
          < div key="faq" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <FAQ />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/contact"
        element={
          < div key="contact" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <Contact />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/calendar"
        element={
          < div key="calendar" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <Calendar />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/case-studies"
        element={
          < div key="case-studies" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <CaseStudies />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/case-studies/:id"
        element={
          < div key="case-study-detail" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <CaseStudyDetail />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/solutions"
        element={
          < div key="solutions" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <Suspense fallback={<MinimalFallback />}>

                <Solutions />
              </Suspense>
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/solutions/ai-powered-devlopement"
        element={
          < div key="ai-powered-devlopement-solutions" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">

              <AiPoweredDevlopement />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/solutions/enterprise-security"
        element={
          < div key="enterprise-security-solutions" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <EnterpriseSecurity />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/solutions/team-collaboration"
        element={
          < div key="team-collaboration-solutions" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <TeamCollaboration />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/solutions/analytics-insights"
        element={
          < div key="analytics-insights-solutions" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <AnalyticsInsight />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/solutions/global-infrastructure"
        element={
          < div key="global-infrastructure-solutions" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <GlobalInfrastructure />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/solutions/rapid-devlopement"
        element={
          < div key="rapid-devlopement-solutions" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <RapidDeployment />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/use-cases"
        element={
          < div key="use-cases" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <UseCases />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/use-cases/enterprise-solution"
        element={
          < div key="enterprise-solution-usecases" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <EnterPriseSolution />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/use-cases/ecommerce-platforms"
        element={
          < div key="ecommerce-platforms-usecases" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <EcommercePlateform />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/use-cases/healthcare-system"
        element={
          < div key="healthcare-system-usecases" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <HealthCareSystem />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/use-cases/education-technology"
        element={
          < div key="education-technology-usecases" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <EducationTechnology />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/success-stories"
        element={
          < div key="success-stories" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <SuccessStories />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/success-stories/e-commerce"
        element={
          < div key="e-commerce-story" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <ECommerceStory />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/success-stories/food-delivery"
        element={
          < div key="food-delivery-story" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <FoodDeliveryStory />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/success-stories/on-demand"
        element={
          < div key="on-demand-story" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <OnDemandStory />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/success-stories/dating"
        element={
          < div key="dating-story" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <DatingStory />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="/success-stories/taxi-booking"
        element={
          < div key="taxi-booking-story" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <TaxiBookingStory />
            </main>
            <Footer />
          </div >
        }
      />
      < Route
        path="*"
        element={
          < div key="not-found" className="min-h-screen flex flex-col" >
            <LoadingBar isLoading={isLoading} />
            <Navigation />
            <main className="flex-1 pt-20">
              <NotFound />
            </main>
            <Footer />
          </div >
        }
      />
    </Routes >
  );
}

function App() {
  usePerformance();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CriticalCSS />
        <AppRouter />
        <Suspense fallback={<div style={{ height: '40px' }}></div>}>
          <GoToTop />
        </Suspense>
        {/* <SplashCursor /> */}
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;