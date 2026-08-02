import { useState } from "react";
import { CATEGORIES } from "../../data/blog";

export default function ArticleForm({ initial, submitLabel, onSubmit, submitting = false }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [authorName, setAuthorName] = useState(initial?.authorName || "");
  const [authorTitle, setAuthorTitle] = useState(initial?.authorTitle || "");
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0].key);
  const [content, setContent] = useState(initial?.content || "");
  const [imageData, setImageData] = useState(initial?.image || "");
  const [imageName, setImageName] = useState(initial?.image ? "الصورة الحالية" : "");
  const [errorMsg, setErrorMsg] = useState("");

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!title.trim() || !authorName.trim() || !content.trim()) {
      setErrorMsg("يرجى تعبئة عنوان المقال، اسم الكاتب، ومحتوى المقال قبل النشر.");
      return;
    }
    onSubmit({
      title: title.trim(),
      authorName: authorName.trim(),
      authorTitle: authorTitle.trim(),
      category,
      content: content.trim(),
      image: imageData || "/brand/logo-group.png",
    });
  };

  return (
    <form onSubmit={submit} className="rounded-3xl bg-paper border border-green/10 shadow-[0_20px_50px_-25px_rgba(15,43,34,0.3)] p-6 md:p-8 space-y-6">
      <div>
        <label className="block text-sm font-bold text-ink mb-2">عنوان المقال</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: كيف تحمي علامتك التجارية دوليًا؟"
          className="w-full rounded-xl border border-green/20 px-4 py-3.5 text-ink outline-none focus:border-gold transition-colors"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-bold text-ink mb-2">اسم الكاتب</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="المحامية سارة"
            className="w-full rounded-xl border border-green/20 px-4 py-3.5 text-ink outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-ink mb-2">المسمى الوظيفي</label>
          <input
            type="text"
            value={authorTitle}
            onChange={(e) => setAuthorTitle(e.target.value)}
            placeholder="رئيسة قسم الملكية الفكرية"
            className="w-full rounded-xl border border-green/20 px-4 py-3.5 text-ink outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-ink mb-2">التصنيف والكيان</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-green/20 px-4 py-3.5 text-ink outline-none focus:border-gold transition-colors bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.emoji} {c.label} — {c.entity}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-ink mb-2">صورة الغلاف</label>
        <label className="flex items-center gap-4 rounded-xl border border-dashed border-green/30 px-4 py-3.5 cursor-pointer hover:border-gold transition-colors">
          {imageData ? (
            <img src={imageData} alt="" className="h-14 w-14 rounded-lg object-cover shrink-0" />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-green/10 text-xl shrink-0">🖼️</span>
          )}
          <span className="text-sm text-ink-muted truncate">{imageName || "اضغط لاختيار صورة من جهازك"}</span>
          <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
        </label>
      </div>

      <div>
        <label className="block text-sm font-bold text-ink mb-2">محتوى المقال</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="اكتب محتوى المقال هنا. افصل بين الفقرات بسطر فارغ."
          className="w-full rounded-xl border border-green/20 px-4 py-3.5 text-ink outline-none focus:border-gold transition-colors leading-relaxed"
        />
      </div>

      {errorMsg && <p className="text-sm font-semibold text-red-500">{errorMsg}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-gold-light py-4 font-head font-bold text-green-deep shadow-[0_15px_35px_-10px_rgba(231,184,77,0.5)] hover:bg-gold-pale transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </button>
    </form>
  );
}
