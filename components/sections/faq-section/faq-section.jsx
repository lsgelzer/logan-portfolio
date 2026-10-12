'use client'

import { useState } from 'react'

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-green"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[18px] font-medium -tracking-[0.01em] text-green-ink md:text-[20px]">
          {question}
        </span>
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full border border-line bg-paper text-[18px] text-green-ink transition-transform ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}
      >
        <p className="max-w-[720px] font-openSans text-[15px] leading-[1.7] text-ink-dim">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FaqSection({ faqData = [] }) {
  const [openIndex, setOpenIndex] = useState(0)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section
      id="faq"
      className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]"
      aria-label="Frequently asked questions"
    >
      <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
        <span
          className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
          aria-hidden
        />
        <span>
          07 / <b className="font-semibold text-green-ink">FAQ</b>
        </span>
        <span>— common questions</span>
      </div>
      <div className="mb-10 grid items-end gap-14 md:grid-cols-[1.2fr_1fr]">
        <h2 className="sec-title font-display font-medium leading-[0.98] -tracking-[0.035em] text-green-ink text-[clamp(42px,6vw,92px)] text-balance">
          Shopify development <em>FAQ</em>.
        </h2>
        <p className="max-w-[520px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
          Questions about working together, pricing, timelines, and what makes
          Logan Gelzer different from other Shopify developers.
        </p>
      </div>
      <div className="mx-auto max-w-[800px] rounded-[14px] border border-line bg-paper px-8 py-2">
        {faqData.map((item, i) => (
          <FaqItem
            key={i}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </section>
  )
}
