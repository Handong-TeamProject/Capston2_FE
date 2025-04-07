'use client';

// src/components/Goal.tsx
import { motion } from 'framer-motion';

export default function Goal() {
  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen flex flex-col justify-center items-center ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">우리의 목표</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto"
        >
          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            5일 동안 다양한 컨텐츠에 참여함으로써, 라포(친밀감)을 형성하고 서로에 대해 알아가는 과정을 통해 결과적으로는 관계가 형성되고 발전되는 것을 목표로 합니다.
          </p>
          <p className="text-lg text-gray-600">
            자연스러운 관계 형성은 시간이 필요하지만, 올바른 접근법으로 그 과정을 더욱 효과적으로 만들 수 있습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
