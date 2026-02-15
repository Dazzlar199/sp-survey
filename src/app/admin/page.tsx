'use client'

import { useState } from 'react'
import { surveys } from '@/data/surveys'
import type { SurveyType } from '@/data/surveys'

interface SurveyResponse {
  id: string
  survey_type: string
  respondent_name: string
  respondent_contact: string | null
  answers: Record<string, string>
  created_at: string
}

type FilterType = 'all' | 'a1' | 'a2' | 'b1' | 'b2'

const TYPE_LABELS: Record<string, string> = {
  a1: '예비부부',
  a2: '결혼부부',
  b1: '프리랜서',
  b2: '플래너',
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  a1: 'bg-blue-50 text-blue-700',
  a2: 'bg-purple-50 text-purple-700',
  b1: 'bg-emerald-50 text-emerald-700',
  b2: 'bg-amber-50 text-amber-700',
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const h = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    return `${y}.${m}.${d} ${h}:${min}`
  } catch {
    return dateString
  }
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*/g, '')
}

/** Render answers in survey structure order */
function OrderedAnswers({ surveyType, answers }: { surveyType: string; answers: Record<string, string> }) {
  const survey = surveys[surveyType as SurveyType]
  if (!survey) {
    return <p className="text-sm text-gray-400">알 수 없는 설문 유형입니다.</p>
  }

  const renderAnswer = (questionId: string, questionText: string) => {
    const answer = answers[questionId]
    if (answer === undefined || answer === null || answer === '') return null
    return (
      <div key={questionId} className="mb-2">
        <p className="text-xs text-gray-500 mb-1">{stripMarkdown(questionText)}</p>
        <div className="text-sm text-[#1a2332] bg-gray-50 rounded-lg px-3 py-2">
          {String(answer)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Respondent fields (B1 등 커스텀 필드) */}
      {survey.respondentFields && survey.respondentFields.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-[#c9a959] uppercase tracking-wider mb-2">응답자 정보</h4>
          {survey.respondentFields.map((field) => renderAnswer(field.id, field.label))}
        </div>
      )}

      {/* Sections in order */}
      {survey.sections.map((section) => (
        <div key={section.id}>
          <h4 className="text-xs font-semibold text-[#1a2332] bg-[#1a2332]/5 rounded-md px-3 py-1.5 mb-2">
            {section.title}
          </h4>
          {section.questions.map((q) => renderAnswer(q.id, q.text))}
        </div>
      ))}

      {/* O/X Polls */}
      {survey.polls.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-[#1a2332] bg-[#1a2332]/5 rounded-md px-3 py-1.5 mb-2">
            O/X 빠른 투표
          </h4>
          <div className="space-y-1.5">
            {survey.polls.map((poll) => {
              const answer = answers[poll.id]
              if (answer === undefined || answer === null || answer === '') return null
              return (
                <div key={poll.id} className="flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                    answer === 'O' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {answer}
                  </span>
                  <span className="text-sm text-gray-600">{stripMarkdown(poll.text)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Final Questions */}
      {survey.finalQuestions.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-[#1a2332] bg-[#1a2332]/5 rounded-md px-3 py-1.5 mb-2">
            종합 의견
          </h4>
          {survey.finalQuestions.map((q) => renderAnswer(q.id, q.text))}
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [selectedType, setSelectedType] = useState<FilterType>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/survey?password=${encodeURIComponent(password)}`)
      if (res.status === 401) {
        setError('비밀번호가 올바르지 않습니다.')
        setIsLoading(false)
        return
      }

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || '오류가 발생했습니다.')
        setIsLoading(false)
        return
      }

      const data = await res.json()
      setResponses(data.responses || [])
      setIsAuthenticated(true)
    } catch {
      setError('서버에 연결할 수 없습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setResponses([])
    setSelectedType('all')
    setExpandedId(null)
    setError('')
  }

  const filteredResponses =
    selectedType === 'all'
      ? responses
      : responses.filter((r) => r.survey_type === selectedType)

  const getCount = (type: FilterType): number => {
    if (type === 'all') return responses.length
    return responses.filter((r) => r.survey_type === type).length
  }

  const handleDownloadCSV = () => {
    if (filteredResponses.length === 0) return

    // Build question IDs in survey order
    const getOrderedQuestionIds = (surveyType: string): string[] => {
      const survey = surveys[surveyType as SurveyType]
      if (!survey) return []
      const ids: string[] = []
      if (survey.respondentFields) {
        survey.respondentFields.forEach((f) => ids.push(f.id))
      }
      survey.sections.forEach((s) => s.questions.forEach((q) => ids.push(q.id)))
      survey.polls.forEach((p) => ids.push(p.id))
      survey.finalQuestions.forEach((q) => ids.push(q.id))
      return ids
    }

    // Get ordered question IDs from all survey types in filtered responses
    const seenTypes = new Set(filteredResponses.map((r) => r.survey_type))
    const questionIdArray: string[] = []
    const questionIdSet = new Set<string>()
    seenTypes.forEach((type) => {
      getOrderedQuestionIds(type).forEach((id) => {
        if (!questionIdSet.has(id)) {
          questionIdSet.add(id)
          questionIdArray.push(id)
        }
      })
    })

    // Build header row with question text
    const getQuestionLabel = (qId: string): string => {
      for (const type of seenTypes) {
        const survey = surveys[type as SurveyType]
        if (!survey) continue
        if (survey.respondentFields) {
          const f = survey.respondentFields.find((f) => f.id === qId)
          if (f) return f.label
        }
        for (const s of survey.sections) {
          const q = s.questions.find((q) => q.id === qId)
          if (q) return stripMarkdown(q.text)
        }
        const p = survey.polls.find((p) => p.id === qId)
        if (p) return stripMarkdown(p.text)
        const fq = survey.finalQuestions.find((q) => q.id === qId)
        if (fq) return stripMarkdown(fq.text)
      }
      return qId
    }

    const headers = ['설문유형', '이름', '연락처', '제출일시', ...questionIdArray.map(getQuestionLabel)]

    const rows = filteredResponses.map((r) => {
      const baseRow = [
        TYPE_LABELS[r.survey_type] || r.survey_type,
        r.respondent_name,
        r.respondent_contact || '',
        formatDate(r.created_at),
      ]
      const answerRow = questionIdArray.map((qId) => {
        const val = r.answers?.[qId]
        if (val === undefined || val === null) return ''
        return String(val).replace(/"/g, '""')
      })
      return [...baseRow, ...answerRow]
    })

    const BOM = '\uFEFF'
    const csvContent =
      BOM +
      [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell}"`).join(','))
        .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `survey_responses_${selectedType}_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // === LOGIN VIEW ===
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAF8]">
        <div className="bg-white rounded-xl border border-gray-200/60 p-8 shadow-sm w-full max-w-sm">
          <h1 className="text-xl font-bold text-center mb-6 text-[#1a2332]">
            관리자 로그인
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959]/30 transition"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-[#1a2332] text-white py-3 rounded-lg font-medium hover:bg-[#2d3a4d] mt-4 transition disabled:opacity-50"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    )
  }

  // === DASHBOARD VIEW ===
  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'a1', label: '예비부부' },
    { key: 'a2', label: '결혼부부' },
    { key: 'b1', label: '프리랜서' },
    { key: 'b2', label: '플래너' },
  ]

  const statCards: { key: FilterType; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'a1', label: '예비부부' },
    { key: 'a2', label: '결혼부부' },
    { key: 'b1', label: '프리랜서' },
    { key: 'b2', label: '플래너' },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="bg-[#1a2332] text-white px-6 py-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-lg font-bold">설문 응답 관리</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-white/60 hover:text-white transition"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-lg p-4 shadow-sm text-center"
            >
              <div className="text-2xl font-bold text-[#1a2332]">
                {getCount(card.key)}
              </div>
              <div className="text-xs text-gray-500 mt-1">{card.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedType(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition ${
                selectedType === tab.key
                  ? 'bg-[#1a2332] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#c9a959]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Response List */}
      <div className="max-w-5xl mx-auto px-4 space-y-3 pb-12">
        {filteredResponses.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-12 text-center">
            <p className="text-gray-400 text-sm">응답이 없습니다.</p>
          </div>
        ) : (
          filteredResponses.map((response) => (
            <div
              key={response.id}
              className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div
                className="px-5 py-4 flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setExpandedId(
                    expandedId === response.id ? null : response.id
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      TYPE_BADGE_STYLES[response.survey_type] ||
                      'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {TYPE_LABELS[response.survey_type] ||
                      response.survey_type}
                  </span>
                  <span className="font-medium text-[#1a2332]">
                    {response.respondent_name}
                  </span>
                  {response.respondent_contact && (
                    <span className="text-sm text-gray-400">
                      {response.respondent_contact}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    {formatDate(response.created_at)}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {expandedId === response.id ? '\u25B2' : '\u25BC'}
                  </span>
                </div>
              </div>

              {/* Expanded Detail - Survey structure order */}
              {expandedId === response.id && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                  <OrderedAnswers
                    surveyType={response.survey_type}
                    answers={response.answers}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* CSV Download Button */}
      <button
        onClick={handleDownloadCSV}
        className="fixed bottom-6 right-6 bg-[#c9a959] text-[#1a2332] px-5 py-3 rounded-xl shadow-lg font-medium text-sm hover:bg-[#d4bc7a] transition"
      >
        CSV 다운로드
      </button>
    </div>
  )
}
