import { useEffect, useState } from "react/cjs/react.development";

const useScroll = () => {
  const [bottom, setBottom] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight * 0.75;
      setBottom(bottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { bottom };
};

export default useScroll;
