import Link from 'next/link';
import { paginate, totalPages } from '../utils/pagination';
import data from '../data/staticData.json';
import styles from '../styles/Home.module.css';  // Ensure correct import path

const ITEMS_PER_PAGE = 100;

export const generateMetadata = async ({ params }) => {
  const currentPage = parseInt(params.page) || 1;
  const title = `Domain List ${currentPage}`;
  const description = `Browse domains on page ${currentPage}. Showing ${ITEMS_PER_PAGE} items per page.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
    },
  };
};

export default function MainPage() {
  const paginatedData = paginate(data, 1, ITEMS_PER_PAGE);  // For page 1
  const total = totalPages(data, ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Domain List</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => {
            const domainSlug = item.Domain && item.Domain.toLowerCase().replace(/\s+/g, '-');
            return (
              <tr key={item.Rank}>
                <td>{item.Rank}</td>
                <td>
                  <Link href={`/domain/${domainSlug}`} className={styles.link}>
                    {item.Domain}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <Link href={`/page/1`} className={styles.link}>
          Page 1
        </Link>
        {/* Add more pagination if needed */}
      </div>
    </div>
  );
}
