import CheckoutCard from "../CheckoutCard/CheckoutCard";
import type { CheckoutContainerProps } from "../ThriftHappens/ThriftHappens";

export default function CheckoutContainer({
  lines,
  onRemoveFromCart,
  onRemoveAllFromCart,
}: CheckoutContainerProps) {
  return (
    <div>
      <h1>Cart</h1>
      {lines.map((line) => (
        <CheckoutCard
          line={line}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
      {lines.length > 0
        ? <button onClick={() => onRemoveAllFromCart()}>Remove all</button>
        : <h2>Cart empty</h2>
      }
    </div>
  );
}
