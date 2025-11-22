import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Productos destacados</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              imageUrl={product.image}
              description={product.description}
              category={product.category}
              stock={10}
              rating={product.rating.rate}
              numReviews={product.rating.count}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
