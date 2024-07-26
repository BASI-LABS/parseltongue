import React, { useState, useEffect, useCallback } from "react";

interface ImageRotationProps {
  className: string;
  images: string[];
}

const ImageRotation: React.FC<ImageRotationProps> = ({ className, images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const preloadImage = useCallback((src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = reject;
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Promise.all(images.map(preloadImage))
      .then((loadedSrcs) => {
        setLoadedImages(loadedSrcs);
        setIsLoading(false);
        setCurrentIndex(Math.floor(Math.random() * images.length));
      })
      .catch((error) => {
        console.error("Failed to preload images:", error);
        setIsLoading(false);
      });
  }, [images, preloadImage]);

  useEffect(() => {
    if (loadedImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadedImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loadedImages]);

  if (isLoading) {
    return null; // Return null when loading
  }

  return (
    <>
      {loadedImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`${className} rounded-md ${
            index === currentIndex ? 'visible' : 'hidden'
          } transition-opacity duration-200`}
          loading="lazy"
        />
      ))}
    </>
  );
};

export default ImageRotation;
