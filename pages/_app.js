import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const preferredTheme = savedTheme || 'light';
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
    document.documentElement.classList.toggle('dark', preferredTheme === 'dark');
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }

  useEffect(() => {

    router.events.on('routeChangeStart', () => { setProgress(40) })
    router.events.on('routeChangeComplete', () => { setProgress(100) })

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    const token = localStorage.getItem('token')

    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }


  }, [router.query])

  const saveCart = (myCart) => {

    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    if (keys.length > 0) {
      for (let i = 0; i < keys.length; i++) {
        subt += myCart[keys[i]].price * myCart[keys[i]].qty;
        setSubTotal(subt);
      }
    }
    else {
      setSubTotal(0);
    }
  }

  const addToCart = (itemCode, qty, price, name) => {
    const newCart = {
      ...cart,
      [itemCode]: {
        qty: (cart[itemCode]?.qty || 0) + qty,
        price,
        name,
      },
    };
    setCart(newCart)
    saveCart(newCart)
  }


  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  const removeFromCart = (itemCode, qty, price, name) => {
    let newCart = JSON.parse(JSON.stringify(cart));

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }

    if (newCart[itemCode] && newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)
  }

  const removeItemFromCart = (itemCode, qty, price, name) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    delete newCart[itemCode]


    setCart(newCart)
    saveCart(newCart)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser({ value: null })
  }

  return <>
    <LoadingBar
      color='#f11946'
      progress={progress}
      shadow={true}
      loaderSpeed={500}
      onLoaderFinished={() => setProgress(0)}

    />
    <Navbar user={user} logout={logout} key={key} cart={cart} theme={theme} onToggleTheme={toggleTheme} />

    <Component user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} removeItemFromCart={removeItemFromCart} subTotal={subTotal} {...pageProps} />

    <Footer />
  </>

}
