import ItemCard from "../ItemCard/ItemCard";
import type { ItemContainerProps } from "../ThriftHappens/ThriftHappens";

export default function ItemContainer({ products, onChangeQuantity, onAddToCart }: ItemContainerProps) {
  return (
    <div>
      <h1>Products</h1>
      {products.map((p) => (
        <ItemCard product={p} onChangeQuantity={onChangeQuantity} onAddToCart={onAddToCart}/>
      ))}
    </div>
  );
}
