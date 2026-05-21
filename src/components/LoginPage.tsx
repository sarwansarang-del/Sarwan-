import React, { useState } from "react";
import { School, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Trim check
    if (email.trim() && password.trim()) {
      onLoginSuccess(email.trim());
    } else {
      setError("براہ کرم ای میل اور پاس ورڈ درج کریں (Please enter email and password)");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("student@skillup.pk");
    setPassword("123456");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d11] p-4 text-gray-100 overflow-hidden relative">
      {/* Abstract Background Accents */}
      <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Logo and Titles */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center p-5 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl shadow-lg shadow-blue-500/20 mb-4"
          >
            <School className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent font-sans">
            SkillUp PK
          </h1>
          <p className="text-gray-400 mt-2 font-medium">سیکھیں اور فری لانسنگ شروع کریں</p>
          <p className="text-xs text-blue-400 mt-1 font-mono tracking-wider">LEARN SKILLS & START FREELANCING</p>
        </div>

        {/* Login Area */}
        <div className="bg-[#14141d]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            لاگ ان کریں <span className="text-xs text-gray-400 font-mono font-normal">/ Login</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email form field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 font-mono uppercase tracking-wider">
                Email / ای میل
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@skillup.pk"
                  className="w-full pl-10 pr-4 py-3 bg-[#1c1c28] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors focus:ring-1 focus:ring-blue-500 text-sm font-sans"
                />
              </div>
            </div>

            {/* Password form field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 font-mono uppercase tracking-wider">
                Password / پاس ورڈ
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#1c1c28] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Error Message Section */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-2 text-xs text-red-300"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span className="leading-relaxed">{error}</span>
              </motion.div>
            )}

            {/* Action button */}
            <button
              type="submit"
              className="w-full h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-500/10 gap-2 hover:scale-[1.01]"
              style={{ minHeight: "44px" }}
            >
              <span className="font-semibold text-lg">لاگ ان کریں</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="pt-2 border-t border-gray-800/40 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-blue-400/80 hover:text-blue-300 underline underline-offset-4 cursor-pointer"
            >
              ٹیچر یا طالب علم کے نقلی اکاؤنٹ کا ڈیٹا خود بخود درج کریں
            </button>
          </div>
        </div>

        {/* Footer info elements */}
        <p className="text-center text-xs text-gray-600 mt-8 font-mono">
          SkillUp PK • Platform v2.0 • Secured Gateway
        </p>
      </motion.div>
    </div>
  );
}
