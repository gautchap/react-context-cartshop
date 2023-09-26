import { CartProduct } from "@/components/CartProduct";
import { formatCurrency } from "@/utils/formatCurrent";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Product } from "@/types/product";

type CartProps = {
    products: Product[];
};

// fetch products from the API or a database
export default function Cart({ products }: CartProps) {
    const { cartItems } = useShoppingCart();

    const subTotal = formatCurrency(
        cartItems.reduce((total, cartItem) => {
            const item = products.find((product) => product.id === cartItem.id);
            return total + (item?.price ?? 0) * cartItem.quantity;
        }, 0)
    );

    const items = cartItems.flatMap((item) => products.filter((product) => product.id === item.id));

    return (
        <>
            {items.map((product) => (
                <CartProduct key={product.id} product={product} />
            ))}

            {cartItems.length > 0 ? <div>total : {subTotal}</div> : <div>panier vide</div>}
        </>
    );
}
