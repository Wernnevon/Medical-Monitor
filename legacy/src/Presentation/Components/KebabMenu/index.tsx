import { useRef, useState, useEffect } from "react";
import { Container, Item, Kebab } from "./styles";
import useOutsideAlerter from "../../Hooks/useOutsideAlert";

type Props = {
  rowId: number | string;
  items: KebabItem[];
};

type KebabItem = {
  icon: any;
  name: string;
  action(param: any): void;
};

const KebabMenu: React.FC<Props> = ({ items, rowId }: Props) => {
  const [open, setOpen] = useState(false);
  const [overflowed, setOverflowed] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, closeKebab);

  useEffect(() => {
    if (open && wrapperRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Ajusta se o menu excede a altura da tela
      if (containerRect.y + containerRect.height > viewportHeight) {
        setOverflowed(true);
      }
    }
  }, [open]);

  function closeKebab() {
    if (open) setOpen(false);
  }

  function handleAction(onAction: (param: any) => void) {
    if (onAction) onAction(rowId);
    closeKebab();
  }

  return (
    <span ref={wrapperRef}>
      <Kebab onClick={() => setOpen(!open)} />
      <Container
        ref={containerRef}
        isOpen={open && items && items.length}
        overflowed={overflowed}
      >
        {items &&
          items.length &&
          items.map(({ icon, name, action }) => (
            <Item key={name} onClick={() => handleAction(action)}>
              {icon} {name}
            </Item>
          ))}
      </Container>
    </span>
  );
};

export default KebabMenu;
