'use client';

// src/components/Solutions.tsx
import {motion} from 'framer-motion';

const solutions = [
    {
        icon: "🔍",
        title: "공통점 찾기",
        description: "취미, 관심사, 가치관 등을 통해 서로의 공통점을 발견하고 이를 중심으로 대화를 발전시키는 방법을 알려드립니다."
    }, {
        icon: "❓",
        title: "질문 가이드",
        description: "상대방에 대해 더 깊이 알아갈 수 있는 맞춤형 질문들을 추천해 드립니다. 의미 있는 대화로 이어지는 질문의 힘을 경험하세요."
    }, {
        icon: "🤝",
        title: "성격 공유하기",
        description: "각자의 성격, 성향, 커뮤니케이션 스타일을 이해하고 공유함으로써 서로를 더 잘 이해하는 방법을 배워보세요."
    }, {
        icon: "📅",
        title: "약속 정하고 함께 하기",
        description: "서로의 일정과 관심사를 바탕으로 함께할 수 있는 활동을 정하고, 약속을 지키며 신뢰를 쌓아가는 방법을 제안합니다."
    }
];
export default function Solutions() {
    return (
        <section className="mt-32 lg:mt-0 py-20 px-6 bg-gray-50 min-h-screen flex flex-col justify-center items-center ">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">빠르게 친해지는 방법</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        solutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 30
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}
                                viewport={{
                                    once: true
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                                <div className="text-5xl mb-4">{solution.icon}</div>
                                <h3 className="text-2xl font-semibold text-orange mb-4">{solution.title}</h3>
                                <p className="text-gray-600">{solution.description}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
