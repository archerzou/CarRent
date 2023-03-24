import { useState } from 'react';

const ImageSwiper = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);
  const cols = images.length;
  return (
    <div className="flex-col">
      <div className="flex flex-wrap justify-center">
        <img
          src={activeImg || images[active].url}
          className="h-auto rounded-lg max-w-full shadow-lg"
          alt=""
        />
      </div>
      <div className="flex justify-between pt-4 items-center">
        {images.map((img, i) => (
          <div
            className="h-auto rounded-lg mx-2 cursor-pointer"
            key={i}
            onClick={() => setActive(i)}
          >
            <img src={img.url} alt="" key={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwiper;
