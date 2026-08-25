type IconName =
  | "analytics"
  | "arrow"
  | "dashboard"
  | "fleet"
  | "flight"
  | "map"
  | "report"
  | "signal"
  | "target"
  | "terrain";

type IconProps = {
  name: IconName | string;
};

export function Icon({ name }: IconProps) {
  if (name === "arrow") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="15" />
        <circle cx="24" cy="24" r="7" />
        <path d="M24 5v7M24 36v7M5 24h7M36 24h7" />
      </svg>
    );
  }

  if (name === "terrain") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <path d="m7 36 11-20 9 13 6-9 9 16H7Z" />
        <path d="m15 30 5-5 5 5 4-4" />
      </svg>
    );
  }

  if (name === "map") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <path d="m7 12 11-5 12 5 11-5v29l-11 5-12-5-11 5V12Z" />
        <path d="M18 7v29M30 12v29" />
        <circle cx="24" cy="24" r="4" />
      </svg>
    );
  }

  if (name === "fleet" || name === "dashboard") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <rect x="6" y="9" width="36" height="29" rx="3" />
        <path d="M6 17h36M14 24h9M14 30h16" />
        <circle cx="36" cy="28" r="3" />
      </svg>
    );
  }

  if (name === "signal") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <circle cx="24" cy="25" r="3" />
        <path d="M17 18a10 10 0 0 0 0 14M31 18a10 10 0 0 1 0 14M11 12a18 18 0 0 0 0 26M37 12a18 18 0 0 1 0 26" />
      </svg>
    );
  }

  if (name === "flight") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <path d="m13 20 11-5 11 5-11 5-11-5Z" />
        <path d="m17 23-8 6M31 23l8 6M18 18l-8-5M30 18l8-5" />
        <circle cx="8" cy="12" r="3" />
        <circle cx="40" cy="12" r="3" />
        <circle cx="8" cy="31" r="3" />
        <circle cx="40" cy="31" r="3" />
      </svg>
    );
  }

  if (name === "analytics") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48">
        <path d="M8 39V9M8 39h33" />
        <path d="m13 31 8-9 7 5 11-13" />
        <circle cx="13" cy="31" r="2" />
        <circle cx="21" cy="22" r="2" />
        <circle cx="28" cy="27" r="2" />
        <circle cx="39" cy="14" r="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="M12 6h18l7 7v29H12V6Z" />
      <path d="M30 6v8h7M18 23h13M18 29h13M18 35h8" />
    </svg>
  );
}
