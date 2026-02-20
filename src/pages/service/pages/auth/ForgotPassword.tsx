import { useState } from 'react';
import { useForm } from 'react-hook-form';

type RequestCodeValues = { email: string };
type ResetValues = { code: string; newPassword: string };

export function ForgotPassword() {
	const [step, setStep] = useState<'request' | 'verify'>('request');
	const requestForm = useForm<RequestCodeValues>({ defaultValues: { email: '' } });
	const resetForm = useForm<ResetValues>({ defaultValues: { code: '', newPassword: '' } });

	const onRequest = (values: RequestCodeValues) => {
		// Placeholder: call API to send code to email
		// eslint-disable-next-line no-console
		console.log('AUTH-004 request code', values);
		setStep('verify');
	};

	const onReset = (values: ResetValues) => {
		// Placeholder: call API to verify code + set new password
		// eslint-disable-next-line no-console
		console.log('AUTH-004 verify & reset', values);
	};

	return (
		<section className="auth-section max-w-sm mx-auto">
			<h2>비번 찾기 (AUTH-004)</h2>
			{step === 'request' && (
				<form className="auth-form" onSubmit={requestForm.handleSubmit(onRequest)}>
					<label>
						이메일
						<input type="email" placeholder="you@example.com" className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2" {...requestForm.register('email', { required: '이메일을 입력하세요.' })} />
						{requestForm.formState.errors.email && <span className="error-text">{requestForm.formState.errors.email.message}</span>}
					</label>
					<button type="submit" disabled={requestForm.formState.isSubmitting}>
						인증코드 전송
					</button>
				</form>
			)}

			{step === 'verify' && (
				<form className="auth-form" onSubmit={resetForm.handleSubmit(onReset)}>
					<label>
						인증코드
						<input type="text" placeholder="123456" className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2" {...resetForm.register('code', { required: '인증코드를 입력하세요.' })} />
						{resetForm.formState.errors.code && <span className="error-text">{resetForm.formState.errors.code.message}</span>}
					</label>
					<label>
						신규 비밀번호
						<input
							type="password"
							placeholder="최소 8자"
							className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
							{...resetForm.register('newPassword', { required: '신규 비밀번호를 입력하세요.', minLength: { value: 8, message: '8자 이상 입력하세요.' } })}
						/>
						{resetForm.formState.errors.newPassword && <span className="error-text">{resetForm.formState.errors.newPassword.message}</span>}
					</label>
					<div className="row">
						<button type="button" onClick={() => setStep('request')}>
							뒤로
						</button>
						<button type="submit" disabled={resetForm.formState.isSubmitting}>
							비번 재설정
						</button>
					</div>
				</form>
			)}
		</section>
	);
}

