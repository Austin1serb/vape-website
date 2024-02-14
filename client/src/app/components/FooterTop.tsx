import React, { useState } from 'react';
import Icon from './Icon';
import { useResponsive } from '../contexts/ResponsiveContext';


interface Props {
    title: string;
    children: React.ReactNode;
    isMobile:boolean;
}

const CollapsibleSection: React.FC<Props> = ({ title, children, isMobile }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
        <div>
            <button
                className={` text-on-secondary text-lg w-full flex justify-between items-center ${isMobile ? 'flex' : 'hidden'}`}
                onClick={() => isMobile && setIsOpen(!isOpen)}
            >
                <h5 className="font-bold text-md uppercase">{title}</h5>
                <Icon
                    name="ArrowDown"
                    height={35}
                    width={35}
                    className={` transform transition-transform-ease duration-300 ${isOpen ? 'rotate-180 fill-primary-variant' : ''}`}
                />

            </button>

            {isMobile ? (
                <>
                    <div className={`overflow-hidden transition-height duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                        {children}
                    </div>
                    <hr className="mt-2 bg-on-background" />
                </>
            ) : (
                <div>{children}</div>
            )}
        </div>
    );
};


const FooterTop: React.FC = () => {
    const { isMobile } = useResponsive();

    return (
        <footer className="text-sm  pt-8 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1  lg:grid-cols-4 gap-6">
                <CollapsibleSection isMobile={isMobile} title="FOLLOW US">
                    <h5 className={`text-on-background text-lg font-bold mb-2 ${isMobile ? 'hidden' : 'flex'}`}>FOLLOW US</h5>
                    <p className="social flex justify-around">
                        <a href="https://www.instagram.com/elementvape" className="instagram" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">
                            <Icon name='Instagram' width={35} height={35} className="instagram hover:fill-secondary transition-all duration-300" aria-hidden="true"></Icon>
                        </a>
                        <a href="https://www.facebook.com/elementvape" className="facebook" target="_blank" rel="noopener" title="Facebook" aria-label="Facebook">
                            <Icon name='Facebook' width={35} height={35} className="facebook hover:fill-secondary transition-all duration-300" aria-hidden="true"></Icon>
                        </a>
                        <a href="https://twitter.com/element_vape" className="twitter" target="_blank" rel="noopener" title="Twitter" aria-label="Twitter">
                            <Icon name='Twitter' width={35} height={35} className="twitter hover:fill-secondary transition-all duration-300" aria-hidden="true"></Icon>
                        </a>

                    </p>

                </CollapsibleSection>
                <CollapsibleSection isMobile={isMobile} title="Need Help?">
                    <h5 className={`text-on-background text-lg font-bold mb-2 ${isMobile ? 'hidden' : 'flex'}`}>Need Help?</h5>

                    <ul className="space-y-2">
                        <li className="relative group w-fit">
                            <a href="/contact-us/" aria-label="CONTACT US" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">CONTACT US</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/shippingtracking" aria-label="Check Order Status" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Check Order Status</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/do-we-ship/" aria-label="Do We Ship To You - Zip Code Check" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Do We Ship To You - Zip Code Check</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/shipping-and-handling/" aria-label="Shipping & Handling" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Shipping & Handling</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/returns-policy" aria-label="Returns & Exchange" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Returns & Exchange</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/payment-options/" aria-label="Payment Options" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Payment Options</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="https://elementvape.zendesk.com/hc/en-us" aria-label="HELP CENTER" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">HELP CENTER</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                    </ul>

                </CollapsibleSection>
                <CollapsibleSection isMobile={isMobile} title="Info">
                    <h5 className={`text-on-background text-lg font-bold mb-2 ${isMobile ? 'hidden' : 'flex'}`}>Info</h5>
                    <ul className="space-y-2">
                        <li className="relative group w-fit">
                            <a href="/about/" aria-label="About Us" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">About Us</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/blog/" aria-label="Blog" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Blog</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/reviews/" aria-label="Reviews" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Reviews</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/coupons/" aria-label="Coupons" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Coupons</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/reward-program/" aria-label="Reward Program" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Reward Program</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/age-policy/" aria-label="Age Policy" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Age Policy</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                    </ul>

                </CollapsibleSection>
                <CollapsibleSection isMobile={isMobile} title="Resources">
                    <h2 className={`text-on-background text-lg font-bold mb-2 ${isMobile ? 'hidden' : 'flex'}`}>
                        Resounces
                    </h2>
                    <ul className="space-y-2">
                        <li className="relative group w-fit">
                            <a href="/blog/post/2023-top-10-vape-pod-systems" aria-label="2023 Top 10 Vape Pod Systems" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">2023 Top 10 Vape Pod Systems</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/blog/post/bongs-guide" aria-label="Guide to Bongs & Water Pipes" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Guide to Bongs & Water Pipes</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/blog/post/exploring-stiiizy" aria-label="Exploring STIIIZY Hemp" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Exploring STIIIZY Hemp</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li className="relative group w-fit">
                            <a href="/clearance" aria-label="Shop Vape Clearance" className="block">
                                <span className="group-hover:text-secondary-variant transition duration-300">Shop Vape Clearance</span>
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                    </ul>

                </CollapsibleSection>
            </div>
            <div className="text-center mt-8">
                <p className="text-xs text-gray-400">Not for Sale for Minors - Products sold on this site may contain nicotine which is a highly addictive substance. California Proposition 65 - WARNING: This product can expose you to chemicals including nicotine, which is known to the State of California to cause birth defects or other reproductive harm. For more information, go to <a className='text-primary hover:text-secondary-variant transition duration-300' href="https://www.p65warnings.ca.gov">Proposition 65 Warnings Website. </a> Products sold on this site is intended for adult smokers. You must be of legal smoking age in your territory to purchase products. Please consult your physician before use. E-Juice on our site may contain Propylene Glycol and/or Vegetable Glycerin, Nicotine and Flavorings. Our products may be poisonous if orally ingested. FDA DISCLAIMER: The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure or prevent any disease. All information presented here is not meant as a substitute for or alternative to information from health care practitioners. For their protection, please keep out of reach of children and pets. Read our terms and conditions page before purchasing our products. Use All Products On This Site At Your Own Risk!</p>
            </div>
        </footer>
    );
};

export default FooterTop;
