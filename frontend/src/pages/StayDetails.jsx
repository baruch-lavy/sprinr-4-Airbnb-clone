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
        <div className="short-desc-points">
          <div className="short-desc-point">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M436-740q28-28 68-28t68 28q28 28 28 68t-28 68q-28 28-68 28t-68-28q-28-28-28-68t28-68ZM504 0 336-180l60-84-60-72 72-96v-20q-68-32-106-89.5T264-672q0-100 70-170t170-70q100 0 170 70t70 170q0 65-32.5 120T624-464v344L504 0ZM336-672q0 63 40.5 110.5T480-506v98l-52 70 59 71-58 81 76 82 47-46v-361q53-16 86.5-61T672-672q0-70-49-119t-119-49q-70 0-119 49t-49 119Z"/></svg>
            <div className="desc">
              <span><strong>Exceptional check-in experience</strong></span>
              <span>Recent guests gave the check-in process a 5-star rating.</span>
            </div>
          </div>
          <div className="short-desc-point">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M443.79-444q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM288-145v-71l240-48v-393q0-16.92-10.5-30.46T490-704l-202-40v-72l217 40q41.8 8.07 68.4 41.35Q600-701.37 600-657v450l-312 62Zm-144 1v-72h72v-528q0-30 21.15-51T288-816h384q30 0 51 21t21 51v528h72v72H144Zm144-72h384v-528H288v528Z"/></svg>
            <div className="desc">
              <span><strong>Self check-in</strong></span>
              <span>You can check in with the building staff.</span>
            </div>
          </div>
          <div className="short-desc-point">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M531-501q21-21 21-51t-21-51q-21-21-51-21t-51 21q-21 21-21 51t21 51q21 21 51 21t51-21Zm-51 310q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
            <div className="desc">
              <span><strong>Beautiful area</strong></span>
              <span>Guests love this home’s scenic location.</span>
            </div>
          </div>
        </div>
        <div className="long-description">
          {stay?.summary}
        </div>
        <div className="sleep-place">
          <h3>Where you'll sleep</h3>
          <div className="sleep-place-details">
            <div className="place place-1">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
              <span><strong>Bedroom 1</strong></span>
              <span>1 queen bed</span>
            </div>
            <div className="place place-2">
              <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVkc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
              <span><strong>Bedroom 2</strong></span>
              <span>1 queen bed</span>
            </div>
            <div className="place place-3">
              <img src="https://images.unsplash.com/photo-1675756544970-968f9e3f7ca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNvZmFzfGVufDB8fDB8fHww" alt="" />
              <span><strong>Living Room</strong></span>
              <span>1 Great sofa</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
