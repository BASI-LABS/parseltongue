import React, {useState} from "react";


export default function ImageRotation({className, images} : { className? : string, images : string[] }) {
    const [currentIndex, setCurrentIndex] = useState((Math.random() * images.length) | 0);
  
      React.useEffect(() => {
          const interval = setInterval(() => {
              setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          }, 2500); // Change image every 3 seconds
  
          return () => clearInterval(interval);
      }, []);
  
      return (
          <>{images.map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`${className} rounded-md ${index === currentIndex ? 'visible' : 'hidden duration-200' }`}
                loading='lazy'
            />
        ))}</>
      );
  }
  