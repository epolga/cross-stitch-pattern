'use client';

import { useEffect, useState } from 'react';
import { Design } from '@/lib/types';

export default function DesignPage({ params }: { params: { id: string } }) {
    const [design, setDesign] = useState<Design | null>(null);

    useEffect(() => {
        async function fetchDesign() {
            try {
                const res = await fetch(`/api/designs/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch design');
                const data = await res.json();
                setDesign(data.design);
            } catch (error) {
                console.error('Error fetching design:', error);
                setDesign(null);
            }
        }
        fetchDesign();
    }, [params.id]);

    if (!design) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{design.Caption}</h1>
            <img
                src={design.ImageUrl || design.Caption}
                alt={design.Caption}
                className="w-full max-w-md h-auto rounded mb-4"
            />
            <p className="text-gray-600 mb-4">{design.Description}</p>
            <a href="/design" className="text-blue-600 hover:underline">
                Back to Designs
            </a>
        </div>
    );
}