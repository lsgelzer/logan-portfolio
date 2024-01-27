/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./intro-template/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"fade-in": "fadeIn 2s ease-in 1s forwards",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
		},
		// Overriding fontFamily to use @next/font loaded families
		fontFamily: {
			mono: "var(--font-mono)",
			sans: "var(--font-sans)",
			serif: "var(--font-serif)",
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
