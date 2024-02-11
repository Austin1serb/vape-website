import FooterBottom from "./FooterBottom"
import FooterLinks from "./FooterLinks"
import FooterTop from "./FooterTop"
import SubscribeField from "./SubscribeField"

const Footer: React.FC = () => {
    return (
        <footer>
            <SubscribeField/>
            <FooterTop />
            <FooterBottom />
            <FooterLinks />
        </footer>
    )
}

export default Footer