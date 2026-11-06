import ItemCard from "../ItemCard/ItemCard";
import type { ItemContainerProps } from "../ThriftHappens/ThriftHappens";

export default function ItemContainer({ products, onChangeQuantity }: ItemContainerProps) {
  return (
    <div>
      {products.map((p) => (
        <ItemCard product={p} onChangeQuantity={onChangeQuantity}/>
      ))}
    </div>
  );
}
