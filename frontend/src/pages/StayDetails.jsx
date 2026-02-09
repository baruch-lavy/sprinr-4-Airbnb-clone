import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_STICKY_HEADER,
  SET_DETAILS_PAGE,
} from "../store/reducers/system.reducer";

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
    };
  }, []);

  useEffect(() => {
    loadStay(stayId);
  }, [stayId]);

  function hundleIsStickyHeaderOnClick(ev) {
    if (!isStickyHeader && ev.clientY > 200) {
      dispatch({ type: SET_STICKY_HEADER, isSticky: true });
    }
  }

  return (
    <main className="stay-details">
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
      <section className="main-content">
        <div className="description-header">
          <h2 className="stay-title">{stay?.name}</h2>
          <div className="stay-summary">
            <span>
              {stay?.capacity} guests · {stay?.roomType} · {stay?.bedrooms}{" "}
              {stay?.bedrooms > 1 ? "beds" : "bed"} · {stay?.bathrooms}{" "}
              {stay?.bathrooms > 1 ? "baths" : "bath"}
            </span>
          </div>
          <div className="stay-reviews-summary">
            <div className="stay-rate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="12px"
                viewBox="0 -960 960 960"
                width="12px"
                fill="#000000"
              >
                <path d="m352-293 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243-144l63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Zm237-333Z" />
              </svg>
              <span>{stay?.reviews.length / 5} · </span>
              <div className="reviews-count">
                {stay?.reviews.length} reviews
              </div>
            </div>
          </div>
        </div>
        <div className="host-details">
          <img
            src="https://plus.unsplash.com/premium_photo-1688700438303-44bfcc7b43c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGhvc3R8ZW58MHx8MHx8fDA%3D"
            alt={`${stay?.host.fullname}'s profile`}
            className="host-img"
            width="50px"
          />
          <div className="host-description">
            <h3 className="host-name">Hosted by {stay?.host.fullname}</h3>
            <span>
              {stay?.host.isSuperhost && <span className="superhost">{'Superhost' + ' · '}</span>}
              <span>
                {Math.ceil(Math.random() * 10) + ' '}
                Years hosting
              </span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
