'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [domains] = useState([
    'google.com',
    'facebook.com',
    'youtube.com',
    'twitter.com',
  ]);

  const [pages] = useState([
    'page/2',
    'page/3',
    'page/4',
    'page/5',
  ]);

  return (
    <div className="container">
      <header>
        <h1>Welcome</h1>
      </header>

      <main>
        {/* Featured Domains Section */}
        <section>
          <h2>Featured Domains</h2>
          <ul>
            {domains.map((domain, index) => (
              <li key={index}>
                <Link href={`/domain/${domain}`}>{domain}</Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Featured Pages Section */}
        <section>
          <h2>Featured Pages</h2>
          <ul>
            {pages.map((page, index) => (
              <li key={index}>
                <Link href={`/${page}`}>{page}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          min-height: 667px;
          max-width: 375px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        header {
          background-color: #0070f3;
          color: white;
          width: 100%;
          text-align: center;
          padding: 1rem;
        }
        h1 {
          font-size: 1.5rem;
        }
        main {
          flex-grow: 1;
          width: 100%;
          padding: 1rem;
        }
        section {
          margin-bottom: 2rem;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 0.5rem 0;
        }
        a {
          text-decoration: none;
          color: #0070f3;
        }
        a:hover {
          text-decoration: underline;
        }
        footer {
          background-color: #f5f5f5;
          width: 100%;
          text-align: center;
          padding: 1rem;
        }
        p {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
