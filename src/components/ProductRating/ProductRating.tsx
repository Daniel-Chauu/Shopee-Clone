import React from "react";

interface ProductRatingProps {
  rating: number;
}

const ProductRating = ({ rating }: ProductRatingProps) => {
  const handleWidth = (order: number) => {
    const surplus = order - rating;
    if (rating >= order) {
      return "100%";
    } else if (rating < order && surplus < 1) {
      return (rating - Math.floor(rating)) * 100 + "%";
    } else if (rating < order && surplus > 1) {
      return "0%";
    }
  };

  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          // console.log(
          //   `rating ${rating} ---------- ${rating - Math.floor(rating)}%`
          // );
          return (
            <div className="flex items-center" key={index}>
              <div className="relative">
                <div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: handleWidth(index + 1) }}
                >
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="w-3 h-3 fill-yellow-300 text-yellow-300"
                  >
                    <polygon
                      points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="w-3 h-3 fill-current text-gray-300"
                >
                  <polygon
                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductRating;