"use client"
import React, { useState } from 'react';
import Icon from './Icon'; // Adjust the import path as needed
import Envelope from '@/Icons/Envelope.icon';
import Forward from '@/Icons/Forward.icon';

const SubscribeField: React.FC = () => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        setIsFocused(e.target.value.trim() !== '');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };

    return (
        <div className={`bg-gray-800 py-4 px-6 m-4 rounded-xl`}>
            <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="mr-4">
                    <p className="text-base font-medium underline text-on-primary">NEWSLETTER</p>
                    <p className='text-on-primary text-sm font-light'>Get special offers and find out what’s new in the store. Sign up for the Herba Natural Co newsletter.</p>
                </div>
                <div className="flex items-center w-full">
                    <div className="relative flex flex-row mt-2 h-12 w-full">
                        <div className='absolute'>
                            <Envelope name='Envelope' width={35} height={35} className="absolute top-5 transform -translate-y-3 text-gray-500 fill-white z-10 hover:fill-primary transition duration-300" />
                        </div>
                        <input
                            id='email'
                            type="email"
                            placeholder=" "
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={inputValue}
                            className={`bg-gray-700 border-b-2 border-white focus:outline-none focus:border-primary text-white px-12 py-2 rounded-none w-full`}
                        />
                        <label htmlFor="email" className={`cursor-text text-lg font-light absolute text-on-primary left-12 top-4 transform -translate-y-1 transition-all ${isFocused || inputValue ? 'text-xs text-gray-400 bg-gray-800 p-1 -translate-y-7 ' : ''}`}>Enter your email</label>
                        <button type="submit" aria-label='submit' className={`bg-transparent text-white px-4 py-2 -top-1 md:-top-0 absolute -right-4`}>
                            <Forward name='Forward' width={35} height={35} className='hover:stroke-primary transition duration-300' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscribeField;
