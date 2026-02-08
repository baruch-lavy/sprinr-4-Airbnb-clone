import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/actions/stay.actions";
import { Loading } from "../cmps/Loading";
import { StayList } from "../cmps/StayList";
import { Pegination } from "../cmps/Pegination";
import { setPageIndex } from "../store/actions/stay.actions";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const pageIndex = useSelector((storeState) => storeState.stayModule.pageIndex);

  useEffect(() => {
    loadStays();
  }, []);

  if (!stays) return <Loading />;
  return (
    <>
      <StayList stays={stays} />
      <Pegination pageIndex={pageIndex} setPageIndex={setPageIndex}/>
    </>
  );
}
