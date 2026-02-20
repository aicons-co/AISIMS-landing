import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ko' | 'en';

type LanguageContextType = {
	language: Language;
	toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>(() => {
		const saved = localStorage.getItem('language') as Language | null;
		return saved || 'ko';
	});

	useEffect(() => {
		localStorage.setItem('language', language);
	}, [language]);

	const toggleLanguage = () => {
		setLanguage((prev) => (prev === 'ko' ? 'en' : 'ko'));
	};

	return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within LanguageProvider');
	}
	return context;
}

