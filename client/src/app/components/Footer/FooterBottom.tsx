
const FooterBottom: React.FC = () => {
    return (
        <div className="text-sm text-on-background py-2 px-4">
            <hr className="my-2" />
            <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 md:items-start ">
                {/* Antivirus and certification logos, centered on mobile */}
                <div className="flex flex-wrap justify-center md:justify-start space-x-4">
                    {/* Antivirus logos here */}
                    <div className="flex flex-wrap items-center justify-start space-x-4 mb-4 md:mb-0">
                        <a href="htps://www.mcafeesecure.com/verify?host=elementvape.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://i.imgur.com/v5DmNwL.png" alt="McAfee Secure" className="h-8" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.elementvape.com/media/Dckap/images/norton-av.svg?0" alt="Norton" className="h-8" />
                        </a>
                        <a href="https://veratad.com/solutions/age-verification/" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.elementvape.com/media/Dckap/images/Veratad-logo.png" alt="Veratad" className="h-8" />
                        </a>
                    </div>
                </div>
                {/* Copyright notice, always centered */}
                <div className="text-center text-gray-500">
                    <p>Copyright © 2024 Herba Natural Co. All Rights Reserved.</p>
                </div>
                {/* Payment logos, centered on mobile */}
                <div className="flex justify-center md:justify-end space-x-4 rounded-none">
                    {/* Payment logos here */}
                    <div className="flex items-center justify-end space-x-4 ">
                        <a href="/" aria-label="Visa">
                            <img src="https://www.elementvape.com/media/Dckap/icons/creditcard_visa.svg" alt="Visa" className="h-8 rounded-none" />
                        </a>
                        <a href="/" aria-label="Master Card">
                            <img src="https://www.elementvape.com/media/Dckap/icons/creditcard_master.svg" alt="Master Card" className="h-8 rounded-none" />
                        </a>
                        <a href="/" aria-label="Discover">
                            <img src="https://www.elementvape.com/media/Dckap/icons/creditcard_discover.svg" alt="Discover" className="h-8 rounded-none" />
                        </a>
                        <a href="/" aria-label="American Express">
                            <img src="https://www.elementvape.com/media/Dckap/icons/creditcard_american.svg" alt="American Express" className="h-8 rounded-none" />
                        </a>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default FooterBottom;
