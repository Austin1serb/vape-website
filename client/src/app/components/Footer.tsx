import FooterBottom from "./FooterBottom"
import FooterLinks from "./FooterLinks"
import FooterTop from "./FooterTop"

const Footer: React.FC = () => {
    return (
        <footer>
            <FooterTop />
            <FooterBottom />
            <FooterLinks />
        </footer>
    )
}

export default Footer