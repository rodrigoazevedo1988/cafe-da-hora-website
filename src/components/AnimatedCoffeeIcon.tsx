
import { Coffee } from "lucide-react";

const AnimatedCoffeeIcon = () => (
  <div className="flex items-center justify-center">
    <Coffee
      className="h-20 w-20 text-coffee-500 animate-coffee-steam"
      aria-label="Ícone de café animado"
    />
    <span className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 pointer-events-none">
      {/* Simulação de vapor usando um pseudoelemento animado */}
      <span className="block w-8 h-8 rounded-full bg-gradient-to-t from-transparent via-coffee-200 to-white opacity-60 animate-steam-blur" />
    </span>
  </div>
);

export default AnimatedCoffeeIcon;
