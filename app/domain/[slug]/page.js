// Remove the "use client" directive
import { useRouter } from 'next/navigation'; // Use next/navigation
import data from '../../data/staticData.json';
import styles from '../../styles/Home.module.css'; // Importing the styles

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

export default function DomainPage({ params }) {
  const { slug } = params;
  const domainData = data.find((item) => item.Domain.toLowerCase() === slug);

  if (!domainData) {
    return (
      <div className={styles.container}>
        <h1 className={styles.domainTitle}>Domain Not Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles['domain-details']}>
        <h1 className={styles.domainTitle}>{domainData.Domain}</h1>
        <p className={styles.domainText}><strong>Rank:</strong> {domainData.Rank}</p>
        <p className={styles.domainText}><strong>Data1:</strong> {domainData.data1}</p>
        <p className={styles.domainText}><strong>Data2:</strong> {domainData.data2}</p>
        <p className={styles.domainText}><strong>Data3:</strong> {domainData.data3}</p>
        
        {/* Add a button here */}
        <button className={styles.button}>Go to Next Domain</button>
      </div>
    </div>
  );
}
