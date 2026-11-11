import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-4">
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/4 h-64 w-full text-[#303050]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="none" stroke="currentColor" d="M0,160 C480,320 960,0 1440,160" />
        <path fill="none" stroke="currentColor" d="M0,240 C520,60 920,340 1440,120" opacity="0.6" />
      </svg>

      <header className="relative pt-10">
        <Logo />
      </header>

      <main className="relative flex w-full max-w-xl flex-1 flex-col items-center justify-center pb-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white sm:text-3xl"
        >
          Boas-vindas ao <span className="text-blue_base">Weather</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-2 text-gray-400 sm:text-lg"
        >
          Escolha um local para ver a previsão do tempo
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 w-full text-left"
        >
          <SearchBox autoFocus />
        </motion.div>
      </main>
    </div>
  );
}
