import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "lib/main.ts"),
			name: "NotionUrlParser",
			fileName: "notion-url-parser",
		},
		rollupOptions: {
			external: [],
			output: {},
		},
	},
});
