import Link from 'next/link';
import { paginate, totalPages } from '../../../utils/pagination';
import data from '../../../data/staticData.json'; // Assuming data is in staticData.json
import styles from '../../../styles/Home.module.css';

const ITEMS_PER_PAGE = 100;

// SEO Metadata for each page
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

export default async function PaginatedPage({ params }) {
  const currentPage = parseInt(params.page) || 1;
  const paginatedData = paginate(data, currentPage, ITEMS_PER_PAGE);
  const total = totalPages(data, ITEMS_PER_PAGE);

  if (currentPage < 1 || currentPage > total) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Page Not Found</h1>
        <Link href="/page/1" className={styles.link}>
          Go to Page 1
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Domain List {currentPage}</h1>
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <Link href={`/page/${currentPage - 1}`} className={styles.link}>
            Previous
          </Link>
        )}
                  {/* Add Home Page Link */}
                  <span className={styles.spacer}></span>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        {currentPage < total && (
          <Link href={`/page/${currentPage + 1}`} className={styles.link}>
            Next
          </Link>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => {
            // Ensure that Domain exists before calling .replace()
            const domainSlug = item.Domain && typeof item.Domain === 'string'
              ? item.Domain.toLowerCase().replace(/\s+/g, '-')
              : ''; // Fallback to empty string if Domain is undefined or not a string

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
        {currentPage > 1 && (
          <Link href={`/page/${currentPage - 1}`} className={styles.link}>
            Previous 
          </Link>
        )}
          {/* Add Home Page Link */}
          <span className={styles.spacer}></span>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        {currentPage < total && (
          <Link href={`/page/${currentPage + 1}`} className={styles.link}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
