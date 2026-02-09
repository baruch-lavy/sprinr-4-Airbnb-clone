import { NavLink } from "react-router-dom";
import { FaAirbnb } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_STICKY_HEADER } from "../store/reducers/system.reducer";

export function StickyAppHeader({ user }) {
  const { isStickyHeader } = useSelector((state) => state.systemModule);
  const { isDetailsPage } = useSelector((state) => state.systemModule);
  const dispatch = useDispatch();



  useEffect(() => {
    window.addEventListener("scroll", hundleIsStickyHeader);
    return () => {
      window.removeEventListener("scroll", hundleIsStickyHeader);
      window.removeEventListener("click", hundleIsStickyHeader);
    };
  }, []);

  function hundleIsStickyHeader() {
    if (isDetailsPage) return;
    if (window.scrollY > 10) {
      if (!isStickyHeader) {
        dispatch({ type: SET_STICKY_HEADER, isSticky: true });
      }
    } else {
      dispatch({ type: SET_STICKY_HEADER, isSticky: false });
    }
  }

  function hundleIsStickyHeaderOnClick() {
    if (isStickyHeader) {
      dispatch({ type: SET_STICKY_HEADER, isSticky: false });
    } 
  }

  return (
    <header className="sticky-app-header">
      <div className="sticky-left-section">
        <NavLink className="nav-link" to={"/"}>
          <div className="logo-wrapper">
            <FaAirbnb className="logo" />
          </div>
        </NavLink>
      </div>

      <div className="sticky-right-section">
        {user && (
          <img className="user-img" src={user.imgUrl} alt={user.fullname} />
        )}
        <img
          className="language-img"
          src="https://cdn-icons-png.flaticon.com/128/11334/11334930.png"
          alt=""
        />
        <img
          className="humburger-img"
          src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
          alt=""
        />
      </div>

      <div
        className="sticky-search-container"
        onClick={hundleIsStickyHeaderOnClick}
      >
        <div className="sticky-where-section">
          <div className="home-icon">🏘️</div>
          <span>Anywhere</span>
        </div>
        <div className="border"></div>
        <div className="sticky-when-section">
          <span>Anytime</span>
        </div>
        <div className="border"></div>
        <div className="sticky-who-section">
          <span>Add Guests</span>
          <div className="sticky-search-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#e3e3e3"
            >
              <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
