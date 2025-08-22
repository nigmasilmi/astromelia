//generate a tooltip web component

class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;

    console.log("executing");
  }
  // connectedCallback runs when the element is added to the DOM.
  // Use it to set up or render the component’s initial content.
  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?) ";
    // fixing the context to the class instance
    // and not only the span which triggers the event
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
  }

  // underscore as a convention to signal this is a "private" method
  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = "this is the tooltip text";
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("astro-tooltip", Tooltip);
