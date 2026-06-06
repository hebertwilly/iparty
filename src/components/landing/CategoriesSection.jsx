import {
  ForkKnife,
  BeerStein,
  Hamburger,
  Martini,
  Confetti,
  FlowerLotus,
  MapPin,
  Sparkle,
  Microphone,
  Shield,
  Headphones,
} from "@phosphor-icons/react";

const categories = [
  { icon: ForkKnife, name: "Buffets" },
  { icon: BeerStein, name: "Adegas" },
  { icon: Hamburger, name: "Foods" },
  { icon: Martini, name: "Bartenders" },
  { icon: Confetti, name: "Coqueteleiras" },
  { icon: FlowerLotus, name: "Decoradores" },
  { icon: MapPin, name: "Locais Eventos" },
  { icon: Sparkle, name: "Cerimonialistas" },
  { icon: Microphone, name: "Músicos" },
  { icon: Shield, name: "Seguranças" },
  { icon: Headphones, name: "Djs" },
];

export default function CategoriesSection() {
  return (
    <section className="bg-black py-14 md:py-20">
      <div className="w-[90%] max-w-[1290px] mx-auto">
        <div className="flex items-center justify-between gap-4 mb-12">
          <h2 className="uppercase text-[16px] md:text-[24px] font-black">
            <span className="bg-gradient-to-r from-white via-[#E8D7A1] to-[#C39F20] bg-clip-text text-transparent">
              ALGUNS EXEMPLOS DO QUE VOCÊ PODE ENCONTRAR NA I PARTY
            </span>
          </h2>

          <a
            href="/cadastro/cliente"
            className="hidden sm:inline-flex border-2 border-[#C39F20] text-[#C39F20] rounded-full px-8 py-2 text-sm font-bold hover:bg-[#C39F20] hover:text-black transition"
          >
            Criar conta
          </a>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-between gap-x-8 gap-y-10">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="flex flex-col items-center gap-2"
              >
                <Icon
                  size={30}
                  className="text-[#C39F20]"
                  weight="regular"
                />

                <span className="text-white text-[12px] text-center">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="sm:hidden flex justify-center mt-10">
          <a
            href="/cadastro/cliente"
            className="border-2 border-[#C39F20] text-[#C39F20] rounded-full px-8 py-2 text-sm font-bold"
          >
            Criar conta
          </a>
        </div>
      </div>
    </section>
  );
}