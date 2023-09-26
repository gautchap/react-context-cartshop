import { StoreProduct } from "@/components/StoreProduct";
import { Product } from "@/types/product";

type ProductProps = {
    products: Product[];
};

// fetch products from the API or a database
export default function Products({ products }: ProductProps) {
    return (
        <>
            {products.map((product) => (
                <StoreProduct key={product.id} product={product} />
            ))}
        </>
    );
}
