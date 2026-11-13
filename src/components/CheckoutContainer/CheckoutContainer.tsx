import CheckoutCard from "../CheckoutCard/CheckoutCard";
import type { CheckoutContainerProps } from "../ThriftHappens/ThriftHappens";

export default function CheckoutContainer({
  lines,
  onRemoveFromCart,
  onRemoveAllFromCart,
}: CheckoutContainerProps) {

  // Util function to get the total price of all checkoutEntries from the poorly named lines
  function getTotal() {
    let sum = 0;
    lines.forEach((entry) => sum += entry.price * entry.quantity);

    return sum.toFixed(2);
  }

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
      <h2>Total: ${getTotal()}</h2>
    </div>
  );
}
