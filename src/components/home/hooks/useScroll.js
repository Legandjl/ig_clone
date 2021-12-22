import { useEffect, useState } from "react/cjs/react.development";

const useScroll = () => {
  const [bottom, setBottom] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight * 0.8;
      setBottom(bottom);
    };

    if (!bottom) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [bottom]);

  return { bottom };
};

export default useScroll;
