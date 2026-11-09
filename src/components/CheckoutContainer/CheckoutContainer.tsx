import CheckoutCard from "../CheckoutCard/CheckoutCard";
import type { CheckoutContainerProps } from "../ThriftHappens/ThriftHappens";

export default function CheckoutContainer({ lines }: CheckoutContainerProps) {
  return (
    <div>
      {lines.map((line) => (
        <CheckoutCard line={line} />
      ))}
    </div>
  );
}
