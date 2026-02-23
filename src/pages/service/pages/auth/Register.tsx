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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      agree: false,
    },
  })

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
          <h3 className="text-center mb-15 text-2xl font-bold">Resister</h3>
          <img
            src={ResterStep1Img}
            alt="회원가입 1단계"
            className="h-auto w-[500px] mb-10"
          />
          {/* <form className="auth-form" onSubmit={handleSubmit(onSubmit)}> */}
          <form
            className="flex flex-col mb-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="flex flex-col mb-[15px]">
              이메일
              <input
                type="email"
                placeholder="you@example.com"
                className="
								!bg-white
								!text-neutral-900
								placeholder:text-neutral-500 dark:placeholder:text-neutral-400
								border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                {...register('email', { required: '이메일을 입력하세요.' })}
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </label>
            <label className="flex flex-col">
              비밀번호
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="
								!bg-white
								!text-neutral-900
								placeholder:text-neutral-500 dark:placeholder:text-neutral-400
								border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                  minLength: { value: 8, message: '8자 이상 입력하세요.' },
                })}
              />
              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </label>
            {/* <label>
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
            </label> */}
            {/* <label>
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
            </label> */}
            {/* <label>
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
            </label> */}
            {/* {errors.agree && (
              <span className="error-text">{errors.agree.message}</span>
            )} */}
          </form>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 bg-neutral-400 text-white rounded-md hover:cursor-pointer"
          >
            다음
          </button>
        </div>
      </div>
    </section>
  )
}
