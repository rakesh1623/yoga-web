import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';


const cart = ({ cart, addToCart, removeFromCart, clearCart, removeItemFromCart, subTotal }) => {

    const router = useRouter();
    useEffect(() => {

        if (!localStorage.getItem('token')) {
            router.push('/')
        }

    }, [])
    return (
        <>
            <style jsx>{`
            @layer utilities {
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              } 
    `}</style>

            <main className="min-h-[65vh] bg-canvas px-4 py-12 text-ink sm:px-6">

                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

                    <div className="rounded-lg md:w-2/3 h-fit ">

                        {Object.keys(cart).length == 0 &&
                            <div className="rounded border border-[var(--color-border)] bg-surface px-6 py-16 text-center text-2xl font-semibold">
                                Your cart is empty!
                            </div>
                        }

                        {Object.keys(cart).map((k) => {
                            return <li key={k} className="mb-5 list-none rounded border border-[var(--color-border)] bg-surface p-5 shadow-sm sm:flex sm:items-center sm:justify-between">

                                <div className="sm:ml-4 sm:flex sm:w-full  sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-ink">{cart[k].name}</h2>

                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 sm:mt-0 sm:justify-end">
                                        <div className="flex items-center border-gray-100">
                                            <button type="button" aria-label={`Decrease ${cart[k].name} quantity`} disabled={cart[k].qty <= 1} onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name)} className="h-9 w-9 rounded-l border border-[var(--color-border)] bg-canvas text-lg hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-40">-</button>
                                            <span className="flex h-9 min-w-10 items-center justify-center border-y border-[var(--color-border)] px-2 text-sm" aria-label={`Quantity ${cart[k].qty}`}>{cart[k].qty}</span>
                                            <button type="button" aria-label={`Increase ${cart[k].name} quantity`} onClick={() => addToCart(k, 1, cart[k].price, cart[k].name)} className="h-9 w-9 rounded-r border border-[var(--color-border)] bg-canvas text-lg hover:bg-[var(--color-primary)] hover:text-white">+</button>
                                            <button type="button" aria-label={`Remove ${cart[k].name}`} onClick={() => removeItemFromCart(k, cart[k].qty, cart[k].price, cart[k].name)} className="ml-2 rounded p-2 text-muted hover:bg-red-50 hover:text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p>Amount : </p>
                                            <p className="text-md">₹{cart[k].price}</p>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        })}

                    </div>

                    <div className="mt-6 h-fit rounded border border-[var(--color-border)] bg-surface p-6 shadow-sm md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-muted">Subtotal</p>
                            <p className="text-muted">₹{subTotal}</p>
                        </div>

                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">₹{subTotal}</p>
                            </div>
                        </div>
                        <button onClick={clearCart} className="mt-6 w-full rounded border border-[var(--color-border)] py-2 font-medium hover:bg-[var(--color-canvas)]">Clear cart</button>
                        <Link href="/checkout" className="mt-3 block w-full rounded bg-[var(--color-primary)] py-2 text-center font-medium text-[var(--color-on-forest)] hover:opacity-90">Continue to checkout</Link>
                    </div>
                </div>
            </main>



        </>
    )
}

export default cart