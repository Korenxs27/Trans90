"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Eye, EyeOff, KeyRound, Mail, User as UserIcon, Lock, Car, X } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  
  // State Form Sign In
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State Form Sign Up
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State Forget Password Modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [forgotLoading, setForgotLoading] = useState(false);

  const router = useRouter();

  const handleSwitchMode = (targetMode: "login" | "signup") => {
    setMode(targetMode);
    setError("");
  };

  // Validasi Password Checklist
  const passwordRules = {
    minLength: signupPassword.length >= 8,
    hasUpper: /[A-Z]/.exec(signupPassword) !== null,
    hasNumber: /[0-9]/.exec(signupPassword) !== null,
    hasSpecial: /[@$!%*?&]/.exec(signupPassword) !== null,
  };

  const isAdminEmail =
    signupEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    loginEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.hasUpper &&
    passwordRules.hasNumber &&
    (passwordRules.hasSpecial || isAdminEmail);

  // Submit Handler Login & Signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup" && !isPasswordValid) {
      setError("Password belum memenuhi kriteria keamanan minimal!");
      return;
    }

    setLoading(true);
    setError("");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const bodyPayload =
      mode === "login"
        ? { email: loginEmail, password: loginPassword }
        : { name: signupName, email: signupEmail, password: signupPassword };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses autentikasi");

      const role = data.user?.role;
      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Handler
  const handleGoogleAuth = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) setError(`Google Auth Error: ${error.message}`);
  };

  // Forget Password Handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotStatus(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengirimkan link reset password.");

      setForgotStatus({
        type: "success",
        msg: "Instruksi reset password telah dikirim ke email Anda. Silakan periksa kotak masuk!",
      });
    } catch (err: any) {
      setForgotStatus({
        type: "error",
        msg: err.message,
      });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen max-h-screen overflow-hidden bg-white font-sans text-slate-900 flex flex-col lg:flex-row selection:bg-blue-600 selection:text-white">
      
      {/* ================= PANEL KIRI: GAMBAR FADED DENGAN LOGO TRANS90 DI ATASNYA ================= */}
      <div className="relative w-full lg:w-5/12 h-64 lg:h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
        
        {/* Background Gambar Mobil yang Di-Fade (Opacity Rendah + Gradient Dark Overlay) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-1000 hover:scale-105 filter brightness-75"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/70" />

        {/* LOGO TRANS90 DI CENTER ATAS GAMBAR */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 select-none">
          {/* Ubah src di bawah jika kamu memiliki file logo image sendiri (misal: /logo-trans90.png) */}
        <img
              src="/logo-trans90.png"
              alt="Trans90 Logo"
              /* `brightness-0 invert` mengubah gambar menjadi putih sempurna */
              className="h-full w-full object-contain filter brightness-0 invert drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              onError={(e) => {
                e.currentTarget.src = "/images/logo.png"; // Fallback ke logo default jika logo khusus tidak ditemukan
              }}
            />
        </div>
      </div>

      {/* ================= PANEL KANAN: FORM AREA (SIGN IN / SIGN UP) ================= */}
      <div className="relative w-full lg:w-7/12 h-full min-h-screen p-6 lg:p-16 flex flex-col justify-between bg-white">
        
        {/* Header Switcher Kanan Atas */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {mode === "login" ? "Sign In Account" : "Sign Up Account"}
          </span>

          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSwitchMode("login")}
              className={`px-5 py-2 rounded-full transition ${
                mode === "login" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode("signup")}
              className={`px-5 py-2 rounded-full transition ${
                mode === "signup" ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Content Terpusat */}
        <div className="my-auto max-w-md mx-auto w-full py-6">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {mode === "login" ? "Selamat Datang Kembali" : "Buat Akun Baru"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === "login"
                ? "Masukkan email dan kata sandi Anda untuk mengakses layanan."
                : "Isi data diri Anda di bawah ini untuk pendaftaran akun."}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Nama Lengkap</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={mode === "login" ? loginEmail : signupEmail}
                  onChange={(e) => mode === "login" ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Kata Sandi</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => { setIsForgotModalOpen(true); setForgotStatus(null); setForgotEmail(loginEmail); }}
                    className="text-[11px] font-semibold text-blue-600 hover:underline"
                  >
                    Lupa Kata Sandi?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={mode === "login" ? loginPassword : signupPassword}
                  onChange={(e) => mode === "login" ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Checklist Password khusus Sign Up */}
            {mode === "signup" && signupPassword.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                <p className="text-[10px] font-semibold text-slate-500">Syarat Kata Sandi:</p>
                <div className="grid grid-cols-2 gap-1 text-[9px]">
                  <div className={passwordRules.minLength ? "text-emerald-600 font-semibold" : "text-rose-500"}>Min. 8 Karakter</div>
                  <div className={passwordRules.hasUpper ? "text-emerald-600 font-semibold" : "text-rose-500"}>1 Huruf Besar</div>
                  <div className={passwordRules.hasNumber ? "text-emerald-600 font-semibold" : "text-rose-500"}>1 Angka</div>
                  <div className={passwordRules.hasSpecial || isAdminEmail ? "text-emerald-600 font-semibold" : "text-rose-500"}>
                    {isAdminEmail ? "Bypass Admin Simbol" : "1 Simbol"}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (mode === "signup" && !isPasswordValid)}
              className="w-full rounded-2xl bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 disabled:opacity-50 active:scale-[0.98] transition-all cursor-pointer"
            >
              {loading ? "Memproses..." : mode === "login" ? "Sign In" : "Sign Up"}
            </button>

            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                atau
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
              </svg>
              {mode === "login" ? "Masuk dengan Google" : "Daftar dengan Google"}
            </button>
          </form>
        </div>

        <div className="text-center text-[11px] text-slate-400">
          © 2026 Trans90 Ecosystem. All rights reserved.
        </div>
      </div>

      {/* MODAL RESET KATA SANDI */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 bg-white text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold">Reset Kata Sandi</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Masukkan email terdaftar Anda untuk menerima instruksi reset kata sandi.
            </p>

            {forgotStatus && (
              <div className={`mb-4 rounded-xl border p-3 text-xs font-medium ${
                forgotStatus.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}>
                {forgotStatus.msg}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Email Terdaftar</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="rounded-2xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {forgotLoading ? "Mengirim..." : "Kirim Link Reset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}