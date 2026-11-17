import React from "react";
import { cn } from "@/lib/utils";

interface TarjetaProps extends React.HTMLAttributes<HTMLDivElement> {
  elevada?: boolean;
  fondoSuave?: "blanco" | "azul" | "menta" | "rosa" | "crema";
}

export function Tarjeta({
  className,
  elevada = true,
  fondoSuave = "blanco",
  children,
  ...props
}: TarjetaProps) {
  const fondos = {
    blanco: "bg-white",
    azul: "bg-[#F4F8FD]",
    menta: "bg-[#E2F1F1]",
    rosa: "bg-[#FEF5F8]",
    crema: "bg-[#FFF5EC]"
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-[#D8D8D8]/70 p-5 md:p-6 transition-all duration-200",
        fondos[fondoSuave],
        elevada ? "shadow-sm hover:shadow-md" : "shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
