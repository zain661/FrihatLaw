import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AdminGate from "../../components/admin/AdminGate";
import ArticleForm from "../../components/admin/ArticleForm";
import { deleteArticle, getArticleById, updateArticle } from "../../lib/articles";

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getArticleById(id).then((found) => {
      if (!cancelled) {
        setArticle(found);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-cream" />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-head text-xl font-bold text-ink mb-4">لم يتم العثور على هذا المقال</h1>
        <Link to="/admin/post-article" className="text-green font-bold hover:text-gold transition-colors">
          ← العودة إلى لوحة النشر
        </Link>
      </div>
    );
  }

  const handleUpdate = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      await updateArticle(id, {
        title: payload.title,
        content: payload.content,
        author: { name: payload.authorName, title: payload.authorTitle },
        category: payload.category,
        image: payload.image,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "تعذّر حفظ التعديلات.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.")) return;
    try {
      await deleteArticle(id);
      navigate("/admin/post-article");
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
            <h1 className="font-head text-2xl md:text-3xl font-bold text-ink">تعديل المقال</h1>
          </div>
          <Link to="/admin/post-article" className="text-sm font-bold text-green hover:text-gold transition-colors shrink-0">
            → لوحة النشر
          </Link>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green/30 bg-green/10 px-5 py-4"
          >
            <p className="text-sm font-bold text-green-deep">✅ تم حفظ التعديلات بنجاح.</p>
            <Link to={`/blog/${id}`} className="text-sm font-bold text-green underline shrink-0">
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
          initial={{
            title: article.title,
            authorName: article.author.name,
            authorTitle: article.author.title,
            category: article.category,
            content: article.content,
            image: article.image,
          }}
          submitLabel={submitting ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          onSubmit={handleUpdate}
          submitting={submitting}
        />

        <button
          type="button"
          onClick={handleDelete}
          className="mt-6 w-full rounded-xl border border-red-200 py-3.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          حذف هذا المقال نهائيًا
        </button>
      </div>
    </div>
  );
}

export default function EditArticlePage() {
  return (
    <AdminGate>
      <EditForm />
    </AdminGate>
  );
}
