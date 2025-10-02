import React, { useMemo } from "react";
import "./Landing.css";
import logo from '../images/record.svg';
import worker from '../images/worker.svg';
import doctor from '../images/doctor.svg';
import official from '../images/official.svg';
import { Navigate, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Landing() {
  const { language: langCode, setLanguage } = useLanguage();

  // Map context language codes to this component's translation keys
  const codeToKey = { en: "English", hi: "Hindi", ta: "Tamil", ml: "Malayalam" };

  const language = codeToKey[langCode] || "English";

  const languages = [
    { code: "en", native: "English" },
    { code: "hi", native: "हिंदी" },
    { code: "ta", native: "தமிழ்" },
    { code: "ml", native: "മലയാളം" }
  ];

  const translations = {
    English: {
      heroTitle: "Health Without Borders",
      heroDesc: "Stopping outbreaks before they spread, through smarter health tracking.",
      beneficiaries: "Beneficiaries",
      migrants: "Migrants",
      doctor: "Doctor",
      healthOfficials: "Health Officials",
      sdgTitle: "Supporting UN Sustainable Development Goals",
      sdg3: {
        title: "Goal 3",
        subtitle: "Good Health and Well-being",
        desc: "Our system helps prevent disease transmission, provides timely medical follow-ups, and ensures migrants have access to healthcare through digital health records."
      },
      sdg10: {
        title: "Goal 10",
        subtitle: "Reduced Inequalities",
        desc: "Migrant workers often face barriers in accessing healthcare. Our platform ensures equal access to health services, reduces discrimination, and empowers vulnerable communities."
      },
      sdg16: {
        title: "Goal 16",
        subtitle: "Peace, Justice and Strong Institutions",
        desc: "By enabling transparent health record management, improving data-driven decision making, and supporting public health governance, our system builds trust and strengthens institutions."
      },
      about: {
        title: "Seamless Healthcare Through QR Technology",
        intro: "Migrants often face barriers to healthcare due to mobility, language, and lack of records.",
        qrInfo: "WellnessWeb solves this by providing a QR-enabled digital health record system",
        benefits: [
          "Migrants carry their health history anytime, anywhere.",
          "Doctors can instantly scan, review, and update medical details.",
          "Health officials gain real-time insights to prevent outbreaks, plan health camps, and strengthen community well-being."
        ],
        conclusion: "WellnessWeb brings migrants, doctors, and the state together on one unified platform, ensuring better health, reduced inequalities, and stronger healthcare systems."
      },
      workflow: {
        title: "How Our System Works",
        migrant: {
          title: "For Migrants",
          steps: [
            "Register with your language and get a unique QR code",
            "Store your QR code digitally or as a physical card",
            "Show QR during medical visits",
            "Access your updated records anytime",
            "Receive notifications about nearby health camps"
          ]
        },
        doctor: {
          title: "For Doctors",
          steps: [
            "Scan patient's QR code",
            "Access complete medical history",
            "Add new diagnosis and prescriptions",
            "Update treatment records",
            "Set follow-up reminders"
          ]
        },
        official: {
          title: "For Health Officials",
          steps: [
            "Check for the contagious cases",
            "Announce medical camps",
            "Schedule vaccination drives",
            "Send health alerts",
            "Generate health reports"
          ]
        }
      },
      features: {
        qrAccess: {
          title: "QR-Based Access",
          desc: "Instant and secure access to medical records through simple QR scanning"
        },
        healthEvents: {
          title: "Health Events",
          desc: "Stay updated with nearby health camps, vaccination drives, and wellness programs"
        },
        realTime: {
          title: "Real-time Updates",
          desc: "Doctors can instantly update records, ensuring current health information"
        }
      },
      footer: {
        contact: {
          title: "Contact Us",
          email: "Email: wellnessweb24/7@gmail.com",
          phone: "Phone: +044 24675 24578"
        },
        quickLinks: {
          title: "Quick Links",
          about: "About Us",
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        },
        social: {
          title: "Follow Us",
          twitter: "Twitter",
          linkedin: "LinkedIn",
          facebook: "Facebook"
        },
        copyright: " 2023 WellnessWeb. All rights reserved."
      }
    },
    Tamil: {
      heroTitle: "எல்லைகள் இல்லாத ஆரோக்கியம்",
      heroDesc: "புத்துணர்ச்சி மருத்துவ கண்காணிப்பின் மூலம் நோய்த்தொற்றுகளை பரவுவதற்கு முன் நிறுத்துங்கள்.",
      beneficiaries: "பயனாளிகள்",
      migrants: "புலம்பெயர்ந்தோர்",
      doctor: "மருத்துவர்",
      healthOfficials: "சுகாதார அதிகாரிகள்",
      sdgTitle: "ஏகீகாரிய ஐக்கிய நாடுகள் வளர்ச்சி குறிக்கோள்களை ஆதரிக்கிறது",
      sdg3: {
        title: "கோல் 3",
        subtitle: "நல்ல ஆரோக்கியம் மற்றும் நலன்",
        desc: "எங்கள் அமைப்பு நோயின் பரவலைத் தடுக்கும், நேரத்தில் மருத்துவ பின்தொடர்வுகளை வழங்குகிறது, மற்றும் மையங்கள் டிஜிட்டல் சுகாதார பதிவுகள் மூலம் சுகாதார சேவைகளுக்கு அணுகல் பெறுவதை உறுதி செய்கிறது."
      },
      sdg10: {
        title: "கோல் 10",
        subtitle: "குறைந்த சமத்துவங்கள்",
        desc: "புலம்பெயர்ந்த தொழிலாளர்கள் சுகாதார சேவைகளை அணுகுவதில் தடைகளை எதிர்கொள்கின்றனர். எங்கள் மேடையில் சுகாதார சேவைகளுக்கு சமமான அணுகலை உறுதி செய்கிறது, வேறுபாட்டை குறைக்கிறது, மற்றும் பாதிக்கப்படும் சமூகங்களை அதிகாரமூட்டுகிறது."
      },
      sdg16: {
        title: "கோல் 16",
        subtitle: "அமைதி, நீதி மற்றும் வலிமையான நிறுவனங்கள்",
        desc: "தகவல் அடிப்படையிலான முடிவெடுத்தலை மேம்படுத்துவதன் மூலம், மற்றும் பொது சுகாதார ஆணையத்தை ஆதரிப்பதன் மூலம், எங்கள் அமைப்பு நம்பிக்கையை உருவாக்குகிறது மற்றும் நிறுவனங்களை வலுப்படுத்துகிறது."
      },
      about: {
        title: "QR தொழில்நுட்பத்தின் மூலம் தடையற்ற சுகாதாரம்",
        intro: "புலம்பெயர்ந்தவர்கள் மொபைலிட்டி, மொழி மற்றும் பதிவுகளின் குறைவால் சுகாதார சேவைகளுக்கு தடைகளை எதிர்கொள்கின்றனர்.",
        qrInfo: "WellnessWeb QR-இன் மூலம் சுகாதார பதிவுகளை வழங்குவதன் மூலம் இதனைத் தீர்க்கிறது",
        benefits: [
          "புலம்பெயர்ந்தவர்கள் எப்போது வேண்டுமானாலும், எங்கு வேண்டுமானாலும், அவர்களது சுகாதார வரலாற்றை எடுத்துச் செல்லலாம்.",
          "மருத்துவர்கள் உடனுக்குடன் ஸ்கேன் செய்து, பரிசோதனை செய்து, மருத்துவ விவரங்களை புதுப்பிக்கலாம்.",
          "சுகாதார அதிகாரிகள் உடனுக்குடன் உள்ளடக்கங்களை தடுப்பதற்கான, சுகாதார முகாம்களை திட்டமிடுவதற்கான, மற்றும் சமூக நலன்களை வலுப்படுத்துவதற்கான தகவல்களைப் பெறுகிறார்கள்."
        ],
        conclusion: "WellnessWeb புலம்பெயர்ந்தவர்கள், மருத்துவர்கள், மற்றும் மாநிலத்தை ஒரே ஒருங்கிணைந்த மேடையில் சேர்க்கிறது, மேலும் சிறந்த சுகாதாரம், குறைந்த சமத்துவங்கள், மற்றும் வலிமையான சுகாதார அமைப்புகளை உறுதி செய்கிறது."
      },
      workflow: {
        title: "எங்கள் அமைப்பு எப்படி வேலை செய்கிறது",
        migrant: {
          title: "புலம்பெயர்ந்தவர்களுக்கு",
          steps: [
            "உங்கள் மொழியுடன் பதிவு செய்யவும் மற்றும் ஒரு தனிப்பட்ட QR குறியீட்டை பெறவும்",
            "உங்கள் QR குறியீட்டை டிஜிட்டலாக அல்லது ஒரு உடல் அட்டை போல சேமிக்கவும்",
            "மருத்துவ பார்வைகளின் போது QR க்கு காட்சி அளிக்கவும்",
            "எப்போது வேண்டுமானாலும் உங்கள் புதுப்பிக்கப்பட்ட பதிவுகளை அணுகவும்",
            "சுற்றுவட்டார சுகாதார முகாம்கள் பற்றிய அறிவிப்புகளைப் பெறவும்"
          ]
        },
        doctor: {
          title: "மருத்துவர்களுக்கு",
          steps: [
            "பேசிய patient's QR குறியீட்டை ஸ்கேன் செய்யவும்",
            "முழுமையான மருத்துவ வரலாற்றை அணுகவும்",
            "புதிய நோயியல் மற்றும் மருந்துகளைச் சேர்க்கவும்",
            "சிகிச்சை பதிவுகளை புதுப்பிக்கவும்",
            "பின்தொடர்பு நினைவூட்டல்களை அமைக்கவும்"
          ]
        },
        official: {
          title: "சுகாதார அதிகாரிகளுக்கு",
          steps: [
            "பரவலரீதியான நோய்களைச் சரிபார்க்கவும்",
            "மருத்துவ முகாம்களை அறிவிக்கவும்",
            "கூட்டுறவு இயக்கங்களை திட்டமிடவும்",
            "சுகாதார எச்சரிக்கைகளை அனுப்பவும்",
            "சுகாதார அறிக்கைகளை உருவாக்கவும்"
          ]
        }
      },
      features: {
        qrAccess: {
          title: "QR அடிப்படையிலான அணுகல்",
          desc: "எளிய QR ஸ்கேன் மூலம் மருத்துவ பதிவுகளுக்கு உடனடி மற்றும் பாதுகாப்பான அணுகல்"
        },
        healthEvents: {
          title: "சுகாதார நிகழ்வுகள்",
          desc: "சுற்றுவட்டார சுகாதார முகாம்கள், தடுப்பூசி இயக்கங்கள், மற்றும் நலன் திட்டங்கள் பற்றிய புதுப்பிப்புகளைப் பெறுங்கள்"
        },
        realTime: {
          title: "உடனடி புதுப்பிப்புகள்",
          desc: "மருத்துவர்கள் உடனுக்குடன் பதிவுகளை புதுப்பிக்கலாம், தற்போதைய சுகாதார தகவல்களை உறுதி செய்கிறது"
        }
      },
      footer: {
        contact: {
          title: "எங்களை தொடர்பு கொள்ளவும்",
          email: "மின்னஞ்சல்: wellnessweb24/7@gmail.com",
          phone: "தொலைபேசி: +044 24675 24578"
        },
        quickLinks: {
          title: "விரைவான இணைப்புகள்",
          about: "எங்களைப் பற்றி",
          privacy: "தனியுரிமை கொள்கை",
          terms: "சேவையின் விதிமுறைகள்"
        },
        social: {
          title: "எங்களை பின்தொடருங்கள்",
          twitter: "ட்விட்டர்",
          linkedin: "லிங்க்டின்",
          facebook: "முகநூல்"
        },
        copyright: " 2023 WellnessWeb. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
      }
    },
    Malayalam: {
      heroTitle: "സീമകളില്ലാത്ത ആരോഗ്യ സംരക്ഷണം",
      heroDesc: "സ്മാർട്ട് ഹെൽത്ത് ട്രാക്കിംഗിലൂടെ രോഗങ്ങൾ പടരുന്നതിന് മുമ്പ് തടയുക.",
      beneficiaries: "ലാഭം ചെയ്യുന്നവർ",
      migrants: "പ്രവാസികൾ",
      doctor: "ഡോക്ടർ",
      healthOfficials: "ആരോഗ്യ ഉദ്യോഗസ്ഥർ",
      sdgTitle: "യുണൈറ്റഡ് നേഷൻസ് സുസ്ഥിര വികസന ലക്ഷ്യങ്ങൾ പിന്തുണയ്ക്കുന്നു",
      sdg3: {
        title: "ലക്ഷ്യം 3",
        subtitle: "നല്ല ആരോഗ്യവും ക്ഷേമവും",
        desc: "ഞങ്ങളുടെ സംവിധാനം രോഗത്തിന്റെ വ്യാപനം തടയാൻ, സമയബന്ധിതമായ മെഡിക്കൽ ഫോളോ-അപ്പുകൾ നൽകാൻ, പ്രവാസികൾക്ക് ഡിജിറ്റൽ ആരോഗ്യ രേഖകൾ വഴി ആരോഗ്യപരിശോധനകൾക്ക് പ്രവേശനം ഉറപ്പാക്കാൻ സഹായിക്കുന്നു."
      },
      sdg10: {
        title: "ലക്ഷ്യം 10",
        subtitle: "കുറഞ്ഞ അസമത്വങ്ങൾ",
        desc: "പ്രവാസി തൊഴിലാളികൾക്ക് ആരോഗ്യപരിശോധനകൾക്ക് പ്രവേശനത്തിൽ തടസ്സങ്ങൾ നേരിടേണ്ടിവരുന്നു. ഞങ്ങളുടെ പ്ലാറ്റ്ഫോം ആരോഗ്യ സേവനങ്ങൾക്ക് സമാനമായ പ്രവേശനം ഉറപ്പാക്കുന്നു, വിവേചനം കുറയ്ക്കുന്നു, ദുര്‍ബലമായ സമൂഹങ്ങളെ ശക്തമാക്കുന്നു."
      },
      sdg16: {
        title: "ലക്ഷ്യം 16",
        subtitle: "ശാന്തി, നീതി, ശക്തമായ സ്ഥാപനങ്ങൾ",
        desc: "വ്യവസ്ഥാപിതമായ ആരോഗ്യ രേഖകളുടെ മാനേജ്മെന്റ്, ഡാറ്റാ ആധാരിതമായ തീരുമാനമെടുക്കൽ മെച്ചപ്പെടുത്തൽ, പൊതു ആരോഗ്യ ഭരണകൂടത്തെ പിന്തുണയ്ക്കൽ എന്നിവയിലൂടെ ഞങ്ങളുടെ സംവിധാനം വിശ്വാസം നിർമ്മിക്കുകയും സ്ഥാപനങ്ങളെ ശക്തമാക്കുകയും ചെയ്യുന്നു."
      },
      about: {
        title: "QR സാങ്കേതികവിദ്യയിലൂടെ തടസ്സമില്ലാത്ത ആരോഗ്യസംരക്ഷണം",
        intro: "പ്രവാസികൾക്ക് മൊബിലിറ്റി, ഭാഷ, രേഖകളുടെ അഭാവം എന്നിവ കാരണം ആരോഗ്യപരിശോധനകളിൽ തടസ്സങ്ങൾ നേരിടേണ്ടിവരുന്നു.",
        qrInfo: "WellnessWeb QR-സജ്ജമായ ഡിജിറ്റൽ ഹെൽത്ത് റെക്കോർഡ് സിസ്റ്റം നൽകുന്നതിലൂടെ ഇത് പരിഹരിക്കുന്നു",
        benefits: [
          "പ്രവാസികൾ എപ്പോഴും, എവിടെയും, അവരുടെ ആരോഗ്യ ചരിത്രം കൈവശം വയ്ക്കുന്നു.",
          "ഡോക്ടർമാർ ഉടൻ സ്കാൻ ചെയ്യാൻ, അവലോകനം ചെയ്യാൻ, മെഡിക്കൽ വിശദാംശങ്ങൾ പുതുക്കാൻ കഴിയും.",
          "ആരോഗ്യ ഉദ്യോഗസ്ഥർ രോഗങ്ങൾ തടയാൻ, ആരോഗ്യ ക്യാമ്പുകൾ പദ്ധതിയിടാൻ, സമൂഹത്തിന്റെ ക്ഷേമം ശക്തമാക്കാൻ യാഥാർത്ഥ്യ സമയത്തിൽ洞察ങ്ങൾ നേടുന്നു."
        ],
        conclusion: "WellnessWeb പ്രവാസികളെ, ഡോക്ടർമാരെ, സംസ്ഥാനത്തെ ഒരു ഏകീകൃത പ്ലാറ്റ്ഫോമിൽ ഒന്നിപ്പിക്കുന്നു, മികച്ച ആരോഗ്യവും, കുറവായ അസമത്വങ്ങളും, ശക്തമായ ആരോഗ്യസംരക്ഷണ സംവിധാനങ്ങളും ഉറപ്പാക്കുന്നു."
      },
      workflow: {
        title: "ഞങ്ങളുടെ സംവിധാനം എങ്ങനെ പ്രവർത്തിക്കുന്നു",
        migrant: {
          title: "പ്രവാസികൾക്കായുള്ളത്",
          steps: [
            "നിങ്ങളുടെ ഭാഷയിൽ രജിസ്റ്റർ ചെയ്യുക, ഒരു പ്രത്യേക QR കോഡ് നേടുക",
            "നിങ്ങളുടെ QR കോഡ് ഡിജിറ്റലായി അല്ലെങ്കിൽ ശാരീരിക കാർഡ് പോലെയുള്ളതും സൂക്ഷിക്കുക",
            "മരുന്ന് സന്ദർശനങ്ങളിൽ QR കാണിക്കുക",
            "എപ്പോഴും നിങ്ങളുടെ പുതുക്കിയ രേഖകൾ ആക്സസ് ചെയ്യുക",
            "ചുറ്റുപാടിലുള്ള ആരോഗ്യ ക്യാമ്പുകൾക്കുള്ള അറിയിപ്പുകൾ സ്വീകരിക്കുക"
          ]
        },
        doctor: {
          title: "ഡോക്ടർമാർക്കായുള്ളത്",
          steps: [
            "രോഗിയുടെ QR കോഡ് സ്കാൻ ചെയ്യുക",
            "പൂർണ്ണമായ മെഡിക്കൽ ചരിത്രം ആക്സസ് ചെയ്യുക",
            "പുതിയ രോഗനിർണ്ണയം, മരുന്നുകൾ ചേർക്കുക",
            "ചികിത്സാ രേഖകൾ പുതുക്കുക",
            "ഫോളോ-അപ്പ് ഓർമ്മപ്പെടുത്തലുകൾ ക്രമീകരിക്കുക"
          ]
        },
        official: {
          title: "ആരോഗ്യ ഉദ്യോഗസ്ഥർക്കായുള്ളത്",
          steps: [
            "വ്യാപകമായ കേസുകൾ പരിശോധിക്കുക",
            "മരുന്ന് ക്യാമ്പുകൾ പ്രഖ്യാപിക്കുക",
            "അവസാനിപ്പിക്കൽ ഡ്രൈവ് ഷെഡ്യൂൾ ചെയ്യുക",
            "ആരോഗ്യ അലർട്ടുകൾ അയയ്ക്കുക",
            "ആരോഗ്യ റിപ്പോർട്ടുകൾ സൃഷ്ടിക്കുക"
          ]
        }
      },
      features: {
        qrAccess: {
          title: "QR അടിസ്ഥാനമായ ആക്സസ്",
          desc: "സാധാരണ QR സ്കാനിംഗ് വഴി മെഡിക്കൽ രേഖകൾക്ക് ഉടൻ, സുരക്ഷിതമായ ആക്സസ്"
        },
        healthEvents: {
          title: "ആരോഗ്യ സംഭവങ്ങൾ",
          desc: "ചുറ്റുപാടിലുള്ള ആരോഗ്യ ക്യാമ്പുകൾ, വാക്സിനേഷൻ ഡ്രൈവ്, ക്ഷേമ പരിപാടികൾ എന്നിവയെക്കുറിച്ച് അപ്ഡേറ്റുകൾ ലഭിക്കുക"
        },
        realTime: {
          title: "യാഥാർത്ഥ്യ സമയത്തിലെ അപ്ഡേറ്റുകൾ",
          desc: "ഡോക്ടർമാർ ഉടനടി രേഖകൾ പുതുക്കാൻ കഴിയും, നിലവിലെ ആരോഗ്യ വിവരങ്ങൾ ഉറപ്പാക്കുന്നു"
        }
      },
      footer: {
        contact: {
          title: "ഞങ്ങളെ ബന്ധപ്പെടുക",
          email: "ഇമെയിൽ: wellnessweb24/7@gmail.com",
          phone: "ഫോൺ: +044 24675 24578"
        },
        quickLinks: {
          title: "വേഗത്തിലുള്ള ലിങ്കുകൾ",
          about: "ഞങ്ങളെക്കുറിച്ച്",
          privacy: "സ്വകാര്യതാ നയം",
          terms: "സേവനത്തിന്റെ നിബന്ധനകൾ"
        },
        social: {
          title: "ഞങ്ങളെ പിന്തുടരുക",
          twitter: "ട്വിറ്റർ",
          linkedin: "ലിങ്ക്ഡ്ഇൻ",
          facebook: "ഫേസ്ബുക്ക്"
        },
        copyright: "© 2023 WellnessWeb. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതമാണ്."
      }
    },
    Hindi: {
      heroTitle: "सीमाओं के बिना स्वास्थ्य",
      heroDesc: "स्मार्ट स्वास्थ्य ट्रैकिंग के माध्यम से फैलने से पहले प्रकोपों को रोकना।",
      beneficiaries: "लाभार्थी",
      migrants: "प्रवासी",
      doctor: "डॉक्टर",
      healthOfficials: "स्वास्थ्य अधिकारी",
      sdgTitle: "संयुक्त राष्ट्र सतत विकास लक्ष्यों का समर्थन",
      sdg3: {
        title: "लक्ष्य 3",
        subtitle: "अच्छा स्वास्थ्य और कल्याण",
        desc: "हमारी प्रणाली रोग संचरण को रोकने में मदद करती है, समय पर चिकित्सा अनुवर्ती कार्रवाई प्रदान करती है, और सुनिश्चित करती है कि प्रवासियों को डिजिटल स्वास्थ्य रिकॉर्ड के माध्यम से स्वास्थ्य देखभाल तक पहुंच हो।"
      },
      sdg10: {
        title: "लक्ष्य 10",
        subtitle: "कम असमानताएँ",
        desc: "प्रवासी श्रमिक अक्सर स्वास्थ्य देखभाल तक पहुँचने में बाधाओं का सामना करते हैं। हमारा मंच स्वास्थ्य सेवाओं तक समान पहुँच सुनिश्चित करता है, भेदभाव को कम करता है, और कमजोर समुदायों को सशक्त बनाता है।"
      },
      sdg16: {
        title: "लक्ष्य 16",
        subtitle: "शांति, न्याय और मजबूत संस्थान",
        desc: "स्वास्थ्य रिकॉर्ड प्रबंधन में पारदर्शिता सक्षम करके, डेटा-चालित निर्णय लेने में सुधार करके, और सार्वजनिक स्वास्थ्य शासन का समर्थन करके, हमारी प्रणाली विश्वास बनाती है और संस्थानों को मजबूत करती है।"
      },
      about: {
        title: "QR प्रौद्योगिकी के माध्यम से निर्बाध स्वास्थ्य देखभाल",
        intro: "प्रवासी अक्सर गतिशीलता, भाषा और रिकॉर्ड की कमी के कारण स्वास्थ्य देखभाल में बाधाओं का सामना करते हैं।",
        qrInfo: "WellnessWeb एक QR-सक्षम डिजिटल स्वास्थ्य रिकॉर्ड प्रणाली प्रदान करके इसे हल करता है",
        benefits: [
          "प्रवासी कभी भी, कहीं भी, अपना स्वास्थ्य इतिहास ले जा सकते हैं।",
          "डॉक्टर तुरंत स्कैन, समीक्षा और चिकित्सा विवरण अपडेट कर सकते हैं।",
          "स्वास्थ्य अधिकारी प्रकोपों को रोकने, स्वास्थ्य शिविरों की योजना बनाने और सामुदायिक कल्याण को मजबूत करने के लिए वास्तविक समय की अंतर्दृष्टि प्राप्त करते हैं।"
        ],
        conclusion: "WellnessWeb प्रवासियों, डॉक्टरों और राज्य को एक एकीकृत मंच पर लाता है, बेहतर स्वास्थ्य, कम असमानताओं और मजबूत स्वास्थ्य देखभाल प्रणालियों को सुनिश्चित करता है।"
      },
      workflow: {
        title: "हमारी प्रणाली कैसे काम करती है",
        migrant: {
          title: "प्रवासियों के लिए",
          steps: [
            "अपनी भाषा के साथ पंजीकरण करें और एक अनूठा QR कोड प्राप्त करें",
            "अपने QR कोड को डिजिटल रूप से या एक भौतिक कार्ड के रूप में स्टोर करें",
            "चिकित्सा यात्राओं के दौरान QR दिखाएं",
            "कभी भी अपने अपडेटेड रिकॉर्ड्स तक पहुंचें",
            "नजदीकी स्वास्थ्य शिविरों के बारे में सूचनाएं प्राप्त करें"
          ]
        },
        doctor: {
          title: "डॉक्टरों के लिए",
          steps: [
            "रोगी का QR कोड स्कैन करें",
            "पूर्ण चिकित्सा इतिहास तक पहुंचें",
            "नई निदान और प्रिस्क्रिप्शन जोड़ें",
            "उपचार रिकॉर्ड अपडेट करें",
            "फॉलो-अप रिमाइंडर सेट करें"
          ]
        },
        official: {
          title: "स्वास्थ्य अधिकारियों के लिए",
          steps: [
            "संक्रामक मामलों की जांच करें",
            "चिकित्सा शिविरों की घोषणा करें",
            "टीकाकरण ड्राइव शेड्यूल करें",
            "स्वास्थ्य अलर्ट भेजें",
            "स्वास्थ्य रिपोर्ट जनरेट करें"
          ]
        }
      },
      features: {
        qrAccess: {
          title: "QR-आधारित एक्सेस",
          desc: "सरल QR स्कैनिंग के माध्यम से चिकित्सा रिकॉर्ड तक त्वरित और सुरक्षित पहुंच"
        },
        healthEvents: {
          title: "स्वास्थ्य कार्यक्रम",
          desc: "नजदीकी स्वास्थ्य शिविरों, टीकाकरण ड्राइव, और कल्याण कार्यक्रमों के साथ अपडेट रहें"
        },
        realTime: {
          title: "वास्तविक समय अपडेट",
          desc: "डॉक्टर तुरंत रिकॉर्ड अपडेट कर सकते हैं, वर्तमान स्वास्थ्य जानकारी सुनिश्चित करते हैं"
        }
      },
      footer: {
        contact: {
          title: "संपर्क करें",
          email: "ईमेल: wellnessweb24/7@gmail.com",
          phone: "फोन: +044 24675 24578"
        },
        quickLinks: {
          title: "त्वरित लिंक",
          about: "हमारे बारे में",
          privacy: "गोपनीयता नीति",
          terms: "सेवा की शर्तें"
        },
        social: {
          title: "हमें फॉलो करें",
          twitter: "ट्विटर",
          linkedin: "लिंक्डइन",
          facebook: "फेसबुक"
        },
        copyright: "© 2023 WellnessWeb. सर्वाधिकार सुरक्षित।"
      }
    }
  };

  const navigate = useNavigate();
  const handleLogin = ()=>{
      navigate("/login");
  }
  
  return (
    <div className="landingPage">
      <section className="hero">
        <div className="hero-content">
          <h1>{translations[language].heroTitle}</h1>
          <p>{translations[language].heroDesc}</p>
          <div className="language-selector">
            {languages.map(lang => (
              <button
                key={lang.code}
                className={`lang-btn ${langCode === lang.code ? 'active' : ''}`}
                onClick={() => setLanguage(lang.code)}
              >
                {lang.native}
              </button>
            ))}
          </div>

          <button className="login-btn-land" onClick={handleLogin}>Login</button>
        </div>
        <div className="hero-image">
          <img src={logo} alt="Healthy Lifestyle" height={300}/>
        </div>
      </section>
      {/* <h3>{translations[language].beneficiaries}</h3> */}
      <section className="features">
        <div className="feature-card">
          <img src={worker} height={100} alt="Migrant"/>
          <h2>{translations[language].migrants}</h2>
        </div>
        <div className="feature-card">
          <img src={doctor} height={100} alt="Doctor"/>
          <h2>{translations[language].doctor}</h2>
        </div>
        <div className="feature-card">
          <img src={official} height={100} alt="Health Official"/>
          <h2>{translations[language].healthOfficials}</h2>
        </div>
      </section>

      <section className="sdg-section">
        <h2>{translations[language].sdgTitle}</h2>
        <div className="sdg-container">
          <div className="sdg-card">
            <h3>{translations[language].sdg3.title}</h3>
            <p><b>{translations[language].sdg3.subtitle}</b></p>
            <p>{translations[language].sdg3.desc}</p>
          </div>
          <div className="sdg-card">
            <h3>{translations[language].sdg10.title}</h3>
            <p><b>{translations[language].sdg10.subtitle}</b></p>
            <p>{translations[language].sdg10.desc}</p>
          </div>
          <div className="sdg-card">
            <h3>{translations[language].sdg16.title}</h3>
            <p><b>{translations[language].sdg16.subtitle}</b></p>
            <p>{translations[language].sdg16.desc}</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>{translations[language].about.title}</h2>
          <br />
          <p className="about-intro">
            {translations[language].about.intro} <b>{translations[language].about.qrInfo}.</b>
            <ul>
              <li>{translations[language].about.benefits[0]}</li>
              <li>{translations[language].about.benefits[1]}</li>
              <li>{translations[language].about.benefits[2]}</li>
            </ul> 
            {translations[language].about.conclusion}
          </p>

          <div className="workflow-container">
            <h3>{translations[language].workflow.title}</h3>
            <div className="workflow-cards">

              <div className="workflow-card doctor">
                <h4>{translations[language].workflow.doctor.title}</h4>
                <div className="workflow-steps">
                  {translations[language].workflow.doctor.steps.map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </div>
              <div className="workflow-card migrant">
                <h4>{translations[language].workflow.migrant.title}</h4>
                <div className="workflow-steps">
                  {translations[language].workflow.migrant.steps.map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </div>
              <div className="workflow-card official">
                <h4>{translations[language].workflow.official.title}</h4>
                <div className="workflow-steps">
                  {translations[language].workflow.official.steps.map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="features-highlight">
            <div className="highlight-card">
              <h3>{translations[language].features.qrAccess.title}</h3>
              <p>{translations[language].features.qrAccess.desc}</p>
            </div>
            <div className="highlight-card">
              <h3>{translations[language].features.healthEvents.title}</h3>
              <p>{translations[language].features.healthEvents.desc}</p>
            </div>
            <div className="highlight-card">
              <h3>{translations[language].features.realTime.title}</h3>
              <p>{translations[language].features.realTime.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{translations[language].footer.contact.title}</h3>
            <p>{translations[language].footer.contact.email}</p>
            <p>{translations[language].footer.contact.phone}</p>
          </div>
          <div className="footer-section">
            <h3>{translations[language].footer.quickLinks.title}</h3>
            <ul className="social-links">
              <li><a href="#about">{translations[language].footer.quickLinks.about}</a></li>
              <li><a href="#privacy">{translations[language].footer.quickLinks.privacy}</a></li>
              <li><a href="#terms">{translations[language].footer.quickLinks.terms}</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>{translations[language].footer.social.title}</h3>
            <div className="social-links">
              <a href="#">{translations[language].footer.social.twitter}</a>
              <a href="#">{translations[language].footer.social.linkedin}</a>
              <a href="#">{translations[language].footer.social.facebook}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{translations[language].footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;