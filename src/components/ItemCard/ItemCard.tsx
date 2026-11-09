import type { ItemCardProps } from "../ThriftHappens/ThriftHappens";

export default function ItemCard({ product, onChangeQuantity, onAddToCart }: ItemCardProps) {
  return (
    <div>
      <img src={product.image} alt={product.name} width={100} />
      <p>{product.name}</p>
      <p>${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>Fit: {product.fit}</p>
      <p>Description: {product.description}</p>
      <p>Color: {product.color}</p>
      <p>In stock: {product.quantity}</p>
      <p>Quantity: {product.itemQuantity}</p>
      <button onClick={() => onChangeQuantity(product.id, -1)}>-</button>
      <button onClick={() => onChangeQuantity(product.id, 1)}>+</button>
      <button onClick={() => onAddToCart(product.id)}>Add to cart</button>
    </div>
  );
}
