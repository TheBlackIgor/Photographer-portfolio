import { useEffect, useState } from "react";
import "./Carousel.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreI } from "@/store/types";
import { getImagePath } from "@/utils";
import { getFiles } from "@/api";
import { currentPhotosActions } from "@/store";

export const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dispatch = useDispatch();

  const images = useSelector((state: StoreI) => state.currentPhotos.photos);

  const handleLoadImages = async () => {
    const resImages = await getFiles("slider");
    dispatch(currentPhotosActions.setPhotos(resImages));

    return resImages.length;
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    const loadCarousel = async () => {
      const length = await handleLoadImages();
      interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % length);
      }, 4000);
    };

    loadCarousel();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={getImagePath(image)}
          alt={`Image ${index + 1}`}
          className={`carousel-image ${
            index === currentImageIndex ? "visible" : ""
          }`}
        />
      ))}
    </div>
  );
};
