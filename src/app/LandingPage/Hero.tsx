"use client"

import { StartButton } from '@/utils/GoogleLogin';
import {motion} from 'framer-motion';

export default function Hero() {

    return (
        <header
            className="relative flex flex-col justify-center items-center min-h-screen text-center text-white overflow-hidden ">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.8
                }}
                className="relative z-10 max-w-3xl px-6">
                <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
                    <span
                        className="bg-clip-text text-transparent bg-gradient-to-r from-orange to-yellow">QRapo</span>
                </h1>
                <p className="text-xl md:text-2xl font-light mb-8 ">
                    <span
                        className="bg-clip-text text-transparent bg-gradient-to-r from-orange to-yellow">빠르게 라포 형성과 관계 발전을 도와주는 서비스</span>
                </p>    
                <StartButton/>
            </motion.div>
        </header>
    );
}