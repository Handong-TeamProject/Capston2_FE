'use client';

import { handleGoogleLogin, StartButton } from '@/utils/GoogleLogin';
// src/components/CallToAction.tsx
import {motion} from 'framer-motion';

export default function CallToAction() {
    return (
        <section
            className="py-20 px-6  text-center min-h-screen flex flex-col justify-center items-center ">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.8
                    }}>
                    <h2 className="text-3xl lg:text-4xl md:text-5xl font-bold mb-6 gradiant-yellow-ornage" >지금 바로 시작하세요</h2>
                    <p className="text-xl md:text-2xl font-light mb-10 gradiant-yellow-ornage">더 깊고 의미 있는 관계를 위한 첫 걸음</p>
                    <StartButton/>
                </motion.div>
            </div>
        </section>
    );
}
