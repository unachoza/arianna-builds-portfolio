// Build-time prerender: inject the server-rendered app HTML into dist/index.html
// so crawlers and AI assistants see the real content without executing JavaScript.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const htmlPath = resolve(root, 'dist/index.html')
const serverEntry = resolve(root, 'dist-ssr/entry-server.js')
const PLACEHOLDER = '<div id="root"></div>'

async function main() {
	const { render } = await import(pathToFileURL(serverEntry).href)
	const appHtml = render()

	const template = readFileSync(htmlPath, 'utf-8')
	if (!template.includes(PLACEHOLDER)) {
		throw new Error(`Prerender placeholder '${PLACEHOLDER}' not found in ${htmlPath}`)
	}

	const output = template.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`)
	writeFileSync(htmlPath, output)
	console.info(`Prerendered ${appHtml.length} chars of HTML into dist/index.html`)
}

main().catch((error) => {
	console.error('Prerender failed:', error)
	process.exit(1)
})
