import { useState, useEffect, useRef } from "react";
import madMen from "../src/assets/MadMen.jpg";
import "./fonts.css";
import "./portfolio.css";

// ─── Theme Definitions ──────────────────────────────────────────────────────

type ThemeKey = "luxury" | "minimal" | "bold";

const THEMES: Record<ThemeKey, { label: string; vars: Record<string, string> }> = {
	luxury: {
		label: "Dark Luxury",
		vars: {
			"--t-bg": "#0A0A09",
			"--t-bg2": "#131311",
			"--t-bg3": "#1C1C1A",
			"--t-text": "#F0EBE0",
			"--t-muted": "#8A8478",
			"--t-accent": "#C9963A",
			"--t-accent-fg": "#0A0A09",
			"--t-border": "rgba(240,235,224,0.09)",
			"--t-border-strong": "rgba(240,235,224,0.22)",
			"--t-r": "6px",
			"--t-heading": "'DM Serif Display', Georgia, serif",
			"--t-body": "'DM Sans', system-ui, sans-serif",
			"--t-nav-blur": "rgba(10,10,9,0.92)",
		},
	},
	minimal: {
		label: "Fresh Minimal",
		vars: {
			"--t-bg": "#FAFAF8",
			"--t-bg2": "#FFFFFF",
			"--t-bg3": "#F2F2EE",
			"--t-text": "#18181A",
			"--t-muted": "#6B6B72",
			"--t-accent": "#0E7490",
			"--t-accent-fg": "#FFFFFF",
			"--t-border": "rgba(0,0,0,0.08)",
			"--t-border-strong": "rgba(0,0,0,0.18)",
			"--t-r": "10px",
			"--t-heading": "'Nunito', system-ui, sans-serif",
			"--t-body": "'Inter', system-ui, sans-serif",
			"--t-nav-blur": "rgba(250,250,248,0.94)",
		},
	},
	bold: {
		label: "Bold Graphic",
		vars: {
			"--t-bg": "#F5F0E8",
			"--t-bg2": "#EDE8DF",
			"--t-bg3": "#E2DDD4",
			"--t-text": "#0D0D0C",
			"--t-muted": "#5C5650",
			"--t-accent": "#D03A2A",
			"--t-accent-fg": "#F5F0E8",
			"--t-border": "rgba(13,13,12,0.12)",
			"--t-border-strong": "rgba(13,13,12,0.30)",
			"--t-r": "2px",
			"--t-heading": "'Archivo Black', Impact, sans-serif",
			"--t-body": "'Archivo', system-ui, sans-serif",
			"--t-nav-blur": "rgba(245,240,232,0.95)",
		},
	},
};

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
	{ id: "services", label: "Services" },
	{ id: "work", label: "Work" },
	{ id: "about", label: "About" },
	{ id: "contact", label: "Contact" },
];

const PROJECTS = [
	{
		href: "https://entrepreneur-business-site.vercel.app/",
		github: "https://github.com/unachoza/Entrepreneur-Business-Site",
		img: "https://res.cloudinary.com/dh41vh9dx/image/upload/v1597080102/800entreprenuer.png",
		alt: "Digital Freelance Business Site",
		tag: "Small Business · Landing Page",
		title: "Digital Freelance",
		desc: "A conversion-focused site for a digital services business. Clean layout, strong CTAs, designed to build trust on first load.",
	},
	{
		href: "http://amazinguinatours.surge.sh/",
		github: "https://github.com/unachoza/AdvancedCSS/tree/master/Natours",
		img: "https://res.cloudinary.com/dh41vh9dx/image/upload/v1595629939/NatoursLanding.png",
		alt: "Nature Tours",
		tag: "Service Business · Marketing Site",
		title: "Nature Tours",
		desc: "Polished marketing site with bold visuals, animated sections, and a design language that communicates adventure and professionalism.",
	},
	{
		href: "http://realestatedesignsite.surge.sh",
		github: "https://github.com/unachoza/AdvancedCSS/tree/master/Nexter",
		img: "https://res.cloudinary.com/dh41vh9dx/image/upload/v1597182295/realestaterecom.png",
		alt: "Real Estate Site",
		tag: "Real Estate · Property Site",
		title: "Real Estate",
		desc: "Grid-based property showcase with clean typography and a browsable layout. Built with pure CSS Grid — no frameworks, no dependencies.",
	},
	{
		href: "https://fem-planet-fact-site.vercel.app/",
		github: "https://github.com/unachoza/FEM-planet-fact-site",
		img: "https://res.cloudinary.com/dh41vh9dx/image/upload/v1720024047/Screenshot_2024-07-03_at_12.16.58_PM.png",
		alt: "Planet Facts",
		tag: "Interactive · Design Challenge",
		title: "Planet Facts",
		desc: "Multi-tab interactive site with a rich dark theme, SVG diagrams, and smooth transitions — showcasing what's possible when engineering and design meet.",
	},
];

