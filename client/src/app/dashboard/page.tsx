import React from "react";

const DashboardPage = () => {
  return (
    <main>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <p>Welcome to your dashboard.</p>
      <div className="space-y-8">
        <div className="p-5 border rounded bg-white flex justify-between">
          <div className="flex gap-2">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocI9SGE_DlfPSH21TToDH5aRZBYRtLf7a7Q-ug-OrdxiZ8AlzA=s96-c"
              alt="user"
              className="h-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold capitalize">Micheal Ekpeala</span>
              <span className="text-sm">My Organisation</span>
            </div>
          </div>
          <a href="/dashboard/profile">
            <button
              type="button"
              className="bg-blue-500 shadow-lg rounded whitespace-nowrap gap-2 justify-center flex text-white flex items-center py-2.5 px-4 text-sm undefined"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>My Profile</span>
            </button>
          </a>
        </div>

        <div className="relative">
          <div className="bg-white relative overflow-x-auto rounded border p-5 sm:block flex sm:grid sm:grid-cols-4 gap-4">
            <div className="bg-indigo-500 flex-shrink-0 rounded space-y-4 p-4 text-white">
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                  <span className="uppercase text-xs">Balance</span>
                  <span className="text-2xl font-bold">N0</span>
                </div>
                <div className="bg-opacity-50 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-8 w-8"
                  >
                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z"></path>
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-red-500 flex-shrink-0 rounded space-y-4 p-4 text-white">
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                  <span className="uppercase text-xs">My Events</span>
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div className="bg-opacity-50 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7"></path>
                    <path d="M16 2v4"></path>
                    <path d="M8 2v4"></path>
                    <path d="M3 10h18"></path>
                    <path d="M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-blue-500 flex-shrink-0 rounded space-y-4 p-4 text-white">
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                  <span className="uppercase text-xs">Event Views</span>
                  <span className="text-2xl font-bold">6</span>
                </div>
                <div className="bg-opacity-50 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-8 w-8"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-green-500 flex-shrink-0 rounded space-y-4 p-4 text-white">
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                  <span className="uppercase text-xs">Total Tickets</span>
                  <span className="text-2xl font-bold">0</span>
                </div>
                <div className="bg-opacity-50 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-8 w-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-secondary-alt dark:text-slate-50">
          <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Payment History
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing payments received for the past 30 days
              </p>
            </div>
            <div className="flex">
              <button
                data-active="false"
                className="relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">Voting</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  <span>₦</span>0
                </span>
              </button>
              <button
                data-active="true"
                className="relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">Ticketing</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  <span>₦</span>0
                </span>
              </button>
            </div>
          </div>
          <div className="p-6 pt-0 px-2 sm:p-6">
            <div
              data-chart="chart-Rkdn6rja"
              className="flex justify-center text-xs [&amp;_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&amp;_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&amp;_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&amp;_.recharts-dot[stroke='#fff']]:stroke-transparent [&amp;_.recharts-layer]:outline-none [&amp;_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&amp;_.recharts-radial-bar-background-sector]:fill-muted [&amp;_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&amp;_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&amp;_.recharts-sector[stroke='#fff']]:stroke-transparent [&amp;_.recharts-sector]:outline-none [&amp;_.recharts-surface]:outline-none aspect-auto h-[300px] w-full"
            >
              <div className="recharts-responsive-container w-full h-full min-w-0">
                <div className="recharts-wrapper relative w-full h-full max-h-72 max-w-5xl">
                  <svg
                    role="application"
                    className="recharts-surface w-full h-full"
                    width="1021"
                    height="300"
                    viewBox="0 0 1021 300"
                  >
                    <title></title>
                    <desc></desc>
                    <defs>
                      <clipPath id="recharts1-clip">
                        <rect x="12" y="0" height="242" width="997"></rect>
                      </clipPath>
                    </defs>
                    <g className="recharts-cartesian-grid">
                      <g className="recharts-cartesian-grid-horizontal">
                        <line
                          stroke="#ccc"
                          fill="none"
                          x="12"
                          y="0"
                          width="997"
                          height="242"
                          x1="12"
                          y1="242"
                          x2="1009"
                          y2="242"
                        ></line>
                        <line
                          stroke="#ccc"
                          fill="none"
                          x="12"
                          y="0"
                          width="997"
                          height="242"
                          x1="12"
                          y1="181.5"
                          x2="1009"
                          y2="181.5"
                        ></line>
                        <line
                          stroke="#ccc"
                          fill="none"
                          x="12"
                          y="0"
                          width="997"
                          height="242"
                          x1="12"
                          y1="121"
                          x2="1009"
                          y2="121"
                        ></line>
                        <line
                          stroke="#ccc"
                          fill="none"
                          x="12"
                          y="0"
                          width="997"
                          height="242"
                          x1="12"
                          y1="60.5"
                          x2="1009"
                          y2="60.5"
                        ></line>
                        <line
                          stroke="#ccc"
                          fill="none"
                          x="12"
                          y="0"
                          width="997"
                          height="242"
                          x1="12"
                          y1="0"
                          x2="1009"
                          y2="0"
                        ></line>
                      </g>
                    </g>
                    <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
                      <g className="recharts-cartesian-axis-ticks">
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="28.080645161290267"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="28.080645161290267" dy="0.71em">
                              Sep 11
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="124.56451612903221"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="124.56451612903221" dy="0.71em">
                              Sep 14
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="221.04838709677418"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="221.04838709677418" dy="0.71em">
                              Sep 17
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="317.5322580645161"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="317.5322580645161" dy="0.71em">
                              Sep 20
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="414.01612903225805"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="414.01612903225805" dy="0.71em">
                              Sep 23
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="510.49999999999994"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="510.49999999999994" dy="0.71em">
                              Sep 26
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="606.9838709677421"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="606.9838709677421" dy="0.71em">
                              Sep 29
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="671.3064516129033"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="671.3064516129033" dy="0.71em">
                              Oct 1
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="735.6290322580645"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="735.6290322580645" dy="0.71em">
                              Oct 3
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="799.951612903226"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="799.951612903226" dy="0.71em">
                              Oct 5
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="864.2741935483872"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="864.2741935483872" dy="0.71em">
                              Oct 7
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="928.5967741935484"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="928.5967741935484" dy="0.71em">
                              Oct 9
                            </tspan>
                          </text>
                        </g>
                        <g className="recharts-layer recharts-cartesian-axis-tick">
                          <text
                            orientation="bottom"
                            width="997"
                            height="30"
                            stroke="none"
                            x="992.9193548387096"
                            y="256"
                            className="recharts-text recharts-cartesian-axis-tick-value"
                            textAnchor="middle"
                            fill="#666"
                          >
                            <tspan x="992.9193548387096" dy="0.71em">
                              Oct 11
                            </tspan>
                          </text>
                        </g>
                      </g>
                    </g>
                    <g className="recharts-layer recharts-bar">
                      <g className="recharts-layer recharts-bar-rectangles">
                        <g className="recharts-layer">
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                          <g className="recharts-layer recharts-bar-rectangle"></g>
                        </g>
                      </g>
                      <g className="recharts-layer"></g>
                    </g>
                  </svg>
                  <div className="recharts-legend-wrapper absolute w-[997px] h-auto left-3 bottom-0">
                    <div className="flex items-center justify-center gap-4 pt-3">
                      <div className="flex items-center gap-1.5 [&amp;&gt;svg]:h-3 [&amp;&gt;svg]:w-3 [&amp;&gt;svg]:text-slate-500 dark:[&amp;&gt;svg]:text-slate-400">
                        <div className="h-2 w-2 shrink-0 rounded-[2px] bg-chart-2"></div>
                        Ticketing
                      </div>
                    </div>
                  </div>
                  <div className="recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-bottom invisible pointer-events-none absolute inset-0 translate-x-[134.565px] translate-y-[108px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
