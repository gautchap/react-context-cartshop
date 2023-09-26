import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrent";

type ProductProps = {
    product: Product;
};
export const StoreProduct = ({ product }: ProductProps) => {
    const { getQuantity, addItem, removeItem, clearCart } = useShoppingCart();

    const quantity = getQuantity(product.id);
    return (
        <div>
            <p>{product.description}</p>
            <p>{formatCurrency(product.price)}</p>

            {quantity === 0 ? (
                <button onClick={() => addItem(product.id)}>Ajouter au panier</button>
            ) : (
                <>
                    <button onClick={() => removeItem(product.id)}>-</button>
                    <span>{quantity} in cart</span>
                    <button onClick={() => addItem(product.id)}>+</button>
                    <button onClick={() => clearCart(product.id)}>Remove</button>
                </>
            )}
        </div>
    );
};
