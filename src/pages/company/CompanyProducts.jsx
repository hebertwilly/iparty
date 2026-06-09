import { Link } from "react-router-dom";
import {
  Plus,
  PencilSimple,
  Eye,
} from "@phosphor-icons/react";

import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../hooks/useProducts";

export default function CompanyProducts() {
  const { authUser } = useAuth();

  const {
    products,
    loadingProducts,
    productsError,
  } = useProducts(authUser?.uid);

  if (loadingProducts) {
    return (
      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        Carregando produtos...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">
              Produtos e Serviços
            </h1>

            <p className="text-gray-400 mt-2">
              Gerencie os anúncios da sua empresa.
            </p>
          </div>

          <Link
            to="/empresa/produtos/novo"
            className="flex items-center gap-2 bg-[#C39F20] text-black font-bold px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Novo Produto
          </Link>
        </div>

        {productsError && (
          <div className="mb-6 text-red-400">
            {productsError}
          </div>
        )}

        {products.length === 0 && (
          <div className="border border-white/10 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-bold mb-3">
              Nenhum produto cadastrado
            </h2>

            <p className="text-gray-400 mb-6">
              Cadastre seu primeiro serviço ou produto.
            </p>

            <Link
              to="/empresa/produtos/novo"
              className="inline-flex items-center gap-2 bg-[#C39F20] text-black font-bold px-5 py-3 rounded-xl"
            >
              <Plus size={18} />
              Cadastrar agora
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ProductCard({ product }) {
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#181818]">
      <div className="h-[180px] bg-[#252525]" />

      <div className="p-5">
        <h3 className="font-bold text-lg mb-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.categories?.map((category) => (
            <span
              key={category}
              className="text-xs px-2 py-1 rounded-full border border-[#C39F20]/50 text-[#C39F20]"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mb-5">
          {product.pricing?.showPrice ? (
            <span className="font-bold text-[#C39F20]">
              R$ {product.pricing.value} {product.pricing.label}
            </span>
          ) : (
            <span className="font-bold text-[#C39F20]">
              {product.pricing.label}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 border border-[#C39F20]/30 rounded-lg py-2 flex items-center justify-center gap-2">
            <Eye size={16} />
            Visualizar
          </button>

          <button className="flex-1 border border-[#C39F20]/30 rounded-lg py-2 flex items-center justify-center gap-2">
            <PencilSimple size={16} />
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}