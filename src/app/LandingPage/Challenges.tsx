'use client';

// src/components/Challenges.tsx
import {motion} from 'framer-motion';

const challenges = [
    {
        title: "대화 주제 찾기",
        description: "처음 만난 사람과 무슨 대화를 해야 할지 고민되시나요? 어색한 침묵이 이어질 때 어떻게 대화를 이어가야 할지 막막하죠."
    }, {
        title: "공통점 발견하기",
        description: "서로의 공통점을 찾는 것은 친밀감 형성의 첫 단계입니다. 하지만 짧은 시간 안에 의미 있는 공통점을 찾기란 쉽지 않죠."
    }, {
        title: "라포 형성하기",
        description: "단순한 대화를 넘어 진정한 친밀감(라포)를 형성하기 위해서는 어떤 행동이 필요한지 알기 어렵습니다."
    }
];

const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

export default function Challenges() {
    return (
        <section id="features" className="py-20 px-6 min-h-screen flex flex-col justify-center items-center ">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
                    <span className="block lg:inline">우리가 관계에서 </span>
                    <span className="block lg:inline">겪는 어려움</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        challenges.map((challenge, index) => (
                            <motion.div
                                key={index}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{
                                    once: true,
                                    amount: 0.3
                                }}
                                variants={cardVariants}
                                className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition-transform duration-300">
                                <h3 className="text-2xl font-semibold text-orange mb-4">{challenge.title}</h3>
                                <p className="text-gray-600">{challenge.description}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}