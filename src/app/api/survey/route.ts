import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VALID_SURVEY_TYPES = ['a1', 'a2', 'b1', 'b2'] as const

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { surveyType, respondentName, respondentContact, answers } = body

    // Validate surveyType
    if (!surveyType || !VALID_SURVEY_TYPES.includes(surveyType)) {
      return NextResponse.json(
        { error: '유효하지 않은 설문 유형입니다.' },
        { status: 400 }
      )
    }

    // Validate respondentName
    if (!respondentName || typeof respondentName !== 'string' || respondentName.trim() === '') {
      return NextResponse.json(
        { error: '응답자 이름은 필수입니다.' },
        { status: 400 }
      )
    }

    // Validate answers
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      return NextResponse.json(
        { error: '응답 데이터가 올바르지 않습니다.' },
        { status: 400 }
      )
    }

    // Check Supabase configuration
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' },
        { status: 500 }
      )
    }

    const { data, error } = await supabase
      .from('survey_responses')
      .insert({
        survey_type: surveyType,
        respondent_name: respondentName.trim(),
        respondent_contact: respondentContact || null,
        answers,
      })
      .select('id')

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: '저장에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data[0].id })
  } catch (err) {
    console.error('POST /api/survey error:', err)
    return NextResponse.json(
      { error: '저장에 실패했습니다.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Authentication
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json(
        { error: '인증에 실패했습니다.' },
        { status: 401 }
      )
    }

    const passwordFromParams = searchParams.get('password')
    const authHeader = request.headers.get('Authorization')
    const passwordFromHeader = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null

    const providedPassword = passwordFromParams || passwordFromHeader

    if (!providedPassword || providedPassword !== adminPassword) {
      return NextResponse.json(
        { error: '인증에 실패했습니다.' },
        { status: 401 }
      )
    }

    // Check Supabase configuration
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' },
        { status: 500 }
      )
    }

    // Build query
    let query = supabase
      .from('survey_responses')
      .select('*')
      .order('created_at', { ascending: false })

    const type = searchParams.get('type')
    if (type) {
      query = query.eq('survey_type', type)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json(
        { error: '데이터 조회에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ responses: data })
  } catch (err) {
    console.error('GET /api/survey error:', err)
    return NextResponse.json(
      { error: '데이터 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
}
