const template = document.createElement("template");
template.innerHTML = `
    <style>
        h3 {
            color: green;
        }
        label {
            color: red;
            display: block;
        }
        
        .description {
            font-size: .65rem;
            font-weight: lighter;
            color: #777
        }
    </style>
    
    <label>
        <input type="checkbox"/>
        <slot></slot>
        <span class="description">
            <slot name="description"></slot>
        </span>
    </label>
`

class TodoItem extends HTMLElement {
    private checkbox: HTMLInputElement | null;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
        this.checkbox = shadow.querySelector("input");
    }

    static get observedAttributes(): string[] {
        return ["checked"];
    }

    // Life Cycle - init
    connectedCallback(): void {
        console.log("connected");
    }

    // Life Cycle - destroy
    disconnectedCallback(): void {
        console.log("disconnected");
    }

    // Life Cycle - change
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log(name, oldValue, newValue);
        if (name === "checked") {
            this.updateChecked(newValue);
        }
    }

    updateChecked(value: any): void {
        if (this.checkbox?.checked) {
            this.checkbox.checked = !!value && value !== 'false';
        }
        console.dir('update checked');

    }
}
customElements.define("todo-item", TodoItem);