import React, { useState } from "react";

import { Link } from "react-router-dom";

import { AiOutlineAudit, AiOutlineFileText } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BiTestTube } from "react-icons/bi";

import Logo from "../../../assests/logo01.png";

import {
  SideMenuContainer,
  NavBtn,
  NavLabel,
  Image,
  NavImage,
  NavLink,
} from "./styles";

const SideNav: React.FC = () => {
  const [state, setState] = useState("home");
  return (
    <SideMenuContainer id="sidenav">
      <Link draggable={false} style={{ outline: "none", margin: '2em 0' }} to="/main_window/">
        <NavImage style={{ margin: 0, padding: 0}} draggable={false} onClick={() => setState("home")}>
          <Image draggable={false} src={Logo} />
        </NavImage>
      </Link>
      <NavLink
        draggable={false}
        to="/main_window/pacientes"
        active={state === "pacientes" ? state : ""}
        onClick={() => {
          setState("pacientes");
        }}
      >
        <NavBtn active={state === "pacientes" ? state : ""}>
          <HiUserGroup style={{ position: "relative", bottom: '.15rem' }} />
          <NavLabel>Pacientes</NavLabel>
        </NavBtn>
      </NavLink>
      <NavLink
        draggable={false}
        active={state === "receitas" ? state : ""}
        onClick={() => setState("receitas")}
        to="/main_window/receitas"
      >
        <NavBtn active={state === "receitas" ? state : ""}>
          <AiOutlineFileText />
          <NavLabel>Receitas</NavLabel>
        </NavBtn>
      </NavLink>
      <NavLink
        draggable={false}
        active={state === "exames" ? state : ""}
        onClick={() => setState("exames")}
        to="/main_window/exames"
      >
        <NavBtn active={state === "exames" ? state : ""}>
          <BiTestTube />
          <NavLabel>Exame</NavLabel>
        </NavBtn>
      </NavLink>

      <NavLink
        draggable={false}
        active={state === "atestados" ? state : ""}
        onClick={() => setState("atestados")}
        to="/main_window/atestados"
      >
        <NavBtn active={state === "atestados" ? state : ""}>
          <AiOutlineAudit />
          <NavLabel>Atestado</NavLabel>
        </NavBtn>
      </NavLink>
    </SideMenuContainer>
  );
};

export default SideNav;