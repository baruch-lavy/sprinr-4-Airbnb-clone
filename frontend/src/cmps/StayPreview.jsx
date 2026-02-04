import { generateRandomData } from "../services/stay/index";

export function StayPreview({ stay }) {
  return (
    <article className="stay-preview">
      <div className="img-container">
        <img src={stay.imgUrls[0]} alt={stay.name} />
        <div className="like-icon">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
          </svg>
        </div>
      </div>
      <div className="stay-info">
        <h3 className="stay-name">
          {stay.name?.split(" ").slice(0, 5).join(" ") ||
            stay.summary?.split(" ").slice(0, 5).join(" ")}
        </h3>
        <p className="stay-date">{generateRandomData(stay).dates}</p>
        <p className="stay-price">${stay.price * 2} for 2 nights</p>
        <p className="stay-rate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="10px"
            viewBox="0 -960 960 960"
            width="10px"
            fill="#000000"
          >
            <path d="m352-293 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243-144l63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Zm237-333Z" />
          </svg>
          {generateRandomData(stay).rate}
        </p>
      </div>
    </article>
  );
}
