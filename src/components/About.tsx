'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ABOUT_POINTS } from '@/lib/constants';
import { fadeInUp, slideIn } from '@/lib/animations';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image/Visual side */}
          <motion.div
            className="relative mb-12 lg:mb-0"
            ref={ref}
            variants={slideIn}
            custom="left"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="aspect-w-12 aspect-h-13 rounded-2xl overflow-hidden bg-dark-lighter relative">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Content side */}
          <motion.div
            className="relative"
            variants={slideIn}
            custom="right"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h2 className="section-title text-left mb-6 hero-gradient">Who I Am</h2>
            <div className="space-y-6 text-lg text-gray-300">
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
              >
                I'm an AI educator and consultant based in Germany, passionate about making AI accessible to businesses.
                With fluency in English and Swedish, I deliver clear, actionable insights in English to help your company
                thrive in the AI era.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.4 }}
              >
                My approach combines technical expertise with clear communication, ensuring that complex AI concepts
                are understood and effectively implemented in your business context.
              </motion.p>
              <motion.div
                className="pt-6"
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">Why Choose Me?</h3>
                <ul className="space-y-3">
                  {ABOUT_POINTS.map((item, index) => (
                    <motion.li
                      key={item}
                      className="flex items-center space-x-3"
                      variants={fadeInUp}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 