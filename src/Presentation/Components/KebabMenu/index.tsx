import { useRef, useState } from "react";
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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeKebab);

  function closeKebab() {
    if (open) setOpen(false);
  }

  function handleAction(onAction: (param: any) => void) {
    if (onAction) onAction(rowId);
  }

  return (
    <span ref={wrapperRef}>
      <Kebab onClick={() => setOpen(!open)} />
      <Container isOpen={open && items && items.length}>
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
