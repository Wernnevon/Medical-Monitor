import { Link } from "react-router-dom";
import styled from "styled-components";

const BreadcrumbContainer = styled.div`
  display: flex;
  width: max-content;
  margin: 0.5rem 1rem 0;
  font-size: 1.2rem;
  font-family: "Akshar-light";
  @media print {
    display: none;
  }
`;

const BreadcrumbList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-left: 4px solid #4ba68c;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  margin-left: 5px;

  &:after {
    content: "\\2771";
    color: #4ba68c;
  }

  &:last-child:after {
    content: none;
  }
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-top: 2px;
  text-transform: uppercase;
  font-variant: small-caps;
`;

export { BreadcrumbContainer, BreadcrumbList, BreadcrumbItem, BreadcrumbLink };
