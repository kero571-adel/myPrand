export default function Footer() {
  return (
    <footer
      className="border-t border-[#1a2e1a] bg-[#050a05] py-3 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-[#3a5a3a] tracking-wider">
        <span className="text-[#00FF00] font-bold">
          v2.4.0-STABLE // STYL_SYSTEMS_INTL
        </span>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <span>--GIT-BRANCH:MAIN</span>
          <span>--SYSTEM-STATUS:ONLINE</span>
          <span className="text-[#5a7a5a] hover:text-[#00FF00] cursor-pointer transition-colors">
            --CLI-SOCIALS
          </span>
        </div>
      </div>
    </footer>
  );
}
