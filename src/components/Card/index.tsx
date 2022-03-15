import classnames from "classnames";

import "./card.css";

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
      className={classnames("card", {
        flipped,
        disabled: isClickDisabled,
      })}
      onClick={onCardClick}
    >
      {flipped && <img src={image} alt="img" />}
    </div>
  );
};

export default Card;
