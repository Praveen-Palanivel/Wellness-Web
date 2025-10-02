import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export function Login() {
    const [userType, setUserType] = useState('migrant');
    const [language, setLanguage] = useState('English');

    // Get language preference from localStorage on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'English';
        setLanguage(savedLanguage);
    }, []);

    const translations = {
        English: {
            title: "Login to WellnessWeb",
            migrant: "Migrant",
            doctor: "Doctor",
            official: "Health Official",
            email: "Email",
            password: "Password",
            login: "Login",
            noAccount: "Don't have an account?",
            register: "Register",
            selectUser: "Select User Type"
        },
        Tamil: {
            title: "WellnessWeb க்கு உள்நுழைக",
            migrant: "புலம்பெயர்ந்தோர்",
            doctor: "மருத்துவர்",
            official: "சுகாதார அதிகாரி",
            email: "மின்னஞ்சல்",
            password: "கடவுச்சொல்",
            login: "உள்நுழைக",
            noAccount: "கணக்கு இல்லையா?",
            register: "பதிவு செய்க",
            selectUser: "பயனர் வகையைத் தேர்ந்தெடுக்கவும்"
        },
        Malayalam: {
            title: "WellnessWeb-ലേക്ക് ലോഗിൻ ചെയ്യുക",
            migrant: "കുടിയേറ്റക്കാരൻ",
            doctor: "ഡോക്ടർ",
            official: "ആരോഗ്യ ഉദ്യോഗസ്ഥൻ",
            email: "ഇമെയിൽ",
            password: "പാസ്വേഡ്",
            login: "ലോഗിൻ",
            noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
            register: "രജിസ്റ്റർ ചെയ്യുക",
            selectUser: "ഉപയോക്തൃ തരം തിരഞ്ഞെടുക്കുക"
        },
        Hindi: {
            title: "WellnessWeb में लॉगिन करें",
            migrant: "प्रवासी",
            doctor: "डॉक्टर",
            official: "स्वास्थ्य अधिकारी",
            email: "ईमेल",
            password: "पासवर्ड",
            login: "लॉगिन",
            noAccount: "खाता नहीं है?",
            register: "रजिस्टर करें",
            selectUser: "उपयोगकर्ता प्रकार चुनें"
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add login logic here
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{translations[language].title}</h2>
                
                <div className="user-type-selector">
                    <label>{translations[language].selectUser}</label>
                    <div className="user-type-buttons">
                        <button 
                            className={userType === 'migrant' ? 'active' : ''}
                            onClick={() => setUserType('migrant')}
                        >
                            {translations[language].migrant}
                        </button>
                        <button 
                            className={userType === 'doctor' ? 'active' : ''}
                            onClick={() => setUserType('doctor')}
                        >
                            {translations[language].doctor}
                        </button>
                        <button 
                            className={userType === 'official' ? 'active' : ''}
                            onClick={() => setUserType('official')}
                        >
                            {translations[language].official}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{translations[language].email}</label>
                        <input type="email" required />
                    </div>
                    <div className="form-group">
                        <label>{translations[language].password}</label>
                        <input type="password" required />
                    </div>
                    <button type="submit" className="login-btn">
                        {translations[language].login}
                    </button>
                </form>

                <div className="register-link">
                    <p>{translations[language].noAccount}</p>
                    <Link to={`/register/${userType}`}>
                        {translations[language].register}
                    </Link>
                </div>
            </div>
        </div>
    );
}