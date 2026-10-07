import { useId } from "react";
import type { Pattern, Silhouette } from "@/lib/types";
import { isLight, shade, tint } from "@/lib/utils";

interface Shape {
  /** Filled garment panels (receive colour, pattern and shading). */
  fills: string[];
  /** Panels filled with a deeper tone of the colour (borders, bands). */
  trims?: string[];
  /** Thin stroke details: seams, folds, straps. */
  lines: string[];
}

const SHAPES: Record<Silhouette, Shape> = {
  slip: {
    fills: [
      "M84 58 Q100 66 116 58 L120 72 Q122 100 118 122 Q138 200 148 286 Q100 294 52 286 Q62 200 82 122 Q78 100 80 72 Z",
    ],
    lines: [
      "M84 24 L85 60",
      "M116 24 L115 60",
      "M86 62 Q100 78 114 62",
      "M94 140 Q88 210 80 284",
      "M108 140 Q114 210 122 284",
    ],
  },
  aline: {
    fills: [
      "M78 36 Q100 50 122 36 L140 46 L148 66 L132 72 L126 64 L124 108 Q148 170 160 222 Q100 232 40 222 Q52 170 76 108 L74 64 L68 72 L52 66 L60 46 Z",
    ],
    lines: [
      "M76 108 Q100 114 124 108",
      "M88 118 L72 220",
      "M100 118 L100 228",
      "M112 118 L128 220",
      "M74 64 L76 108",
      "M126 64 L124 108",
    ],
  },
  mini: {
    fills: [
      "M66 38 Q48 44 50 60 Q54 70 70 66 Z",
      "M134 38 Q152 44 150 60 Q146 70 130 66 Z",
      "M74 38 Q100 54 126 38 L130 62 L126 100 Q150 140 158 174 Q100 186 42 174 Q50 140 74 100 L70 62 Z",
    ],
    lines: ["M74 100 Q100 106 126 100", "M88 108 L70 176", "M112 108 L130 176", "M100 108 L100 182"],
  },
  maxi: {
    fills: [
      "M70 40 L54 50 L38 150 L50 154 L68 82 Z",
      "M130 40 L146 50 L162 150 L150 154 L132 82 Z",
      "M70 40 Q100 54 130 40 L132 82 L128 108 Q142 190 156 286 Q100 296 44 286 Q58 190 72 108 L68 82 Z",
    ],
    lines: [
      "M72 108 Q100 114 128 108",
      "M60 180 Q100 188 140 180",
      "M52 236 Q100 244 148 236",
      "M86 116 L74 180",
      "M114 116 L126 180",
    ],
  },
  wrap: {
    fills: [
      "M76 38 L56 50 L50 88 L64 90 L74 64 Z",
      "M124 38 L144 50 L150 88 L136 90 L126 64 Z",
      "M76 38 L100 86 L124 38 L126 64 L124 108 Q142 160 154 230 Q124 222 100 236 Q74 240 46 228 Q60 160 76 108 L74 64 Z",
    ],
    lines: [
      "M76 38 L118 108",
      "M76 108 L124 108",
      "M118 108 Q134 120 128 146",
      "M118 108 Q124 124 112 140",
      "M100 116 Q92 180 74 236",
    ],
  },
  gown: {
    fills: [
      "M62 52 Q100 64 138 52 L134 70 L126 82 Q122 120 124 150 Q120 200 132 240 Q160 270 174 290 Q100 300 26 290 Q40 270 68 240 Q80 200 76 150 Q78 120 74 82 L66 70 Z",
    ],
    trims: ["M58 46 Q100 60 142 46 L140 56 Q100 70 60 56 Z"],
    lines: [
      "M76 150 Q100 156 124 150",
      "M90 240 L74 292",
      "M110 240 L126 292",
      "M100 246 L100 298",
      "M92 160 Q96 200 90 240",
    ],
  },
  anarkali: {
    fills: [
      "M76 38 L58 48 L46 120 L58 124 L74 70 Z",
      "M124 38 L142 48 L154 120 L142 124 L126 70 Z",
      "M76 38 Q100 54 124 38 L126 70 L124 100 Q160 190 176 270 Q100 286 24 270 Q40 190 76 100 L74 70 Z",
    ],
    trims: [
      "M30 248 Q100 264 170 248 L176 270 Q100 286 24 270 Z",
      "M46 116 L58 120 L56 128 L44 124 Z",
      "M154 116 L142 120 L144 128 L156 124 Z",
    ],
    lines: [
      "M76 100 Q100 108 124 100",
      "M86 104 L52 258",
      "M93 106 L76 262",
      "M100 106 L100 266",
      "M107 106 L124 262",
      "M114 104 L148 258",
    ],
  },
  kurta: {
    fills: [
      "M82 214 L118 214 L122 290 L104 290 L100 244 L96 290 L78 290 Z",
      "M76 38 L58 48 L48 128 L60 130 L74 70 Z",
      "M124 38 L142 48 L152 128 L140 130 L126 70 Z",
      "M76 38 Q100 50 124 38 L126 70 L128 120 L140 224 L104 224 L100 204 L96 224 L60 224 L72 120 L74 70 Z",
    ],
    trims: ["M61 214 L139 214 L140 224 L104 224 L100 204 L96 224 L60 224 Z"],
    lines: ["M100 46 L100 96", "M96 56 L104 56", "M96 70 L104 70", "M96 84 L104 84"],
  },
  coord: {
    fills: [
      "M76 116 L124 116 L142 288 L106 290 L100 172 L94 290 L58 288 Z",
      "M76 40 Q100 52 124 40 L142 50 L150 74 L134 78 L126 68 L126 104 Q100 110 74 104 L74 68 L66 78 L50 74 L58 50 Z",
    ],
    trims: ["M76 116 L124 116 L125 126 L75 126 Z"],
    lines: ["M86 136 L72 286", "M114 136 L128 286", "M100 54 L100 104"],
  },
};

