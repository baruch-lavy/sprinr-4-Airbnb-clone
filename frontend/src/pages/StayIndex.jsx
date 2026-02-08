import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/actions/stay.actions";
import { Loading } from "../cmps/Loading";
import { StayList } from "../cmps/StayList";
import { setPageIndex } from "../store/actions/stay.actions";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const pageIndex = useSelector(
    (storeState) => storeState.stayModule.pageIndex,
  );

  useEffect(() => {
    loadStays();
  }, [pageIndex]);

  if (!stays) return <Loading />;
  return (
    <>
      <StayList stays={stays} />
        <div className="pagination">
            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>Previous</button>
            <span>Page {pageIndex + 1}</span>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
    </>
  );
}
