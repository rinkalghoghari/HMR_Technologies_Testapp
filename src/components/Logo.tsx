import logoPath from "../../public/logo/LogoWithName.png";

export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={logoPath}
        alt="HMR Technologies"
        className="size-38"
      />
    </div>
  );
}
