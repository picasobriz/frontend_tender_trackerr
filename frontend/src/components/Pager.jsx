export default function Pager({ data, page, setPage }) {
  const totalPages = data?.pages ?? data?.total_pages ?? 1;

  if (totalPages <= 1) return null;

  return (
    <div className="row between">
      <button
        className="ghost"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <span className="muted">
        Page {page} of {totalPages}
      </span>

      <button
        className="ghost"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
