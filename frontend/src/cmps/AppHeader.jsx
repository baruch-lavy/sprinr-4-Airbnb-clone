import { NavLink } from "react-router-dom";
import { FaAirbnb } from "react-icons/fa";
import { destinations, getDefaultFilter } from "../services/stay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { loadStays } from "../store/actions/stay.actions";
import { setSearchData } from "../store/actions/stay.actions";
import { showSuccessMsg } from "../services/event-bus.service";
import { SET_STICKY_HEADER } from '../store/reducers/system.reducer'
import { useDispatch } from "react-redux";


export function AppHeader({ user }) {
  showSuccessMsg(`Destination set to ${user ? user.fullname : "Guest"}`);
  const [isWhereDropdownOpen, setIsWhereDropdownOpen] = useState(false);
  const [isWhoDropdownOpen, setIsWhoDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const search = useSelector((state) => state.searchModule);
  const [filterBy, setFilterBy] = useState(getDefaultFilter());
  const searchTimeout = useRef(null);
  const dates = useRef([null, null]);
  const pageIndex = useSelector(
    (storeState) => storeState.stayModule.pageIndex,
  );
  const localPageIndex = useRef(0);
  const isStickyHeader = useSelector((state) => state.systemModule.isStickyHeader);
  const isDetailsPage = useSelector((state) => state.systemModule.isDetailsPage);
  const dispatch = useDispatch();

  useEffect(() => {
    loadStays(filterBy);
  }, [filterBy]);

  useEffect(() => {
    handlePageIndexChange();
  }, [pageIndex]);

  useEffect(() => {
    window.addEventListener("scroll", hundleIsStickyHeader);
    return () => {
      window.removeEventListener("scroll", hundleIsStickyHeader);
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

  function handlePageIndexChange() {
    if (localPageIndex.current !== pageIndex) {
      const updatedFilter = { ...filterBy, pageIndex };
      localPageIndex.current = pageIndex;
      setFilterBy(updatedFilter);
    }
  }

  function handleDropdownState(ev) {
    if (ev.target.placeholder === "Search Destination") {
      setIsWhereDropdownOpen(!isWhereDropdownOpen);
      setIsWhoDropdownOpen(false);
    } else if (ev.target.placeholder === "Add Guest") {
      setIsWhoDropdownOpen(!isWhoDropdownOpen);
      setIsWhereDropdownOpen(false);
    } else {
      setIsWhereDropdownOpen(false);
      setIsWhoDropdownOpen(false);
    }
  }

  function hundleChangeDebounced(ev) {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      const { name, value } = ev.target;
      const updatedFilter = { ...filterBy, [name]: value };
      setFilterBy(updatedFilter);
      setSearchData(updatedFilter);
    }, 500);
  }

  function hundeDatesSearch(date) {
    if (!dates.current[0]) {
      dates.current[0] = date;
    } else {
      dates.current[1] = date;
    }
    const [startDate, endDate] = dates.current;
    if (startDate && endDate) {
      const updatedFilter = { ...filterBy, startDate, endDate };
      setFilterBy(updatedFilter);
      setSearchData(updatedFilter);
    }
  }

  function handleGuestChange(guestType, diff) {
    const updatedGuests = { ...search.guests };
    updatedGuests[guestType] = Math.max(
      0,
      (updatedGuests[guestType] || 0) + diff,
    );
    const totalGuests = Object.values(updatedGuests).reduce(
      (sum, val) => sum + val,
      0,
    );
    const updatedFilter = { ...filterBy, totalGuests: totalGuests };
    setSearchData({
      ...search,
      guests: updatedGuests,
      totalGuests: totalGuests,
    });
    setFilterBy({ ...updatedFilter, guests: updatedGuests });
  }

  function hundleWhereDropdownClick(destinationName) {
    const updatedFilter = { ...filterBy, destination: destinationName };
    setFilterBy(updatedFilter);
    setSearchData(updatedFilter);
    setIsWhereDropdownOpen(false);
  }

  function hundleHumburgerClick() {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  }

  return (
    <header className="app-header">
      <div className="left-section">
        <NavLink className="nav-link" to={"/"}>
          <div className="logo-wrapper">
            <FaAirbnb className="logo"/>
            <p className="logo-text">airbnb</p>
          </div>
        </NavLink>
      </div>

      <div className="middle-section">
        <nav className="nav-bar">
          <NavLink to={"/"}>
            <div className="home-icon">🏘️</div>
            <span className="homes-text">Homes</span>
          </NavLink>
          <a href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1514/1514192.png"
              alt=""
            />
            <span>Experiences</span>
          </a>
          <a href="#">
            <div className="bell-icon">🛎️</div>
            <span>Services</span>
          </a>
        </nav>
      </div>

      <div className="right-section">
        {user && (
          <img className="user-img" src={user.imgUrl} alt={user.fullname} />
        )}
        <p className="right-section-text">Become a Host</p>
        <svg className="language-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#302929"><path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480.5-880t155 31.5q72.5 31.5 127 86t86 127Q880-563 880-480.5T848.5-325q-31.5 73-86 127.5t-127 86Q563-80 480.5-80T325-111.5ZM480-162q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>
        <img
          className="humburger-img"
          src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
          alt=""
          onClick={hundleHumburgerClick}
        />

        {isUserDropdownOpen && (
          <div className="user-dropdown">
            <p className="help-txt">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#221e1e"
              >
                <path d="M513.5-254.5Q528-269 528-290t-14.5-35.5Q499-340 478-340t-35.5 14.5Q428-311 428-290t14.5 35.5Q457-240 478-240t35.5-14.5ZM442-394h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
              Help Center
            </p>
            <p>
              <strong>Become a host</strong>
              <br />
              Host your home, host an experience, or host a restaurant
            </p>
            <NavLink
              to={"/login"}
              className="login-link"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              <strong>Login/Signup</strong>
            </NavLink>
          </div>
        )}
      </div>

      <div className="search-container">
        <div className="where-section">
          <span>Where</span>
          <input
            type="text"
            name="txt"
            placeholder="Search Destination"
            onClick={handleDropdownState}
            onChange={hundleChangeDebounced}
          />
          {isWhereDropdownOpen && (
            <div className="where-dropdown">
              <div className="dropdown-header">Suggested destinations</div>
              {destinations.map((dest, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => hundleWhereDropdownClick(dest.name)}
                >
                  <FontAwesomeIcon icon={dest.icon} className="icon" />
                  <div>
                    <strong>{dest.name}</strong>
                    <p>{dest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border"></div>
        <div className="when-section" onClick={handleDropdownState}>
          <span>when</span>
          <div className="date-picker-container">
            <DatePicker
              className="from"
              placeholderText="Add dates"
              selected={dates.current[0]}
              onChange={hundeDatesSearch}
              startDate={dates.current[0]}
              endDate={dates.current[1]}
              selectsRange
            />
          </div>
        </div>
        <div className="border"></div>
        <div className="who-section">
          <div className="who-wrapper">
            <span>Who</span>
            <input
              type="text"
              placeholder="Add Guest"
              onClick={handleDropdownState}
            />
            {isWhoDropdownOpen && (
              <div className="who-dropdown">
                {["adults", "children", "infants", "pets"].map((key) => (
                  <div className="guest-row" key={key}>
                    <div className="guest-info">
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </strong>
                      <p className="ages-info">
                        {key === "pets" ? (
                          <a href="#">Bringing a service animal?</a>
                        ) : (
                          `${key === "adults" ? "Ages 13 or above" : key === "children" ? "Ages 2-12" : "Under 2"}`
                        )}
                      </p>
                    </div>
                    <div className="guest-controls">
                      <button
                        className="guest-btn"
                        onClick={() => handleGuestChange(key, -1)}
                        disabled={search.guests?.[key] === 0}
                      >
                        −
                      </button>
                      <span>{search.guests?.[key] || 0}</span>
                      <button
                        className="guest-btn"
                        onClick={() => handleGuestChange(key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="search-icon-container">
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
