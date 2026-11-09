import type { CheckoutCardProps } from "../ThriftHappens/ThriftHappens";

export default function CheckoutCard({ line, onRemoveFromCart }: CheckoutCardProps) {
  return (
    <div>
      <img src={line.image} alt={line.name} width={100} />
      <p>{line.name}</p>
      <p>${line.price.toFixed(2)}</p>
      <p>Quantity: {line.quantity}</p>
      <p>Cost: ${(line.price * line.quantity).toFixed(2)}</p>
      <button onClick={() => onRemoveFromCart(line.id)}>Remove</button>
    </div>
  );
}
