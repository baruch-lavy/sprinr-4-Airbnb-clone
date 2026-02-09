import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_STICKY_HEADER, SET_DETAILS_PAGE } from "../store/reducers/system.reducer";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { loadStay } from "../store/actions/stay.actions";

export function StayDetails() {
  const dispatch = useDispatch();
  const { stayId } = useParams();
  const stay = useSelector((storeState) => storeState.stayModule.stay);
  const { isStickyHeader } = useSelector((state) => state.systemModule);

  useEffect(() => {
    dispatch({ type: SET_STICKY_HEADER, isSticky: true });
    dispatch({ type: SET_DETAILS_PAGE, isDetailsPage: true });

    document.addEventListener("click", hundleIsStickyHeaderOnClick);

    return () => {
      dispatch({ type: SET_STICKY_HEADER, isSticky: false });
      dispatch({ type: SET_DETAILS_PAGE, isDetailsPage: false });
      document.removeEventListener("click", hundleIsStickyHeaderOnClick);
    }
  }, []);

  useEffect(() => {
    loadStay(stayId);
  }, [stayId]);

  function hundleIsStickyHeaderOnClick(ev) { 
    console.log(ev);
    if (!isStickyHeader && ev.clientY > 200) {
      dispatch({ type: SET_STICKY_HEADER, isSticky: true });
    }
  } 


  return (
    <section className="stay-details">
      {stay && (
        <div>
          <h3 className="stay-description">
            {stay.summary.split(" ").slice(0, 10).join(" ").replace(":", "")}
          </h3>
          <div className="stay-gallery">
            {stay.imgUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Stay image ${idx + 1}`}
                className="stay-image"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
