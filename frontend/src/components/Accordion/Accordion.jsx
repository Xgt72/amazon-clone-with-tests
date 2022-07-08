import { useState } from "react";

export default function Accordion({ title, children }) {
  const [show, setShow] = useState(false);

  const onAccordionClick = () => {
    setShow(!show);
  };

  return (
    <div className="accordion">
      <h3 className="accordion-title">{title}</h3>
      <button type="button" onClick={onAccordionClick}>
        {!show ? "Show" : "Hide"}
      </button>
      {show && <div className="accordion-content">{children}</div>}
    </div>
  );
}
