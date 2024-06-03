/* eslint-disable no-useless-computed-key */
import React, { useLayoutEffect, useState } from "react";

import { AiOutlineAudit } from "react-icons/ai";
import { LuClipboardEdit } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiTestTube } from "react-icons/bi";

import Logo from "../../../assests/MM.svg";

import {
  SideMenuContainer,
  NavBtn,
  NavLabel,
  Image,
  NavImage,
  LogoDiv,
  NavLink,
} from "./styles";
import { useLocation } from "react-router-dom";

const SideNav: React.FC = () => {
  const [state, setState] = useState("pacientes");
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const place = pathname.split("/").at(-1);
    switch (place) {
      case "exames":
        setState("exames");
        break;
      case "receitas":
        setState("receitas");
        break;
      case "atestados":
        setState("atestados");
        break;
      default:
        setState("pacientes");
        break;
    }
  }, [pathname]);
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
      >
        <NavBtn active={state === "pacientes" ? state : ""}>
          <HiOutlineUserGroup
            style={{ position: "relative", bottom: ".15rem" }}
          />
          <NavLabel>Pacientes</NavLabel>
        </NavBtn>
      </NavLink>
      <NavLink
        draggable={false}
        active={state === "receitas" ? state : ""}
        to="/receitas"
      >
        <NavBtn active={state === "receitas" ? state : ""}>
          <LuClipboardEdit />
          <NavLabel>Receitas</NavLabel>
        </NavBtn>
      </NavLink>
      <NavLink
        draggable={false}
        active={state === "exames" ? state : ""}
        to="/exames"
      >
        <NavBtn active={state === "exames" ? state : ""}>
          <BiTestTube />
          <NavLabel>Exame</NavLabel>
        </NavBtn>
      </NavLink>

      <NavLink
        draggable={false}
        active={state === "atestados" ? state : ""}
        to="/atestados"
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
