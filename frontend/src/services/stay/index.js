const { DEV, VITE_LOCAL } = import.meta.env;
import {
  faLocationArrow,
  faBuilding,
  faUmbrellaBeach,
  faUtensils,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import * as Module from 'https://bryntum.com/products/grid/build/grid.module.js?491409';
Object.assign(window, Module);

import { stayService as local } from "./stay.service.local";
import { stayService as remote } from "./stay.service.remote";

import { getRandomIntInclusive } from "../util.service";

function getEmptyStay() {
  return {
    type: "House",
    imgUrls: [
      "https://loremflickr.com/200/200?random=1",
      "https://loremflickr.com/200/200?random=2",
      "https://loremflickr.com/200/200?random=3",
      "https://loremflickr.com/200/200?random=4",
      "https://loremflickr.com/200/200?random=5",
      "https://loremflickr.com/200/200?random=6",
    ],
    price: getRandomIntInclusive(80, 240),
    summary: "Fantastic duplex apartment...",
    capacity: getRandomIntInclusive(1, 10),
    amenities: [
      "TV",
      "Wifi",
      "Kitchen",
      "Smoking allowed",
      "Pets allowed",
      "Cooking basics",
    ],
    labels: ["Top of the world", "Trending", "Play", "Tropical"],
    msgs: [],
  };
}

export function getDefaultFilter() {
  return {
    txt: null,
    minPrice: 0,
    maxPrice: Infinity,
    destination: null,
    guests: 0,
    startDate: null,
    endDate: null,
    category: null,
  };
}

export function generateRandomData(stay) {
  const rating = (Math.random() * stay.reviews?.length).toFixed(2);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const randomMonth = months[Math.floor(Math.random() * months.length)];
  const randomDay = Math.floor(Math.random() * 20 + 1);
  const dates = `${randomMonth} ${randomDay} - ${randomDay + 2}`;

  return {
    rate: rating,
    dates,
  };
}

export const destinations = [
  {
    icon: faUmbrellaBeach,
    name: "Porto, Portugal",
    description: "Popular beach destination",
  },
  {
    icon: faBuilding,
    name: "Barcelona, Spain",
    description: "For sights like Cismigiu Gardens",
  },
  {
    icon: faLandmark,
    name: "New York, United States",
    description: "For its bustling nightlife",
  },
  {
    icon: faBuilding,
    name: "Sydney, Australia",
    description: "For its stunning architecture",
  },
  {
    icon: faUtensils,
    name: "Istanbul, Turkey",
    description: "For its top-notch dining",
  },
];

const service = VITE_LOCAL === "true" ? local : remote;

export const stayService = { getEmptyStay, getDefaultFilter, ...service };

if (DEV) window.stayService = stayService;
