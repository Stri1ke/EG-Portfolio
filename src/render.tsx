import { renderToString } from "react-dom/server";
import { App, type PageProps } from "./App";
export { projects, metadata } from "./App";
export function render(props: PageProps) {
  return renderToString(<App {...props} />);
}
