"use client"

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function CartSidebar() {
    const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, subtotal, total } = useCart();
    const sidebarRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isCartOpen) {
                toggleCart();
            }
        };

        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isCartOpen, toggleCart]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
            <div
                ref={sidebarRef}
                className="w-full sm:w-[400px] h-full bg-white dark:bg-zinc-900 shadow-xl flex flex-col animate-in slide-in-from-right duration-300"
            >
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-xl font-bold">Tu Carrito</h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            <p>Tu carrito está vacío</p>
                            <button
                                onClick={toggleCart}
                                className="mt-4 text-sky-600 hover:underline"
                            >
                                Continuar comprando
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-medium line-clamp-2 text-sm">{item.name}</h3>
                                        <p className="font-bold mt-1 text-green-600">₲ {item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-600 text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t p-4 bg-gray-50 dark:bg-zinc-900/50">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span>₲ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₲ {total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-medium transition-colors">
                                Proceder al Pago
                            </button>
                            <button
                                onClick={toggleCart}
                                className="w-full border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 py-3 rounded-lg font-medium transition-colors"
                            >
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
