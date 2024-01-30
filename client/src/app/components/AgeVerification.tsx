import Link from 'next/link';
import React, { useState } from 'react';


interface AgeVerificationProps {
    onVerify: (value: boolean) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
    const [showOverlayMessage, setShowOverlayMessage] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

    const handleOldEnough = () => {
        setShowWelcomeMessage(true);
        setTimeout(() => onVerify(true), 1000);
    };

    const handleNotOldEnough = () => {
        setShowOverlayMessage(true);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="relative inline-grid items-center bg-white p-10 text-center h-[400px] w-[80%]">
                {showWelcomeMessage ? (
                    <div className="absolute flex flex-col justify-center items-center w-full h-full">
                        {/* Replace ThumbUpIcon with your SVG or an equivalent icon */}
                        <span className="text-9xl text-green-500">👍</span>
                        <h4 className="mt-2 text-4xl text-green-500">Welcome to Herba Natural</h4>
                    </div>
                ) : (
                    <>
                        {showOverlayMessage && (
                            <div className="absolute top-0 left-0 w-full h-[15%] bg-black bg-opacity-70 flex flex-col justify-center items-center text-black">
                                <h6 className="text-white text-center text-xl">
                                    You Are Not Old Enough to Enter This Site
                                </h6>
                            </div>
                        )}
                        <h3 className="text-3xl text-black">
                            Are You of Legal Age?
                        </h3>
                        <p className="my-2.5 font-light text-black">
                            By entering this website, you certify that you are of legal age to consume CBD in the state in which you reside, that you agree to our
                            <Link href='/terms' className="text-blue-500 transition duration-300 hover:text-blue-700"> Terms and Conditions</Link>,
                            and to our
                            <Link href="/privacy-policy" className="text-blue-500 transition duration-300 hover:text-blue-700"> Privacy Policy</Link>
                        </p>

                        <div className="flex justify-evenly items-center flex-col sm:flex-row">
                            <button
                                onClick={handleOldEnough}
                                className="w-50 px-5 py-2.5 text-white bg-[var(--color-primary)] rounded-none hover:bg-[var(--color-primary-hover)] transition duration-300 mb-3 sm:mb-3 h-14"
                            >
                                YES, I AM OF LEGAL AGE
                            </button>
                            <button
                                onClick={handleNotOldEnough}
                                className="mb-1 w-50 px-5 py-2.5 text-gray-800 bg-white border-gray-800 border-2 rounded-none hover:bg-[var(--color-secondary-hover)] hover:text-white transition duration-300 h-14"
                            >
                                NO, I DON'T AGREE
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AgeVerification;
