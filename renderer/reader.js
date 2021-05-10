class ReaderRemoveButton {
  #btn;

  constructor() {
    this.#btn = document.createElement('div');
    this.#btn.innerText = '移除';

    this._addStyle();
    this._addCloseClickEvent();
    this._appendToBody();
  }

  _addStyle() {
    this.#btn.style.position = 'fixed';
    this.#btn.style.zIndex = '9999';
    this.#btn.style.bottom = '15px';
    this.#btn.style.right = '15px';
    this.#btn.style.cursor = 'pointer';
    this.#btn.style.display = 'inline-block';
    this.#btn.style.fontWeight = '400';
    this.#btn.style.lineHeight = '1.5715';
    this.#btn.style.textAlign = 'center';
    this.#btn.style.userSelect = 'none';
    this.#btn.style.fontSize = '16px';
    this.#btn.style.borderRadius = '2px';
    this.#btn.style.height = '40px !important';
    this.#btn.style.padding = '6.4px 15px';
    this.#btn.style.background = '#1890ff';
    this.#btn.style.borderColor = '#1890ff';
    this.#btn.style.color = '#fff';
  }

  _addCloseClickEvent() {
    this.#btn.onclick = () => {
      window.opener.postMessage({
        signal: window.electron.REMOVE_ITEM
      }, '*');
    };
  }

  _appendToBody() {
    document.getElementsByTagName('body')[0].append(this.#btn);
  }
}

new ReaderRemoveButton();
