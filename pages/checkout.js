import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Checkout = ({ cart, subTotal }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAdress] = useState('');
  const [pin, setPin] = useState('');

  const [payNowButton, setPayNowButton] = useState(true);
  const router = useRouter()
  useEffect(() => {

    const t = localStorage.getItem('token')
    const handleFetchUserData = async () => {
      const data = await fetch('/api/getuser',
        {
          method: "POST", headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem('token') })
        })
      let u = await data.json();
      setEmail(u.user[0].email)
    }
    if (t) {
      handleFetchUserData()
    } else {
      router.push('/')
    }
  }, [])


  useEffect(() => {

    if (
      name.trim() &&
      /^\d{10}$/.test(phone.trim()) &&
      city.trim() &&
      state.trim() &&
      address.trim() &&
      /^\d{6}$/.test(pin.trim())
    ) {
      setPayNowButton(false);
    } else {
      setPayNowButton(true);
    }
  }, [name, phone, city, state, address, pin]);

  const handleValueChange = (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    if (e.target.name == 'email') {
      setName(e.target.value)
    }
    if (e.target.name == 'phone') {
      setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))
    }
    if (e.target.name == 'city') {
      setCity(e.target.value)
    }
    if (e.target.name == 'state') {
      setState(e.target.value)
    }
    if (e.target.name == 'address') {
      setAdress(e.target.value)
    }
    if (e.target.name == 'pin') {
      setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))
    }
  }

  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    let oid = Math.floor(Math.random() * Date.now());
    const d = { cart, subTotal, oid, email, name, phone, address }
    const data = await fetch("api/razorpay",
      {
        method: "POST", headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(d)
      })

    let order = await data.json();
    var options = {
      key: "rzp_test_lQ258mLYnIGbsQ",
      name: "Aum Yoga",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Thankyou for your test donation",
      image: "images/paylogo.png",
      description: "Test Transaction",
      handler: async function (response) {

        const verifyPayment = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });
        const verifyResult = await verifyPayment.json();
        if (verifyResult.success) {
          const updateOrder = await fetch("/api/update-order-status", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              orderId: oid,
              status: "completed",
            }),
          });

          const updateResult = await updateOrder.json();

          if (updateResult.success) {
            alert("Payment Successful! Your order status has been updated.");
            router.push("/order?id=" + order.o);
          } else {
            alert("Payment was successful, but we couldn't update the order status. Please contact support." + updateResult.message);
          }

        } else {
          alert("Payment Verification Failed! Contact support.");
        }
      },
      prefill: {
        "name": name,
        "email": email,
        "contact": phone
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#16a34a"
      },


    };
    const paymentObject = await new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert(`Payment failed! Reason: ${response.error.reason}`);
      router.push('/cart');
    });
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <title>Checkout | Aum Yoga</title>
      </Head>

      <main className="min-h-[65vh] bg-canvas px-4 py-10 text-ink sm:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">Secure checkout</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Complete your booking</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Review your details and confirm your yoga session purchase.
            </p>
          </header>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,.75fr)]">
            <section className="rounded border border-[var(--color-border)] bg-surface p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Step 1 of 2</p>
                  <h2 className="mt-1 text-xl font-semibold">Delivery details</h2>
                </div>
                <span className="rounded bg-[var(--color-canvas)] px-3 py-1 text-xs font-semibold text-muted">* Required</span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                    Full name <span className="text-red-600">*</span>
                  </label>
                  <input required onChange={handleValueChange} value={name} type="text" id="name" name="name" autoComplete="name" placeholder="Your full name" className="w-full rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink placeholder:text-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                    Email <span className="text-muted text-xs">(account)</span>
                  </label>
                  <input value={email} type="email" disabled id="email" name="email" autoComplete="email" className="w-full rounded border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 py-3 text-muted opacity-80" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="mb-2 block text-sm font-semibold text-ink">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <textarea required onChange={handleValueChange} value={address} id="address" name="address" rows={4} autoComplete="street-address" placeholder="House, street, area and nearby landmark" className="w-full resize-y rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink placeholder:text-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input required onChange={handleValueChange} value={phone} type="tel" id="phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" className="w-full rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink placeholder:text-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
                </div>

                <div>
                  <label htmlFor="city" className="mb-2 block text-sm font-semibold text-ink">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input required onChange={handleValueChange} value={city} type="text" id="city" name="city" autoComplete="address-level2" placeholder="City" className="w-full rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink placeholder:text-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
                </div>

                <div>
                  <label htmlFor="state" className="mb-2 block text-sm font-semibold text-ink">
                    State <span className="text-red-600">*</span>
                  </label>
                  <input required onChange={handleValueChange} value={state} type="text" id="state" name="state" autoComplete="address-level1" placeholder="State" className="w-full rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink placeholder:text-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
                </div>

                <div>
                  <label htmlFor="pin" className="mb-2 block text-sm font-semibold text-ink">
                    PIN code <span className="text-red-600">*</span>
                  </label>
                  <input required value={pin} onChange={handleValueChange} type="tel" id="pin" name="pin" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="postal-code" placeholder="6-digit PIN" className="w-full rounded border border-[var(--color-border)] bg-canvas px-4 py-3 text-ink placeholder:text-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
                </div>
              </div>
            </section>

            <aside className="lg:sticky lg:top-24">
              <section className="rounded border border-[var(--color-border)] bg-surface p-5 shadow-sm sm:p-6">
                <div className="mb-5 border-b border-[var(--color-border)] pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Step 2 of 2</p>
                  <h2 className="mt-1 text-xl font-semibold">Review your booking</h2>
                </div>

                <div className="space-y-3">
                  {Object.keys(cart).length === 0 ? (
                    <div className="rounded border border-[var(--color-border)] bg-canvas p-5 text-center text-sm text-muted">
                      Your cart is empty.
                    </div>
                  ) : Object.keys(cart).map((key) => (
                    <div key={key} className="flex items-start justify-between gap-4 rounded border border-[var(--color-border)] bg-canvas p-4">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-ink">{cart[key].name}</h3>
                        <p className="mt-1 text-xs text-muted">Qty {cart[key].qty}</p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold">₹{cart[key].price * cart[key].qty}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-[var(--color-border)] pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-semibold text-muted">Grand total</span>
                    <span className="text-2xl font-bold text-ink">₹{subTotal}</span>
                  </div>

                  <button
                    type="button"
                    disabled={payNowButton || Object.keys(cart).length === 0}
                    onClick={makePayment}
                    className="mt-5 w-full rounded bg-[var(--color-primary)] px-5 py-3 font-semibold text-[var(--color-on-primary)] shadow-sm hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Pay ₹{subTotal}
                  </button>
                  <p className="mt-3 text-center text-xs leading-5 text-muted">
                    Secure payment powered by Razorpay
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

export default Checkout
