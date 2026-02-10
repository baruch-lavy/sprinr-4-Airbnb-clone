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
        <svg
          className="language-img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#302929"
        >
          <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480.5-880t155 31.5q72.5 31.5 127 86t86 127Q880-563 880-480.5T848.5-325q-31.5 73-86 127.5t-127 86Q563-80 480.5-80T325-111.5ZM480-162q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
        </svg>
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
