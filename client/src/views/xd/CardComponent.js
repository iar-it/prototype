/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";

const CardComponent = () => (
  <svg width={370} height={370} viewBox="0 0 370 370">
    <defs>
      <style>{".a{fill:#fff9e6;}.b{filter:url(#c);}.c{filter:url(#a);}"}</style>
      <filter
        id="a"
        x={10}
        y={10}
        width={360}
        height={360}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx={5} dy={5} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={7.5} result="b" />
        <feFlood floodOpacity={0.102} />
        <feComposite operator="in" in2="b" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="c"
        x={0}
        y={0}
        width={360}
        height={360}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dx={-5} dy={-5} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={7.5} result="d" />
        <feFlood floodColor="#fff" floodOpacity={0.796} />
        <feComposite operator="in" in2="d" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g transform="translate(-355.5 -738.5)">
      <g transform="translate(383 766)">
        <g className="c" transform="matrix(1, 0, 0, 1, -27.5, -27.5)">
          <rect
            className="a"
            width={315}
            height={315}
            transform="translate(27.5 27.5)"
          />
        </g>
        <g className="b" transform="matrix(1, 0, 0, 1, -27.5, -27.5)">
          <rect
            className="a"
            width={315}
            height={315}
            transform="translate(27.5 27.5)"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default CardComponent;
