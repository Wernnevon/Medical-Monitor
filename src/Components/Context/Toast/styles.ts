import styled, { keyframes } from "styled-components";
import { AlertColors, AlertTypes } from "../../Utils/ToastConfigs";

interface ToastProps {
  toastType: AlertTypes;
}

const slider = keyframes`
  0%   {right:-500px;}
  70%  {right: 1rem}
  80%  {right: 5rem}
  90%  {right: 3rem}
  100% {right: 1rem;}
 `;

const timer = keyframes`
  0%   {width: 100%;}
  100% {width: 0%}
`;

export const ToastWrapper = styled.div`
  display: block;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99;
`;

export const Toast = styled.div`
  display: flex;
  width: 500px;
  height: 150px;
  color: #222;
  border: none;
  box-shadow: 0px 3px 8px 0px #00000033;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
  top: 0px;
  right: 0px;
  animation: ${slider} 300ms ease-out;
  margin-bottom: 1rem;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;

export const LineBar = styled.div<ToastProps>`
  display: block;
  position: absolute;
  height: 5px;
  background-color: ${({ toastType }: ToastProps) => AlertColors[toastType]};
  left: 0;
  bottom: 0;
  /* width: 100%; */
  animation: ${timer} 2.75s linear;
`;

export const IconSection = styled.div<ToastProps>`
  display: flex;
  width: 150px;
  justify-content: center;
  align-items: center;
  background: ${({ toastType }: ToastProps) => AlertColors[toastType]};
  border-radius: 3px 0px 0px 3px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  margin: 10px 15px;
  p {
  }
`;

export const TitleMessage = styled.p<ToastProps>`
  font-size: 2rem;
  min-height: 2.8rem;
  font-family: "Akshar-Medium", sans-serif;
  margin: 0;
  text-transform: uppercase;
  color: ${({ toastType }: ToastProps) => AlertColors[toastType]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ToastMessage = styled.p`
  font-size: 1.2rem;
  font-family: "Akshar-Light", sans-serif;
  display: -webkit-box;
  min-height: 53px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
