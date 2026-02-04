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



export function AppHeader() {
  const search = useSelector((state) => state.searchModule.search || {});

  console.log(search);

  const [isWhereDropdownOpen, setIsWhereDropdownOpen] = useState(false);
  const [isWhoDropdownOpen, setIsWhoDropdownOpen] = useState(false);
  const [filterBy, setFilterBy] = useState(getDefaultFilter());
  const searchTimeout = useRef(null);

  

  useEffect(() => {
    loadStays(filterBy);
  }, [filterBy]);


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
      const { name , value } = ev.target;
      setFilterBy((prevFilterBy) => ({ ...prevFilterBy, [name]: value }));
    }, 500);
  }

  return (
    <header className="app-header">
      <div className="left-section">
        <NavLink className="nav-link">
          <div className="logo-wrapper">
            <FaAirbnb className="logo" />
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
        <p className="right-section-text">Become a Host</p>
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
                <div key={index} className="suggestion">
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
              // selected={startDate}
              // onChange={(date) => setStartDate(date)}
              // startDate={search.startDate}
              // endDate={search.endDate}
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
                {["adults", "children", "infants", "pets"].map(key => (
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
                        // onClick={() => handleGuestChange(key, -1)}
                        disabled={search.guests?.[key] === 0}
                      >
                        −
                      </button>
                      <span>{search.guests?.[key] || 0}</span>
                      <button
                        className="guest-btn"
                        // onClick={() => handleGuestChange(key, 1)}
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
