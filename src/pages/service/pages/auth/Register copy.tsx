// @ts-nocheck
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ResterStep1Img from '../../../../../public/assets/auth/resister-img-step1.png'

type RegisterFormValues = {
  email: string
  password: string
  name: string
  phone: string
  agree: boolean
  profilePhoto?: File
}

export function Register() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      agree: false,
    },
  })

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 이미지 파일만 허용
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.')
        return
      }
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.')
        return
      }
      setValue('profilePhoto', file)
      // 미리보기 URL 생성
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation() // 파일 선택 트리거 방지
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setValue('profilePhoto', undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = (values: RegisterFormValues) => {
    // Placeholder: call API here
    // eslint-disable-next-line no-console
    console.log('AUTH-002 register submit', values)
  }

  return (
    // <section className="auth-section max-w-sm mx-auto">
    <section className="flex justify-center min-h-screen max-w-[1920px] mx-auto pt-25">
      {/* shadow-[3_10_20_#1BC1D726] x축_y축_블러_색상 */}
      <div
        className="
				flex flex-col items-center pt-20
				w-[800px] h-[840px]
				bg-neutral-100 rounded-[20px]
				shadow-[0_10px_30px_0px_rgba(0,0,0,0.05)]"
      >
        <div className="flex flex-col w-[500px]">
          <h3 className="mb-15 text-2xl font-bold">Resister</h3>
          <img
            src={ResterStep1Img}
            alt="회원가입 1단계"
            className="h-auto w-[500px] mb-10"
          />
          {/* <form className="auth-form" onSubmit={handleSubmit(onSubmit)}> */}
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            {/* 프로필 사진 - 가운데 정렬 */}
            {/* <div className="flex justify-center mb-4">
          <div className="relative">
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="프로필 미리보기"
                  onClick={handlePhotoClick}
                  className="w-48 h-48 object-cover rounded-full border-2 border-neutral-300 dark:border-neutral-600 cursor-pointer hover:opacity-80 transition-opacity"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 z-10"
                  title="사진 제거"
                >
                  ×
                </button>
              </div>
            ) : (
              <div
                onClick={handlePhotoClick}
                className="w-48 h-48 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
                title="클릭하여 프로필 사진 선택"
              >
                <span className="text-neutral-400 text-sm text-center px-2">
                  프로필
                  <br />
                  사진
                </span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 text-center block mb-2">
          이미지 파일만 가능 (최대 5MB)
        </span> */}
            <label>
              이메일
              <input
                type="email"
                placeholder="you@example.com"
                className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                {...register('email', { required: '이메일을 입력하세요.' })}
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </label>
            <label>
              비밀번호
              <input
                type="password"
                placeholder="최소 8자"
                className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                  minLength: { value: 8, message: '8자 이상 입력하세요.' },
                })}
              />
              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </label>
            <label>
              이름
              <input
                type="text"
                placeholder="홍길동"
                className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                {...register('name', { required: '이름을 입력하세요.' })}
              />
              {errors.name && (
                <span className="error-text">{errors.name.message}</span>
              )}
            </label>
            <label>
              부서
              <input
                type="text"
                placeholder="부서명"
                className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                {...register('name', { required: '부서명을 입력하세요.' })}
              />
              {errors.name && (
                <span className="error-text">{errors.name.message}</span>
              )}
            </label>
            <label>
              연락처
              <input
                type="tel"
                placeholder="010-1234-5678"
                className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                {...register('phone', { required: '연락처를 입력하세요.' })}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone.message}</span>
              )}
            </label>
            {/* <label className="checkbox">
              <input
                type="checkbox"
                {...register('agree', {
                  required: '개인정보 및 약관에 동의하세요.',
                })}
              />{' '}
              <span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowTermsModal(true)
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  이용약관
                </button>
                과{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPrivacyModal(true)
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  개인정보 처리방침
                </button>
                에 동의합니다.
              </span>
            </label> */}
            {errors.agree && (
              <span className="error-text">{errors.agree.message}</span>
            )}

            <button type="submit" disabled={isSubmitting}>
              회원가입
            </button>
          </form>

          {/* 이용약관 모달 */}
          {showTermsModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowTermsModal(false)}
            >
              <div
                className="bg-white dark:bg-neutral-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-xl font-bold">이용약관</h3>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="space-y-4 text-sm leading-relaxed">
                    <section>
                      <h4 className="font-semibold mb-2">제1조 (목적)</h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        본 약관은 AISIMS-MVP(이하 "회사")가 제공하는 서비스의
                        이용과 관련하여 회사와 이용자 간의 권리, 의무 및
                        책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">제2조 (정의)</h4>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>
                          "서비스"란 회사가 제공하는 건축 정보 모델링 및
                          시뮬레이션 관련 모든 서비스를 의미합니다.
                        </li>
                        <li>
                          "이용자"란 본 약관에 동의하고 회사가 제공하는 서비스를
                          이용하는 회원 및 비회원을 의미합니다.
                        </li>
                        <li>
                          "회원"이란 회사에 개인정보를 제공하여 회원등록을 한
                          자로서, 회사의 정보를 지속적으로 제공받으며, 회사가
                          제공하는 서비스를 계속적으로 이용할 수 있는 자를
                          의미합니다.
                        </li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제3조 (약관의 게시와 개정)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록
                        서비스 초기 화면에 게시합니다. 회사는 필요한 경우 관련
                        법령을 위배하지 않는 범위에서 본 약관을 개정할 수
                        있으며, 개정된 약관은 적용일자 및 개정사유를 명시하여
                        현행약관과 함께 서비스 초기 화면에 그 적용일자 7일
                        이전부터 적용일자 전일까지 공지합니다.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">제4조 (회원가입)</h4>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>
                          이용자는 회사가 정한 가입 양식에 따라 회원정보를
                          기입한 후 본 약관에 동의한다는 의사표시를 함으로서
                          회원가입을 신청합니다.
                        </li>
                        <li>
                          회사는 제1항과 같이 회원가입을 신청한 이용자 중 다음
                          각 호에 해당하지 않는 한 회원으로 등록합니다.
                        </li>
                        <li>
                          회원가입 신청자가 이전에 회원자격을 상실한 적이 있는
                          경우
                        </li>
                        <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                        <li>
                          기타 회원으로 등록하는 것이 회사의 기술상 현저히
                          지장이 있다고 판단되는 경우
                        </li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제5조 (서비스의 제공 및 변경)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 다음과 같은 서비스를 제공합니다: BIM 뷰어, 클래시
                        검출, 최적화 분석, 프로젝트 관리, 데이터 관리 등 건축
                        정보 모델링 관련 서비스. 회사는 필요한 경우 서비스의
                        내용을 변경할 수 있으며, 이 경우 변경된 서비스의 내용 및
                        제공일자를 명시하여 현재의 서비스의 내용을 게시한 곳에
                        즉시 공지합니다.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제6조 (서비스의 중단)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장,
                        통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을
                        일시적으로 중단할 수 있습니다. 이 경우 회사는 제9조에
                        정한 방법으로 이용자에게 통지합니다.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제7조 (회원의 의무)
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>회원은 다음 행위를 하여서는 안 됩니다.</li>
                        <li>신청 또는 변경 시 허위내용의 등록</li>
                        <li>타인의 정보 도용</li>
                        <li>회사가 게시한 정보의 변경</li>
                        <li>
                          회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의
                          송신 또는 게시
                        </li>
                        <li>
                          회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해
                        </li>
                        <li>
                          회사 및 기타 제3자의 명예를 손상시키거나 업무를
                          방해하는 행위
                        </li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제8조 (개인정보보호)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 이용자의 개인정보 수집시 서비스제공을 위하여
                        필요한 범위에서 최소한의 개인정보를 수집합니다. 회사는
                        회원가입시 구매계약이행에 필요한 정보를 미리 수집하지
                        않습니다. 회사의 개인정보보호에 관한 자세한 내용은
                        개인정보 처리방침을 참고하시기 바랍니다.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">제9조 (면책조항)</h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 천재지변 또는 이에 준하는 불가항력으로 인하여
                        서비스를 제공할 수 없는 경우에는 서비스 제공에 관한
                        책임이 면제됩니다. 회사는 회원의 귀책사유로 인한 서비스
                        이용의 장애에 대하여는 책임을 지지 않습니다.
                      </p>
                    </section>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                      시행일자: 2024년 1월 1일
                    </p>
                  </div>
                </div>
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 개인정보 처리방침 모달 */}
          {showPrivacyModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowPrivacyModal(false)}
            >
              <div
                className="bg-white dark:bg-neutral-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-xl font-bold">개인정보 처리방침</h3>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="space-y-4 text-sm leading-relaxed">
                    <section>
                      <h4 className="font-semibold mb-2">
                        제1조 (개인정보의 처리 목적)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                        회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                        이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보
                        보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를
                        이행할 예정입니다.
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>
                          회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스
                          제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스
                          부정이용 방지, 각종 고지·통지 목적
                        </li>
                        <li>
                          서비스 제공: BIM 뷰어, 클래시 검출, 최적화 분석,
                          프로젝트 관리 등 서비스 제공
                        </li>
                        <li>
                          마케팅 및 광고 활용: 신규 서비스 개발 및 맞춤 서비스
                          제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공
                        </li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제2조 (개인정보의 처리 및 보유기간)
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>
                          회사는 법령에 따른 개인정보 보유·이용기간 또는
                          정보주체로부터 개인정보를 수집시에 동의받은 개인정보
                          보유·이용기간 내에서 개인정보를 처리·보유합니다.
                        </li>
                        <li>
                          각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                        </li>
                        <li>
                          회원 가입 및 관리: 회원 탈퇴시까지 (단, 관계 법령
                          위반에 따른 수사·조사 등이 진행중인 경우에는 해당
                          수사·조사 종료시까지)
                        </li>
                        <li>
                          전자상거래에서의 계약·청약철회 등에 관한 기록: 5년
                        </li>
                        <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                        <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제3조 (처리하는 개인정보의 항목)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                        회사는 다음의 개인정보 항목을 처리하고 있습니다:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>
                          회원 가입 시: 이메일, 비밀번호, 이름, 연락처, 프로필
                          사진
                        </li>
                        <li>
                          서비스 이용 과정에서 자동 수집: IP주소, 쿠키, MAC주소,
                          서비스 이용 기록, 방문 기록, 불량 이용 기록 등
                        </li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제4조 (개인정보의 제3자 제공)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 정보주체의 개인정보를 제1조(개인정보의 처리
                        목적)에서 명시한 범위 내에서만 처리하며, 정보주체의
                        동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및
                        제18조에 해당하는 경우에만 개인정보를 제3자에게
                        제공합니다.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제5조 (개인정보처리의 위탁)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 원활한 개인정보 업무처리를 위하여 다음과 같이
                        개인정보 처리업무를 위탁하고 있습니다. 회사는 위탁계약
                        체결시 개인정보 보호법 제26조에 따라 위탁업무 수행목적
                        외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁
                        제한, 수탁자에 대한 관리·감독, 손해배상 등에 관한 사항을
                        계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
                        처리하는지를 감독하고 있습니다.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제6조 (정보주체의 권리·의무 및 그 행사방법)
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>
                          정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보
                          보호 관련 권리를 행사할 수 있습니다.
                        </li>
                        <li>개인정보 처리정지 요구권</li>
                        <li>개인정보 열람요구권</li>
                        <li>개인정보 정정·삭제요구권</li>
                        <li>개인정보 처리정지 요구권</li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제7조 (개인정보의 파기)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                        회사는 개인정보 보유기간의 경과, 처리목적 달성 등
                        개인정보가 불필요하게 되었을 때에는 지체없이 해당
                        개인정보를 파기합니다.
                      </p>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        파기의 절차 및 방법은 다음과 같습니다:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                        <li>
                          파기절차: 회사는 파기 사유가 발생한 개인정보를
                          선정하고, 회사의 개인정보 보호책임자의 승인을 받아
                          개인정보를 파기합니다.
                        </li>
                        <li>
                          파기방법: 회사는 전자적 파일 형태로 기록·저장된
                          개인정보는 기록을 재생할 수 없도록 파기하며, 종이
                          문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나
                          소각하여 파기합니다.
                        </li>
                      </ol>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제8조 (개인정보 보호책임자)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                        개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제
                        등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
                        있습니다.
                      </p>
                      <div className="mt-2 p-3 bg-neutral-100 dark:bg-neutral-700 rounded text-neutral-700 dark:text-neutral-300">
                        <p>개인정보 보호책임자</p>
                        <p>이메일: privacy@aisims.com</p>
                        <p>전화: 02-1234-5678</p>
                      </div>
                    </section>
                    <section>
                      <h4 className="font-semibold mb-2">
                        제9조 (개인정보의 안전성 확보조치)
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를
                        취하고 있습니다: 관리적 조치(내부관리계획 수립·시행,
                        정기적 직원 교육 등), 기술적 조치(개인정보처리시스템
                        등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보
                        등의 암호화, 보안프로그램 설치), 물리적 조치(전산실,
                        자료보관실 등의 접근통제)
                      </p>
                    </section>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                      시행일자: 2024년 1월 1일
                    </p>
                  </div>
                </div>
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
