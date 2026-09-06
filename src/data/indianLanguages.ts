import { LanguageCode } from "../types";

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
];

export const UI_TRANSLATIONS: Record<
  LanguageCode,
  {
    tagline: string;
    subTagline: string;
    tabPrescription: string;
    tabLabReport: string;
    tabSymptom: string;
    tabJanAushadhi: string;
    tabAbha: string;
    scanPrescription: string;
    uploadOrDrop: string;
    orTrySamples: string;
    analyzingMedical: string;
    genericSavingsTitle: string;
    doctorQuestionsTitle: string;
    indianDietAdviceTitle: string;
    disclaimerNotice: string;
    emergencyCallButton: string;
    listenAloud: string;
    stopAudio: string;
    abhaVerified: string;
  }
> = {
  en: {
    tagline: "India's Clinical Vision & Prescription AI",
    subTagline: "Decipher handwritten doctor prescriptions, decode Indian lab tests, and save up to 85% via PMBJP Jan Aushadhi generic medicines.",
    tabPrescription: "Rx & Strip Scanner",
    tabLabReport: "Lab Report AI",
    tabSymptom: "Symptom Triage",
    tabJanAushadhi: "Jan Aushadhi Kendra",
    tabAbha: "ABHA Health Locker",
    scanPrescription: "Scan Prescription / Medicine Strip",
    uploadOrDrop: "Click or drag medical prescription, blister pack, or report image",
    orTrySamples: "Quick Demo: Try authentic Indian clinic samples",
    analyzingMedical: "MedLens AI is extracting clinical salts, dosage schedule & Indian lab ranges...",
    genericSavingsTitle: "PMBJP Jan Aushadhi Generic Alternative & Savings",
    doctorQuestionsTitle: "Questions to Ask Your Doctor at Next OPD Visit",
    indianDietAdviceTitle: "Recommended Indian Nutritional Guidelines",
    disclaimerNotice: "MedLens AI is an assistive decision tool aligned with Indian Telemedicine Practice Guidelines. Please verify with a licensed MBBS/MD doctor.",
    emergencyCallButton: "India Emergency (108 / 112)",
    listenAloud: "Read in Audio",
    stopAudio: "Stop Audio",
    abhaVerified: "ABHA / ABDM Compliant Format",
  },
  hi: {
    tagline: "भारत का स्मार्ट प्रिस्क्रिप्शन और मेडिकल AI",
    subTagline: "डॉक्टर के पर्चे और दवा के पत्तों को समझें, भारतीय लैब रिपोर्ट की जांच करें और जन औषधि से 85% तक बचत करें।",
    tabPrescription: "पर्चा एवं दवा स्कैनर",
    tabLabReport: "लैब रिपोर्ट AI",
    tabSymptom: "लक्षण जांच",
    tabJanAushadhi: "जन औषधि केंद्र",
    tabAbha: "आभा हेल्थ लॉकर",
    scanPrescription: "पर्चा या दवा का पत्ता स्कैन करें",
    uploadOrDrop: "डॉक्टर का पर्चा, दवा का पत्ता या रिपोर्ट की फोटो चुनें",
    orTrySamples: "त्वरित डेमो: वास्तविक भारतीय अस्पताल के पर्चे देखें",
    analyzingMedical: "MedLens AI पर्चे से दवा का नाम, साल्ट और खुराक निकाल रहा है...",
    genericSavingsTitle: "प्रधानमंत्री जन औषधि योजना: जेनेरिक दवा और बचत",
    doctorQuestionsTitle: "अगली ओपीडी में डॉक्टर से पूछे जाने वाले सवाल",
    indianDietAdviceTitle: "भारतीय आहार एवं स्वास्थ्य सुझाव",
    disclaimerNotice: "MedLens AI केवल सहायता हेतु है। किसी भी दवा को बदलने से पहले योग्य डॉक्टर से परामर्श अवश्य लें।",
    emergencyCallButton: "आपातकालीन नंबर (108 / 112)",
    listenAloud: "आवाज़ में सुनें",
    stopAudio: "आवाज़ रोकें",
    abhaVerified: "आभा / आयुष्मान भारत डिजिटल मिशन समर्थित",
  },
  bn: {
    tagline: "ভারতের স্মার্ট প্রেসক্রিপশন ও মেডিকেল AI",
    subTagline: "ডাক্তারের হাতের লেখা প্রেসক্রিপশন ও ওষুধের পাতা বুঝুন, ল্যাব রিপোর্ট বিশ্লেষণ করুন এবং জন ঔষধি থেকে ৮৫% পর্যন্ত অর্থ সাশ্রয় করুন।",
    tabPrescription: "প্রেসক্রিপশন স্ক্যানার",
    tabLabReport: "ল্যাব রিপোর্ট AI",
    tabSymptom: "লক্ষণ নির্ণয়",
    tabJanAushadhi: "জন ঔষধি কেন্দ্র",
    tabAbha: "আভা হেলথ লকার",
    scanPrescription: "প্রেসক্রিপশন বা ওষুধ স্ক্যান করুন",
    uploadOrDrop: "প্রেসক্রিপশন বা ল্যাব রিপোর্টের ছবি আপলোড করুন",
    orTrySamples: "নমুনা প্রেসক্রিপশন দিয়ে দেখুন",
    analyzingMedical: "MedLens AI প্রেসক্রিপশন বিশ্লেষণ করছে...",
    genericSavingsTitle: "প্রধানমন্ত্রী জন ঔষধি জেনেরিক বিকল্প ও সাশ্রয়",
    doctorQuestionsTitle: "পরবর্তী ওপিডিতে ডাক্তারকে জিজ্ঞেস করার প্রশ্নসমূহ",
    indianDietAdviceTitle: "স্বাস্থ্যকর ভারতীয় খাদ্যাভ্যাস পরামর্শ",
    disclaimerNotice: "MedLens AI একটি সহায়ক টুল। ওষুধ পরিবর্তনের আগে নিবন্ধিত চিকিৎসকের পরামর্শ নিন।",
    emergencyCallButton: "জরুরি সেবা (১০৮ / ১১২)",
    listenAloud: "অডিওতে শুনুন",
    stopAudio: "অডিও বন্ধ করুন",
    abhaVerified: "আভা / ABDM সমর্থিত",
  },
  ta: {
    tagline: "இந்தியாவின் ஸ்மார்ட் மருத்துவ அறிக்கை மற்றும் மருந்து AI",
    subTagline: "மருத்துவர் பரிந்துரை சீட்டு மற்றும் மருந்து அட்டைகளை படியுங்கள், ஆய்வுக்கூட அறிக்கைகளை ஆராய்ந்து ஜன் ஔஷதி மூலம் 85% வரை சேமிக்கவும்.",
    tabPrescription: "மருந்து சீட்டு ஸ்கேனர்",
    tabLabReport: "ஆய்வக அறிக்கை AI",
    tabSymptom: "அறிகுறி பகுப்பாய்வு",
    tabJanAushadhi: "ஜன் ஔஷதி மையம்",
    tabAbha: "ஆபா ஹெல்த் லாக்கர்",
    scanPrescription: "மருந்து சீட்டை ஸ்கேன் செய்க",
    uploadOrDrop: "மருந்து சீட்டு அல்லது ஆய்வக படத்தைப் பதிவேற்றவும்",
    orTrySamples: "மாதிரி அறிக்கைகள் கொண்டு முயற்சிக்கவும்",
    analyzingMedical: "MedLens AI மருந்து மற்றும் அளவுகளை ஆராய்கிறது...",
    genericSavingsTitle: "பிரதான் மந்திரி ஜன் ஔஷதி ஜெனரிக் மாற்று & சேமிப்பு",
    doctorQuestionsTitle: "மருத்துவரிடம் கேட்க வேண்டிய முக்கிய கேள்விகள்",
    indianDietAdviceTitle: "பரிந்துரைக்கப்பட்ட இந்திய உணவு முறைகள்",
    disclaimerNotice: "MedLens AI ஒரு கல்வி வழிகாட்டி. மருத்துவ ஆலோசனையைப் பெறவும்.",
    emergencyCallButton: "அவசர உதவி (108 / 112)",
    listenAloud: "ஆடியோவில் கேட்க",
    stopAudio: "நிறுத்துக",
    abhaVerified: "ஆபா / ABDM சான்றிதழ் பெற்றது",
  },
  te: {
    tagline: "భారతదేశపు స్మార్ట్ ప్రిస్క్రిప్షన్ & మెడికల్ AI",
    subTagline: "వైద్యుల ప్రిస్క్రిప్షన్లు సులభంగా అర్థం చేసుకోండి, ల్యాబ్ రిపోర్టులను విశ్లేషించండి మరియు జన్ ఔషధి ద్వారా 85% వరకు ఆదా చేయండి.",
    tabPrescription: "ప్రిస్క్రిప్షన్ స్కానర్",
    tabLabReport: "ల్యాబ్ రిపోర్ట్ AI",
    tabSymptom: "లక్షణాల నిర్ధారణ",
    tabJanAushadhi: "జన్ ఔషధి కేంద్రం",
    tabAbha: "ఆభా హెల్త్ లాకర్",
    scanPrescription: "ప్రిస్క్రిప్షన్ స్కాన్ చేయండి",
    uploadOrDrop: "ప్రిస్క్రిప్షన్ లేదా ల్యాబ్ ఫోటోను అప్‌లోడ్ చేయండి",
    orTrySamples: "నమూనా ప్రిస్క్రిప్షన్‌తో తనిఖీ చేయండి",
    analyzingMedical: "MedLens AI ప్రిస్క్రిప్షన్‌ను విశ్లేషిస్తోంది...",
    genericSavingsTitle: "ప్రధాన మంత్రి జన్ ఔషధి జెనరిక్ ప్రత్యామ్నాయాలు & పొదుపు",
    doctorQuestionsTitle: "తదుపరి ఓపీడీలో వైద్యుడిని అడగవలసిన ప్రశ్నలు",
    indianDietAdviceTitle: "భారతీయ ఆహార సలహాలు",
    disclaimerNotice: "MedLens AI కేవలం సహాయక సాధనం. వైద్యుడిని సంప్రదించండి.",
    emergencyCallButton: "అత్యవసర కాల్ (108 / 112)",
    listenAloud: "ఆడియో వినండి",
    stopAudio: "ఆపండి",
    abhaVerified: "ఆభా / ABDM మద్దతు ఉంది",
  },
  mr: {
    tagline: "भारताचे स्मार्ट प्रिस्क्रिप्शन व मेडिकल AI",
    subTagline: "डॉक्टरांचे प्रिस्क्रिप्शन व औषधांचे स्ट्रिप्स वाचा, लॅब रिपोर्ट्स तपासा आणि जन औषधी केंद्रातून ८५% पर्यंत बचत करा.",
    tabPrescription: "प्रिस्क्रिप्शन स्कॅनर",
    tabLabReport: "लॅब रिपोर्ट AI",
    tabSymptom: "लक्षण तपासणी",
    tabJanAushadhi: "जन औषधी केंद्र",
    tabAbha: "आभा हेल्थ लॉकर",
    scanPrescription: "प्रिस्क्रिप्शन स्कॅन करा",
    uploadOrDrop: "प्रिस्क्रिप्शन किंवा रिपोर्टचा फोटो निवडा",
    orTrySamples: "नमुना प्रिस्क्रिप्शन वापरून पहा",
    analyzingMedical: "MedLens AI प्रिस्क्रिप्शन विश्लेषण करत आहे...",
    genericSavingsTitle: "प्रधानमंत्री जन औषधी योजना: जेनेरिक औषध व बचत",
    doctorQuestionsTitle: "पुढील तपासणीत डॉक्टरांना विचारण्याचे प्रश्न",
    indianDietAdviceTitle: "आरोग्यदायी भारतीय आहार सल्ला",
    disclaimerNotice: "MedLens AI हे केवळ मार्गदर्शनासाठी आहे. तज्ज्ञ डॉक्टरांचा सल्ला नक्की घ्या.",
    emergencyCallButton: "आपत्कालीन नंबर (१०८ / ११२)",
    listenAloud: "आवाजात ऐका",
    stopAudio: "आवाज थांबवा",
    abhaVerified: "आभा / ABDM सुसंगत",
  },
  gu: {
    tagline: "ભારતનું સ્માર્ટ પ્રિસ્ક્રિપ્શન અને મેડિકલ AI",
    subTagline: "ડોક્ટરના પ્રિસ્ક્રિપ્શન સરળતાથી સમજો, લેબ રિપોર્ટનું વિશ્લેષણ કરો અને પ્રધાનમંત્રી જન ઔષધિ દ્વારા 85% સુધી બચત કરો.",
    tabPrescription: "પ્રિસ્ક્રિપ્શન સ્કેનર",
    tabLabReport: "લેબ રિપોર્ટ AI",
    tabSymptom: "લક્ષણોની તપાસ",
    tabJanAushadhi: "જન ઔષધિ કેન્દ્ર",
    tabAbha: "આભા હેલ્થ લોકર",
    scanPrescription: "પ્રિસ્ક્રિપ્શન સ્કેન કરો",
    uploadOrDrop: "પ્રિસ્ક્રિપ્શન અથવા રિપોર્ટનો ફોટો અપલોડ કરો",
    orTrySamples: "સેમ્પલ પ્રિસ્ક્રિપ્શનથી ડેમો જુઓ",
    analyzingMedical: "MedLens AI દવા અને ડોઝની તપાસ કરી રહ્યું છે...",
    genericSavingsTitle: "પ્રધાનમંત્રી જન ઔષધિ જેનરિક દવાઓ અને બચત",
    doctorQuestionsTitle: "ડોક્ટરને પૂછવા માટેના પ્રશ્નો",
    indianDietAdviceTitle: "સ્વસ્થ ભારતીય આહાર સલાહ",
    disclaimerNotice: "MedLens AI માત્ર સહાયક છે. ડૉક્ટરની સલાહ અચૂક લો.",
    emergencyCallButton: "ઈમરજન્સી નંબર (108 / 112)",
    listenAloud: "ઓડિયો સાંભળો",
    stopAudio: "રોકો",
    abhaVerified: "આભા / ABDM સુસંગત",
  },
  kn: {
    tagline: "ಭಾರತದ ಸ್ಮಾರ್ಟ್ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಮತ್ತು ವೈದ್ಯಕೀಯ AI",
    subTagline: "ವೈದ್ಯರ ಕೈಬರಹದ ಚೀಟಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ, ಲ್ಯಾಬ್ ವರದಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಜನ್ ಔಷಧಿಯಿಂದ 85% ರಷ್ಟು ಉಳಿತಾಯ ಮಾಡಿ.",
    tabPrescription: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನರ್",
    tabLabReport: "ಲ್ಯಾಬ್ ವರದಿ AI",
    tabSymptom: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷೆ",
    tabJanAushadhi: "ಜನ್ ಔಷಧಿ ಕೇಂದ್ರ",
    tabAbha: "ಆಭಾ ಹೆಲ್ತ್ ಲಾಕರ್",
    scanPrescription: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    uploadOrDrop: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಅಥವಾ ವರದಿ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    orTrySamples: "ಮಾದರಿ ಚೀಟಿಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    analyzingMedical: "MedLens AI ವಿವರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
    genericSavingsTitle: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ್ ಔಷಧಿ ಜೆನೆರಿಕ್ ಪರ್ಯಾಯ ಮತ್ತು ಉಳಿತಾಯ",
    doctorQuestionsTitle: "ವೈದ್ಯರನ್ನು ಕೇಳಬೇಕಾದ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು",
    indianDietAdviceTitle: "ಆರೋಗ್ಯಕರ ಭಾರತೀಯ ಆಹಾರ ಸಲಹೆ",
    disclaimerNotice: "MedLens AI ಒಂದು ಸಹಾಯಕ ಸಾಧನ. ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    emergencyCallButton: "ತುರ್ತು ಕರೆ (108 / 112)",
    listenAloud: "ಆಡಿಯೋದಲ್ಲಿ ಕೇಳಿ",
    stopAudio: "ನಿಲ್ಲಿಸಿ",
    abhaVerified: "ಆಭಾ / ABDM ಅನುಮೋದಿತ",
  },
};
