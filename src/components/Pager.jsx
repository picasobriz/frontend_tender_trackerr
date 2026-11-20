export default function Pager({ data, page, setPage }) {
  const pages = Number(data?.pages || 1);
  if (pages <= 1) return null;
  return (
    <div className="pager">
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
      <span>Page {page} of {pages}</span>
      <button disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
