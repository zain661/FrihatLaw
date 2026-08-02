import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdminGate from "../../components/admin/AdminGate";
import ArticleForm from "../../components/admin/ArticleForm";
import { getCategory } from "../../data/blog";
import { createArticle, deleteArticle, getAllArticles } from "../../lib/articles";

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const refresh = () => {
    setLoadingList(true);
    getAllArticles()
      .then(setArticles)
      .finally(() => setLoadingList(false));
  };

  useEffect(refresh, []);

  const handleCreate = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      const article = await createArticle({
        title: payload.title,
        content: payload.content,
        author: { name: payload.authorName, title: payload.authorTitle },
        category: payload.category,
        image: payload.image,
      });
      setSuccess(article);
      refresh();
      setFormKey((k) => k + 1);
    } catch (err) {
      setError(err.message || "تعذّر نشر المقال، حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.")) return;
    try {
      await deleteArticle(id);
      refresh();
      setSuccess((s) => (s?.id === id ? null : s));
    } catch (err) {
      setError(err.message || "تعذّر حذف المقال.");
    }
  };

  return (
    <div className="min-h-screen bg-cream px-5 py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-head text-xs tracking-widest text-gold font-bold uppercase mb-1">لوحة النشر</p>
            <h1 className="font-head text-2xl md:text-3xl font-bold text-ink">نشر مقال جديد</h1>
          </div>
          <Link to="/blog" className="text-sm font-bold text-green hover:text-gold transition-colors shrink-0">
            → المدونة
          </Link>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green/30 bg-green/10 px-5 py-4"
          >
            <p className="text-sm font-bold text-green-deep">✅ تم نشر «{success.title}» بنجاح.</p>
            <Link to={`/blog/${success.id}`} className="text-sm font-bold text-green underline shrink-0">
              عرض المقال
            </Link>
          </motion.div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-bold text-red-600">{error}</p>
          </div>
        )}

        <ArticleForm
          key={formKey}
          submitLabel={submitting ? "جارٍ النشر..." : "نشر المقال الآن"}
          onSubmit={handleCreate}
          submitting={submitting}
        />

        <div className="mt-10">
          <p className="font-head text-sm tracking-widest text-green font-bold uppercase mb-4">
            إدارة جميع المقالات {!loadingList && `(${articles.length})`}
          </p>
          {loadingList ? (
            <p className="text-sm text-ink-muted">جارٍ التحميل...</p>
          ) : (
            <ul className="space-y-3">
              {articles.map((a) => {
                const cat = getCategory(a.category);
                return (
                  <li key={a.id} className="flex items-center gap-3 rounded-xl bg-paper border border-green/10 px-4 py-3">
                    <img src={a.image} alt="" className="h-10 w-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-ink truncate">{a.title}</p>
                      <p className="text-xs text-ink-muted">
                        {cat.emoji} {cat.entity} · {a.date}
                      </p>
                    </div>
                    <Link
                      to={`/admin/edit-article/${a.id}`}
                      className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-green hover:bg-green/10 transition-colors"
                    >
                      تعديل
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(a.id)}
                      aria-label="حذف المقال"
                      className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PostArticlePage() {
  return (
    <AdminGate>
      <Dashboard />
    </AdminGate>
  );
}
