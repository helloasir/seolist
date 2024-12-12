import Link from 'next/link';
import { paginate, totalPages } from '../../../utils/pagination';
import styles from '../../../styles/Home.module.css';

const ITEMS_PER_PAGE = 1000;
const DATA_URL = 'https://pub-d11224d3592c4a5994c22e5e3fc303e7.r2.dev/webs_small.json';

// SEO Metadata for each page
export async function generateMetadata({ params }) {
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
}

export default async function PaginatedPage({ params }) {
  // Await params as it is asynchronous in nature
  const { page } = await params;
  const currentPage = parseInt(page) || 1;

  // Fetch data from the external JSON file
  let data = [];
  try {
    const response = await fetch(DATA_URL, { next: { revalidate: 60 } }); // Revalidate after 60 seconds for cache
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Error Loading Data</h1>
        <Link href="/page/1" className={styles.link}>
          Go to Page 1
        </Link>
      </div>
    );
  }

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
            const domainSlug =
              item.Domain && typeof item.Domain === 'string'
                ? item.Domain.toLowerCase().replace(/\s+/g, '-')
                : '';

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
