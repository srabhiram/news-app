import React from "react";

export default function LoadingSvg() {
  return (
    <div className="flex justify-center items-center mx-auto w-full h-screen">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        className="bg-white dark:bg-zinc-900 block"
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
      </svg> */}

      <svg width="140" height="140" viewBox="0 0 100 50"><line x1="10" y1="25" x2="10" y2="25" stroke="#2e8cff" stroke-width="10" stroke-linecap="round"><animate attributeName="y1" values="25;10;25" dur="0.6666666666666666s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="y2" values="25;40;25" dur="0.6666666666666666s" begin="0s" repeatCount="indefinite"></animate></line><line x1="30" y1="25" x2="30" y2="25" stroke="#2e8cff" stroke-width="10" stroke-linecap="round"><animate attributeName="y1" values="25;10;25" dur="0.6666666666666666s" begin="0.2s" repeatCount="indefinite"></animate><animate attributeName="y2" values="25;40;25" dur="0.6666666666666666s" begin="0.2s" repeatCount="indefinite"></animate></line><line x1="50" y1="25" x2="50" y2="25" stroke="#2e8cff" stroke-width="10" stroke-linecap="round"><animate attributeName="y1" values="25;10;25" dur="0.6666666666666666s" begin="0.4s" repeatCount="indefinite"></animate><animate attributeName="y2" values="25;40;25" dur="0.6666666666666666s" begin="0.4s" repeatCount="indefinite"></animate></line><line x1="70" y1="25" x2="70" y2="25" stroke="#2e8cff" stroke-width="10" stroke-linecap="round"><animate attributeName="y1" values="25;10;25" dur="0.6666666666666666s" begin="0.6000000000000001s" repeatCount="indefinite"></animate><animate attributeName="y2" values="25;40;25" dur="0.6666666666666666s" begin="0.6000000000000001s" repeatCount="indefinite"></animate></line><line x1="90" y1="25" x2="90" y2="25" stroke="#2e8cff" stroke-width="10" stroke-linecap="round"><animate attributeName="y1" values="25;10;25" dur="0.6666666666666666s" begin="0.8s" repeatCount="indefinite"></animate><animate attributeName="y2" values="25;40;25" dur="0.6666666666666666s" begin="0.8s" repeatCount="indefinite"></animate></line></svg>
    </div>
  );
}
