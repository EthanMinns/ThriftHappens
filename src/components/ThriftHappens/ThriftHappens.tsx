import { useState } from "react";
import type { ClothingProduct } from "../../data/data";
import ItemContainer from "../ItemContainer/ItemContainer";

interface ThriftHappensProps {
  products: ClothingProduct[];
}

export interface CheckoutEntry {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ItemContainerProps {
  products: ClothingProduct[];
  onChangeQuantity: (id: number, value: number) => void;
}

export interface ItemCardProps {
  product: ClothingProduct;
  onChangeQuantity: (id: number, value: number) => void;
}

export default function ThriftHappens({ products }: ThriftHappensProps) {
  // ===== States =====

  // State holds product entries including the current selected quantity that customers
  // Want to add to cart
  const [productEntries, setProductEntries] =
    useState<ClothingProduct[]>(products);

  // State to hold list of checkout items
  const [checkoutEntries, setCheckoutEntries] = useState<CheckoutEntry[]>([]);

  // ===== Handlers =====

  // A handler that changes the selected quantity of a product
  // when ItemCard has a quantity button pressed
  const onChangeQuantity = (id: number, value: number) => {
    const productEntry = productEntries.find((entry) => entry.id === id);
    if (!productEntry) return;

    const newQuantity = productEntry.itemQuantity + value;

    // newQuantity not less than zero
    if (newQuantity < 0) {
      alert("Cannot set quantity below zero.");
      return;
    }

    // And not greater than current stock
    if (newQuantity > productEntry.quantity) {
      alert("Quantity would exceed stock.");
      return;
    }

    setProductEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, itemQuantity: newQuantity }
          : { ...entry },
      ),
    );
  };

  const onAddToCart = (id: number) => {
    const productEntry = productEntries.find((entry) => entry.id === id);
    if (!productEntry) return;

    // If attempted quantity is zero
    if (productEntry.itemQuantity === 0) {
      alert("Cannot add quantity of zero to cart.");
      return;
    }

    // If id already exist in checkoutEntries add increase it's quantity and decrease the stock of product entry
    if (checkoutEntries.find((e) => e.id === id)) {
      setCheckoutEntries((prev) =>
        prev.map((entry) =>
          entry.id === id
            ? { ...entry, quantity: entry.quantity + productEntry.itemQuantity }
            : { ...entry },
        ),
      );
      setProductEntries((prev) =>
        prev.map((entry) =>
          entry.id === id
            ? {
                ...entry,
                quantity: entry.quantity - entry.itemQuantity,
                itemQuantity: 0,
              } // unsure about this here...watch it 00
            : { ...entry },
        ),
      );

      return;
    }

    // Above checks are good, just add a new entry

  };

  return (
    <div>
      <ItemContainer
        products={productEntries}
        onChangeQuantity={onChangeQuantity}
      />
    </div>
  );
}
