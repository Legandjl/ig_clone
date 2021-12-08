import "../../home/Home.css";
import "../container_styles/ImagePage.css";
import { useState, useEffect, useRef } from "react";
import { Firebase } from "../../firebase/Firebase";
import HomeContainer from "./HomeContainer";
import FullDisplayContainer from "./FullDisplayContainer";

const ImageContainer = (props) => {
  const { type, author, imageID, name } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [profileDataLoading, setProfileDataLoading] = useState(true);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const { getUserProfile } = Firebase();

  //refactored 06/12
  //Profile Info needs loader

  let isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
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
    return () => {
      isMounted.current = false;
    };
  }, [
    author,
    getUserProfile,
    isProfileLoaded,
    name,
    profileData,
    profileDataLoading,
  ]);

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
    }
    return () => {
      isMounted = false;
    };
  }, [imageID, imageLoaded, props.src]);

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
