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
  const { type, author, imageID } = props;

  const { getUserProfile } = Firebase();
  const [imageLoaded, loadImage] = useImageLoader();

  //refactored 06/12
  //Profile Info needs loader

  let [isMounted] = useMountCheck();

  const [isProfileLoaded, profileDataLoading, profileData, reloadData] =
    useDataLoader(getUserProfile, author);

  useEffect(() => {
    if (!imageLoaded && isMounted.current) {
      loadImage(props.src);
    }
  }, [imageLoaded, isMounted, loadImage, props.src]);

  const checkIfHomePage = () => {
    return type === "HomePage";
  };

  return checkIfHomePage() ? (
    <HomeContainer
      props={{ ...props }}
      imageLoaded={imageLoaded}
      checkIfHomePage={checkIfHomePage}
      profileData={profileData}
      profileIsLoading={profileDataLoading}
      identifier={imageID}
      refresh={props.refresh}
    />
  ) : (
    <FullDisplayContainer
      props={{ ...props }}
      imageLoaded={imageLoaded}
      checkIfHomePage={checkIfHomePage}
      profileData={profileData}
      profileIsLoading={profileDataLoading}
      identifier={imageID}
      refresh={props.refresh}
    />
  );
};

export default ImageContainer;
