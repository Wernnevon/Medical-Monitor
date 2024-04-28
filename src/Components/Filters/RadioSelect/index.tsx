import { IoFilter } from "react-icons/io5";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

import { Body, Container, Header, Item } from "./styles";
import { useRef, useState } from "react";
import useOutsideAlerter from "../../../Hooks/useOutsideAlerter";

type Props = {
  onSelect: (value: any) => void;
  data: string[];
  placeholder?: string;
};

const RadioSelect: React.FC<Props> = ({
  placeholder,
  data,
  onSelect,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [item, setItem] = useState();
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, collapse);

  function collapse() {
    setIsCollapsed(false);
  }

  function handleSelect(value: any) {
    setItem(value);
    if (onSelect) onSelect(value);
  }

  return (
    <Container ref={wrapperRef} collapsed={isCollapsed}>
      <Header onClick={() => setIsCollapsed(!isCollapsed)}>
        <span>
          {" "}
          <IoFilter />
          <label>{placeholder ? placeholder : "Placeholder"} </label>
        </span>
        {isCollapsed ? <BsChevronUp /> : <BsChevronDown />}
      </Header>
      <Body collapsed={isCollapsed}>
        <span>
          {data.map((option) => (
            <Item key={option} onClick={() => handleSelect(option)}>
              <input
                type="radio"
                readOnly
                checked={item === option}
                value={option}
              />
              <label>{option}</label>
            </Item>
          ))}
        </span>
        <Item onClick={() => handleSelect("")}>
          <RiDeleteBin6Line color="#03a696" />
          <label>Limpar</label>
        </Item>
      </Body>
    </Container>
  );
};

export default RadioSelect;
