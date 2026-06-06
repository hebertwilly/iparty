import { Star } from "@phosphor-icons/react";
import SectionTitle from "../common/SectionTitle";
import companyImage from "../../assets/images/company-section.jpg";

const companies = [
  {
    name: "Buffet Elegance",
    category: "Buffet e alimentação",
    rating: "4.8",
    image: companyImage,
  },
  {
    name: "DecoraFest",
    category: "Decoração de eventos",
    rating: "4.9",
    image: companyImage,
  },
  {
    name: "DJ Prime",
    category: "Música e entretenimento",
    rating: "4.7",
    image: companyImage,
  },
];

export default function CompaniesSection() {
  return (
    <section className="bg-zinc-950 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Empresas"
          title="Conheça alguns parceiros"
          description="Empresas e profissionais podem apresentar seus serviços, portfólios e avaliações."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <article
              key={company.name}
              className="bg-black border border-zinc-800 rounded-3xl overflow-hidden"
            >
              <img
                src={company.image}
                alt={company.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {company.name}
                  </h3>

                  <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <Star size={18} weight="fill" />
                    {company.rating}
                  </span>
                </div>

                <p className="text-zinc-400 mb-5">{company.category}</p>

                <button className="w-full border border-yellow-500 text-yellow-500 font-semibold py-3 rounded-full hover:bg-yellow-500 hover:text-black transition">
                  Ver perfil
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}