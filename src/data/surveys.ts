export type SurveyType = 'a1' | 'a2' | 'b1' | 'b2'

export interface Question {
  id: string
  text: string
  hint?: string
  type: 'text' | 'ox' | 'select'
  options?: string[]
}

export interface RespondentField {
  id: string
  label: string
  type: 'text' | 'radio' | 'select'
  placeholder?: string
  required?: boolean
  note?: string
  options?: string[]
}

export interface Section {
  id: string
  title: string
  description?: string
  flow?: string
  images?: string[]
  questions: Question[]
}

export interface Survey {
  type: SurveyType
  title: string
  groupTag: string
  target: string
  intro: string
  retroNote?: string
  respondentFields?: RespondentField[]
  sections: Section[]
  polls: { id: string; text: string }[]
  finalQuestions: Question[]
}

// ─────────────────────────────────────────────
// A1: 예비부부
// ─────────────────────────────────────────────
const a1: Survey = {
  type: 'a1',
  title: '특별한 시간 — 예비부부 의견 조사',
  groupTag: '예비부부 의견 조사',
  target: '',
  intro:
    '"특별한 시간" AI 웨딩 플래닝 앱의 **프로토타입 화면**을 보여드립니다. 각 화면마다 질문이 있으니, 솔직한 의견을 남겨주시면 감사하겠습니다.',
  respondentFields: [
    { id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요', required: true, note: '실제 이름 정보는 저장하지 않고, 개인 식별용으로 활용됩니다' },
    { id: 'gender', label: '성별', type: 'radio', options: ['남성', '여성'], required: true },
    { id: 'wedding_year', label: '결혼 예정 년도', type: 'select', options: ['2026', '2027', '2028', '2029'], required: true },
  ],
  sections: [
    {
      id: 'intro',
      title: '시작 전 질문',
      description: '프로토타입을 보시기 전에, 기존 경험에 대해 먼저 여쭤보겠습니다.',
      questions: [
        {
          id: 'intro_q1',
          text: '웨딩 플래너와 함께 준비하면서 느끼신 **가장 큰 불만이나 문제점**은 무엇인가요?',
          hint: '소통 방식, 업체 추천 기준 불투명, 비용 구조, 일정 공유 등',
          type: 'text',
        },
        {
          id: 'intro_q2',
          text: '반대로 플래너와 함께 준비할 때 느끼시는 **장점**은 무엇인가요?',
          hint: '시간 절약, 업체 네트워크, 전문 지식, 심리적 안정감 등',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen1',
      title: '화면 ① 메인 대시보드',
      flow: 'D-Day 카드 / 진행률 / D-Day 기준 추천 할 일 / 예산 요약 / AI 채팅',
      images: [
        '/images/couple/부부_q1_1.png',
        '/images/couple/부부_q1_2.png',
        '/images/couple/부부_q1_3.png',
      ],
      questions: [
        {
          id: 's1_q1',
          text: '대시보드에 **필요한 기능들이 잘 갖춰져 있다고 느끼시나요?** 부족한 점이 있다면 알려주세요.',
          type: 'text',
        },
        {
          id: 's1_q2',
          text: 'AI 플래너 채팅이 항상 옆에 있는데, **실제로 사용하실 것 같으신가요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen2',
      title: '화면 ② AI 플래너 채팅',
      flow: '사이드 패널 AI 채팅 → 자유 질문 → 업체 카드, 예산 차트 등 시각화 응답',
      images: [
        '/images/couple/웨딩플래너_1.png',
        '/images/couple/웨딩플래너_2.png',
        '/images/couple/웨딩플래너_3.png',
      ],
      questions: [
        {
          id: 's8_q1',
          text: '실제 플래너와 AI 각각 **어떤 질문에 더 적합하다고 생각하시나요?**',
          type: 'text',
        },
        {
          id: 's8_q2',
          text: 'AI 웨딩 플래너가 실제 플래너를 **대체할 수 있다고 생각하시나요?** 아니면 보조 도구로 활용하게 될까요? 그 이유도 알려주세요.',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen3',
      title: '화면 ③ 업체 탐색 (웨딩홀 / 스드메)',
      description: '웨딩홀, 스튜디오, 드레스, 메이크업 업체를 검색하고 비교할 수 있는 기능입니다.',
      flow: '검색/필터 → 가격·시설·평점 비교 → 상세 정보 → AI 매칭 점수',
      images: [
        '/images/couple/웨딩홀_1.png',
        '/images/couple/웨딩홀_2.png',
        '/images/couple/웨딩홀_3.png',
      ],
      questions: [
        {
          id: 's2_q1',
          text: '업체 검색·비교 기능이 **실제 업체 선택에 도움이 될 것 같으신가요?**',
          type: 'text',
        },
        {
          id: 's2_q2',
          text: '기존 방식(인스타/블로그/지인/플래너)과 비교했을 때 **이 서비스는 어떻다고 느끼시나요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen4',
      title: '화면 ④ 프리랜서 매칭',
      description: '매칭 점수는 아직 실제 구현된 기능이 아닙니다. "이런 시스템이 있다면"이라는 관점에서 봐주시면 감사하겠습니다.',
      flow: '스타일 설문 (무드/색감/구도) → AI 매칭 점수 → 비교 → 문의',
      images: [
        '/images/couple/매칭_1.png',
        '/images/couple/매칭_2.png',
      ],
      questions: [
        {
          id: 's4_q1',
          text: '이런 AI 매칭 시스템이 있다면 **이용하실 의향이 있으신가요?** 이유도 함께 알려주세요.',
          type: 'text',
        },
        {
          id: 's4_q2',
          text: '기존에 스냅 작가를 어떻게 찾으셨나요? **가장 어려우셨던 점**은 무엇인가요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen5',
      title: '화면 ⑤ 타임라인 & 캘린더',
      flow: '캘린더 뷰 → 태스크 추가 → 자동 체크리스트 → 카테고리별 진행률',
      images: [
        '/images/couple/타임라인_1.png',
        '/images/couple/타임라인_2.png',
        '/images/couple/타임라인_3.png',
      ],
      questions: [
        {
          id: 's5_q1',
          text: '현재 결혼 준비 일정을 **어떻게 관리하고 계신가요?** (머릿속/카톡/노션/엑셀/플래너 등)',
          type: 'text',
        },
        {
          id: 's5_q2',
          text: '이런 태스크 관리 기능이 결혼 준비에 **도움이 될 것 같으신가요?** 이유도 함께 알려주세요.',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen6',
      title: '화면 ⑥ 견적 비교 & AI 분석',
      flow: '받은 견적 목록 → 시세 대비 비교 → AI 판정 (적정/비쌈/저렴)',
      images: [
        '/images/couple/견적비교_1.png',
        '/images/couple/견적비교_2.png',
      ],
      questions: [
        {
          id: 's7_q1',
          text: '받으신 견적이 적정한지 **현재 어떻게 판단하고 계신가요?**',
          type: 'text',
        },
        {
          id: 's7_q2',
          text: 'AI가 "시세 대비 비싼 편"이라고 판정해준다면 **신뢰하실 수 있으신가요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen7',
      title: '화면 ⑦ 위시리스트 (커플 공유)',
      flow: '위시 추가 (카테고리/우선순위/예상비용) → 파트너 응답 (동의/반대/논의)',
      images: [
        '/images/couple/분담_1.png',
        '/images/couple/분담_2.png',
      ],
      questions: [
        {
          id: 's9_q1',
          text: '파트너와 의견을 조율하실 때 **가장 어려운 점**은 무엇인가요?',
          type: 'text',
        },
        {
          id: 's9_q2',
          text: '이 기능을 **파트너와 함께 사용하실 것 같으신가요?** 아니면 한 분이 주로 관리하시게 될까요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'summary',
      title: '종합 의견',
      description: '전체 화면을 보신 후, 아래 질문에 대해 의견을 남겨주시면 감사하겠습니다.',
      questions: [
        {
          id: 'summary_q1',
          text: '**"무조건 사용할 것 같다"고 느끼신 기능 TOP 3**는 무엇인가요?',
          type: 'text',
        },
        {
          id: 'summary_q2',
          text: '반대로 **"사용하지 않을 것 같다"**고 느끼신 기능이 있으신가요?',
          type: 'text',
        },
      ],
    },
  ],
  polls: [
    { id: 'poll_1', text: '"기존 플래너 + 이 서비스를 병행하겠다"' },
    { id: 'poll_2', text: '"잘 되면 플래너 없이도 될 것 같다"' },
    { id: 'poll_3', text: '"지인에게 추천하겠다"' },
  ],
  finalQuestions: [
    {
      id: 'final_q1',
      text: '이 서비스에 대해 원하는 부분이나 피드백, 추가로 원하는 기능이 있다면 자유롭게 알려주세요.',
      type: 'text',
    },
    {
      id: 'final_q2',
      text: '현재 무료로 제공될 예정입니다. 향후 프리미엄 기능이 추가된다면 **유료로 결제하고 사용할 의향이 있으신가요?** 이유도 함께 알려주세요.',
      type: 'text',
    },
  ],
}

// ─────────────────────────────────────────────
// A2: 결혼 완료 부부
// ─────────────────────────────────────────────
const a2: Survey = {
  type: 'a2',
  title: '특별한 시간 — 결혼 완료 부부 의견 조사',
  groupTag: '결혼 완료 부부 의견 조사',
  target: '결혼 준비를 이미 완료하신 분 (1~5년 이내)',
  intro:
    '이 문서는 "특별한 시간" AI 웨딩 플래닝 앱의 **프로토타입 화면**을 보여드립니다. **결혼 준비를 이미 완료하신 분**의 시각에서, "이게 당시에 있었다면 어땠을까?"라는 **회고 관점**으로 봐주세요. 각 화면마다 2개의 질문이 있습니다. 메신저로 편하게 의견을 보내주시면 됩니다.',
  retroNote:
    '각 화면을 보면서 "이게 **준비 당시에 있었다면** 실제로 사용했을까?"를 생각해 주세요.',
  sections: [
    {
      id: 'intro',
      title: '시작 전 질문',
      description: '프로토타입을 보기 전에, 결혼 준비 경험을 돌아보는 질문입니다.',
      questions: [
        {
          id: 'intro_q1',
          text: '결혼 준비 전체를 돌아보면 **가장 후회되는 결정**은?',
          hint: '업체 선택, 예산 배분, 너무 빨리/늦게 결정한 것 등',
          type: 'text',
        },
        {
          id: 'intro_q2',
          text: '웨딩 플래너 비용 대비 **만족도**는? (1~10점)',
          hint: '비용 대비 가치, 투명성, 추천 품질 등',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen1',
      title: '화면 ① 온보딩 — 커플 생성 & 파트너 초대',
      flow: '결혼일 설정 → 초대코드로 파트너 연결 → 기본 예산 설정',
      questions: [
        {
          id: 's1_q1',
          text: '이런 앱이 **준비 당시에 있었다면** 쓸 것 같나요?',
          type: 'text',
        },
        {
          id: 's1_q2',
          text: '처음에 **뭘 설정해줬으면** 좋았을 것 같나요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen2',
      title: '화면 ② 메인 대시보드',
      flow: 'D-Day 카드 / 진행률 / 추천 할 일 / 예산 요약 / AI 채팅',
      questions: [
        {
          id: 's2_q1',
          text: '한눈에 파악하는 대시보드가 **준비 중에 필요했나요?**',
          type: 'text',
        },
        {
          id: 's2_q2',
          text: 'AI 플래너 채팅이 있었다면 **플래너한테 카톡 덜 했을까요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen3',
      title: '화면 ③ 웨딩홀 탐색',
      flow: '가격, 수용인원, 시설, 평점, AI 매칭 점수로 웨딩홀 비교',
      questions: [
        {
          id: 's3_q1',
          text: '실제 계약한 웨딩홀과 **처음 안내받은 가격의 차이**는 얼마나 됐나요?',
          type: 'text',
        },
        {
          id: 's3_q2',
          text: '이 가격 비교 데이터가 있었다면 **다른 곳을 선택했을까요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen4',
      title: '화면 ④ 스드메 탐색 (스튜디오/드레스/메이크업)',
      flow: '스타일/가격 필터 → 컨셉수, 피팅횟수, 동행여부 등 상세',
      questions: [
        {
          id: 's4_q1',
          text: '스드메 선택에서 **가장 정보가 부족했던 부분**은?',
          type: 'text',
        },
        {
          id: 's4_q2',
          text: '이 앱으로 직접 찾기 vs 플래너 추천, **어느 쪽이 만족스러웠을까요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen5',
      title: '화면 ⑤ 프리랜서 매칭 (스냅작가 등)',
      flow: '스타일 설문 → AI 매칭 점수 → 비교 → 문의',
      questions: [
        {
          id: 's5_q1',
          text: '스냅작가를 **어떻게 찾고 결정**했나요? 결과물에 만족했나요?',
          type: 'text',
        },
        {
          id: 's5_q2',
          text: 'AI 매칭이 있었다면 **더 잘 맞는 작가를 찾았을까요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen6',
      title: '화면 ⑥ 타임라인 & 캘린더',
      flow: '캘린더 뷰 → 태스크 → 자동 체크리스트 → 진행률',
      questions: [
        {
          id: 's6_q1',
          text: '일정을 **뭘로 관리했나요?** (카톡/노션/엑셀/플래너) 불편한 점은?',
          type: 'text',
        },
        {
          id: 's6_q2',
          text: '이 도구가 **플래너의 일정 관리를 대체**할 수 있었을까요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen7',
      title: '화면 ⑦ 예산 관리',
      flow: '예산 항목별 관리 → 시세 비교 → AI 추천 비율',
      questions: [
        {
          id: 's7_q1',
          text: '결혼 비용이 **처음 예산 대비 얼마나 초과**했나요?',
          type: 'text',
        },
        {
          id: 's7_q2',
          text: '시세 데이터를 미리 알았다면 **얼마나 절약 가능**했을 것 같나요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen8',
      title: '화면 ⑧ 견적 비교 & AI 분석',
      flow: '받은 견적 → 시세 대비 비교 → AI 판정 (적정/비쌈/저렴)',
      questions: [
        {
          id: 's8_q1',
          text: '"나중에 보니 비싸게 계약한" 항목이 **있나요?**',
          type: 'text',
        },
        {
          id: 's8_q2',
          text: '견적 비교 + AI 판정이 있었다면 **절약 가능 금액**은 대략?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen9',
      title: '화면 ⑨ AI 플래너 채팅',
      flow: '24시간 AI 채팅 → 업체 카드, 예산 차트 등 시각화 응답',
      questions: [
        {
          id: 's9_q1',
          text: '플래너에게 **질문하기 어려웠던 순간**이 있었나요? (시간/눈치)',
          type: 'text',
        },
        {
          id: 's9_q2',
          text: 'AI가 있었다면 **플래너 비용을 줄였을까요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen10',
      title: '화면 ⑩ 커뮤니티 & 위시리스트',
      flow: '커뮤니티 (후기/Q&A/포인트) + 위시리스트 (커플 합의 기능)',
      questions: [
        {
          id: 's10_q1',
          text: '파트너와 **가장 크게 충돌한 항목**은? 이 합의 기능이 도움 됐을까요?',
          type: 'text',
        },
        {
          id: 's10_q2',
          text: '네이버카페 대비 앱 내 커뮤니티의 **장점이 있으려면** 뭐가 필요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'summary',
      title: '종합 의견',
      description: '전체 화면을 보신 후, 결혼 경험을 돌아보며 의견을 보내주세요.',
      questions: [
        {
          id: 'summary_q1',
          text: '**"당시에 있었으면 무조건 썼을" 기능 TOP 3**은?',
          type: 'text',
        },
        {
          id: 'summary_q2',
          text: '**"있어도 안 썼을 것 같다"**고 느낀 기능은?',
          type: 'text',
        },
      ],
    },
    {
      id: 'cost_retro',
      title: '비용 회고',
      questions: [
        {
          id: 'cost_q1',
          text: '플래너 비용(150~300만원)을 **이 서비스 구독료로 전환할 의향**이 있나요?',
          type: 'text',
        },
        {
          id: 'cost_q2',
          text: '"사람이 반드시 해야 하는 것" vs **"도구로 충분한 것"**을 나눠본다면?',
          type: 'text',
        },
      ],
    },
  ],
  polls: [
    { id: 'poll_1', text: '"당시에 이 서비스가 있었으면 플래너 비용 절약 가능했다"' },
    { id: 'poll_2', text: '"플래너 없이 이것만으로도 가능했을 것 같다"' },
    { id: 'poll_3', text: '"지인에게 추천하겠다"' },
    { id: 'poll_4', text: '"월 3만원 이상 낼 의향이 있다"' },
  ],
  finalQuestions: [
    {
      id: 'final_q1',
      text: '이 서비스가 있었다면 **절약할 수 있었을 금액**은 대략 얼마?',
      type: 'text',
    },
    {
      id: 'final_q2',
      text: '결혼 준비를 돌아보며 **후배에게 해주고 싶은 한마디**?',
      type: 'text',
    },
  ],
}

// ─────────────────────────────────────────────
// B1: 웨딩 프리랜서
// ─────────────────────────────────────────────
const b1: Survey = {
  type: 'b1',
  title: '특별한 시간 — 웨딩 프리랜서 의견 조사',
  groupTag: '웨딩 프리랜서 의견 조사',
  target: '웨딩 관련 프리랜서',
  intro:
    '이 문서는 "특별한 시간" AI 웨딩 플래닝 앱의 **프리랜서 측 프로토타입 화면**을 보여드립니다. 각 화면마다 질문이 있으니, 솔직한 의견을 남겨주시면 감사하겠습니다.',
  respondentFields: [
    { id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요', required: true, note: '실제 이름 정보는 저장하지 않고, 개인 식별용으로 활용됩니다' },
    { id: 'gender', label: '성별', type: 'radio', options: ['남성', '여성'], required: true },
    { id: 'email', label: '이메일', type: 'text', placeholder: '이메일을 입력해주세요', required: false, note: '추후 서비스 오픈 시 입점 혜택을 전달드립니다' },
    { id: 'email_public', label: '이메일 공개 여부', type: 'radio', options: ['공개', '비공개'], required: false },
  ],
  sections: [
    {
      id: 'intro',
      title: '시작 전 질문',
      questions: [
        {
          id: 'intro_q1',
          text: '매칭 플랫폼(숨고, 크몽 등)을 **웨딩 분야에서 사용하면서 느끼신 가장 큰 단점**은 무엇인가요?',
          hint: '가격 경쟁, 웨딩 특화 부족, 고객 퀄리티, 수수료, 노쇼 등',
          type: 'text',
        },
        {
          id: 'intro_q2',
          text: '현재 가장 효과적인 **고객 확보 채널**은 무엇인가요? (인스타/블로그/플래너 소개/입소문)',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen1',
      title: '화면 ① 프로필 & 가격표',
      images: ['/images/freelencer/프리랜서_q1.png'],
      flow: '프리랜서 가입 → 분야/경력/스타일 → 포트폴리오 → 가격표 설정',
      questions: [
        {
          id: 's1_q1',
          text: '가격 공개와 견적제 중 **어느 쪽이 더 유리**하다고 생각하시나요?',
          type: 'text',
        },
        {
          id: 's1_q2',
          text: '숨고/크몽 프로필과 비교했을 때 **웨딩에 더 맞는다고 느끼시나요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen2',
      title: '화면 ② 문의 수신 & 응대',
      images: ['/images/freelencer/프리랜서_q2.png'],
      flow: '문의 알림 → 고객 정보 (스타일/무드보드) → 제안 작성 → 확정',
      questions: [
        {
          id: 's2_q1',
          text: '문의가 올 때 **미리 알고 싶은 고객 정보**는 무엇인가요?',
          type: 'text',
        },
        {
          id: 's2_q2',
          text: '"가격만 물어보고 사라지는" 고객을 **걸러낼 장치 (매칭의 단계적 수수료 부과)** 라면 어떻게 생각하시나요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen3',
      title: '화면 ③ 예약 & 수익 관리',
      images: ['/images/freelencer/프리랜서_q3.png'],
      flow: '예약 목록 → 결제 마일스톤 (계약금/중도금/잔금) → 수익 분석',
      questions: [
        {
          id: 's3_q1',
          text: '현재 결제를 어떻게 받고 계시나요? **정산에서 어려운 점**이 있으시다면 알려주세요.',
          type: 'text',
        },
        {
          id: 's3_q2',
          text: '수수료 방식 중 **건당 고정 / 매출 % / 월 구독** 어떤 방식을 선호하시나요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen4',
      title: '화면 ④ AI 매칭 시스템',
      flow: '커플이 스타일 설문 → AI 매칭 점수 → 프리랜서 노출/문의 연결',
      questions: [
        {
          id: 's4_q1',
          text: 'AI 매칭을 통해 문의가 온다면, **신뢰도에 대해 어떻게 생각하시나요?**',
          type: 'text',
        },
        {
          id: 's4_q2',
          text: '숨고의 "견적 먼저" 방식과 AI "알아서 매칭" 방식 중 **어느 쪽이 더 낫다고 생각하시나요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen5',
      title: '화면 ⑤ 크루 구성',
      images: ['/images/freelencer/프리랜서_q5.png'],
      flow: '크루 생성 → 멤버 추가 (스냅+영상+메이크업) → 패키지 가격 설정',
      questions: [
        {
          id: 's5_q1',
          text: '실제로 크루 단위로 활동하고 계시나요? **어떤 구성**으로 활동하시는지 알려주세요.',
          type: 'text',
        },
        {
          id: 's5_q2',
          text: '커플에게 "크루 패키지"가 **개별 계약보다 더 매력적**이라고 생각하시나요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen6',
      title: '화면 ⑥ 리뷰 관리',
      images: ['/images/freelencer/프리랜서_q6.png'],
      flow: '받은 리뷰 → 평점/키워드 → 답변 → "검증된 리뷰" (실계약 확인)',
      questions: [
        {
          id: 's6_q1',
          text: '악성 리뷰에 대한 우려가 있으시나요? **어떤 보호 장치**가 필요하다고 생각하시나요?',
          type: 'text',
        },
        {
          id: 's6_q2',
          text: '"검증된 리뷰"(실계약 확인)만 표시된다면 **더 신뢰할 수 있을까요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'summary',
      title: '종합 의견',
      questions: [
        {
          id: 'summary_q1',
          text: '**"당장 쓰고 싶다"고 느끼시는 기능 TOP 3**은 무엇인가요?',
          type: 'text',
        },
        {
          id: 'summary_q2',
          text: '기존 플랫폼과 **차별화되려면 반드시 있어야 할 것** 1가지는 무엇이라고 생각하시나요?',
          type: 'text',
        },
      ],
    },
  ],
  polls: [
    { id: 'poll_1', text: '"프로필 등록하겠다"' },
    { id: 'poll_2', text: '기존 플랫폼과 동시에 사용할 의향이 있다' },
    { id: 'poll_3', text: '구독으로 수수료 혹은 매칭/광고 혜택이 있다면 사용할 의향이 있다' },
    { id: 'poll_4', text: '수수료 7~10% 사이면 괜찮을 것 같다' },
  ],
  finalQuestions: [
    {
      id: 'final_q1',
      text: '이 서비스가 성공하려면 **반드시 해결해야 할 1가지**는 무엇이라고 생각하시나요?',
      type: 'text',
    },
  ],
}

// ─────────────────────────────────────────────
// B2: 웨딩 플래너
// ─────────────────────────────────────────────
const b2: Survey = {
  type: 'b2',
  title: '특별한 시간 — 웨딩 플래너 의견 조사',
  groupTag: '웨딩 플래너 의견 조사',
  target: '웨딩 플래너 & 업체',
  intro:
    '이 문서는 "특별한 시간" AI 웨딩 플래닝 앱의 **플래너 측 프로토타입 화면**을 보여드립니다. 각 화면마다 2개의 질문이 있습니다. 메신저로 편하게 의견을 보내주시면 됩니다.',
  sections: [
    {
      id: 'intro',
      title: '시작 전 질문',
      questions: [
        {
          id: 'intro_q1',
          text: '커플 관리에 **가장 시간이 드는 부분**은?',
          hint: '일정 조율, 업체 수배, 카톡 응대, 견적 정리 등',
          type: 'text',
        },
        {
          id: 'intro_q2',
          text: 'AI가 플래닝을 도와준다면, **위협인가요? 기회인가요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen1',
      title: '화면 ① 고객 관리',
      flow: '고객 리스트 → 상태 필터 (상담중/예식장확정/스드메/최종확인) → 상세',
      questions: [
        {
          id: 's1_q1',
          text: '현재 고객 관리 방법은? **가장 불편한 점?**',
          type: 'text',
        },
        {
          id: 's1_q2',
          text: '커플에게 포탈 제공 → **오히려 간섭이 늘어날 우려**는?',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen2',
      title: '화면 ② 업체 수배 & 견적',
      flow: 'AI 업체 추천 → 선별 → 견적서 작성 → 커플에게 발송',
      questions: [
        {
          id: 's2_q1',
          text: 'AI "87% 적합" 추천을 **그대로 전달? 직접 걸러서 전달?**',
          type: 'text',
        },
        {
          id: 's2_q2',
          text: '견적서 발송이 카톡+엑셀 대비 **어떤가요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'screen3',
      title: '화면 ③ Combined 대시보드 (커플-플래너 공유)',
      flow: '커플+플래너 공유 화면 → 메시지/타임라인/예산/업체/문서',
      questions: [
        {
          id: 's3_q1',
          text: '커플에게 **숨기고 싶은 정보**는? (커미션, 원가, 메모)',
          type: 'text',
        },
        {
          id: 's3_q2',
          text: '이 플랫폼이 **"도움 도구"인가요, "경쟁자"**인가요?',
          type: 'text',
        },
      ],
    },
    {
      id: 'planner_summary',
      title: '플래너 종합 의견',
      questions: [
        {
          id: 'ps_q1',
          text: '가장 큰 가치: **"고객 관리" vs "업체 연결" vs "분석"**?',
          type: 'text',
        },
        {
          id: 'ps_q2',
          text: '기존 도구(엑셀/노션/카톡) 대비 **결정적 장점** 1가지?',
          type: 'text',
        },
      ],
    },
    {
      id: 'junction1',
      title: '접합 — 시나리오 ① 플래너 매칭 요청 → 수락',
      description: '아래는 커플과 플래너가 함께 사용하는 화면입니다. 플래너 관점에서 봐주세요.',
      flow: '커플 요청 폼 제출 → 플래너 요청 확인 → 고객 등록',
      questions: [
        {
          id: 'j1_q1',
          text: '요청서 정보만으로 **고객 받을지 판단 가능?** 더 필요한 정보는?',
          type: 'text',
        },
        {
          id: 'j1_q2',
          text: '이 채널 고객이 인스타 DM 고객과 **뭐가 다를까요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'junction2',
      title: '접합 — 시나리오 ② 업체 추천 → 견적 → 확정',
      flow: '플래너 AI 추천 → 견적서 발송 → 커플 시세 비교 → AI 판정 → 결정',
      questions: [
        {
          id: 'j2_q1',
          text: '커플이 시세 확인 후 "비싸다"고 하면 **부담되나요?**',
          type: 'text',
        },
        {
          id: 'j2_q2',
          text: '가격 투명화가 **플래너에게도 좋은가요?**',
          type: 'text',
        },
      ],
    },
    {
      id: 'junction3',
      title: '접합 — 시나리오 ③ 직접 매칭 vs 플래너 경유',
      flow: '경로 A 커플 직접: AI 매칭 → 직접 문의 / 경로 B 플래너 경유: 추천 → Combined 공유 → 확정',
      questions: [
        {
          id: 'j3_q1',
          text: '커플이 직접 AI로 찾는 것 → **위협? 보완?**',
          type: 'text',
        },
        {
          id: 'j3_q2',
          text: '"특별한 시간" 포지션: **매칭만? 소통도구? 올인원?**',
          type: 'text',
        },
      ],
    },
  ],
  polls: [
    { id: 'poll_1', text: '"이 도구를 고객 관리에 쓰겠다"' },
    { id: 'poll_2', text: '"커플이 여기로 들어오면 환영"' },
    { id: 'poll_3', text: '"월 5만원 구독 가능"' },
  ],
  finalQuestions: [
    {
      id: 'final_q1',
      text: '이 서비스가 성공하려면 **반드시 해결해야 할 1가지**는 무엇이라고 생각하시나요?',
      type: 'text',
    },
    {
      id: 'final_q2',
      text: '**월 구독 의향**',
      type: 'select',
      options: ['무료', '3만', '5만', '10만', '매출연동'],
    },
  ],
}

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────
export const surveys: Record<SurveyType, Survey> = { a1, a2, b1, b2 }

export const surveyCards: {
  type: SurveyType
  title: string
  subtitle: string
  icon: string
  description: string
  disabled?: boolean
}[] = [
  {
    type: 'a1',
    title: '예비부부',
    subtitle: '결혼 준비 중',
    icon: 'A1',
    description: '웨딩 플래너 경험이 있는 예비부부',
  },
  {
    type: 'a2',
    title: '결혼 완료 부부',
    subtitle: '1~5년 이내',
    icon: 'A2',
    description: '결혼 준비를 마친 부부의 회고 관점',
    disabled: true,
  },
  {
    type: 'b1',
    title: '웨딩 프리랜서',
    subtitle: '웨딩 관련 프리랜서',
    icon: 'B1',
    description: '웨딩 프리랜서의 플랫폼 사용 의향',
  },
  {
    type: 'b2',
    title: '웨딩 플래너',
    subtitle: '플래너 & 업체',
    icon: 'B2',
    description: '웨딩 플래너의 도구 활용 의견',
    disabled: true,
  },
]
