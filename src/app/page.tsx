import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "OMNIS TECH",
            "url": "https://omnis-tech-v3.netlify.app",
            "logo": "https://omnis-tech-v3.netlify.app/assets/logo.png",
            "sameAs": [
              "https://twitter.com/omnistech",
              "https://instagram.com/omnistech"
            ]
          })
        }}
      />
      <Hero />
      <ProductGrid />
      <TrustSection />
    </main>
  );
}
