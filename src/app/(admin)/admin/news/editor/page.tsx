"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  ArrowLeft,
  Send,
  Eye,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Calendar,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

// Sub-komponen yang menangani logika dan penggunaan useSearchParams()
function NewsEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [labels, setLabels] = useState("");
  const [category, setCategory] = useState("Berita");
  const [status, setStatus] = useState("PUBLISHED");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );

  // Modal States
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Inisialisasi Tiptap Editor dengan Styling Explicit Ukuran Font
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside ml-6 space-y-1 my-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside ml-6 space-y-1 my-3",
          },
        },
        heading: {
          levels: [1, 2, 3],
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class:
            "rounded-xl max-w-full h-auto my-4 border border-slate-200 shadow-sm",
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline font-semibold hover:text-blue-800",
        },
      }),
      TextStyle,
    ],
    content: "<p>Mulai tulis artikel berita atau pengumuman kamu di sini...</p>",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[450px] p-2 text-slate-800 text-sm leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2 [&_p]:my-2",
      },
    },
  });

  // Auto Permalink / Slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  };

  // Fetch Data Mode Edit Real-time dari DB
  useEffect(() => {
    if (editId) {
      fetch(`/api/news/${editId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data");
          return res.json();
        })
        .then((data) => {
          if (data) {
            setTitle(data.title || "");
            setSlug(data.slug || "");
            setLabels(Array.isArray(data.labels) ? data.labels.join(", ") : "");
            setCategory(data.category || "Berita");
            setStatus(data.status || "PUBLISHED");
            if (data.publishedAt) {
              setPublishedAt(new Date(data.publishedAt).toISOString().slice(0, 16));
            }
            if (editor && data.content) {
              editor.commands.setContent(data.content);
            }
          }
        })
        .catch(() => toast.error("Gagal memuat data artikel"));
    }
  }, [editId, editor]);

  // Open Link Modal
  const openLinkModal = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const selected = editor.state.doc.textBetween(from, to, " ");
    setLinkText(selected || "");
    setLinkUrl(editor.getAttributes("link").href || "");
    setShowLinkModal(true);
  };

  // Insert Link via Modal
  const handleInsertLink = () => {
    if (!editor || !linkUrl) return;

    if (linkText) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }

    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
    toast.success("Link berhasil ditambahkan!");
  };

  // Upload File Gambar Direct
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("files", files[0]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengunggah gambar");

      const uploadedUrl = data.urls[0];
      if (editor && uploadedUrl) {
        editor.chain().focus().setImage({ src: uploadedUrl }).run();
      }

      setShowImageModal(false);
      toast.success("Gambar berhasil disisipkan!");
    } catch (err: any) {
      toast.error(err.message || "Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  // Insert Image URL Direct
  const handleInsertImageUrl = () => {
    if (editor && imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setShowImageModal(false);
      setImageUrl("");
      toast.success("Gambar berhasil disisipkan!");
    }
  };

  // Save / Update Handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const htmlContent = editor?.getHTML() || "";

    if (!title.trim() || !htmlContent || htmlContent === "<p></p>") {
      toast.error("Judul dan isi artikel wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const endpoint = editId ? `/api/news/${editId}` : "/api/news";
      const method = editId ? "PUT" : "POST";
      const labelArray = labels ? labels.split(",").map((s) => s.trim()) : [];

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          content: htmlContent,
          labels: labelArray,
          category: category || (labelArray.length > 0 ? labelArray[0] : "Berita"),
          status,
          publishedAt: new Date(publishedAt).toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan postingan");

      toast.success(editId ? "Berita berhasil diperbarui!" : "Berita berhasil dipublikasikan!");
      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* TOPBAR EDITOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Link
            href="/admin/news"
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <input
            type="text"
            placeholder="Ketik judul artikel di sini..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full text-lg font-bold text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => toast.info("Mode Pratinjau Artikel")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition shadow-sm"
          >
            <Eye className="h-4 w-4" /> Pratinjau
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {loading ? "Menyimpan..." : editId ? "Perbarui" : "Publikasikan"}
          </button>
        </div>
      </div>

      {/* MAIN EDITOR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT AREA: TOOLBAR & CANVAS */}
        <div className="lg:col-span-3 space-y-4">
          {/* TOOLBAR */}
          {editor && (
            <div className="flex items-center gap-1 flex-wrap rounded-2xl border border-slate-200 bg-white p-2 shadow-sm text-slate-600">
              {/* DROPDOWN UKURAN FONT */}
              <select
                onChange={(e) => {
                  const size = e.target.value;
                  if (size === "normal") {
                    editor.chain().focus().setParagraph().run();
                  } else if (size === "h1") {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                  } else if (size === "h2") {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                  } else if (size === "h3") {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                  }
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 outline-none"
              >
                <option value="normal">Teks Normal (14px)</option>
                <option value="h3">Judul Sub-bagian (18px)</option>
                <option value="h2">Judul Sedang (20px)</option>
                <option value="h1">Judul Utama (24px)</option>
              </select>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("bold") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100"
                }`}
                title="Bold (Tebal)"
              >
                <Bold className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("italic") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100"
                }`}
                title="Italic (Miring)"
              >
                <Italic className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("strike") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100"
                }`}
                title="Strikethrough (Coret)"
              >
                <Strikethrough className="h-4 w-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              {/* BULLET & NUMBER LIST */}
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("bulletList") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100"
                }`}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("orderedList") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100"
                }`}
                title="Ordered List"
              >
                <ListOrdered className="h-4 w-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              {/* LINK & GAMBAR */}
              <button
                type="button"
                onClick={openLinkModal}
                className={`p-2 rounded-lg transition ${
                  editor.isActive("link") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100"
                }`}
                title="Tambah Link"
              >
                <LinkIcon className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
                title="Tambah Gambar"
              >
                <ImageIcon className="h-4 w-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              {/* UNDO & REDO */}
              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2 hover:bg-slate-100 rounded-lg transition disabled:opacity-30"
                title="Undo"
              >
                <Undo className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2 hover:bg-slate-100 rounded-lg transition disabled:opacity-30"
                title="Redo"
              >
                <Redo className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* CANVAS EDITOR */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm min-h-[500px]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Setelan Postingan
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Kategori Utama
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Berita / Promo / Edukasi"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Label / Tag Artikel
              </label>
              <input
                type="text"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="berita, promo, honda"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
                Jadwal Publikasi
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Permalink (Otomatis)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-600 focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Status Postingan
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-none font-semibold"
              >
                <option value="PUBLISHED">Dipublikasikan</option>
                <option value="DRAFT">Draf (Disimpan)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL POPUP TAMBAH LINK */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Sisipkan Link / Tautan</h3>
              <button onClick={() => setShowLinkModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teks Tautan</label>
                <input
                  type="text"
                  placeholder="Contoh: Kunjungi Situs AutoCorp"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Tujuan</label>
                <input
                  type="url"
                  placeholder="https://autocorp.id"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-600/20"
              >
                Tambahkan Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POPUP SISIPKAN GAMBAR */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Sisipkan Gambar Artikel</h3>
              <button onClick={() => setShowImageModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Upload File Gambar</label>
                <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition">
                  <Upload className="h-6 w-6 text-slate-400 mb-1" />
                  <span className="font-semibold text-slate-700">
                    {uploading ? "Mengunggah..." : "Pilih File Gambar (PNG, JPG)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold uppercase">Atau Pakai Link URL</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Gambar External</label>
                <input
                  type="url"
                  placeholder="https://domain.com/gambar.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={!imageUrl}
                onClick={handleInsertImageUrl}
                className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 disabled:opacity-50"
              >
                Sisipkan URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export Default dengan pembungkus Suspense
export default function NewsEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-slate-500">Memuat Editor Berita...</div>}>
      <NewsEditorContent />
    </Suspense>
  );
}