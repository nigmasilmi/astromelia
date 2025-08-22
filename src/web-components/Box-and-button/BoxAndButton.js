class BoxAndButton extends HTMLElement {
  constructor() {
    super();
    this._showBox = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    .box-and-button{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    }
    #show-button{
        padding: 0.5rem 0.8rem;
        border-radius: 0.3rem;
        cursor: pointer;
    }
    #show-button:hover{
        background-color: #da9c39;
        color: #fff;
    }
        #info-box{
        visibility: hidden;
        }
    </style>
    <div class="box-and-button">
    <button id="show-button">Show</button>
    <p id="info-box"><slot></slot></p>
    </div>
    `;
    this._toggleButton = this.shadowRoot.querySelector("#show-button");
    this._infoBox = this.shadowRoot.querySelector("#info-box");
    this._toggleButton.addEventListener(
      "click",
      this._toggleInfoBox.bind(this)
    );
  }

  connectedCallback() {
    if (this.hasAttribute("is-visible")) {
      if (this.getAttribute("is-visible") === "true") {
        this._showBox = true;
        this._infoBox.style.visibility = "visible";
        this._toggleButton.textContent = "Hide";
      }
    }
  }

  _toggleInfoBox() {
    // show paragraph
    this._showBox = !this._showBox;
    this._infoBox.style.visibility = this._showBox ? "visible" : "hidden";
    this._toggleButton.textContent = this._showBox ? "Hide" : "Show";
  }
}
customElements.define("astro-box-and-button", BoxAndButton);
