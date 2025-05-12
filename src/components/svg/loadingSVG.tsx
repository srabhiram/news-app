import React from "react";

export default function LoadingSvg() {
  return (
    <div className="flex justify-center items-center mx-auto sm:h-screen bg-white dark:bg-zinc-950">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        className="bg-white dark:bg-zinc-950 block"
      >
        <g>
          <rect fill="#0099cc" height="40" width="15" y="30" x="17.5">
            <animate
              begin="-0.2s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              values="18;30;30"
              keyTimes="0;0.5;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="y"
            />
            <animate
              begin="-0.2s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              values="64;40;40"
              keyTimes="0;0.5;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="height"
            />
          </rect>
          <rect fill="#ff3833" height="40" width="15" y="30" x="42.5">
            <animate
              begin="-0.1s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              values="21;30;30"
              keyTimes="0;0.5;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="y"
            />
            <animate
              begin="-0.1s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              values="58;40;40"
              keyTimes="0;0.5;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="height"
            />
          </rect>
          <rect fill="#0099cc" height="40" width="15" y="30" x="67.5">
            <animate
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              values="21;30;30"
              keyTimes="0;0.5;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="y"
            />
            <animate
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              values="58;40;40"
              keyTimes="0;0.5;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="height"
            />
          </rect>
        </g>
      </svg>
    </div>
  );
}
