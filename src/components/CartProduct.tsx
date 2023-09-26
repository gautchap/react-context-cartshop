import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/utils/formatCurrent";
import { Product } from "@/types/product";

type ProductProps = {
    product: Product;
};
export const CartProduct = ({ product }: ProductProps) => {
    const { getQuantity, addItem, removeItem, clearCart } = useShoppingCart();

    const quantity = getQuantity(product.id);
    return (
        <div>
            <span>{product.description}</span>
            <span>{formatCurrency(product.price)}</span>
            <button onClick={() => removeItem(product.id)}>-</button>
            <span>{quantity} in cart</span>
            <button onClick={() => addItem(product.id)}>+</button>
            <button onClick={() => clearCart(product.id)}>Remove</button>
            <span>{formatCurrency(product.price * quantity)}</span>
        </div>
    );
};
