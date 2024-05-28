import styled from "styled-components";

type PropType = {
  active?: boolean;
};

export const DropdownHeader = styled.div<PropType>`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 97%;
  height: 30px;
  position: absolute;
  background: #fff;
  z-index: 20;
  top: 1px;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    height: 10px;
  }
`;

export const DropdownContainer = styled.div<PropType>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 93%;
  height: ${(props) => (props.active ? "250px" : "20px")};
  background: #fff;
  box-shadow: 0px 3px 8px 0px #00000033;
  padding: 10px;
  margin: 5px;
  position: relative;
  transition: 300ms;
  @media print {
    display: none;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    height: ${(props) => (props.active ? 250 : 10)}px;
    width: 92%;
  }
`;

export const DropdownContent = styled.div<PropType>`
  display: grid;
  grid-template-columns: auto auto;
  gap: 5px;
  position: relative;
  background: inherit;
  min-width: 160px;
  padding: 10px;
  z-index: 1;
  font-size: 1.2rem;
  height: ${(props) => (props.active ? "250px" : "0px")};
  border-top: 1px solid #8d8d8d;
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  overflow-y: ${(props) => (props.active ? "auto" : "hidden")};
  margin-top: ${(props) => (props.active ? 30 : 0)}px;
  transition: 300ms;
`;

export const HeaderExames = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  background: #fff;
`;

export const Arrow = styled.span<PropType>`
  display: flex;
  width: 12px;
  height: 12px;
  background-color: #2d2d2d;
  position: relative;
  transition: 0.2s;
  transform: rotate(${(props) => (props.active ? 135 : -45)}deg);
  top: ${(props) => (props.active ? 18 : 10)}px;
  right: 10px;
  ::before {
    content: "";
    display: block;
    width: 20px;
    height: 10px;
    background-color: #fff;
    position: absolute;
    top: -1px;
    left: -1px;
    transform: rotate(45deg);
    z-index: 99;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    top: ${(props) => (props.active ? 12 : 4)}px;
  }
`;

export const ContainerCheckbox = styled.label`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid #8d8d8d;
`;

export const Checkbox = styled.input`
  background: none;
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
  width: 15px;
  height: 15px;
  accent-color: #03a696;
`;

export const LabelCheckbox = styled.label`
  font-size: 1rem;
  font-weight: 300;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.7rem;
  }
`;

export const Exames = styled.label`
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  margin: 0.4rem;
  font-size: 1.3rem;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.9rem;
  }
`;
