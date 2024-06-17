import { twMerge } from "tailwind-merge";

const defaultCardStyles =
  "flex flex-col gap-3 bg-white text-neutral-900 shadow-md border shadow-md p-4";
const defaultCardHeaderStyles = "flex flex-col";
const defaultCardTitleStyles = "text-lg font-bold tracking-tight";
const defaultCardDescriptionStyles = "text-sm text-neutral-600";
const defaultCardContentStyles = "text-neutral-900";
const defaultCardFooterStyles = "text-neutral-900";

class CardContent extends HTMLElement {
  connectedCallback() {
    const classes = twMerge(
      defaultCardContentStyles,
      this.classList.value
    ).split(" ");
    this.classList.add(...classes);
  }
}

class CardFooter extends HTMLElement {
  connectedCallback() {
    const classes = twMerge(
      defaultCardFooterStyles,
      this.classList.value
    ).split(" ");
    this.classList.add(...classes);
  }
}

class CardTitle extends HTMLElement {
  connectedCallback() {
    const classes = twMerge(defaultCardTitleStyles, this.classList.value).split(
      " "
    );
    this.classList.add(...classes);
  }
}

class CardDescription extends HTMLElement {
  connectedCallback() {
    const classes = twMerge(
      defaultCardDescriptionStyles,
      this.classList.value
    ).split(" ");
    this.classList.add(...classes);
  }
}

class CardHeader extends HTMLElement {
  connectedCallback() {
    const classes = twMerge(
      defaultCardHeaderStyles,
      this.classList.value
    ).split(" ");
    this.classList.add(...classes);

    const titles = this.querySelectorAll("card-title");
    titles.forEach((title) => {
      (title as CardTitle).connectedCallback();
    });

    const descriptions = this.querySelectorAll("card-description");
    descriptions.forEach((description) => {
      (description as CardDescription).connectedCallback();
    });
  }
}

class Card extends HTMLElement {
  connectedCallback() {
    const classes = twMerge(defaultCardStyles, this.classList.value).split(" ");
    this.classList.add(...classes);

    const headers = this.querySelectorAll("card-header");
    headers.forEach((header) => {
      (header as CardHeader).connectedCallback();
    });

    const contents = this.querySelectorAll("card-content");
    contents.forEach((content) => {
      (content as CardContent).connectedCallback();
    });

    const footers = this.querySelectorAll("card-footer");
    footers.forEach((footer) => {
      (footer as CardFooter).connectedCallback();
    });
  }
}

customElements.define("card-content", CardContent);
customElements.define("card-footer", CardFooter);
customElements.define("card-title", CardTitle);
customElements.define("card-description", CardDescription);
customElements.define("card-header", CardHeader);
customElements.define("card-container", Card);
