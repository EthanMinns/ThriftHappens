import ThriftHappens from "./components/ThriftHappens/ThriftHappens";
import { products } from "./data/data";

export default function App() {
  return <ThriftHappens products={products}/>;
}
