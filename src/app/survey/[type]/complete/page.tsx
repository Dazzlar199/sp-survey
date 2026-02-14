import Link from 'next/link'

export default function CompletePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[#c9a959]/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-[#c9a959] text-4xl">&check;</span>
        </div>
        <h1 className="text-3xl font-bold font-serif mb-3">감사합니다!</h1>
        <p className="text-gray-600 mb-2">
          소중한 의견이 성공적으로 전달되었습니다.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          보내주신 의견은 &lsquo;특별한 시간&rsquo; 서비스 개선에
          <br />
          소중하게 반영됩니다.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#1a2332] text-white px-6 py-3 rounded-xl hover:bg-[#2d3a4d] transition-colors text-sm font-medium"
        >
          처음으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
