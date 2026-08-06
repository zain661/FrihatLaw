import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./lib/LanguageContext";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const IPPage = lazy(() => import("./pages/IPPage"));
const NHRPage = lazy(() => import("./pages/NHRPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const TeamTraineesPage = lazy(() => import("./pages/TeamTraineesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage"));
const LegalPracticeIPPage = lazy(() => import("./pages/LegalPracticeIPPage"));
const LegalPracticeExecutionPage = lazy(() => import("./pages/LegalPracticeExecutionPage"));
const LegalPracticeCorporatePage = lazy(() => import("./pages/LegalPracticeCorporatePage"));
const LegalPracticeRealEstatePage = lazy(() => import("./pages/LegalPracticeRealEstatePage"));
const PostArticlePage = lazy(() => import("./pages/admin/PostArticlePage"));
const EditArticlePage = lazy(() => import("./pages/admin/EditArticlePage"));

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/frihat-legal" element={<LegalPage />} />
              <Route path="/frihat-legal/intellectual-property" element={<LegalPracticeIPPage />} />
              <Route path="/frihat-legal/execution" element={<LegalPracticeExecutionPage />} />
              <Route path="/frihat-legal/corporate" element={<LegalPracticeCorporatePage />} />
              <Route path="/frihat-legal/real-estate" element={<LegalPracticeRealEstatePage />} />
              <Route path="/frihat-ip" element={<IPPage />} />
              <Route path="/kayan-nhr" element={<NHRPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/team/trainees" element={<TeamTraineesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogArticlePage />} />
            </Route>
            <Route path="/admin/post-article" element={<PostArticlePage />} />
            <Route path="/admin/edit-article/:id" element={<EditArticlePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
