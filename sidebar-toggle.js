const toggleSidebar = (node) => {
  node.dispatchEvent(
    new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true })
  );
};

// ১) fire-dom-event দিয়ে যেকোনো card/chip থেকে ব্যবহারের জন্য
window.addEventListener("ll-custom", (ev) => {
  if (ev.detail && ev.detail.toggle_sidebar) {
    toggleSidebar(
      document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main")
    );
  }
});

// ২) আলাদা card: type: custom:sidebar-toggle-card
class SidebarToggleCard extends HTMLElement {
  setConfig(config) {
    this._config = { icon: "mdi:menu", name: "Menu", ...config };
    if (!this._built) {
      this._built = true;
      this.innerHTML = `<ha-card style="cursor:pointer;padding:16px;display:flex;align-items:center;gap:12px">
        <ha-icon></ha-icon><span></span></ha-card>`;
      this.querySelector("ha-card").addEventListener("click", () => toggleSidebar(this));
    }
    this.querySelector("ha-icon").setAttribute("icon", this._config.icon);
    this.querySelector("span").textContent = this._config.name;
  }
  getCardSize() { return 1; }
}
customElements.define("sidebar-toggle-card", SidebarToggleCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "sidebar-toggle-card",
  name: "Sidebar Toggle",
  description: "Collapse/expand the sidebar",
});
