import "../../home/styles/Home.css";
import "../container_styles/ImagePage.css";
import { useState, useEffect } from "react";
import { Firebase } from "../../firebase/Firebase";
import HomeContainer from "./HomeContainer";
import FullDisplayContainer from "./FullDisplayContainer";
import useImageLoader from "../../../hooks/useImageLoader";
import useMountCheck from "../../../hooks/useMountCheck";

const ImageContainer = (props) => {
  const { type, author, name } = props;
  // const [imageLoaded, setImageLoaded] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [profileDataLoading, setProfileDataLoading] = useState(true);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const { getUserProfile } = Firebase();
  const [imageLoaded, loadImage] = useImageLoader();

  //refactored 06/12
  //Profile Info needs loader

  let [isMounted] = useMountCheck();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile(author);
      if (isMounted.current) {
        setProfileDataLoading(false);
        setProfileData(profile);
        setIsProfileLoaded(false);
      }
    };
    if (!isProfileLoaded && profileDataLoading) {
      fetchProfile();
    }
  }, [
    author,
    getUserProfile,
    isMounted,
    isProfileLoaded,
    name,
    profileData,
    profileDataLoading,
  ]);

  useEffect(() => {
    if (!imageLoaded && isMounted.current) {
      loadImage(props.src);
    }
  }, [imageLoaded, isMounted, loadImage, props.src]);

  /*
  useEffect(() => {
    let isMounted = true;
    if (!imageLoaded) {
      const image = new Image();
      image.src = props.src;
      image.id = imageID;
      image.onload = () => {
        if (isMounted) {
          setImageLoaded(true);
        }
      };
      image.onerror = () => {
        console.error("Failed to load image");
        setImageErrored(true);
      };
    }
    return () => {
      isMounted = false;
    };
  }, [imageID, imageLoaded, props.src]);
  */

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
    />
  ) : (
    <FullDisplayContainer
      props={{ ...props }}
      imageLoaded={imageLoaded}
      checkIfHomePage={checkIfHomePage}
      profileData={profileData}
      profileIsLoading={profileDataLoading}
    />
  );
};

export default ImageContainer;
