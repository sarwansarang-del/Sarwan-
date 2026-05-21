import React from "react";
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  Trophy, 
  Award, 
  BookOpen, 
  Clock, 
  Flame, 
  ShieldCheck 
} from "lucide-react";
import { motion } from "motion/react";

interface ProfilePageProps {
  userEmail: string;
  onLogout: () => void;
}

export default function ProfilePage({ userEmail, onLogout }: ProfilePageProps) {
  // Extract a user handle for the display name
  const userName = userEmail.split("@")[0];
  const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);

  // Stats data
  const stats = [
    { label: "مکمل کورسز", value: "0", sub: "Courses Done", icon: <Trophy className="w-5 h-5 text-amber-400" /> },
    { label: "جاری اسباق", value: "3", sub: "Lessons Active", icon: <BookOpen className="w-5 h-5 text-blue-400" /> },
    { label: "رینکنگ پوزیشن", value: "#42", sub: "Global Rank", icon: <Award className="w-5 h-5 text-emerald-400" /> },
    { label: "روزانہ حاضری", value: "1 Day", sub: "Daily Streak", icon: <Flame className="w-5 h-5 text-fuchsia-400" /> },
  ];

  const trophies = [
    { title: "ابتدائی سفر", urduTitle: "سیکھنے کی شروعات", desc: "Signed up and initiated the profile setup.", date: "May 2026" },
    { title: "لاگ ان بونس", urduTitle: "روزانہ کا تحفہ", desc: "First successful daily login reward unlocked.", date: "May 2026" }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Title Header */}
      <div>
        <h2 className="text-2.5xl font-bold tracking-tight text-white">
          میرا پروفائل <span className="text-xs text-gray-400 font-mono font-normal">/ Student Profile</span>
        </h2>
        <p className="text-sm text-gray-400">اپنے تعلیمی سفر کی تفصیلات اور حاصل کردہ اسناد یہاں دیکھیں</p>
      </div>

      {/* Profile Details Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Student Avatar & Quick Logout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 bg-[#14141d] border border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-between text-center space-y-6"
        >
          <div className="space-y-4 w-full">
            {/* Beautiful Profile Avatar Icon */}
            <div className="relative inline-block mt-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 border border-blue-400/30 flex items-center justify-center text-white text-3xl font-bold">
                {capitalizedName.slice(0, 2)}
              </div>
              <span className="absolute bottom-1 right-1 p-1 bg-emerald-500 rounded-full border border-[#14141d]">
                <ShieldCheck className="w-4 h-4 text-[#14141d] fill-[#14141d]" />
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-sans">
                {capitalizedName === "Student" ? "SkillUp Student" : capitalizedName}
              </h3>
              <p className="text-xs text-blue-400 font-medium">طالب علم / Creative Student Partner</p>
            </div>

            {/* Profile Fields lines */}
            <div className="bg-gray-900/60 rounded-2xl border border-gray-800 p-4 space-y-3.5 text-left text-xs text-gray-400 font-mono w-full">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-600 shrink-0" />
                <span className="truncate">{userEmail}</span>
              </div>
              <div className="flex items-center gap-2.5 border-t border-gray-800/60 pt-3">
                <Calendar className="w-4 h-4 text-gray-600 shrink-0" />
                <span>Joined: May 2026</span>
              </div>
            </div>
          </div>

          {/* Logout Action Button */}
          <button
            onClick={onLogout}
            className="w-full h-11 bg-red-500/10 hover:bg-red-600 border border-red-500/20 hover:border-red-400 text-red-400 hover:text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-lg hover:shadow-red-950/20"
            style={{ minHeight: "44px" }}
          >
            <LogOut className="w-4 h-4" />
            <span>لاگ آؤٹ کریں / Logout</span>
          </button>
        </motion.div>

        {/* Right Side: Learn stats and Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#14141d] border border-gray-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{stat.sub}</span>
                  {stat.icon}
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Badges / Rewards unlocked section */}
          <div className="bg-[#14141d] border border-gray-800 rounded-3xl p-6 space-y-4">
            <h4 className="text-base font-semibold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>قابل فخر اسناد اور انعامات <span className="text-xs text-gray-500 font-mono font-normal">/ Badges</span></span>
            </h4>

            <div className="space-y-3.5">
              {trophies.map((trophy, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-950/60 rounded-2xl border border-gray-800 flex items-start gap-3.5"
                >
                  <div className="p-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-sm font-bold text-white truncate">{trophy.title}</h5>
                      <span className="text-[10px] uppercase font-mono text-amber-500 shrink-0 font-medium">{trophy.date}</span>
                    </div>
                    <p className="text-xs text-blue-400 font-medium">{trophy.urduTitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{trophy.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