function PatternTile({ id, pattern, color }: { id: string; pattern: Pattern; color: string }) {
  const ink = isLight(color) ? shade(color, 0.45) : tint(color, 0.7);
  const accent = isLight(color) ? shade(color, 0.25) : tint(color, 0.4);

  switch (pattern) {
    case "floral":
      return (
        <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <g fill={ink} opacity="0.75">
            <circle cx="6" cy="4" r="2.2" />
            <circle cx="10" cy="7" r="2.2" />
            <circle cx="8.5" cy="11.5" r="2.2" />
            <circle cx="3.5" cy="11.5" r="2.2" />
            <circle cx="2" cy="7" r="2.2" />
          </g>
          <circle cx="6" cy="8" r="1.4" fill={accent} />
          <g fill={ink} opacity="0.5">
            <circle cx="19" cy="18" r="1.6" />
            <circle cx="22" cy="21" r="1.6" />
            <circle cx="18" cy="22" r="1.6" />
          </g>
          <path d="M14 22 q3 -4 6 -3" stroke={ink} strokeWidth="0.8" fill="none" opacity="0.5" />
        </pattern>
      );
    case "dots":
      return (
        <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.7" fill={ink} opacity="0.7" />
          <circle cx="9" cy="9" r="1.7" fill={ink} opacity="0.7" />
        </pattern>
      );
    case "stripe":
      return (
        <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="5" height="12" fill={ink} opacity="0.55" />
        </pattern>
      );
    case "check":
      return (
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="8" height="16" fill={ink} opacity="0.28" />
          <rect width="16" height="8" fill={ink} opacity="0.28" />
        </pattern>
      );
    default:
      return null;
  }
}

interface DressArtProps {
  silhouette: Silhouette;
  color: string;
  pattern?: Pattern;
  hanger?: boolean;
  className?: string;
  title?: string;
}

export default function DressArt({
  silhouette,
  color,
  pattern = "solid",
  hanger = true,
  className,
  title,
}: DressArtProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const patId = `pat${uid}`;
  const shadeId = `shd${uid}`;
  const shape = SHAPES[silhouette];
  const deep = shade(color, 0.28);
  const line = isLight(color) ? shade(color, 0.35) : tint(color, 0.25);

  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      role="img"
      aria-label={title ?? `${silhouette} dress illustration`}
    >
      <defs>
        <PatternTile id={patId} pattern={pattern} color={color} />
        <linearGradient id={shadeId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {hanger && (
        <g fill="none" stroke="#3a3138" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <path d="M100 22 L100 14 q0 -6 6 -6 q6 0 6 6" />
          <path d="M66 36 L100 22 L134 36" />
        </g>
      )}

      {shape.fills.map((d, i) => (
        <g key={i}>
          <path d={d} fill={color} />
          {pattern !== "solid" && <path d={d} fill={`url(#${patId})`} />}
          <path d={d} fill={`url(#${shadeId})`} />
        </g>
      ))}

      {shape.trims?.map((d, i) => <path key={i} d={d} fill={deep} />)}

      <g fill="none" stroke={line} strokeWidth="1.4" strokeLinecap="round" opacity="0.65">
        {shape.lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
