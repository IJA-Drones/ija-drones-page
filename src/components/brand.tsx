import Image from "next/image";

type BrandProps = {
  inverse?: boolean;
  logoOnly?: boolean;
};

export function Brand({ inverse = false, logoOnly = false }: BrandProps) {
  return (
    <span
      className={`brand${inverse ? " brand--inverse" : ""}${logoOnly ? " brand--logo-only" : ""}`}
    >
      <span className="brand-symbol" aria-hidden="true">
        <Image
          src={
            logoOnly
              ? "/images/ija-drones-logo-transparent.png"
              : "/images/ija-drones-logo.jpeg"
          }
          alt=""
          width={logoOnly ? 1206 : 1024}
          height={logoOnly ? 1305 : 1024}
          sizes={logoOnly ? "88px" : "48px"}
        />
      </span>
      {logoOnly ? null : (
        <span className="brand-name">
          <strong>IJA</strong>
          <span>DRONES</span>
        </span>
      )}
    </span>
  );
}
