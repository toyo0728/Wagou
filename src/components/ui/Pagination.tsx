import styles from './Pagination.module.css';
import Link from 'next/link';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  // 一覧の1ページ目のパス。末尾スラッシュ付きで渡す(例: '/news/', '/news/category/1/')
  basePath: string;
};

function PageArrow({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      className={`${styles.arrowIcon} ${direction === 'prev' ? styles.isPrev : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      width={9}
      height={13}
      viewBox="0 0 9 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L7.5 6.5L1 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageHref = (pageNumber: number) =>
    pageNumber === 1 ? basePath : `${basePath}page/${pageNumber}/`;

  const prevHref =
    currentPage > 1 ? getPageHref(currentPage - 1) : undefined;
  const nextHref =
    currentPage < totalPages ? getPageHref(currentPage + 1) : undefined;

  return (
    <nav className={styles.pagination} aria-label="ページネーション">
      {prevHref ? (
        <Link className={styles.arrow} href={prevHref} aria-label="前のページ">
          <PageArrow direction="prev" />
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.isDisabled}`} aria-hidden="true">
          <PageArrow direction="prev" />
        </span>
      )}
      <div className={styles.numbers}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const href = getPageHref(pageNumber);

          return (
            <Link
              key={pageNumber}
              className={`${styles.number} ${pageNumber === currentPage ? styles.isCurrent : ''}`}
              href={href}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>
      {nextHref ? (
        <Link className={styles.arrow} href={nextHref} aria-label="次のページ">
          <PageArrow direction="next" />
        </Link>
      ) : (
        <span className={`${styles.arrow} ${styles.isDisabled}`} aria-hidden="true">
          <PageArrow direction="next" />
        </span>
      )}
    </nav>
  );
}
