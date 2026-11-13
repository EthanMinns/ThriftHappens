import { useState } from "react";
import type { ClothingProduct } from "../../data/data";
import ItemContainer from "../ItemContainer/ItemContainer";
import CheckoutContainer from "../CheckoutContainer/CheckoutContainer";
import styles from "./ThriftHappens.module.css";

interface ThriftHappensProps {
  products: ClothingProduct[];
}

export interface CheckoutEntry {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutContainerProps {
  lines: CheckoutEntry[];
  onRemoveFromCart: (id: number) => void;
  onRemoveAllFromCart: () => void;
}

export interface CheckoutCardProps {
  line: CheckoutEntry;
  onRemoveFromCart: (id: number) => void;
}

export interface ItemContainerProps {
  products: ClothingProduct[];
  onChangeQuantity: (id: number, value: number) => void;
  onAddToCart: (id: number) => void;
}

export interface ItemCardProps {
  product: ClothingProduct;
  onChangeQuantity: (id: number, value: number) => void;
  onAddToCart: (id: number) => void;
}

export default function ThriftHappens({ products }: ThriftHappensProps) {
  // ===== States =====

  // State holds product entries including the current selected quantity that customers
  // Want to add to cart
  const [productEntries, setProductEntries] =
    useState<ClothingProduct[]>(products);

  // State to hold list of checkoutEntries
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
      return;
    }

    // And not greater than current stock
    if (newQuantity > productEntry.quantity) {
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

  // Handler that adds itemQuantity of productEntry to
  // either an existing checkoutEntry or a new checkoutEntry
  const onAddToCart = (id: number) => {
    const productEntry = productEntries.find((entry) => entry.id === id);
    if (!productEntry) return;

    // If attempted quantity is zero
    if (productEntry.itemQuantity === 0) {
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
              }
            : { ...entry },
        ),
      );

      return;
    }

    // Just add a new entry
    setCheckoutEntries((prev) => [
      ...prev,
      {
        ...productEntry,
        quantity: productEntry.itemQuantity,
      },
    ]);
    setProductEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              quantity: entry.quantity - entry.itemQuantity,
              itemQuantity: 0,
            }
          : { ...entry },
      ),
    );
  };

  // Handler that adds checkoutEntry quantity back to productEntry quantity
  const onRemoveFromCart = (id: number) => {
    const checkoutEntry = checkoutEntries.find((entry) => entry.id === id);
    if (!checkoutEntry) return;

    // Restore quantity to product
    setProductEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, quantity: entry.quantity + checkoutEntry.quantity }
          : { ...entry },
      ),
    );

    // Filter out the checkout entry
    setCheckoutEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Handler that loops over productEntries and adds back the matching checkoutEntry
  // quantity if one exists. Sets checkoutEntries to empty after
  const onRemoveAllFromCart = () => {
    setProductEntries((prev) =>
      prev.map((entry) => {
        const checkoutEntry = checkoutEntries.find((e) => e.id === entry.id);
        return checkoutEntry
          ? { ...entry, quantity: entry.quantity + checkoutEntry.quantity }
          : entry;
      }),
    );

    setCheckoutEntries([]);
  };

  return (
    <div className={styles.container}>
      <ItemContainer
        products={productEntries}
        onChangeQuantity={onChangeQuantity}
        onAddToCart={onAddToCart}
      />
      <CheckoutContainer
        lines={checkoutEntries}
        onRemoveFromCart={onRemoveFromCart}
        onRemoveAllFromCart={onRemoveAllFromCart}
      />
    </div>
  );
}