const PACKAGES = [
	{
		tier: "Starter",
		price: "$2,500",
		delivery: "Delivered in 1 week",
		featured: false,
		on: ["3 pages (Home, About, Contact)", "Contact form", "Mobile responsive design"],
		off: ["SEO optimization", "Testimonials section", "Blog or booking form"],
	},
	{
		tier: "Professional",
		price: "$3,250",
		delivery: "Delivered in 2 weeks",
		featured: true,
		on: ["5 pages + service pages", "Testimonials & results section", "SEO basics", "Google Maps embed", "Contact form"],
		off: ["Blog or booking form"],
	},
	{
		tier: "Premium",
		price: "$5,200",
		delivery: "Delivered in 3 weeks",
		featured: false,
		on: ["Everything in Professional", "Blog", "Client intake or booking form", "1 month post-launch support"],
		off: [],
	},
];

const TESTIMONIALS = [
	{
		quote: "Arianna delivered exactly what she promised — on time and on budget. Our site looks more professional than ones I've seen from agencies charging 3x the price.",
		name: "Maria S.",
		role: "Owner, Boutique Law Firm",
		initial: "M",
	},
	{
		quote: "She asked all the right questions upfront and didn't need hand-holding. The site was done in 10 days. I've already gotten 3 new client inquiries through the contact form.",
		name: "James T.",
		role: "Principal, Consulting Firm",
		initial: "J",
	},
	{
		quote: "The monthly retainer has been a game changer. I used to dread asking my nephew to update the site. Now I just email Arianna and it's done within 48 hours.",
		name: "Rachel K.",
		role: "Owner, Physical Therapy Practice",
		initial: "R",
	},
];

