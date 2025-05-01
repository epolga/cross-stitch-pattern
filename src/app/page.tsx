'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Design } from '@/lib/types';

export default function Home() {
  const [designs, setDesigns] = useState<Design[]>([]);

  useEffect(() => {
    async function fetchDesigns() {
      const res = await fetch('/api/designs');
      const data = await res.json();
      setDesigns(data.designs || []);
    }
    fetchDesigns();
  }, []);

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Cross Stitch Designs</h1>
        {designs.length === 0 ? (
            <p className="text-gray-600">No designs available.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {designs.map((design) => (
                  <Link href={`/design/${design.id}`} key={design.id}>
                    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                      <img
                          src={design.photoUrl}
                          alt={design.title}
                          className="w-full h-48 object-cover rounded mb-4"
                      />
                      <h2 className="text-xl font-semibold">{design.title}</h2>
                      <p className="text-gray-600">{design.description}</p>
                    </div>
                  </Link>
              ))}
            </div>
        )}
      </div>
  );
}