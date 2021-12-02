import Loader from "react-loader-spinner";
import { useEffect, useState } from "react/cjs/react.development";

const HomeLoader = (props) => {
  const [backgroundColor, setbackgroundColor] = useState("#D3D3D3");

  return <Loader type="ThreeDots" color="#272528" height={40} width={40} />;
};
export default HomeLoader;
