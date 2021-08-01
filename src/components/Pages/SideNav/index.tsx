import React, { useState } from "react";

import { Link } from "react-router-dom";

import { FaAddressCard,
         FaRegFileAlt,
} from "react-icons/fa";
import { AiOutlineAudit,
         AiOutlineFileText,
} from "react-icons/ai";

import Logo from "../../../assests/logo01.png";

import { SideMenuContainer, NavBtn, NavLabel, Image, NavImage } from "./styles";

const SideNav: React.FC = () => {

  const [state, setState] = useState("");

  return (
    <SideMenuContainer>

       <Link style={{outline: "none"}} to="/main_window/">
          <NavImage onClick={ () => setState("home") }> 
            <Image src={Logo}/> 
          </NavImage>
       </Link>

       <Link style={{outline: "none"}} to="/main_window/pacientes">
          <NavBtn active={state === "pacientes" ? state : ""} onClick={ () => setState("pacientes") }> 
            <FaAddressCard/> 
          </NavBtn>
       </Link>
       <NavLabel>Pacientes</NavLabel>

       <Link to="/main_window/receitas">
          <NavBtn active={state === "receitas" ? state : ""}  
            onClick={ () => setState("receitas") }> 
            <AiOutlineAudit/>
          </NavBtn>
       </Link>
       <NavLabel>Receita</NavLabel>

       <Link to="/main_window/exames">
          <NavBtn active={state === "exames" ? state : ""} onClick={ () => setState("exames") }> 
            <FaRegFileAlt/> 
          </NavBtn>
       </Link>
       <NavLabel>Exame</NavLabel>

       <Link to="/main_window/atestados">
          <NavBtn active={state === "atestados" ? state : ""} onClick={ () => setState("atestados") }> 
            <AiOutlineFileText/>
          </NavBtn>
       </Link>
       <NavLabel>Atestado</NavLabel>

    </SideMenuContainer>
  );
};

export default SideNav;
