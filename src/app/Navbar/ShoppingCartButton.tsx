"use client"

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
    const closeDropdown = () => {
        const elem = document.activeElement as HTMLElement
        if(elem){
            elem.blur();
        }
    }
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h21 2M7 13h1014-8H5.4M7 5M7 131-2.293 2.29"
            />
          </svg>
          <span className="badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div tabIndex={0} className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30">
        <div className="card-body">
            <span className="text-lg font-bold">{cart?.size || 0}</span>
            <span className="text-info">
                Subtotal: {formatPrice(cart?.subtotal || 0)}
            </span>
            <div className="card-actions">
                <Link href="/cart" className="btn btn-primary btn-block" onClick={closeDropdown}>
                    View Cart
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
