/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                school: {
                    primary: "var(--school-primary)",
                    secondary: "var(--school-secondary)",
                    accent: "var(--school-accent)",
                },
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
                serif: ["Georgia", "ui-serif", "serif"],
            },
        },
    },
    plugins: [],
};
