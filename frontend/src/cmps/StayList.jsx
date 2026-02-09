import { StayPreview } from "./StayPreview";
import { useNavigate } from "react-router-dom";

export function StayList({ stays }) {
  const navigate = useNavigate();

  function hundleStayClick(stayId) {
    navigate(`/stay/${stayId}`);
  }

  return (
    <div className="stay-container">
      <ul className="stay-list">
        {stays.map((stay) => (
          <li className="stay-preview" key={stay._id} onClick={() => hundleStayClick(stay._id)}>
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </div>
  );
}
