import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-dark-800/50 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-podcast-500 to-podcast-700 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7zm4 7.93A7.001 7.001 0 0 1 5 13H3a9.001 9.001 0 0 0 8 8.93V24h2v-2.07A9.001 9.001 0 0 0 21 13h-2a7.001 7.001 0 0 1-6 6.93v.07h-2v-.07z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">My Podcast</span>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs">
              Engaging conversations, inspiring stories, and thought-provoking discussions delivered straight to your ears.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/episodes', label: 'Episodes' },
                { href: '/series', label: 'Series' },
                { href: '/guests', label: 'Guests' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-podcast-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Subscribe</h3>
            <p className="text-dark-400 text-sm mb-4">Never miss a new episode. Subscribe on your favorite platform.</p>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-podcast-400 hover:bg-dark-700 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-8.18v4.819c11.104.062 20.093 9.041 20.156 20.129h4.844c-.063-13.765-11.225-24.918-25-24.948z" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:text-podcast-400 hover:bg-dark-700 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 17.2l-1.625-.944A6.925 6.925 0 0112 17.5a6.925 6.925 0 01-3.391-1.244l-1.625.944A.75.75 0 016 16.5v-9a.75.75 0 01.984-.716l1.625.944A6.925 6.925 0 0112 6.5c1.234 0 2.393.322 3.391 1.228l1.625-.944A.75.75 0 0118 7.5v9a.75.75 0 01-.984.7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-dark-800/50 text-center">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} My Podcast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}