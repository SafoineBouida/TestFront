import React from "react";

interface Props {
  flipped?: boolean;
  image: string;
  onClick(): void;
  isClickDisabled?: boolean;
}

const Card = ({
  flipped = false,
  onClick,
  image,
  isClickDisabled = false,
}: Props) => {
  const onCardClick = () => {
    if (isClickDisabled) {
      return;
    }
    onClick();
  };

  return (
    <div
      style={{
        width: 80,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: flipped ? "grey" : "black",
        margin: 10,
        cursor: isClickDisabled ? "default" : "pointer",
      }}
      onClick={onCardClick}
    >
      {flipped && <img src={image} alt="img" />}
    </div>
  );
};

export default Card;
