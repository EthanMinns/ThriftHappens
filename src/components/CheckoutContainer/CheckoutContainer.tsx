import CheckoutCard from "../CheckoutCard/CheckoutCard";
import type { CheckoutContainerProps } from "../ThriftHappens/ThriftHappens";

export default function CheckoutContainer({ lines, onRemoveFromCart }: CheckoutContainerProps) {
  return (
    <div>
      <h1>Cart</h1>
      {lines.map((line) => (
        <CheckoutCard line={line} onRemoveFromCart={onRemoveFromCart}/>
      ))}
    </div>
  );
}
