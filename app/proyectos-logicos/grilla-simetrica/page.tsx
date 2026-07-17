import Image from 'next/image';
import React from 'react';

const imagesData = [
  "https://picsum.photos/300/300?random=1",
  "https://picsum.photos/300/300?random=2",
  "https://picsum.photos/300/300?random=3",
  "https://picsum.photos/300/300?random=4",
  "https://picsum.photos/300/300?random=5",
  "https://picsum.photos/300/300?random=6",
  "https://picsum.photos/300/300?random=7",
  "https://picsum.photos/300/300?random=8",
  "https://picsum.photos/300/300?random=9",
  "https://picsum.photos/300/300?random=10",
  "https://picsum.photos/300/300?random=11",
  "https://picsum.photos/300/300?random=12",
  "https://picsum.photos/300/300?random=13",
  "https://picsum.photos/300/300?random=14",
];

const Page = () => {
  return (
    <main style={styles.container}>
      {imagesData.map((src, index) => (
        <Image
          key={index}
          alt={`img-grilla-${index}`}
          src={src}
          width={300}
          height={300}
          priority={index === 0} // Evita el aviso de LCP en la primera imagen
        />
      ))}
    </main>
  );
};

export default Page;

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "1rem",
        padding: "1rem",
    }
};