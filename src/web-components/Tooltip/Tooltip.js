//generate a tooltip web component

class Tooltip extends HTMLElement {
  constructor() {
    super();

    console.log("executing");
  }
  // connectedCallback runs when the element is added to the DOM.
  // Use it to set up or render the component’s initial content.
  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?) ";
    this.appendChild(tooltipIcon);
  }
}

customElements.define("astro-tooltip", Tooltip);
