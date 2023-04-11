import { useState } from 'react';

const ImageSwiper = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);
  const cols = images.length;
  return (
    <div className="grid gap-4 w-2/5">
      <div>
        <img
          src={activeImg || images[active].url}
          className="h-auto max-w-full rounded-lg"
          alt=""
        />
      </div>
      <div className={`grid grid-cols-${cols} gap-4} `}>
        {images.map((img, i) => (
          <div
            className="mx-2"
            key={i}
            onClick={() => setActive(i)}
          >
            <img
              src={img.url}
              alt=""
              key={i}
              className="h-auto max-w-full rounded-lg cursor-pointer shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwiper;
