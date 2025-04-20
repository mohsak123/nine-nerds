"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import geoData from './features.json';
import SwiperMap from "./SwiperMap";

const MapSection = () => {
  const countryMap: { [key: string]: { name: string; image: string; description: string; title: string } } = {
    "Iraq": {
      name: "Iraq",
      title: "Iraq",
      image: "/images/city.jpg",
      description: "serving 200 thousands customers in iraq",
    },
    "Saudi Arabia": {
      name: "Saudi Arabia",
      title: "Saudi Arabia",
      image: "/images/city.jpg",
      description: "serving 200 thousands customers in saudi",
    },
    "Syria": {
      name: "Syria",
      title: "Syria",
      image: "/images/city.jpg",
      description: "serving 200 thousands customers in syria",
    },
    "Lebanon": {
      name: "Lebanon",
      title: "Lebanon",
      image: "/images/city.jpg",
      description: "serving 200 thousands customers in lebanon",
    },
    "UAE": {
      name: "United Arab Emirates",
      title: "UAE",
      image: "/images/city.jpg",
      description: "serving 200 thousands customers in UAE",
    },
  };

  const sliderItems: string[] = Object.keys(countryMap);
  const duplicatedSliderItems = [...sliderItems, ...sliderItems];
  const [selectedCountry, setSelectedCountry] = useState("");

  const countryCoordinates: { [key: string]: [number, number] } = {
    "Iraq": [41.3, 32.7],
    "Saudi Arabia": [42, 25],
    "Syria": [38.1, 35.1],
    "Lebanon": [36.01, 34.1],
    "UAE": [54.5, 23.73],
  };

  const countryTooltipPosition: {
    [key: string]: { x: number; y: number }
  } = {
    "Iraq": { x: -91, y: 3 },
    "Saudi Arabia": { x: -90, y: 4 },
    "Syria": { x: -91, y: -50 },
    "Lebanon": { x: -90, y: 3 },
    "UAE": { x: -90, y: 3 },
  };

  // ✅ Safe initial values
  const [mapHeight, setMapHeight] = useState(380);
  const [zoom, setZoom] = useState(250);
  const center: [number, number] = [25, 10];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setMapHeight(380);
        setZoom(250);
      } else {
        setMapHeight(1400);
        setZoom(900);
      }
    };

    if (typeof window !== "undefined") {
      handleResize(); // Call it initially to set the height and zoom
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="mt-[35px] relative h-screen sm:h-auto overflow-y-hidden">
      <ComposableMap
        projection="geoMercator"
        height={mapHeight}
        projectionConfig={{
          scale: zoom,
          center: center,
        }}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: geo.properties.name === selectedCountry ? "var(--bgMap)" : "var(--background)",
                    stroke: "var(--hover)",
                    strokeWidth: 0.5,
                    transition: "500ms",
                  },
                  hover: {
                    fill: "var(--background)",
                    stroke: "var(--hover)",
                    strokeWidth: 0.5,
                  },
                  pressed: {
                    fill: "var(--background)",
                    stroke: "var(--hover)",
                    strokeWidth: 0.5,
                  },
                }}
              />
            ))
          }
        </Geographies>

        {sliderItems.map((countryKey, index) => {
          const coordinates = countryCoordinates[countryKey];
          const countryInfo = countryMap[countryKey];

          if (coordinates) {
            const isSelected = selectedCountry === countryInfo.name;

            return (
              <Marker key={index} coordinates={coordinates}>
                <circle
                  r={1.5}
                  fill="var(--bgMap)"
                  stroke="var(--hover)"
                  strokeWidth={1}
                />

                {isSelected && (() => {
                  const tooltipPos = countryTooltipPosition[countryKey] || { x: -105, y: -35 };

                  return (
                    <>
                      <rect
                        x={tooltipPos.x}
                        y={tooltipPos.y}
                        width={90}
                        height={46}
                        rx={0}
                        fill="#202A2B"
                      />

                      <text
                        x={tooltipPos.x + 5}
                        y={tooltipPos.y + 15}
                        fill="#fff"
                        style={{ fontWeight: "bold", fontSize: "9px" }}
                      >
                        {countryInfo.title}
                      </text>

                      <line
                        x1={tooltipPos.x + 5}
                        y1={tooltipPos.y + 22}
                        x2={tooltipPos.x + 85}
                        y2={tooltipPos.y + 22}
                        stroke="#00D5DC"
                        strokeWidth={1}
                      />

                      <text
                        x={tooltipPos.x + 5}
                        y={tooltipPos.y + 32}
                        fill="#B8F3F3"
                        style={{ fontWeight: "300", fontSize: "6px" }}
                      >
                        {countryInfo.description
                          .split(" ")
                          .reduce((acc: string[][], word: string) => {
                            if (!acc.length || acc[acc.length - 1].join(" ").length + word.length > 25) {
                              acc.push([word]);
                            } else {
                              acc[acc.length - 1].push(word);
                            }
                            return acc;
                          }, [] )
                          .map((line, idx) => (
                            <tspan key={idx} x={tooltipPos.x + 5} dy={`${idx === 0 ? 0 : 1.2}em`}>
                              {line.join(" ")}
                            </tspan>
                          ))}
                      </text>
                    </>
                  );
                })()}
              </Marker>
            );
          }

          return null;
        })}
      </ComposableMap>

      <SwiperMap
        sliderItems={duplicatedSliderItems}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countryMap={countryMap}
      />
    </div>
  );
};

export default MapSection;
