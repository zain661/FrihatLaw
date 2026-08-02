import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LegalPage from "./pages/LegalPage";
import IPPage from "./pages/IPPage";
import NHRPage from "./pages/NHRPage";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";
import TeamTraineesPage from "./pages/TeamTraineesPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import LegalPracticeIPPage from "./pages/LegalPracticeIPPage";
import LegalPracticeExecutionPage from "./pages/LegalPracticeExecutionPage";
import PostArticlePage from "./pages/admin/PostArticlePage";
import EditArticlePage from "./pages/admin/EditArticlePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/frihat-legal" element={<LegalPage />} />
          <Route path="/frihat-legal/intellectual-property" element={<LegalPracticeIPPage />} />
          <Route path="/frihat-legal/execution" element={<LegalPracticeExecutionPage />} />
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
    </BrowserRouter>
  );
}

export default App;
