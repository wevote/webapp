import styled, { css, keyframes } from 'styled-components';
import standardBoxShadow from '../../common/components/Style/standardBoxShadow';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const DrawerHeaderOuterContainer = styled.div.attrs(({ scrolledDown }) => ({
  style: {
    display: scrolledDown ? 'block' : 'hidden',
  },
}))`
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  position: fixed;
  z-index: 9000;
  right: 0;
  transform: translateY(${({ scrolledDown }) => (scrolledDown ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  visibility: ${({ scrolledDown }) => (scrolledDown ? 'visible' : 'hidden')};
  opacity: ${({ scrolledDown }) => (scrolledDown ? 1 : 0)};

  ${({ scrolledDown }) => scrolledDown &&
    css`
      animation: ${slideIn} 0.3s ease-out;
      border-bottom: 1px solid #aaa;
      box-shadow: ${standardBoxShadow('wide')};
    `}
`;

export const DrawerHeaderInnerContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
