import "../../home/styles/Home.css";
import "../container_styles/ImagePage.css";
import { useState, useEffect, useRef } from "react";
import { Firebase } from "../../firebase/Firebase";
import HomeContainer from "./HomeContainer";
import FullDisplayContainer from "./FullDisplayContainer";
import useImageLoader from "../../../hooks/useImageLoader";

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

  let isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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
    isProfileLoaded,
    name,
    profileData,
    profileDataLoading,
  ]);

  useEffect(() => {
    if (!imageLoaded && isMounted.current) {
      loadImage(props.src);
    }
  }, [imageLoaded, loadImage, props.src]);

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
