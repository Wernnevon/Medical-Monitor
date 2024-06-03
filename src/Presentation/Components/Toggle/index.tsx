import React, { useState } from "react";
import { ToggleButton, ToggleContainer } from "./styles";

const Toggle: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <ToggleButton isActive={isActive} />
    </ToggleContainer>
  );
};

export default Toggle;
