import "../../home/styles/Home.css";
import "../container_styles/ImagePage.css";
import { useEffect } from "react";
import { Firebase } from "../../firebase/Firebase";
import HomeContainer from "./HomeContainer";
import FullDisplayContainer from "./FullDisplayContainer";
import useImageLoader from "../../../hooks/useImageLoader";
import useMountCheck from "../../../hooks/useMountCheck";
import useDataLoader from "../../../hooks/useDataLoader";

const ImageContainer = (props) => {
  const { getUserProfile } = Firebase();
  const [imageLoaded, loadImage] = useImageLoader();
  const [isMounted] = useMountCheck();
  const [isProfileLoaded, profileDataLoading, profileData, reloadData] =
    useDataLoader(getUserProfile, props.author);

  useEffect(() => {
    if (!imageLoaded && isMounted.current) {
      loadImage(props.src);
    }
  }, [imageLoaded, isMounted, loadImage, props.src]);

  const checkIfHomePage = () => {
    return props.type === "HomePage";
  };

  return checkIfHomePage() ? (
    <HomeContainer
      props={{
        ...props,
        checkIfHomePage: checkIfHomePage,
        profileIsLoading: profileDataLoading,
        imageLoaded: imageLoaded,
        profileData: profileData,
      }}
    />
  ) : (
    <FullDisplayContainer
      props={{
        ...props,
        checkIfHomePage: checkIfHomePage,
        profileIsLoading: profileDataLoading,
        imageLoaded: imageLoaded,
        profileData: profileData,
      }}
    />
  );
};

export default ImageContainer;
