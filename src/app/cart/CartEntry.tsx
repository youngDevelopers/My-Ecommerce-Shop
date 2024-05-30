"use client";

import { CartItemWithProducts } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQuantity } from "./actions";

interface CartEntryProps {
  cartItem: CartItemWithProducts;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({ cartItem }: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];

  for (let i = 0; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={`/products/${cartItem.product.id}`} className="font-bold">
            {cartItem.product.name}
          </Link>
          <div>Price: {formatPrice(cartItem.product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={cartItem.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                startTransition(async () => {
                  await setProductQuantity(cartItem.product.id, newQuantity);
                });
              }}
            >
                <option value={0}>0 (Remove item)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(cartItem.product.price * cartItem.quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
