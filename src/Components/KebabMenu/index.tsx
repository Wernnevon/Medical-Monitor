/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import { Container, Kebab } from "./styles";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

const KebabMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeKebab);

  function closeKebab() {
    if(open) setOpen(false);
  }

  return (
    <span ref={wrapperRef}>
      <Kebab onClick={() => setOpen(!open)} />
      <Container isOpen={open}>
        <a>Item 1</a>
        <a>Item 2</a>
        <a>Item 3</a>
      </Container>
    </span>
  );
};

export default KebabMenu;
