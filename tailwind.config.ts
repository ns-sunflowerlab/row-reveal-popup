import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#FFFFFF', // Light background color
				foreground: '#1F2937', // Dark text color for contrast
				primary: {
					DEFAULT: '#0072ce', // Primary color
					foreground: '#FFFFFF' // White text for primary elements
				},
				secondary: {
					DEFAULT: '#005bb5', // Slightly darker shade of primary for secondary elements
					foreground: '#FFFFFF' // White text for secondary elements
				},
				destructive: {
					DEFAULT: '#e25c5c', // Red for destructive actions
					foreground: '#FFFFFF' // White text for destructive elements
				},
				muted: {
					DEFAULT: '#F3F4F6', // Muted background color
					foreground: '#FFFFFF' // Muted text color
				},
				accent: {
					DEFAULT: '#37b9bc', // Accent color (teal)
					foreground: '#FFFFFF' // White text for accent elements
				},
				popover: {
					DEFAULT: '#F9FAFB', // Popover background color
					foreground: '#1F2937' // Popover text color
				},
				card: {
					DEFAULT: '#F9FAFB', // Card background color
					foreground: '#FFFFFF' // Card text color
				},
				sidebar: {
					DEFAULT: '#E5E7EB', // Sidebar background color
					foreground: '#1F2937', // Sidebar text color
					primary: '#0072ce', // Sidebar primary color
					'primary-foreground': '#FFFFFF', // Sidebar primary text color
					accent: '#005bb5', // Sidebar accent color
					'accent-foreground': '#FFFFFF', // Sidebar accent text color
					border: '#D1D5DB', // Sidebar border color
					ring: '#93C5FD' // Sidebar ring color
				},
				success: {
					DEFAULT: '#2ed47a', // Green for success
					foreground: '#FFFFFF' // White text for success elements
				},
				failed: {
					DEFAULT: '#e25c5c', // Red for failed actions
					foreground: '#FFFFFF' // White text for failed elements
				},
				warning: {
					DEFAULT: '#f7a547', // Orange for warnings
					foreground: '#FFFFFF' // White text for warning elements
				},
				inbound: {
					DEFAULT: '#37b9bc', // Teal for inbound actions
					foreground: '#FFFFFF' // White text for inbound elements
				},
				outbound: {
					DEFAULT: '#f7a547', // Orange for outbound actions
					foreground: '#FFFFFF' // White text for outbound elements
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'wave': {
					'0%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(0.5)' },
					'100%': { transform: 'scaleY(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'wave': 'wave 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
