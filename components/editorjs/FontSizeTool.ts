// class FontSizes {
//   static get isInline() {
//     return true;
//   }
//   get state() {
//     return this._state;
//   }

//   set state(state) {
//     this._state = state;

//     this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
//   }

//   constructor({ api }) {
//     this.api = api;
//     this.button = null;
//     this._state = false;
//     this.tag = "p";
//     this.sizes = ["8px", "12px", "16px", "24px", "32px"];
//   }

//   render() {
//     this.button = document.createElement("button");
//     this.button.classList.add("editor-font-size-btn");
//     this.button.type = "button";
//     this.button.textContent = "f";
//     this.button.classList.add(this.api.styles.inlineToolButton);
//     return this.button;
//   }

//   surround(range) {
//     if (this._state) {
//       this.hideActions();
//       // If highlights is already applied, do nothing for now
//       return;
//     }

//     const selectedText = range.extractContents();
//     // Create MARK element
//     const mark = document.createElement("p");
//     // mark.style.fontSize = this.select.value;
//     // Append to the MARK element selected TextNode
//     mark.appendChild(selectedText);

//     // Insert new element
//     this.showActions(mark);
//     range.insertNode(mark);
//     this.api.selection.expandToTag(mark);
//   }

//   checkState(selection) {
//     const text = selection.anchorNode;
//     if (!text) {
//       return;
//     }
//     const anchorElement = text instanceof Element ? text : text.parentElement;

//     this.state = !!anchorElement.closest("p");
//     if (this.state) {
//       this.showActions(anchorElement);
//     } else {
//       this.hideActions();
//     }
//   }

//   renderActions() {
//     this.select = document.createElement("select");
//     this.select.classList.add("editor-fontsize-select");

//     for (let i = 0; i < this.sizes.length; i++) {
//       const newOption = document.createElement("option");
//       newOption.value = this.sizes[i];
//       newOption.text = this.sizes[i];
//       this.select.add(newOption);
//     }
//     this.select.hidden = true;
//     return this.select;
//   }

//   showActions(mark) {
//     let currentSize = mark.style.fontSize;
//     if (this.sizes.includes(currentSize)) {
//       this.select.value = currentSize;
//     }
//     this.select.onchange = () => {
//       mark.style.fontSize = this.select.value;
//     };
//     this.select.hidden = false;
//   }

//   hideActions() {
//     this.select.onchange = null;
//     this.select.hidden = true;
//   }
// }

// export default FontSizes;
