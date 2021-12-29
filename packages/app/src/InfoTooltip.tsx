import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import styled from "styled-components";
import { usePopper } from "react-popper";

const StyledTrigger = styled(FaQuestionCircle)`
  animation: 4s wiggle ease infinite;
  border-radius: 50%;

  @keyframes wiggle {
    0% {
      transform: rotate(-3deg);
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }
    10% {
      transform: rotate(20deg);
    }
    20% {
      transform: rotate(-15deg);
    }
    30% {
      transform: rotate(5deg);
    }
    40% {
      transform: rotate(-1deg);
    }
    50% {
      transform: rotate(0);
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  }
`;

interface StyledTooltipProps {
  visible: boolean;
}

const StyledTooltip = styled.div<StyledTooltipProps>`
  background: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 15px;
  border-radius: 4px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  /* Prevent the popper from obstructing other elements, especially when hidden which would make the UX unintuitive. */
  pointer-events: none;
`;

export const InfoTooltip = ({ message }: { message: string }) => {
  const [visible, setVisibility] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 3],
        },
      },
    ],
  });

  return (
    <>
      <span
        ref={setReferenceElement}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
      >
        <StyledTrigger />
      </span>

      <div
        ref={setPopperElement}
        style={{ ...styles.popper, pointerEvents: "none" }}
        {...attributes.popper}
      >
        <StyledTooltip role="tooltip" visible={visible}>
          {message}
        </StyledTooltip>
      </div>
    </>
  );
};
