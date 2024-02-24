import { useMode } from "../context/ThemeContext";

import ButtonIcon from "./ButtonIcon";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const ModeToggle = () => {
  const { isDarkMode, toggleMode } = useMode();

  return (
    <ButtonIcon onClick={toggleMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default ModeToggle;
