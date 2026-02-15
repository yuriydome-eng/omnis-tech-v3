import { Metadata } from 'next';
import ProductClient from './ProductClient';

interface Props {
    params: { handle: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const handle = params.handle;
    const title = handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: title,
        description: `Experience the advanced engineering of ${title}. Swiss-designed wearable technology from OMNIS TECH.`,
    };
}

export default function Page({ params }: Props) {
    return <ProductClient />;
}
