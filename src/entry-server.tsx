import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";

/** Render the full app to an HTML string for build-time prerendering. */
export function render(): string {
	return renderToString(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
