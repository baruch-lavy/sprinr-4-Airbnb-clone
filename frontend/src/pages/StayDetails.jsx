import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_STICKY_HEADER,
  SET_DETAILS_PAGE,
} from "../store/reducers/system.reducer";
import { loadStay } from "../store/actions/stay.actions";
import {DatePicker} from 'react-datepicker';

export function StayDetails() {
  const dispatch = useDispatch();
  const { stayId } = useParams();
  const stay = useSelector((state) => state.stayModule.stay);

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

  useEffect(() => {
    if (window.MagicScroll && stay) {
      window.MagicScroll.refresh();
    }
  }, [stay]);

  function hundleIsStickyHeaderOnClick(ev) {
    if (!isStickyHeader && ev.clientY > 200) {
      dispatch({ type: SET_STICKY_HEADER, isSticky: true });
    }
  }

  function getAmenityIcon(amenity) {
    const label = (amenity || "").toLowerCase();

    const Icon = ({ path }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="#111111"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    );

    const iconMap = [
      {
        test: /wifi|internet|ethernet/,
        path: "M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-160-160-56-56q44-44 100.5-68T480-428q59 0 115.5 24T696-336l-56 56q-33-33-75-50.5T480-348q-43 0-85 17.5T320-280Zm-144-144-56-56q73-73 167.5-112.5T480-632q99 0 193.5 39.5T840-480l-56 56q-62-62-140.5-94T480-550q-86 0-164.5 32T176-424Z",
      },
      {
        test: /tv|cable|netflix|stream/,
        path: "M320-200q-33 0-56.5-23.5T240-280v-360q0-33 23.5-56.5T320-720h320q33 0 56.5 23.5T720-640v360q0 33-23.5 56.5T640-200H320Zm0-80h320v-360H320v360Zm-80 160v-80h480v80H240Z",
      },
      {
        test: /kitchen|oven|stove|microwave|cook|coffee/,
        path: "M200-80q-33 0-56.5-23.5T120-160v-640q0-33 23.5-56.5T200-880h560q33 0 56.5 23.5T840-800v640q0 33-23.5 56.5T760-80H200Zm0-80h560v-640H200v640Zm120-80q33 0 56.5-23.5T400-320q0-33-23.5-56.5T320-400q-33 0-56.5 23.5T240-320q0 33 23.5 56.5T320-240Zm240 0q33 0 56.5-23.5T640-320q0-33-23.5-56.5T560-400q-33 0-56.5 23.5T480-320q0 33 23.5 56.5T560-240Zm-120 320h80v-640h-80v640Z",
      },
      {
        test: /parking|garage|car/,
        path: "M300-160v-640h240q83 0 141.5 58.5T740-600q0 83-58.5 141.5T540-400H380v240h-80Zm80-320h160q50 0 85-35t35-85q0-50-35-85t-85-35H380v240Z",
      },
      {
        test: /pool|hot tub|jacuzzi|spa/,
        path: "M160-200v-80q33 0 56.5-23.5T240-360v-240q0-66 47-113t113-47h160q66 0 113 47t47 113v240q0 33 23.5 56.5T800-280v80q-66 0-113-47t-47-113v-240q0-33-23.5-56.5T560-680H400q-33 0-56.5 23.5T320-600v240q0 66-47 113t-113 47Zm40-360v-120h80v120h-80Zm240 0v-120h80v120h-80Zm240 0v-120h80v120h-80Z",
      },
      {
        test: /air conditioning|a\/c|ac\b|heating|heat/,
        path: "M480-120q-100 0-170-70t-70-170q0-63 30-118t80-88v-314h80v314q50 33 80 88t30 118q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-52-27.5-95T480-520q-60 22-97.5 65T360-360q0 66 47 113t113 47Z",
      },
      {
        test: /washer|dryer|laundry/,
        path: "M240-120q-33 0-56.5-23.5T160-200v-560q0-33 23.5-56.5T240-840h480q33 0 56.5 23.5T800-760v560q0 33-23.5 56.5T720-120H240Zm0-80h480v-560H240v560Zm240-60q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z",
      },
      {
        test: /gym|fitness|workout/,
        path: "M280-280v-80H200q-33 0-56.5-23.5T120-440v-80q0-33 23.5-56.5T200-600h80v-80h80v400h-80Zm400 0v-400h80v80h80q33 0 56.5 23.5T920-520v80q0 33-23.5 56.5T840-360h-80v80h-80ZM360-440v-80h240v80H360Z",
      },
      {
        test: /elevator|lift/,
        path: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm200-80h80v-240h-80v240Zm160 0h80v-240h-80v240Z",
      },
      {
        test: /smoke detector|smoke alarm/,
        path: "M240-320q0-100 70-170t170-70q100 0 170 70t70 170v200H240v-200Zm80 0h320q0-66-47-113t-113-47q-66 0-113 47t-47 113Zm160 120q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200Z",
      },
      {
        test: /carbon monoxide|co detector/,
        path: "M480-120q-133 0-226.5-93.5T160-440q0-133 93.5-226.5T480-760q133 0 226.5 93.5T800-440q0 133-93.5 226.5T480-120Zm0-80q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Z",
      },
      {
        test: /fire extinguisher/,
        path: "M360-120v-240h80v240h-80Zm0-280v-120q0-50 35-85t85-35q50 0 85 35t35 85v120H360Zm80-160h80v-40q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600v40Z",
      },
      {
        test: /first aid|medical|kit/,
        path: "M440-120v-120H320v-80h120v-120h80v120h120v80H520v120h-80Zm-200-40q-33 0-56.5-23.5T160-240v-440q0-33 23.5-56.5T240-760h120q0-33 23.5-56.5T440-840h80q33 0 56.5 23.5T600-760h120q33 0 56.5 23.5T800-680v440q0 33-23.5 56.5T720-160H240Z",
      },
      {
        test: /wheelchair|accessible|step[- ]?free|wide doorway|ground floor|elevator/,
        path: "M380-80v-280q-33-8-56.5-31.5T300-448q0-42 29-71t71-29q42 0 71 29t29 71q0 33-19.5 59T440-360v80h120l60 160h-84l-40-120h-56v160h-80Z",
      },
      {
        test: /pets allowed|pet friendly/,
        path: "M180-200q-25 0-42.5-17.5T120-260q0-25 17.5-42.5T180-320q25 0 42.5 17.5T240-260q0 25-17.5 42.5T180-200Zm140-120q-25 0-42.5-17.5T260-380q0-25 17.5-42.5T320-440q25 0 42.5 17.5T380-380q0 25-17.5 42.5T320-320Zm160 0q-25 0-42.5-17.5T420-380q0-25 17.5-42.5T480-440q25 0 42.5 17.5T540-380q0 25-17.5 42.5T480-320Zm140 120q-25 0-42.5-17.5T560-260q0-25 17.5-42.5T620-320q25 0 42.5 17.5T680-260q0 25-17.5 42.5T620-200Zm-140 80q-74 0-127-53t-53-127q0-52 27.5-95.5T400-464l80-88 80 88q45 41 72.5 84.5T660-300q0 74-53 127t-127 53Z",
      },
      {
        test: /breakfast|coffee|tea/,
        path: "M240-200v-480h320v80h80q33 0 56.5 23.5T720-520v80q0 33-23.5 56.5T640-360h-80v160H240Zm320-240h80v-80h-80v80Z",
      },
      {
        test: /work|desk|workspace|laptop/,
        path: "M160-200v-80h640v80H160Zm80-120v-320h480v320H240Zm80-80h320v-160H320v160Z",
      },
      {
        test: /doorman|concierge|security/,
        path: "M480-120q-100 0-170-70t-70-170q0-79 46-140t119-80v-140h150q25 0 42.5 17.5T615-670q0 25-17.5 42.5T555-610H485v78q63 1 112 45t49 117q0 100-70 170t-170 70Z",
      },
      {
        test: /hangers|closet|wardrobe/,
        path: "M480-640q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm-280 520v-80l240-160v-80h80v80l240 160v80H200Z",
      },
      {
        test: /hair dryer|dryer/,
        path: "M240-160v-160h240q50 0 85-35t35-85q0-50-35-85t-85-35H240v-160h240q83 0 141.5 58.5T680-440q0 83-58.5 141.5T480-240H320v80h-80Z",
      },
      {
        test: /iron|iron board/,
        path: "M240-160v-80h320q33 0 56.5-23.5T640-320q0-33-23.5-56.5T560-400H320q-50 0-85-35t-35-85q0-50 35-85t85-35h320v80H320q-17 0-28.5 11.5T280-520q0 17 11.5 28.5T320-480h240q50 0 85 35t35 85q0 50-35 85t-85 35H240Z",
      },
      {
        test: /essentials|toiletries|shampoo|soap/,
        path: "M360-120v-80h240v80H360Zm40-120v-240h160v240H400Zm0-280h160q33 0 56.5-23.5T640-600q0-33-23.5-56.5T560-680H400q-33 0-56.5 23.5T320-600q0 33 23.5 56.5T400-520Z",
      },
      {
        test: /bed|linens|pillows|blankets/,
        path: "M120-240v-80h80v-240q0-33 23.5-56.5T280-640h400q33 0 56.5 23.5T760-560v240h80v80H120Zm160-80h160v-160H280v160Zm240 0h160v-160H520v160Z",
      },
      {
        test: /self check-in|keypad|smart lock|lockbox/,
        path: "M480-120q-66 0-113-47t-47-113q0-42 20.5-77T394-414v-66q0-35 25-60t60-25q35 0 60 25t25 60v66q33 22 53.5 57t20.5 77q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-280q0-24-13-43t-33-28v-89q0-14-10-24t-24-10q-14 0-24 10t-10 24v89q-20 9-33 28t-13 43q0 33 23.5 56.5T480-200Z",
      },
      {
        test: /private entrance/,
        path: "M200-120v-80h80v-320q0-33 23.5-56.5T360-600h80v-120h80v120h80q33 0 56.5 23.5T680-520v320h80v80H200Zm240-80h80v-200h-80v200Z",
      },
      {
        test: /smoking|smoke free|no smoking/,
        path: "M120-200v-80h480v80H120Zm520 0q-25 0-42.5-17.5T580-260q0-25 17.5-42.5T640-320q25 0 42.5 17.5T700-260q0 25-17.5 42.5T640-200Zm-40-320-160-160 56-56 160 160-56 56Z",
      },
      {
        test: /balcony|patio|deck|outdoor|garden|yard/,
        path: "M120-160v-80h80v-400h560v400h80v80H120Zm160-80h400v-320H280v320Zm40-60v-80h320v80H320Z",
      },
      {
        test: /beach|waterfront|lake/,
        path: "M120-200v-80q60 0 120-30t120-30q60 0 120 30t120 30q60 0 120-30t120-30v80q-60 0-120 30t-120 30q-60 0-120-30t-120-30q-60 0-120 30T120-200Zm0-200v-80q60 0 120-30t120-30q60 0 120 30t120 30q60 0 120-30t120-30v80q-60 0-120 30t-120 30q-60 0-120-30t-120-30q-60 0-120 30T120-400Z",
      },
      {
        test: /view|scenic|mountain|city|ocean/,
        path: "M120-200v-80l200-200 160 160 200-240 160 200v160H120Z",
      },
      {
        test: /family|kid|crib|high chair|children/,
        path: "M200-160v-400h160q33 0 56.5 23.5T440-480v320H200Zm360 0v-320q0-33 23.5-56.5T640-560h120v400H560Z",
      },
    ];

    const match = iconMap.find(({ test }) => test.test(label));
    if (match) return <Icon path={match.path} />;

    return (
      <Icon path="M480-120q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm-36-206 228-228-56-56-172 172-84-84-56 56 140 140Z" />
    );
  }

  return (
    <main className="stay-details">
      {!stay && <div className="loader">Loading...</div>}
      {stay && (
        <>
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
                  {stay?.host.isSuperhost && (
                    <span className="superhost">{"Superhost" + " · "}</span>
                  )}
                  <span>
                    {Math.ceil(Math.random() * 10) + " "}
                    Years hosting
                  </span>
                </span>
              </div>
            </div>
            <div className="short-desc-points">
              <div className="short-desc-point">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path d="M436-740q28-28 68-28t68 28q28 28 28 68t-28 68q-28 28-68 28t-68-28q-28-28-28-68t28-68ZM504 0 336-180l60-84-60-72 72-96v-20q-68-32-106-89.5T264-672q0-100 70-170t170-70q100 0 170 70t70 170q0 65-32.5 120T624-464v344L504 0ZM336-672q0 63 40.5 110.5T480-506v98l-52 70 59 71-58 81 76 82 47-46v-361q53-16 86.5-61T672-672q0-70-49-119t-119-49q-70 0-119 49t-49 119Z" />
                </svg>
                <div className="desc">
                  <span>
                    <strong>Exceptional check-in experience</strong>
                  </span>
                  <span>
                    Recent guests gave the check-in process a 5-star rating.
                  </span>
                </div>
              </div>
              <div className="short-desc-point">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path d="M443.79-444q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM288-145v-71l240-48v-393q0-16.92-10.5-30.46T490-704l-202-40v-72l217 40q41.8 8.07 68.4 41.35Q600-701.37 600-657v450l-312 62Zm-144 1v-72h72v-528q0-30 21.15-51T288-816h384q30 0 51 21t21 51v528h72v72H144Zm144-72h384v-528H288v528Z" />
                </svg>
                <div className="desc">
                  <span>
                    <strong>Self check-in</strong>
                  </span>
                  <span>You can check in with the building staff.</span>
                </div>
              </div>
              <div className="short-desc-point">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path d="M531-501q21-21 21-51t-21-51q-21-21-51-21t-51 21q-21 21-21 51t21 51q21 21 51 21t51-21Zm-51 310q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z" />
                </svg>
                <div className="desc">
                  <span>
                    <strong>Beautiful area</strong>
                  </span>
                  <span>Guests love this home’s scenic location.</span>
                </div>
              </div>
            </div>
            <div className="long-description">{stay?.summary}</div>
            <div className="sleep-place">
              <h3>Where you'll sleep</h3>
              <div
                className="MagicScroll mcs-border mcs-rounded"
                data-options="items:2; step:1; speed:500; arrows: inside; height: 190px;"
              >
                <div className="img img-1" desc="1 King bed">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkc3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="Bedroom"
                  />
                </div>
                <div className="img img-2" desc="1 Queen bed">
                  <img
                    src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVkc3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="Bedroom"
                  />
                </div>
                <div className="img img-3" desc="1 Sofa">
                  <img
                    src="https://images.unsplash.com/photo-1675756544970-968f9e3f7ca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNvZmFzfGVufDB8fDB8fHww"
                    alt="Sofa"
                  />
                </div>
              </div>
            </div>
            <div className="amenities">
              <h3>What this place offers</h3>
              {stay?.amenities.slice(0, 6).map((amenity, idx) => (
                <div key={idx} className="amenity">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            <div className="calendar">
              <h3>2 nights in {stay?.loc.city}</h3>
              <p>{new Date().toLocaleDateString()} - {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>

              <DatePicker
                selected={new Date()}
                onChange={(date) => console.log(date)}  
                startDate={new Date()}
                endDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
                selectsRange
                inline
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
}
