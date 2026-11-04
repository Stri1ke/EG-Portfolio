import { useSitePaths } from "../../../paths";
/**
 * Три прозрачных PNG образуют одну композицию по референсу.
 * Наклон уже нарисован в ассетах; CSS меняет только размер, положение и высоту парения.
 * Это декоративная иллюстрация: она не объявляет изображения отдельными кейсами.
 */
export function HeroArtwork() {
  const { assetUrl } = useSitePaths();
  return (
    <div className="hero-artwork" aria-hidden="true">
      <img
        className="hero-asset hero-asset-tank"
        src={assetUrl("assets/hero/tank.png")}
        alt=""
        width={693}
        height={922}
        fetchPriority="high"
      />
      <img
        className="hero-asset hero-asset-adventurer"
        src={assetUrl("assets/hero/adventurer.png")}
        alt=""
        width={582}
        height={946}
      />
      <img
        className="hero-asset hero-asset-chicken"
        src={assetUrl("assets/hero/chicken.png")}
        alt=""
        width={538}
        height={900}
      />
    </div>
  );
}
