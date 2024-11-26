// This file does not have the "use client" directive since it is a Server Component
import data from '../../../data/staticData.json';
import styles from '../../../styles/Home.module.css';

// This function is used to generate metadata for SEO
export async function generateMetadata({ params }) {
  const domain = data.find((item) => item.Domain.toLowerCase() === params.slug);
  if (domain) {
    return {
      title: `${domain.Domain} - Details`,
      description: `Details about ${domain.Domain}`,
    };
  }
  return { title: 'Domain Not Found' };
}

// Keep this as a Server Component (no "use client")
export default function DomainPage({ params }) {
  const { slug } = params;
  const domainData = data.find((item) => item.Domain.toLowerCase() === slug);

  if (!domainData) {
    return (
      <div className={styles.container}>
        <h1>Domain Not Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{domainData.Domain}</h1>
      <p>Rank: {domainData.Rank}</p>
      <p>Data1: {domainData.data1}</p>
      <p>Data2: {domainData.data2}</p>
      <p>Data3: {domainData.data3}</p>
    </div>
  );
}
