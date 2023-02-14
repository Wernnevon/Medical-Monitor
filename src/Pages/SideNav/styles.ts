import styled from "styled-components";
import { Link } from "react-router-dom";

type PropType = {
  active?: string;
};

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  min-width: 150px;
  width: 15vw;
  padding: 10px 0;
  overflow: hidden;
  border: none;
  @media print {
    display: none;
  }
`;

export const LogoDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const NavLink = styled(Link)`
  outline: none;
  text-decoration: none;
  margin: 10px 0;
  width: ${({ active }: PropType) => (active ? "98%" : 0)};
  background-color: #0000004d;
  border-right: ${({ active }: PropType) =>
    active ? "5px solid #fff" : "0px solid #fff"};
  transition: 300ms linear;
  :hover {
    cursor: pointer;
  }
`;
export const NavBtn = styled.button`
  display: flex;
  outline: none;
  border: none;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 10px 20px;
  background-color: transparent;
  font-weight: 400;
  color: #fff;
  height: 100%;
  :hover {
    font-weight: ${({ active }: PropType) => (active ? "400" : "500")};
    cursor: pointer;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1.6rem;
  }
`;
export const NavLabel = styled.label`
  color: #fff;
  text-transform: uppercase;
  font-size: 1.3rem;
  margin-left: 10px;
  font-family: "Akshar-Regular", sans-serif;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1rem;
  }
`;
export const Image = styled.img`
  width: 80%;
  height: 80%;
  margin: 20px 0;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    height: 68%;
  }
`;

export const NavImage = styled.button`
  outline: none;
  border: none;
  width: 70%;
  margin: 30px 0;
  border-radius: 50%;
  background-image: radial-gradient(#fff 5%, #d0d0d0 100%);
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    height: 75%;
    margin: 15px 0;
  }
`;
