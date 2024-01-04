import styles from "./LoaderBig.module.css";
import React from "react";

const LoaderBig = () => {
  return (
    <svg
      className={styles["pl"]}
      viewBox="0 0 200 200"
      width="200"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
          <stop offset="0%" stopColor="hsla(31, 100%, 50%, 1)" />
          <stop offset="100%" stopColor="hsla(24, 96%, 48%, 1)" />
        </linearGradient>
        <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsla(0, 0%, 47%, 1)" />
          <stop offset="100%" stopColor="hsla(0, 0%, 47%, 1)" />
        </linearGradient>
      </defs>
      <circle
        className={styles["pl__ring"]}
        cx="100"
        cy="100"
        r="82"
        fill="none"
        stroke="url(#pl-grad1)"
        strokeWidth="36"
        strokeDasharray="0 257 1 257"
        strokeDashoffset="0.01"
        strokeLinecap="round"
        transform="rotate(-90,100,100)"
      />
      <line
        className={styles["pl__ball"]}
        stroke="url(#pl-grad2)"
        x1="100"
        y1="18"
        x2="100.01"
        y2="182"
        strokeWidth="36"
        strokeDasharray="1 165"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LoaderBig;
