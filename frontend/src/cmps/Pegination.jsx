export function Pegination({ pageIndex, setPageIndex }) {
  return (
    <div className="pagination">
      <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
        Previous
      </button>
      <span>Page {pageIndex + 1}</span>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
}