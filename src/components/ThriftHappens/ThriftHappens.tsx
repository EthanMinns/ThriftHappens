import { useState } from "react";
import type { ClothingProduct } from "../../data/data";
import ItemContainer from "../ItemContainer/ItemContainer";

interface ThriftHappensProps {
  products: ClothingProduct[];
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

  // ===== Handlers =====

  // A handler that changes the selected quantity of a product
  // when ItemCard has a quantity button pressed
  const onChangeQuantity = (id: number, value: number) => {
    setProductEntries((prev) =>
      prev.map((entry) => {
        if (entry.id != id) return entry;

        const newQuantity = entry.itemQuantity + value;

        if (newQuantity < 0) {
          return entry;
        }

        if (newQuantity > entry.quantity) {
          return entry;
        }

        entry.itemQuantity = newQuantity;

        return entry;
      }),
    );
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
