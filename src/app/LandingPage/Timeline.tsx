'use client';

// src/components/Timeline.tsx
import {motion} from 'framer-motion';

const days = [
    {
        day: 1,
        title: "서로를 알아가는 첫날!",
        description: "프로필을 작성하고, 공유하며, 자기소개를 하고, 밸런스 게임을 통해 공통점과 차이점을 발견한 뒤, 첫인상을 남겨보며 우리만의 첫 기록을 만들" +
                "어본다."
    }, {
        day: 2,
        title: "경험을 나누고, 서로의 생각을 탐색하는 시간!",
        description: "각자의 과거를 돌아보며 경험을 공유하고, 특정 상황에서 어떻게 행동하는지 이야기해본다."
    }, {
        day: 3,
        title: "취향과 성향을 알아보는 시간!",
        description: "서로의 관심사를 공유하고, ‘나 사용법’을 작성하며 편안한 소통 방법을 찾아본다."
    }, {
        day: 4,
        title: "함께할 활동을 구체화하는 날!",
        description: "공통된 관심사를 바탕으로 실현 가능한 계획을 세우고, 협력과 소통을 통해 의미 있는 경험 만들어간다."
    }, {
        day: 5,
        title: "마지막 시간!",
        description: "첫인상과 현인상을 비교하며 변화를 돌아보고, 5일간의 경험을 정리하며  프로젝트를 마무리한다."
    }
];

export default function Timeline() {
    return (
        <section className="py-20 px-6 mt-64">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">5일 친해지기 프로그램</h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange"></div>

                    {
                        days.map((day, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0
                                        ? -30
                                        : 30
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.3
                                }}
                                transition={{
                                    duration: 0.5
                                }}
                                className={`flex md:justify-between items-center mb-12 ${
                                index % 2 === 0
                                    ? 'md:flex-row'
                                    : 'md:flex-row-reverse'} flex-col md:items-center`}>
                                <div className="md:w-5/12"></div>

                                {/* Day circle */}
                                <div className="relative flex justify-center md:mx-0 mx-auto">
                                    <div
                                        className="bg-yellow50 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                                        {day.day}
                                    </div>
                                </div>

                                <div
                                    className="bg-white rounded-xl shadow-lg p-6 md:w-5/12 w-full mt-4 md:mt-0">
                                    <h3 className="text-xl font-semibold text-orange mb-2">{day.title}</h3>
                                    <p className="text-gray-600">{day.description}</p>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}