//generate a tooltip web component

class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipId = `tip-${Math.random().toString(36).slice(2)}`;
    this._tooltipText = "placeholder for default";
    // attaching a shadow dom tree to this wc
    // enables to access this shadow dom tree from outside this wc
    this.attachShadow({ mode: "open" });
    // const template = document.querySelector("#tooltip-tpl");
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = `
    <slot></slot>
    <span>(?)</span>`;
  }
  // connectedCallback runs when the element is added to the DOM.
  // Use it to set up or render the component’s initial content.
  connectedCallback() {
    if (this.hasAttribute("textToShow")) {
      this._tooltipText = this.getAttribute("textToShow");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.setAttribute("aria-describedby", this.tooltipId);

    tooltipIcon.style.cursor = "help";
    // fixing the context to the class instance
    // and not only the span which triggers the event
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
  }

  // underscore as a convention to signal this is a "private" method
  _showTooltip() {
    // this div is not created inside connectedCallback because that method is executed once
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.id = this.tooltipId;
    this._tooltipContainer.setAttribute("role", "tooltip");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("astro-tooltip", Tooltip);
