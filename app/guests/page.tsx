import type { Metadata } from 'next';
import GuestCard from '@/components/GuestCard';
import { getGuests } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Guests | My Podcast',
  description: 'Meet the amazing guests who have appeared on My Podcast.',
};

export const revalidate = 60;

export default async function GuestsPage() {
  const guests = await getGuests();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-podcast-600/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-podcast-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Our Guests</h1>
        </div>
        <p className="text-dark-400 text-lg max-w-2xl">
          Meet the incredible people who have shared their stories, expertise, and perspectives on our show.
        </p>
      </div>

      {/* Guests Grid */}
      {guests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {guests.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-dark-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No guests yet</h3>
          <p className="text-dark-400">Guest profiles will appear here once added.</p>
        </div>
      )}
    </div>
  );
}