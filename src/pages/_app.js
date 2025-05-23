import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const previousPath = useRef(router.asPath);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      if (url !== previousPath.current) {
        setProgress(40);
      }
    };

    const handleRouteChangeComplete = (url) => {
      if (url !== previousPath.current) {
        setProgress(100);
        previousPath.current = url;
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return <>
    <CartProvider>
      <LoadingBar
        color="#4F46E5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  </>
}
