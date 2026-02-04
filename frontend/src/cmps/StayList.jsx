import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { StayPreview } from "./StayPreview";

export function StayList({ stays }) {
  return (
    <div className="stay-container">
      <ul className="stay-list">
        {stays.map((stay) => (
          <li key={stay._id}>
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </div>
  );
}
