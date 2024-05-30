"use client"

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
    productId: string;
    incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToCartButton ({productId ,incrementProductQuantity}: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<boolean>(false)
    return(
        <div className="flex items-center gap-2">
            <button className="btn btn-primary" onClick={() => {
                setSuccess(false);
                startTransition(async () => {
                    await incrementProductQuantity(productId); //wen this function revalidatePath isPending=false
                setSuccess(true)                })
            }}>
                Add To Cart
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
            </button>
            {
                isPending && <span className="loading loading-spinner loading-md"/>
            }
            {
                !isPending && success && <span className="text-success">Added to Cart</span>
            }
        </div>
    )
}