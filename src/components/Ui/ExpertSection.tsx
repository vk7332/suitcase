interface ExpertSectionProps {
  onContactClick: () => void;
}

export default function ExpertSection({ onContactClick }: ExpertSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 mb-12">
      <div className="rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 p-8 md:p-12 shadow-xl shadow-blue-500/5 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 shadow-2xl border-4 border-white dark:border-gray-800 ring-4 ring-amber-500/20">
              <img
                src="https://images.pexels.com/photos/5668838/pexels-photo-5668838.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Tax Expert"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4 uppercase tracking-widest">
              Professional Advisory
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy-dark dark:text-white leading-tight">
              Expert Guidance by <span className="text-amber-600 dark:text-amber-500 italic">VK Tax</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
              Looking for a trusted CA to simplify financial compliance for you?
              We work with a network of verified Chartered Accountants who can provide peace of mind and precision.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {[
                { label: 'ITR FILING', primary: true },
                { label: 'TAX ADVISORY' },
                { label: 'GST COMPLIANCE' }
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={onContactClick}
                  className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl ${btn.primary
                      ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-amber-500'
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


