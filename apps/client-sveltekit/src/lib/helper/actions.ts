import type { Action } from "@sveltejs/kit";

export const clickOutside: Action = (node: HTMLElement) => {
  const handleClick = (event: MouseEvent) => {
    if (
      node &&
      !node.contains(event.target as Node) &&
      !event.defaultPrevented
    ) {
      node.dispatchEvent(
        new CustomEvent<HTMLElement>("clickOutside", {
          detail: event.target as HTMLElement,
        }),
      );
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
};