// ─── Fade-in hook ────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					io.disconnect();
				}
			},
			{ threshold: 0.07 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={ref} className={`fi${visible ? " visible" : ""}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
			{children}
		</div>
	);
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ scrolled, activeSection }: { scrolled: boolean; activeSection: string }) {
	const [menuOpen, setMenuOpen] = useState(false);

	// Close drawer on any nav click
	const handleDrawerLink = () => setMenuOpen(false);

	// Prevent body scroll when drawer is open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	return (
		<>
			<nav className={`nav${scrolled ? " scrolled" : ""}`}>
				<div className="container">
					<div className="nav__inner">
						<a href="#hero" className="nav__logo">
							Arianna<span>.</span>
						</a>

						{/* Desktop links */}
						<ul className="nav__links">
							{NAV_SECTIONS.map(({ id, label }) => (
								<li key={id}>
									<a href={`#${id}`} className={`nav__link${activeSection === id ? " active" : ""}`}>
										{label}
									</a>
								</li>
							))}
						</ul>

						<div className="nav__right">
							<span className="nav__badge">Available for projects</span>
							<a href="mailto:ariannacodes@gmail.com" className="btn btn-primary">
								Get a Quote
							</a>
							<button
								className={`nav__hamburger${menuOpen ? " open" : ""}`}
								aria-label="Toggle menu"
								onClick={() => setMenuOpen((v) => !v)}
							>
								<span />
								<span />
								<span />
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile full-screen drawer */}
			<div className={`nav__drawer${menuOpen ? " open" : ""}`}>
				{NAV_SECTIONS.map(({ id, label }) => (
					<a
						key={id}
						href={`#${id}`}
						className={`nav__drawer-link${activeSection === id ? " active" : ""}`}
						onClick={handleDrawerLink}
					>
						{label}
					</a>
				))}
				<a
					href="mailto:ariannacodes@gmail.com"
					className="btn btn-primary btn-lg"
					style={{ marginTop: 24 }}
					onClick={handleDrawerLink}
				>
					Get a Quote
				</a>
			</div>
		</>
	);
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Hero() {
	return (
		<section id="hero" className="hero">
			<div className="hero__glow" />
			<div className="container">
				<div className="hero__grid">
					<FadeIn>
						<p className="hero__eyebrow">Freelance Web Developer · NYC</p>
						<h1 className="hero__heading">
							I build websites <em>small businesses</em> are proud of.
						</h1>
						<p className="hero__sub">
							Fast, custom-coded websites that look great, load in under 2 seconds, and turn visitors into customers. No
							templates. No bloat. Just clean work, delivered on time.
						</p>
						<div className="hero__ctas">
							<a href="mailto:ariannacodes@gmail.com" className="btn btn-primary btn-lg">
								Book a Free Call
							</a>
							<a href="#work" className="btn btn-outline btn-lg">
								See My Work
							</a>
						</div>
					</FadeIn>

					<FadeIn delay={150}>
						<div className="stats-grid">
							{[
								{ n: "25+", l: "Projects shipped" },
								{ n: "5 yrs", l: "Engineering experience" },
								{ n: "1 wk", l: "Starter site delivery" },
								{ n: "100%", l: "Custom code" },
							].map((s) => (
								<div key={s.l} className="stat-card">
									<div className="stat-n">{s.n}</div>
									<div className="stat-l">{s.l}</div>
								</div>
							))}
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

function Services() {
	return (
		<section id="services" className="services">
			<div className="container">
				<FadeIn>
					<p className="s-label">Services & Pricing</p>
					<h2 className="s-title">
						Straightforward packages.
						<br />
						No surprises.
					</h2>
					<p className="s-sub">
						Pick the package that fits your business. Every project includes custom design, mobile responsiveness,
						cross-browser testing, and launch-day support.
					</p>
				</FadeIn>

				<FadeIn delay={100}>
					<div className="pkg-grid">
						{PACKAGES.map((pkg) => (
							<div key={pkg.tier} className={`pkg${pkg.featured ? " pkg--featured" : ""}`}>
								{pkg.featured && <span className="pkg__badge">★ Most Popular</span>}
								<div className="pkg__tier">{pkg.tier}</div>
								<div className="pkg__price">{pkg.price}</div>
								<div className="pkg__delivery">{pkg.delivery}</div>
								<div className="pkg__divider" />
								{pkg.on.map((f) => (
									<div key={f} className="pkg__feature pkg__feature--on">
										<span className="ico">+</span> {f}
									</div>
								))}
								{pkg.off.map((f) => (
									<div key={f} className="pkg__feature pkg__feature--off">
										<span>–</span> {f}
									</div>
								))}
							</div>
						))}
					</div>
				</FadeIn>

				<FadeIn delay={150}>
					<div className="retainer">
						<div>
							<div className="retainer__label">Monthly Maintenance Retainer</div>
							<p className="retainer__desc">
								Content updates, security patches, uptime monitoring, and a monthly performance report. 48hr standard
								response, same-day for downtime. Available as an add-on to any package.
							</p>
						</div>
						<div className="retainer__price">
							$200–275<span>/mo</span>
						</div>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}

function Process() {
	return (
		<section id="process" className="process">
			<div className="container">
				<FadeIn>
					<p className="s-label">How I Work</p>
					<h2 className="s-title" style={{ marginBottom: 50 }}>
						Simple process.
						<br />
						Zero headaches.
					</h2>
				</FadeIn>
				<FadeIn delay={100}>
					<div className="steps-grid">
						{[
							{
								n: "01",
								title: "Discovery",
								desc: "We start with a free 30-minute call. I'll ask the right questions about your business, your goals, and what success looks like — so you never have to over-explain.",
							},
							{
								n: "02",
								title: "Build",
								desc: "I design and build your site custom, from scratch. You'll see a working preview before anything goes live, and we'll refine until it's exactly right.",
							},
							{
								n: "03",
								title: "Launch",
								desc: "I handle deployment and launch day. Then I hand you the keys with a walkthrough so you're never left wondering how to make a simple update.",
							},
						].map((s) => (
							<div key={s.n} className="step">
								<div className="step__number">{s.n}</div>
								<h3 className="step__title">{s.title}</h3>
								<p className="step__desc">{s.desc}</p>
							</div>
						))}
					</div>
				</FadeIn>
			</div>
		</section>
	);
}

function Work() {
	return (
		<section id="work" className="work">
			<div className="container">
				<FadeIn>
					<p className="s-label">Selected Work</p>
					<h2 className="s-title" style={{ marginBottom: 50 }}>
						Built to perform.
						<br />
						<em>Designed to impress.</em>
					</h2>
				</FadeIn>
				<div className="work-grid">
					{PROJECTS.map((p, i) => (
						<FadeIn key={p.title} delay={i % 2 === 1 ? 80 : 0}>
							<a href={p.href} target="_blank" rel="noopener noreferrer" className="work-card">
								<img src={p.img} alt={p.alt} loading="lazy" className="work-card__img" />
								<div className="work-card__body">
									<div className="work-card__tag">{p.tag}</div>
									<div className="work-card__title">{p.title}</div>
									<div className="work-card__desc">{p.desc}</div>
									<div className="work-card__links">
										<a
											href={p.href}
											target="_blank"
											rel="noopener noreferrer"
											className="work-card__link"
											onClick={(e) => e.stopPropagation()}
										>
											Live Site →
										</a>
										<a
											href={p.github}
											target="_blank"
											rel="noopener noreferrer"
											className="work-card__link"
											onClick={(e) => e.stopPropagation()}
										>
											GitHub
										</a>
									</div>
								</div>
							</a>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}

function About() {
	const skills = ["React", "TypeScript", "JavaScript", "Node.js", "HTML & CSS", "SASS", "Figma", "PostgreSQL", "Firebase", "GraphQL"];

	return (
		<section id="about" className="about">
			<div className="container">
				<div className="about__grid">
					<FadeIn>
						<img src={madMen} className="about__img-placeholder" alt="head shot" />
					</FadeIn>

					<FadeIn delay={100}>
						<div className="about__content">
							<p className="s-label">About Me</p>
							<h2 className="s-title">
								Engineering-grade work.
								<br />
								<em>Design-forward results.</em>
							</h2>
							<p>
								I&apos;m Arianna — a frontend engineer turned freelance web developer. I&apos;ve spent years writing
								production-quality code, and now I bring that same rigor to websites for small businesses.
							</p>
							<p>
								What that means for you:{" "}
								<strong>a site that loads fast, looks intentional, and actually converts.</strong> I care about both
								the code underneath and the experience on top.
							</p>
							<p>
								Based in NYC, working with clients across the US. I&apos;m direct, easy to work with, and I&apos;ll
								tell you honestly when something won&apos;t serve your business.
							</p>
							<div className="skills-label">Technologies</div>
							<div className="skills-tags">
								{skills.map((s) => (
									<span key={s} className="skill-tag">
										{s}
									</span>
								))}
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

function Testimonials() {
	return (
		<section id="testimonials" className="testimonials">
			<div className="container">
				<FadeIn>
					<p className="s-label">Testimonials</p>
					<h2 className="s-title" style={{ marginBottom: 50 }}>
						What clients say.
					</h2>
				</FadeIn>
				<div className="t-grid">
					{TESTIMONIALS.map((t, i) => (
						<FadeIn key={t.name} delay={i * 100}>
							<div className="t-card">
								<div className="t-stars">★★★★★</div>
								<p className="t-quote">&ldquo;{t.quote}&rdquo;</p>
								<div className="t-author">
									<div className="t-avatar">{t.initial}</div>
									<div>
										<div className="t-name">{t.name}</div>
										<div className="t-role">{t.role}</div>
									</div>
								</div>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}

function Contact() {
	const links = [
		{ label: "Email", val: "ariannacodes@gmail.com", href: "mailto:ariannacodes@gmail.com" },
		{ label: "LinkedIn", val: "arianna-choza", href: "https://linkedin.com/in/arianna-choza" },
		{ label: "GitHub", val: "unachoza", href: "https://github.com/unachoza" },
		{ label: "Location", val: "New York, NY", href: null },
	];

	return (
		<section id="contact" className="contact">
			<div className="container">
				<FadeIn>
					<p className="contact__label">Let&apos;s Work Together</p>
					<h2 className="contact__heading">
						Ready for a website
						<br />
						your business deserves?
					</h2>
					<p className="contact__sub">
						Book a free 30-minute call. No pitch, no pressure — just a conversation about what you need and whether I&apos;m
						the right fit.
					</p>
					<div className="contact__btns">
						<a href="mailto:ariannacodes@gmail.com" className="btn btn-primary btn-lg">
							Email Me
						</a>
						<a
							href="https://res.cloudinary.com/dh41vh9dx/image/upload/v1748892823/new2025Resume_vyu41f.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-outline btn-lg"
						>
							View Resume
						</a>
					</div>
					<div className="contact__info-row">
						{links.map((c) => (
							<div key={c.label}>
								<div className="contact__info-label">{c.label}</div>
								{c.href ? (
									<a
										href={c.href}
										target={c.href.startsWith("http") ? "_blank" : undefined}
										rel="noopener noreferrer"
										className="contact__info-val"
									>
										{c.val}
									</a>
								) : (
									<span className="contact__info-val">{c.val}</span>
								)}
							</div>
						))}
					</div>
				</FadeIn>
			</div>
		</section>
	);
}

function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="container">
				<div className="footer__inner">
					<span className="footer__copy">© 2026 Arianna L. Choza. All rights reserved.</span>
					<div className="footer__links">
						{[
							{ label: "LinkedIn", href: "https://linkedin.com/in/arianna-choza" },
							{ label: "GitHub", href: "https://github.com/unachoza" },
							{ label: "Contact", href: "mailto:ariannacodes@gmail.com" },
						].map((l) => (
							<a
								key={l.label}
								href={l.href}
								target={l.href.startsWith("http") ? "_blank" : undefined}
								rel="noopener noreferrer"
								className="footer__link"
							>
								{l.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

function ThemeSwitcher({ current, onChange }: { current: ThemeKey; onChange: (t: ThemeKey) => void }) {
	return (
		<div className="theme-switcher">
			{(Object.keys(THEMES) as ThemeKey[]).map((key) => (
				<button key={key} onClick={() => onChange(key)} className={`theme-btn${current === key ? " active" : ""}`}>
					{THEMES[key].label}
				</button>
			))}
		</div>
	);
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
	const [theme, setTheme] = useState<ThemeKey>("minimal");
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("hero");

	// Nav scroll state
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Active section tracking via IntersectionObserver
	useEffect(() => {
		const sectionIds = ["hero", ...NAV_SECTIONS.map((s) => s.id), "testimonials"];
		const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

		const io = new IntersectionObserver(
			(entries) => {
				// Find the entry closest to center of viewport
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length === 0) return;

				// Pick the one with the greatest intersection ratio
				const best = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
				setActiveSection(best.target.id);
			},
			{
				threshold: [0.1, 0.3, 0.5],
				rootMargin: "-80px 0px -30% 0px",
			},
		);

		elements.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);

	const themeVars = THEMES[theme].vars as React.CSSProperties;

	return (
		<div className="portfolio" style={themeVars}>
			<Nav scrolled={scrolled} activeSection={activeSection} />
			<Hero />
			<Services />
			<Process />
			<Work />
			<About />
			<Testimonials />
			<Contact />
			<SiteFooter />
			{/* <ThemeSwitcher current={theme} onChange={setTheme} /> */}
		</div>
	);
}
