import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { CartProvider } from "~/utils/cartContext";
import Navbar from "~/components/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CartProvider>
    <Navbar />
    <Component {...pageProps} />
  </CartProvider>)
};

export default MyApp;
