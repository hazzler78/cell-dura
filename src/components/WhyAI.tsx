'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { STATS, FEATURES } from '@/lib/constants';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const WhyAI = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="why-ai" className="py-20 bg-dark-lighter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="section-title hero-gradient"
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            Why Invest in AI Now?
          </motion.h2>
          <motion.p
            className="section-subtitle"
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            AI is transforming industries. Stay ahead with cutting-edge tools and knowledge to boost efficiency,
            innovation, and growth.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card text-center"
              variants={scaleIn}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg blur" />
                <div className="relative">
                  <dt className="text-sm font-medium text-gray-400">{stat.label}</dt>
                  <dd className="mt-2 text-4xl font-extrabold hero-gradient">{stat.value}</dd>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="mt-20">
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card"
                variants={fadeInUp}
                transition={{ delay: 0.6 + index * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-secondary/5 to-transparent opacity-50" />
      </div>
    </section>
  );
};

export default WhyAI; 