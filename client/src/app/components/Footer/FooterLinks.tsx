

const FooterLinks = () => {
    const links = [
        { href: "https://www.elementvape.com/terms-and-conditions/", label: "Terms and Conditions", alt: "Terms and Conditions" },
        { href: "https://www.elementvape.com/privacy-policy/", label: "Privacy Policy", alt: "Privacy Policy" },
        { href: "https://www.elementvape.com/accessibility/", label: "Accessibility", alt: "Accessibility" },
        { href: "https://www.elementvape.com/sitemap/", label: "Sitemap", alt: "Sitemap" },
        { href: "https://www.elementvape.com/privacy-policy/#ca-policy", label: "California Privacy", alt: "California Privacy" },
        { href: "https://www.elementvape.com/privacy-policy/#nv-policy", label: "Nevada Privacy", alt: "Nevada Privacy" },
      ];
      
      
    return (
        <div className="text-center text-on-background py-4">
            <p className="flex flex-wrap justify-center gap-4 items-center text-base">
                {links.map((link) => (
                    <a href={link.href} className="relative group hover:text-secondary-variant block w-fit" aria-label={link.label} key={link.href}>
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </a>
                ))}
            </p>
        </div>

    )
}

export default FooterLinks