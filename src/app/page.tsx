import Link from 'next/link'
import { surveyCards } from '@/data/surveys'

export default function LandingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[60vh] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/bg_login_hero.png')" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center 40%, rgba(26,35,50,0.45) 0%, rgba(26,35,50,0.75) 50%, rgba(26,35,50,0.92) 100%)',
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-[60vh] px-4">
          <p className="text-base tracking-widest text-white/80 mb-1">
            특별한 시간
          </p>
          <p className="text-xs tracking-[4px] text-white/35 mb-12">
            The Special Time
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            가장 <span className="text-[#c9a959] italic">특별한 시간</span>을
            <br />
            동행해드립니다
          </h1>
          <div className="w-10 h-0.5 bg-[#c9a959] mx-auto my-6" />
          <p className="text-white/50 text-sm leading-relaxed">
            당신의 소중한 의견을
            <br />
            들려주세요
          </p>
        </div>
      </section>

      {/* App Description */}
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-6">
          <span className="inline-block text-xs tracking-widest text-[#c9a959] font-medium uppercase mb-3">About</span>
          <h2 className="text-xl font-bold mb-4">&ldquo;특별한 시간&rdquo;이란?</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            <strong className="text-[#1a2332]">특별한 시간</strong>은 결혼 준비의 모든 과정을
            <strong className="text-[#c9a959]"> AI</strong>와 함께 스마트하게 관리할 수 있는
            <strong className="text-[#1a2332]"> 웨딩 플래닝 플랫폼</strong>입니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 bg-[#FAFAF8] rounded-lg p-3">
              <svg className="w-5 h-5 text-[#c9a959] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21" /></svg>
              <div>
                <p className="font-medium text-[#1a2332] text-xs mb-0.5">업체 탐색 & 비교</p>
                <p className="text-xs text-gray-500">웨딩홀·스드메 가격 비교, 시세 데이터 제공</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-[#FAFAF8] rounded-lg p-3">
              <svg className="w-5 h-5 text-[#c9a959] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
              <div>
                <p className="font-medium text-[#1a2332] text-xs mb-0.5">AI 플래너 채팅</p>
                <p className="text-xs text-gray-500">24시간 AI가 업체 추천, 예산 분석, 일정 관리</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-[#FAFAF8] rounded-lg p-3">
              <svg className="w-5 h-5 text-[#c9a959] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
              <div>
                <p className="font-medium text-[#1a2332] text-xs mb-0.5">예산 & 견적 관리</p>
                <p className="text-xs text-gray-500">시세 대비 견적 분석, AI 적정가 판정</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-[#FAFAF8] rounded-lg p-3">
              <svg className="w-5 h-5 text-[#c9a959] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              <div>
                <p className="font-medium text-[#1a2332] text-xs mb-0.5">프리랜서 매칭</p>
                <p className="text-xs text-gray-500">스타일 기반 AI 매칭으로 스냅·영상 작가 연결</p>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 pt-1">
            아래 프로토타입 화면을 보시고, 솔직한 의견을 들려주세요.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="max-w-2xl mx-auto px-4 pb-16 pt-8">
        <h2 className="text-xl font-bold text-center mb-8">
          참여할 설문을 선택해주세요
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {surveyCards.map((card) =>
            card.disabled ? (
              <div
                key={card.type}
                className="relative bg-gray-50 rounded-xl border border-gray-200/60 p-6 opacity-50 cursor-not-allowed block"
              >
                <span className="absolute top-4 right-4 text-xs text-gray-400 font-medium">준비중</span>
                <div className="w-10 h-10 rounded-lg bg-gray-300 text-gray-500 flex items-center justify-center text-sm font-bold mb-3">{card.icon}</div>
                <h3 className="text-lg font-bold text-gray-400">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{card.subtitle}</p>
                <p className="text-sm text-gray-400">{card.description}</p>
              </div>
            ) : (
              <Link
                key={card.type}
                href={`/survey/${card.type}`}
                className="relative bg-white rounded-xl border border-gray-200/60 p-6 hover:shadow-lg hover:border-[#c9a959]/30 transition-all duration-300 group block"
              >
                <span className="absolute top-4 right-4 text-[#c9a959] opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#1a2332] text-[#c9a959] flex items-center justify-center text-sm font-bold mb-3">{card.icon}</div>
                <h3 className="text-lg font-bold group-hover:text-[#c9a959] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-[#c9a959] mb-2">{card.subtitle}</p>
                <p className="text-sm text-gray-500">{card.description}</p>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-8 border-t border-gray-100">
        &copy; 2025 특별한 시간 &middot; The Special Time
      </footer>
    </main>
  )
}
