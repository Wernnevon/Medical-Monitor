import React, { useState } from "react";

import { AiOutlineAudit, AiOutlineFileText } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BiTestTube } from "react-icons/bi";

import Logo from "../../assests/MMNoBG.svg";

import {
  SideMenuContainer,
  NavBtn,
  NavLabel,
  Image,
  NavImage,
  LogoDiv,
  NavLink,
} from "./styles";

const SideNav: React.FC = () => {
  const [state, setState] = useState("pacientes");
  const iconSize = 35;
  return (
    <SideMenuContainer id="sidenav">
      <LogoDiv>
        <NavImage draggable={false}>
          <Image draggable={false} src={Logo} />
        </NavImage>
      </LogoDiv>
      <NavLink
        draggable={false}
        to="/pacientes"
        active={state === "pacientes" ? state : ""}
        onClick={() => {
          setState("pacientes");
        }}
      >
        <NavBtn active={state === "pacientes" ? state : ""}>
          <HiUserGroup
            size={iconSize}
            style={{ position: "relative", bottom: ".2rem" }}
          />
          <NavLabel>Pacientes</NavLabel>
        </NavBtn>
      </NavLink>
      <NavLink
        draggable={false}
        active={state === "receitas" ? state : ""}
        onClick={() => setState("receitas")}
        to="/receitas"
      >
        <NavBtn active={state === "receitas" ? state : ""}>
          <AiOutlineFileText size={iconSize} />
          <NavLabel>Receitas</NavLabel>
        </NavBtn>
      </NavLink>
      <NavLink
        draggable={false}
        active={state === "exames" ? state : ""}
        onClick={() => setState("exames")}
        to="/exames"
      >
        <NavBtn active={state === "exames" ? state : ""}>
          <BiTestTube size={iconSize} />
          <NavLabel>Exame</NavLabel>
        </NavBtn>
      </NavLink>

      <NavLink
        draggable={false}
        active={state === "atestados" ? state : ""}
        onClick={() => setState("atestados")}
        to="/atestados"
      >
        <NavBtn active={state === "atestados" ? state : ""}>
          <AiOutlineAudit size={iconSize} />
          <NavLabel>Atestado</NavLabel>
        </NavBtn>
      </NavLink>
    </SideMenuContainer>
  );
};

export default SideNav;
