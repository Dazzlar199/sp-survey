'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { surveys } from '@/data/surveys'
import Image from 'next/image'
import type { SurveyType, Question, RespondentField } from '@/data/surveys'

function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  return (
    <div className="mb-5">
      <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 cursor-zoom-in" onClick={() => setLightbox(true)}>
        <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
          <Image
            src={images[current]}
            alt={`화면 이미지 ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" /></svg>
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p > 0 ? p - 1 : images.length - 1)) }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p < images.length - 1 ? p + 1 : 0)) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
            >
              &rsaquo;
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === current ? 'bg-[#c9a959]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 text-gray-700 flex items-center justify-center hover:bg-white transition z-10 text-lg font-bold shadow-lg"
          >
            &times;
          </button>
          <div
            className="relative max-w-3xl w-full max-h-[85vh] overflow-auto rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[current]}
              alt={`화면 이미지 ${current + 1}`}
              className="w-full h-auto"
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p > 0 ? p - 1 : images.length - 1)) }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-700 flex items-center justify-center hover:bg-white transition text-xl z-10 shadow-lg"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p < images.length - 1 ? p + 1 : 0)) }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-700 flex items-center justify-center hover:bg-white transition text-xl z-10 shadow-lg"
              >
                &rsaquo;
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 rounded-full px-3 py-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      i === current ? 'bg-[#c9a959]' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function QuestionInput({
  question,
  index,
  value,
  onChange,
}: {
  question: Question
  index: number
  value: string
  onChange: (id: string, value: string) => void
}) {
  return (
    <div>
      <div className="flex items-start gap-2">
        <span className="text-[#c9a959] font-bold text-sm min-w-[28px]">
          Q{index + 1}
        </span>
        <span className="text-sm leading-relaxed">{question.text}</span>
      </div>
      {question.hint && (
        <p className="text-xs text-gray-400 italic mt-1 ml-[28px]">
          &rarr; {question.hint}
        </p>
      )}
      <div className="mt-2 ml-[28px]">
        {question.type === 'text' && (
          <textarea
            rows={3}
            value={value}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959]/30 transition text-sm"
            placeholder="답변을 입력해주세요"
          />
        )}
        {question.type === 'ox' && (
          <div className="flex gap-3">
            {['O', 'X'].map((opt) => (
              <label key={opt} className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={opt}
                  checked={value === opt}
                  onChange={() => onChange(question.id, opt)}
                  className="hidden"
                />
                <div
                  className={`border rounded-lg py-2 text-center text-sm font-medium transition ${
                    value === opt
                      ? 'bg-[#1a2332] text-white border-[#1a2332]'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#c9a959]/50'
                  }`}
                >
                  {opt}
                </div>
              </label>
            ))}
          </div>
        )}
        {question.type === 'select' && (
          <select
            value={value}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959]/30 transition text-sm bg-white"
          >
            <option value="">선택해주세요</option>
            {question.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}

export default function SurveyPage() {
  const params = useParams()
  const router = useRouter()
  const type = params.type as string

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [respondentName, setRespondentName] = useState('')
  const [respondentContact, setRespondentContact] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const validTypes: SurveyType[] = ['a1', 'a2', 'b1', 'b2']
  if (!validTypes.includes(type as SurveyType)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">존재하지 않는 설문입니다</p>
          <Link
            href="/"
            className="text-[#c9a959] hover:underline text-sm"
          >
            처음으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const survey = surveys[type as SurveyType]

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyType: type,
          respondentName,
          respondentContact,
          answers,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || '제출에 실패했습니다. 다시 시도해주세요.')
      }

      router.push(`/survey/${type}/complete`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '제출에 실패했습니다. 다시 시도해주세요.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#1a2332] transition-colors">
            &larr; 돌아가기
          </Link>
          <span className="font-bold text-sm">{survey.groupTag}</span>
          <div className="w-16" />
        </div>
      </header>

      {/* Mini Hero */}
      <section className="bg-[#1a2332] text-white py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block border border-[#c9a959]/50 text-[#c9a959] px-4 py-1 rounded text-sm font-bold mb-4">
            {survey.groupTag}
          </span>
          {survey.target && <p className="text-white/60 text-sm mb-2">{survey.target}</p>}
          <p className="text-white/80 text-sm leading-relaxed">{survey.intro}</p>
          {survey.retroNote && (
            <div className="bg-white/10 rounded-lg p-4 mt-4">
              <p className="text-sm text-white/70">{survey.retroNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Respondent Info */}
        <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">기본 정보</h3>
          <div className="space-y-4">
            {survey.respondentFields ? (
              survey.respondentFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium mb-1">
                    {field.label} {field.required && '*'}
                  </label>
                  {field.note && (
                    <p className="text-xs text-gray-400 mb-2">{field.note}</p>
                  )}
                  {field.type === 'text' && (
                    <input
                      type="text"
                      required={field.required}
                      value={field.id === 'name' ? respondentName : (answers[`_${field.id}`] || '')}
                      onChange={(e) => {
                        if (field.id === 'name') {
                          setRespondentName(e.target.value)
                        } else {
                          handleChange(`_${field.id}`, e.target.value)
                        }
                      }}
                      placeholder={field.placeholder}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959]/30 transition text-sm"
                    />
                  )}
                  {field.type === 'radio' && field.options && (
                    <div className="flex gap-3">
                      {field.options.map((opt) => (
                        <label key={opt} className="flex-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`_${field.id}`}
                            value={opt}
                            checked={answers[`_${field.id}`] === opt}
                            onChange={() => handleChange(`_${field.id}`, opt)}
                            className="hidden"
                          />
                          <div
                            className={`border rounded-lg py-2 text-center text-sm font-medium transition ${
                              answers[`_${field.id}`] === opt
                                ? 'bg-[#1a2332] text-white border-[#1a2332]'
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#c9a959]/50'
                            }`}
                          >
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                  {field.type === 'select' && field.options && (
                    <select
                      value={answers[`_${field.id}`] || ''}
                      onChange={(e) => handleChange(`_${field.id}`, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959]/30 transition text-sm bg-white"
                    >
                      <option value="">선택해주세요</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">이름 *</label>
                  <input
                    type="text"
                    required
                    value={respondentName}
                    onChange={(e) => setRespondentName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959]/30 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">연락처 (선택)</label>
                  <input
                    type="text"
                    value={respondentContact}
                    onChange={(e) => setRespondentContact(e.target.value)}
                    placeholder="전화번호 또는 이메일"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959]/30 transition text-sm"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sections */}
        {survey.sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm"
          >
            <h3 className="border-l-[3px] border-[#c9a959] pl-3 font-bold text-base mb-4">
              {section.title}
            </h3>
            {section.description && (
              <p className="text-sm text-gray-500 mb-3">{section.description}</p>
            )}
            {section.flow && (
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4">
                {section.flow}
              </div>
            )}
            {section.images && section.images.length > 0 && (
              <ImageCarousel images={section.images} />
            )}
            <div className="space-y-6">
              {section.questions.map((question, qIdx) => (
                <QuestionInput
                  key={question.id}
                  question={question}
                  index={qIdx}
                  value={answers[question.id] || ''}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Polls */}
        {survey.polls.length > 0 && (
          <div className="bg-[#1a2332] rounded-xl p-6 text-white">
            <h3 className="text-[#c9a959] font-bold mb-4">O / X 투표</h3>
            <div>
              {survey.polls.map((poll) => (
                <div
                  key={poll.id}
                  className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                >
                  <span className="text-sm text-white/90 flex-1 mr-4">
                    {poll.text}
                  </span>
                  <div className="flex gap-2 shrink-0">
                    {['O', 'X'].map((opt) => (
                      <label key={opt} className="cursor-pointer">
                        <input
                          type="radio"
                          name={poll.id}
                          value={opt}
                          checked={answers[poll.id] === opt}
                          onChange={() => handleChange(poll.id, opt)}
                          className="hidden"
                        />
                        <div
                          className={`w-10 text-center border rounded-lg py-1 text-sm font-medium transition ${
                            answers[poll.id] === opt
                              ? 'bg-[#c9a959] text-[#1a2332] border-[#c9a959]'
                              : 'border-white/20 text-white/60 hover:border-white/40'
                          }`}
                        >
                          {opt}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Questions */}
        {survey.finalQuestions.length > 0 && (
          <div className="bg-[#FEFDF5] border border-[#c9a959]/20 rounded-xl p-6">
            <h3 className="text-[#b8960f] font-bold mb-4">마지막 질문</h3>
            <div className="space-y-6">
              {survey.finalQuestions.map((question, qIdx) => (
                <QuestionInput
                  key={question.id}
                  question={question}
                  index={qIdx}
                  value={answers[question.id] || ''}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#c9a959] text-[#1a2332] font-bold py-4 rounded-xl text-base hover:bg-[#d4bc7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#1a2332]/30 border-t-[#1a2332] rounded-full animate-spin" />
              제출 중...
            </span>
          ) : (
            '의견 제출하기'
          )}
        </button>
      </form>
    </div>
  )
}
