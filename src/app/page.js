"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const HERO_PHRASES = [
  "ORVAINT",
  "Adorn your aura.",
  "Ring • Bracelet • Chain",
  "Titanium & Stainless Steel",
  "Sweatproof • Waterproof • Anti-Tarnish",
  "1-Year Replacement Warranty",
  "Elevate Your Everyday Presence",
  "Launching Soon in Bangladesh"
];

const TARGET_DATE = new Date("2027-01-15T00:00:00").getTime();

function getTimeRemaining() {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ComingSoonPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setTimeLeft(getTimeRemaining());
    }, 0);
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const currentPhrase = HERO_PHRASES[phraseIndex];
    let timeout;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, 75);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
      }, 250);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#000000] text-white">
      {/* Brand Logo Loading Spinner on Refresh */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]"
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="h-28 w-28 rounded-full border-2 border-white/10 border-t-[#f5d061] border-r-[#d4af37]/60 shadow-[0_0_24px_rgba(212,175,55,0.2)]"
              />
              <Image
                src="/imgs/logo.png"
                alt="ORVAINT Loading"
                width={64}
                height={64}
                priority
                className="absolute h-12 w-auto object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continuous Golden Silk / Shimmer Sweep */}
      <motion.div
        aria-hidden="true"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent skew-x-12"
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.15, 0.32, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.18),transparent_70%)]"
      />

      {/* Ambient monochrome background pulses */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-white/15 blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-48 left-1/4 h-[460px] w-[460px] rounded-full bg-white/10 blur-[150px]"
        />

        {/* Subtle radial grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.85) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* Main Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8 sm:py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-3xl mx-auto flex flex-col items-center text-center"
          >
            {/* Static Logo Only */}
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/imgs/logo.png"
                  alt="ORVAINT Logo"
                  width={180}
                  height={180}
                  priority
                  className="h-28 w-auto sm:h-36 object-contain"
                />
              </div>

              {/* Luxury Badge with Smooth Golden Silk Effect (No Border, Bold, Animated ...) */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5d061] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f5d061] shadow-[0_0_10px_#d4af37]" />
                  </span>
                  <span className="bg-gradient-to-r from-[#b8860b] via-[#f7e28b] to-[#d4af37] bg-clip-text text-transparent">
                    Coming soon
                    <span className="inline-flex ml-0.5 gap-0.5">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{
                            opacity: [0.25, 1, 0.25],
                            y: [0, -5, 0],
                            scale: [0.85, 1.35, 0.85],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: dot * 0.2,
                            ease: "easeInOut",
                          }}
                          className="inline-block text-[#f5d061] drop-shadow-[0_0_10px_rgba(245,208,97,0.85)]"
                        >
                          .
                        </motion.span>
                      ))}
                    </span>
                  </span>
                </span>
              </motion.div>

              {/* Premium Typing Main Heading */}
              <motion.div
                variants={itemVariants}
                className="h-[3.25rem] sm:h-[4rem] md:h-[4.5rem] flex items-center justify-center mb-4"
              >
                <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight whitespace-nowrap drop-shadow-[0_0_24px_rgba(212,175,55,0.18)]">
                  <span className="bg-gradient-to-b from-white via-white to-[#e6d294] bg-clip-text text-transparent">
                    {displayedText}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block ml-1.5 w-[3px] h-[0.9em] align-middle rounded-full bg-gradient-to-b from-[#f7e28b] to-[#b8860b] shadow-[0_0_12px_rgba(245,208,97,0.8)]"
                  />
                </h1>
              </motion.div>

              {/* Subcopy */}
              <motion.div
                variants={itemVariants}
                className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 sm:mb-10 space-y-2"
              >
                <p>
                  Adorn Your Aura. Premium rings, bracelets &amp; chains crafted in
                  titanium and stainless steel.
                </p>
                <p className="text-sm sm:text-base text-zinc-300 font-medium tracking-wide">
                  Sweatproof • Waterproof • Anti-Tarnish — Designed to elevate your
                  everyday presence.
                </p>
              </motion.div>

              {/* Countdown Timer (Ends January 15) */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12 w-full max-w-md mx-auto"
              >
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-[#0a0a0a]/90 backdrop-blur-xl py-3.5 px-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  >
                    <span
                      suppressHydrationWarning
                      className="text-2xl sm:text-3xl font-semibold tracking-tight text-white tabular-nums"
                    >
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-zinc-400">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Social Links in Hero Section with Silk Hover Effect */}
              <motion.div
                variants={itemVariants}
                className="mt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
              >
                {[
                  {
                    name: "Facebook",
                    href: "https://facebook.com/orvaint",
                    icon: (
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    ),
                  },
                  {
                    name: "Instagram",
                    href: "https://instagram.com/orvaint.fashion",
                    icon: (
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    ),
                  },
                  {
                    name: "TikTok",
                    href: "https://tiktok.com/@orvaint",
                    icon: (
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    ),
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ORVAINT on ${social.name}`}
                    whileHover="hover"
                    whileTap={{ scale: 0.96 }}
                    className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-wide text-zinc-400 hover:text-[#f5d061] transition-colors duration-300"
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={{
                        hover: { x: ["-130%", "230%"], opacity: [0, 1, 0] },
                      }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#f5d061]/30 to-transparent skew-x-12 opacity-0"
                    />
                    <svg
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {social.icon}
                    </svg>
                    <span className="relative z-10">{social.name}</span>
                  </motion.a>
                ))}
              </motion.div>
          </motion.div>
        </main>

    </div>
  );
}
