import React, { useState, useEffect } from "react";
import {
  Bell,
  QrCode,
  User,
  Edit3,
  Save,
  X,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  Search,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  FileText
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Health Official API service
const officialAPI = {
  getProfile: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/official/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getNotifications: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/official/notifications', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  createNotification: async (title, message, region, type) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/official/notifications', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, message, region, type })
    });
    return response.json();
  },

  updateNotification: async (id, data) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8081/official/notifications/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteNotification: async (id) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8081/official/notifications/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  logout: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/official/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  searchMigrant: async (abhaNumber) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8081/official/search/migrant/${abhaNumber}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  searchDoctor: async (healthPid) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8081/official/search/doctor/${healthPid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  // Government Schemes API endpoints
  getSchemes: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/official/schemes', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  createScheme: async (title, description, eligibility, benefits, applicationProcess, validFrom, validUntil, region) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/official/schemes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, eligibility, benefits, applicationProcess, validFrom, validUntil, region })
    });
    return response.json();
  },

  updateScheme: async (id, data) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8081/official/schemes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteScheme: async (id) => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8081/official/schemes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
};

const translations = {
  en: {
    // Navigation and Basic UI
    title: "Health Official Dashboard",
    wellnessWebDashboard: "Wellness Web Health Dashboard",
    welcome: "Welcome",
    qrScan: "QR Scanner",
    notifications: "Notifications",
    profile: "My Profile",
    logout: "Logout",
    home: "Home",
    loading: "Loading...",
    error: "Error loading data",
    retry: "Retry",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    close: "Close",
    
    // Notifications
    createNotification: "Create Notification",
    editNotification: "Edit Notification",
    deleteNotification: "Delete",
    notificationTitle: "Title",
    notificationMessage: "Message",
    notificationRegion: "Region",
    notificationType: "Type",
    confirmDelete: "Are you sure you want to delete this notification?",
    noNotifications: "No notifications available",
    notificationCreated: "Notification created successfully",
    notificationUpdated: "Notification updated successfully",
    notificationDeleted: "Notification deleted successfully",
    affectedWorkers: "workers will receive this notification",
    selectRegion: "Select Region",
    allRegions: "All Regions",
    urgent: "Urgent",
    info: "Info",
    alert: "Alert",
    general: "General",
    
    // Search
    search: "Search",
    searchMigrant: "Search Migrant",
    searchDoctor: "Search Doctor",
    abhaNumber: "ABHA Number",
    healthPid: "Health Professional ID",
    searchResults: "Search Results",
    migrantDetails: "Migrant Details",
    doctorDetails: "Doctor Details",
    noResultsFound: "No results found",
    searchPlaceholderMigrant: "Enter ABHA number to search migrant",
    searchPlaceholderDoctor: "Enter Health Professional ID to search doctor",
    clearSearch: "Clear Search",
    
    // Government Schemes
    schemes: "Government Schemes",
    createScheme: "Create Scheme",
    editScheme: "Edit Scheme",
    deleteScheme: "Delete Scheme",
    schemeTitle: "Scheme Title",
    schemeDescription: "Description",
    schemeEligibility: "Eligibility Criteria",
    schemeBenefits: "Benefits",
    schemeApplicationProcess: "Application Process",
    schemeValidFrom: "Valid From",
    schemeValidUntil: "Valid Until",
    schemeRegion: "Target Region",
    noSchemes: "No government schemes available",
    schemeCreated: "Scheme created successfully",
    schemeUpdated: "Scheme updated successfully",
    schemeDeleted: "Scheme deleted successfully",
    confirmDeleteScheme: "Are you sure you want to delete this scheme?",
    allRegionsScheme: "All Regions",
    activeScheme: "Active",
    expiredScheme: "Expired",
    schemePlaceholderTitle: "Enter scheme title",
    schemePlaceholderDescription: "Enter scheme description",
    schemePlaceholderEligibility: "Enter eligibility criteria",
    schemePlaceholderBenefits: "Enter scheme benefits",
    schemePlaceholderApplicationProcess: "Enter application process",
    
    // Profile Section
    profileSection: {
      personalDetails: "Personal Details",
      professionalDetails: "Professional Details",
      contactDetails: "Contact Details",
      name: "Name",
      age: "Age",
      gender: "Gender",
      qualification: "Qualification",
      specialization: "Specialization",
      experience: "Years of Experience",
      registrationNumber: "Government Registration Number",
      office: "Office/Department",
      designation: "Designation",
      jurisdiction: "Jurisdiction Area",
      email: "Email",
      phone: "Phone",
      address: "Address",
      emergencyContact: "Emergency Contact",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel"
    },
    
    // Dashboard Stats
    totalMigrants: "Total Migrants",
    activeDoctors: "Active Doctors",
    totalNotifications: "Total Notifications",
    activeSchemes: "Active Schemes",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",
    
    // Language Selection
    selectLanguage: "Select Language",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    malayalam: "മലയാളം",
    
    // Common Terms
    healthOfficial: "Health Official",
    department: "Department",
    officialId: "Official ID",
    region: "Region",
    centralRegion: "Central Region",
    healthDepartment: "Health Department",
    publicHealth: "Public Health",
    notProvided: "Not provided",
    
    // Messages and Alerts
    dataLoadError: "Failed to load data",
    networkError: "Network connection error",
    tryAgainLater: "Please try again later",
    success: "Success",
    failed: "Failed",
    processing: "Processing...",
    
    // Form Labels
    required: "Required",
    optional: "Optional",
    selectOption: "Select an option",
    enterText: "Enter text",
    chooseDate: "Choose date",
    
    // Actions
    create: "Create",
    update: "Update",
    refresh: "Refresh",
    filter: "Filter",
    sort: "Sort",
    export: "Export",
    import: "Import",
    print: "Print",
    
    // Profile Management
    manageHealthOfficialInfo: "Manage your health official information",
    healthOfficerRole: "Health Officer"
  },
  
  hi: {
    // Navigation and Basic UI
    title: "स्वास्थ्य अधिकारी डैशबोर्ड",
    wellnessWebDashboard: "वेलनेस वेब स्वास्थ्य डैशबोर्ड",
    welcome: "स्वागत",
    qrScan: "क्यूआर स्कैनर",
    notifications: "सूचनाएं",
    profile: "मेरी प्रोफाइल",
    logout: "लॉग आउट",
    home: "होम",
    loading: "लोड हो रहा है...",
    error: "डेटा लोड करने में त्रुटि",
    retry: "पुनः प्रयास करें",
    save: "सेव करें",
    cancel: "रद्द करें",
    delete: "डिलीट करें",
    edit: "संपादित करें",
    view: "देखें",
    close: "बंद करें",
    
    // Notifications
    createNotification: "सूचना बनाएं",
    editNotification: "सूचना संपादित करें",
    deleteNotification: "डिलीट करें",
    notificationTitle: "शीर्षक",
    notificationMessage: "संदेश",
    notificationRegion: "क्षेत्र",
    notificationType: "प्रकार",
    confirmDelete: "क्या आप वाकई इस सूचना को डिलीट करना चाहते हैं?",
    noNotifications: "कोई सूचना उपलब्ध नहीं",
    notificationCreated: "सूचना सफलतापूर्वक बनाई गई",
    notificationUpdated: "सूचना सफलतापूर्वक अपडेट की गई",
    notificationDeleted: "सूचना सफलतापूर्वक डिलीट की गई",
    affectedWorkers: "कार्यकर्ताओं को यह सूचना मिलेगी",
    selectRegion: "क्षेत्र चुनें",
    allRegions: "सभी क्षेत्र",
    urgent: "तत्काल",
    info: "जानकारी",
    alert: "चेतावनी",
    general: "सामान्य",
    
    // Search
    search: "खोजें",
    searchMigrant: "प्रवासी खोजें",
    searchDoctor: "डॉक्टर खोजें",
    abhaNumber: "आभा संख्या",
    healthPid: "स्वास्थ्य पेशेवर आईडी",
    searchResults: "खोज परिणाम",
    migrantDetails: "प्रवासी विवरण",
    doctorDetails: "डॉक्टर विवरण",
    noResultsFound: "कोई परिणाम नहीं मिला",
    searchPlaceholderMigrant: "प्रवासी खोजने के लिए आभा संख्या दर्ज करें",
    searchPlaceholderDoctor: "डॉक्टर खोजने के लिए स्वास्थ्य पेशेवर आईडी दर्ज करें",
    clearSearch: "खोज साफ़ करें",
    
    // Government Schemes
    schemes: "सरकारी योजनाएं",
    createScheme: "योजना बनाएं",
    editScheme: "योजना संपादित करें",
    deleteScheme: "योजना डिलीट करें",
    schemeTitle: "योजना का शीर्षक",
    schemeDescription: "विवरण",
    schemeEligibility: "पात्रता मानदंड",
    schemeBenefits: "लाभ",
    schemeApplicationProcess: "आवेदन प्रक्रिया",
    schemeValidFrom: "से वैध",
    schemeValidUntil: "तक वैध",
    schemeRegion: "लक्षित क्षेत्र",
    noSchemes: "कोई सरकारी योजना उपलब्ध नहीं",
    schemeCreated: "योजना सफलतापूर्वक बनाई गई",
    schemeUpdated: "योजना सफलतापूर्वक अपडेट की गई",
    schemeDeleted: "योजना सफलतापूर्वक डिलीट की गई",
    confirmDeleteScheme: "क्या आप वाकई इस योजना को डिलीट करना चाहते हैं?",
    allRegionsScheme: "सभी क्षेत्र",
    activeScheme: "सक्रिय",
    expiredScheme: "समाप्त",
    schemePlaceholderTitle: "योजना शीर्षक दर्ज करें",
    schemePlaceholderDescription: "योजना विवरण दर्ज करें",
    schemePlaceholderEligibility: "पात्रता मानदंड दर्ज करें",
    schemePlaceholderBenefits: "योजना लाभ दर्ज करें",
    schemePlaceholderApplicationProcess: "आवेदन प्रक्रिया दर्ज करें",
    
    // Profile Section
    profileSection: {
      personalDetails: "व्यक्तिगत विवरण",
      professionalDetails: "पेशेवर विवरण",
      contactDetails: "संपर्क विवरण",
      name: "नाम",
      age: "आयु",
      gender: "लिंग",
      qualification: "योग्यता",
      specialization: "विशेषज्ञता",
      experience: "अनुभव के वर्ष",
      registrationNumber: "सरकारी पंजीकरण संख्या",
      office: "कार्यालय/विभाग",
      designation: "पदनाम",
      jurisdiction: "क्षेत्राधिकार",
      email: "ईमेल",
      phone: "फोन",
      address: "पता",
      emergencyContact: "आपातकालीन संपर्क",
      edit: "संपादित करें",
      save: "सेव करें",
      cancel: "रद्द करें"
    },
    
    // Dashboard Stats
    totalMigrants: "कुल प्रवासी",
    activeDoctors: "सक्रिय डॉक्टर",
    totalNotifications: "कुल सूचनाएं",
    activeSchemes: "सक्रिय योजनाएं",
    recentActivity: "हाल की गतिविधि",
    quickActions: "त्वरित कार्य",
    
    // Language Selection
    selectLanguage: "भाषा चुनें",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    malayalam: "മലയാളം",
    
    // Common Terms
    healthOfficial: "स्वास्थ्य अधिकारी",
    department: "विभाग",
    officialId: "अधिकारी आईडी",
    region: "क्षेत्र",
    centralRegion: "केंद्रीय क्षेत्र",
    healthDepartment: "स्वास्थ्य विभाग",
    publicHealth: "सार्वजनिक स्वास्थ्य",
    notProvided: "प्रदान नहीं किया गया",
    
    // Messages and Alerts
    dataLoadError: "डेटा लोड करने में विफल",
    networkError: "नेटवर्क कनेक्शन त्रुटि",
    tryAgainLater: "कृपया बाद में पुनः प्रयास करें",
    success: "सफलता",
    failed: "विफल",
    processing: "प्रोसेसिंग...",
    
    // Form Labels
    required: "आवश्यक",
    optional: "वैकल्पिक",
    selectOption: "एक विकल्प चुनें",
    enterText: "टेक्स्ट दर्ज करें",
    chooseDate: "तारीख चुनें",
    
    // Actions
    create: "बनाएं",
    update: "अपडेट करें",
    refresh: "रिफ्रेश करें",
    filter: "फिल्टर करें",
    sort: "सॉर्ट करें",
    export: "एक्सपोर्ट करें",
    import: "इम्पोर्ट करें",
    print: "प्रिंट करें",
    
    // Profile Management
    manageHealthOfficialInfo: "अपनी स्वास्थ्य अधिकारी जानकारी प्रबंधित करें",
    healthOfficerRole: "स्वास्थ्य अधिकारी"
  },
  
  ta: {
    // Navigation and Basic UI
    title: "ஆரோக்கிய அதிகாரி டாஷ்போர்டு",
    wellnessWebDashboard: "வெல்னெஸ் வெப் ஆரோக்கிய டாஷ்போர்டு",
    welcome: "வரவேற்கின்றோம்",
    qrScan: "QR ஸ்கேனர்",
    notifications: "அறிவிப்புகள்",
    profile: "என் சுயவிவரம்",
    logout: "வெளியேறு",
    home: "முகப்பு",
    loading: "ஏற்றுகிறது...",
    error: "தகவல் ஏற்றுவதில் பிழை",
    retry: "மீண்டும் முயற்சிக்கவும்",
    save: "சேமிக்கவும்",
    cancel: "ரத்துசெய்",
    delete: "நீக்கு",
    edit: "திருத்து",
    view: "பார்க்கவும்",
    close: "மூடு",
    
    // Notifications
    createNotification: "அறிவிப்பு உருவாக்கவும்",
    editNotification: "அறிவிப்பை திருத்தவும்",
    deleteNotification: "நீக்கு",
    notificationTitle: "தலைப்பு",
    notificationMessage: "செய்தி",
    notificationRegion: "பகுதி",
    notificationType: "வகை",
    confirmDelete: "இந்த அறிவிப்பை நீக்க விரும்புகிறீர்களா?",
    noNotifications: "எந்த அறிவிப்பும் இல்லை",
    notificationCreated: "அறிவிப்பு வெற்றிகரமாக உருவாக்கப்பட்டது",
    notificationUpdated: "அறிவிப்பு வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
    notificationDeleted: "அறிவிப்பு வெற்றிகரமாக நீக்கப்பட்டது",
    affectedWorkers: "தொழிலாளர்களுக்கு இந்த அறிவிப்பு கிடைக்கும்",
    selectRegion: "பகுதியைத் தேர்ந்தெடுக்கவும்",
    allRegions: "அனைத்து பகுதிகள்",
    urgent: "அவசர",
    info: "தகவல்",
    alert: "எச்சரிக்கை",
    general: "பொது",
    
    // Search
    search: "தேடல்",
    searchMigrant: "புலம்பெயர்ந்தோரைத் தேடவும்",
    searchDoctor: "மருத்துவரைத் தேடவும்",
    abhaNumber: "ஆபா எண்",
    healthPid: "சுகாதார தொழில்முறை அடையாள எண்",
    searchResults: "தேடல் முடிவுகள்",
    migrantDetails: "புலம்பெயர்ந்தோர் விவரங்கள்",
    doctorDetails: "மருத்துவர் விவரங்கள்",
    noResultsFound: "எந்த முடிவும் இல்லை",
    searchPlaceholderMigrant: "புலம்பெயர்ந்தோரைத் தேட ஆபா எண்ணை உள்ளிடவும்",
    searchPlaceholderDoctor: "மருத்துவரைத் தேட சுகாதார தொழில்முறை அடையாள எண்ணை உள்ளிடவும்",
    clearSearch: "தேடலை அழிக்கவும்",
    
    // Government Schemes
    schemes: "அரசு திட்டங்கள்",
    createScheme: "திட்டத்தை உருவாக்கவும்",
    editScheme: "திட்டத்தை திருத்தவும்",
    deleteScheme: "திட்டத்தை நீக்கவும்",
    schemeTitle: "திட்ட தலைப்பு",
    schemeDescription: "விளக்கம்",
    schemeEligibility: "தகுதி அளவுகோல்கள்",
    schemeBenefits: "நன்மைகள்",
    schemeApplicationProcess: "விண்ணப்ப செயல்முறை",
    schemeValidFrom: "இலிருந்து செல்லுபடியாகும்",
    schemeValidUntil: "வரை செல்லுபடியாகும்",
    schemeRegion: "இலக்கு பகுதி",
    noSchemes: "எந்த அரசு திட்டமும் இல்லை",
    schemeCreated: "திட்டம் வெற்றிகரமாக உருவாக்கப்பட்டது",
    schemeUpdated: "திட்டம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
    schemeDeleted: "திட்டம் வெற்றிகரமாக நீக்கப்பட்டது",
    confirmDeleteScheme: "இந்த திட்டத்தை நீக்க விரும்புகிறீர்களா?",
    allRegionsScheme: "அனைத்து பகுதிகள்",
    activeScheme: "செயலில்",
    expiredScheme: "முடிவடைந்தது",
    schemePlaceholderTitle: "திட்ட தலைப்பை உள்ளிடவும்",
    schemePlaceholderDescription: "திட்ட விளக்கத்தை உள்ளிடவும்",
    schemePlaceholderEligibility: "தகுதி அளவுகோல்களை உள்ளிடவும்",
    schemePlaceholderBenefits: "திட்ட நன்மைகளை உள்ளிடவும்",
    schemePlaceholderApplicationProcess: "விண்ணப்ப செயல்முறையை உள்ளிடவும்",
    
    // Profile Section
    profileSection: {
      personalDetails: "தனிப்பட்ட விவரங்கள்",
      professionalDetails: "தொழில்முறை விவரங்கள்",
      contactDetails: "தொடர்பு விவரங்கள்",
      name: "பெயர்",
      age: "வயது",
      gender: "பாலினம்",
      qualification: "தகுதி",
      specialization: "நிபுணத்துவம்",
      experience: "அனுபவ ஆண்டுகள்",
      registrationNumber: "அரசு பதிவு எண்",
      office: "அலுவலகம்/துறை",
      designation: "பதவி",
      jurisdiction: "அதிகார பகுதி",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி",
      address: "முகவரி",
      emergencyContact: "அவசர தொடர்பு",
      edit: "திருத்து",
      save: "சேமிக்கவும்",
      cancel: "ரத்துசெய்"
    },
    
    // Dashboard Stats
    totalMigrants: "மொத்த புலம்பெயர்ந்தோர்",
    activeDoctors: "செயலில் உள்ள மருத்துவர்கள்",
    totalNotifications: "மொத்த அறிவிப்புகள்",
    activeSchemes: "செயலில் உள்ள திட்டங்கள்",
    recentActivity: "சமீபத்திய செயல்பாடு",
    quickActions: "விரைவு செயல்கள்",
    
    // Language Selection
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    malayalam: "മലയാളം",
    
    // Common Terms
    healthOfficial: "ஆரோக்கிய அதிகாரி",
    department: "துறை",
    officialId: "அதிகாரி அடையாள எண்",
    region: "பகுதி",
    centralRegion: "மத்திய பகுதி",
    healthDepartment: "சுகாதார துறை",
    publicHealth: "பொது சுகாதாரம்",
    notProvided: "வழங்கப்படவில்லை",
    
    // Messages and Alerts
    dataLoadError: "தகவல் ஏற்றுவதில் தோல்வி",
    networkError: "நெட்வொர்க் இணைப்பு பிழை",
    tryAgainLater: "தயவுசெய்து பின்னர் மீண்டும் முயற்சிக்கவும்",
    success: "வெற்றி",
    failed: "தோல்வி",
    processing: "செயலாக்கம்...",
    
    // Form Labels
    required: "தேவை",
    optional: "விருப்பத்தேர்வு",
    selectOption: "ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்",
    enterText: "உரையை உள்ளிடவும்",
    chooseDate: "தேதியைத் தேர்ந்தெடுக்கவும்",
    
    // Actions
    create: "உருவாக்கு",
    update: "புதுப்பிக்கவும்",
    refresh: "புதுப்பிக்கவும்",
    filter: "வடிகட்டு",
    sort: "வரிசைப்படுத்து",
    export: "ஏற்றுமதி",
    import: "இறக்குமதி",
    print: "அச்சிடு",
    
    // Profile Management
    manageHealthOfficialInfo: "உங்கள் சுகாதார அதிகாரி தகவலை நிர்வகிக்கவும்",
    healthOfficerRole: "சுகாதார அதிகாரி"
  },
  
  ml: {
    // Navigation and Basic UI
    title: "ആരോഗ്യ ഉദ്യോഗസ്ഥ ഡാഷ്ബോർഡ്",
    wellnessWebDashboard: "വെൽനെസ് വെബ് ആരോഗ്യ ഡാഷ്ബോർഡ്",
    welcome: "സ്വാഗതം",
    qrScan: "QR സ്കാനർ",
    notifications: "അറിയിപ്പുകൾ",
    profile: "എന്റെ പ്രൊഫൈൽ",
    logout: "പുറത്തുകടക്കുക",
    home: "ഹോം",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    error: "ഡാറ്റ ലോഡ് ചെയ്യുന്നതിൽ പിശക്",
    retry: "വീണ്ടും ശ്രമിക്കുക",
    save: "സേവ് ചെയ്യുക",
    cancel: "റദ്ദാക്കുക",
    delete: "ഇല്ലാതാക്കുക",
    edit: "എഡിറ്റ് ചെയ്യുക",
    view: "കാണുക",
    close: "അടയ്ക്കുക",
    
    // Notifications
    createNotification: "അറിയിപ്പ് സൃഷ്ടിക്കുക",
    editNotification: "അറിയിപ്പ് എഡിറ്റ് ചെയ്യുക",
    deleteNotification: "ഇല്ലാതാക്കുക",
    notificationTitle: "തലക്കെട്ട്",
    notificationMessage: "സന്ദേശം",
    notificationRegion: "പ്രദേശം",
    notificationType: "തരം",
    confirmDelete: "ഈ അറിയിപ്പ് ഇല്ലാതാക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?",
    noNotifications: "അറിയിപ്പുകൾ ലഭ്യമല്ല",
    notificationCreated: "അറിയിപ്പ് വിജയകരമായി സൃഷ്ടിച്ചു",
    notificationUpdated: "അറിയിപ്പ് വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു",
    notificationDeleted: "അറിയിപ്പ് വിജയകരമായി ഇല്ലാതാക്കി",
    affectedWorkers: "തൊഴിലാളികൾക്ക് ഈ അറിയിപ്പ് ലഭിക്കും",
    selectRegion: "പ്രദേശം തിരഞ്ഞെടുക്കുക",
    allRegions: "എല്ലാ പ്രദേശങ്ങളും",
    urgent: "അടിയന്തിര",
    info: "വിവരം",
    alert: "മുന്നറിയിപ്പ്",
    general: "പൊതുവായ",
    
    // Search
    search: "തിരയുക",
    searchMigrant: "കുടിയേറ്റക്കാരനെ തിരയുക",
    searchDoctor: "ഡോക്ടറെ തിരയുക",
    abhaNumber: "ആഭാ നമ്പർ",
    healthPid: "ആരോഗ്യ പ്രൊഫഷണൽ ഐഡി",
    searchResults: "തിരയൽ ഫലങ്ങൾ",
    migrantDetails: "കുടിയേറ്റക്കാരന്റെ വിശദാംശങ്ങൾ",
    doctorDetails: "ഡോക്ടറുടെ വിശദാംശങ്ങൾ",
    noResultsFound: "ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല",
    searchPlaceholderMigrant: "കുടിയേറ്റക്കാരനെ തിരയാൻ ആഭാ നമ്പർ നൽകുക",
    searchPlaceholderDoctor: "ഡോക്ടറെ തിരയാൻ ആരോഗ്യ പ്രൊഫഷണൽ ഐഡി നൽകുക",
    clearSearch: "തിരയൽ മായ്ക്കുക",
    
    // Government Schemes
    schemes: "സർക്കാർ പദ്ധതികൾ",
    createScheme: "പദ്ധതി സൃഷ്ടിക്കുക",
    editScheme: "പദ്ധതി എഡിറ്റ് ചെയ്യുക",
    deleteScheme: "പദ്ധതി ഇല്ലാതാക്കുക",
    schemeTitle: "പദ്ധതിയുടെ തലക്കെട്ട്",
    schemeDescription: "വിവരണം",
    schemeEligibility: "യോഗ്യതാ മാനദണ്ഡങ്ങൾ",
    schemeBenefits: "ആനുകൂല്യങ്ങൾ",
    schemeApplicationProcess: "അപേക്ഷാ പ്രക്രിയ",
    schemeValidFrom: "മുതൽ സാധുവായിരിക്കും",
    schemeValidUntil: "വരെ സാധുവായിരിക്കും",
    schemeRegion: "ലക്ഷ്യ പ്രദേശം",
    noSchemes: "സർക്കാർ പദ്ധതികൾ ലഭ്യമല്ല",
    schemeCreated: "പദ്ധതി വിജയകരമായി സൃഷ്ടിച്ചു",
    schemeUpdated: "പദ്ധതി വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു",
    schemeDeleted: "പദ്ധതി വിജയകരമായി ഇല്ലാതാക്കി",
    confirmDeleteScheme: "ഈ പദ്ധതി ഇല്ലാതാക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?",
    allRegionsScheme: "എല്ലാ പ്രദേശങ്ങളും",
    activeScheme: "സജീവമായ",
    expiredScheme: "കാലഹരണപ്പെട്ട",
    schemePlaceholderTitle: "പദ്ധതിയുടെ തലക്കെട്ട് നൽകുക",
    schemePlaceholderDescription: "പദ്ധതിയുടെ വിവരണം നൽകുക",
    schemePlaceholderEligibility: "യോഗ്യതാ മാനദണ്ഡങ്ങൾ നൽകുക",
    schemePlaceholderBenefits: "പദ്ധതിയുടെ ആനുകൂല്യങ്ങൾ നൽകുക",
    schemePlaceholderApplicationProcess: "അപേക്ഷാ പ്രക്രിയ നൽകുക",
    
    // Profile Section
    profileSection: {
      personalDetails: "വ്യക്തിഗത വിശദാംശങ്ങൾ",
      professionalDetails: "പ്രൊഫഷണൽ വിശദാംശങ്ങൾ",
      contactDetails: "ബന്ധപ്പെടാനുള്ള വിശദാംശങ്ങൾ",
      name: "പേര്",
      age: "വയസ്സ്",
      gender: "ലിംഗം",
      qualification: "യോഗ്യത",
      specialization: "സ്പെഷ്യലൈസേഷൻ",
      experience: "അനുഭവ വർഷങ്ങൾ",
      registrationNumber: "സർക്കാർ രജിസ്ട്രേഷൻ നമ്പർ",
      office: "ഓഫീസ്/ഡിപ്പാർട്ട്മെന്റ്",
      designation: "പദവി",
      jurisdiction: "അധികാര പരിധി",
      email: "ഇമെയിൽ",
      phone: "ഫോൺ",
      address: "വിലാസം",
      emergencyContact: "അടിയന്തിര ബന്ധപ്പെടൽ",
      edit: "എഡിറ്റ് ചെയ്യുക",
      save: "സേവ് ചെയ്യുക",
      cancel: "റദ്ദാക്കുക"
    },
    
    // Dashboard Stats
    totalMigrants: "മൊത്തം കുടിയേറ്റക്കാർ",
    activeDoctors: "സജീവ ഡോക്ടർമാർ",
    totalNotifications: "മൊത്തം അറിയിപ്പുകൾ",
    activeSchemes: "സജീവ പദ്ധതികൾ",
    recentActivity: "സമീപകാല പ്രവർത്തനം",
    quickActions: "വേഗത്തിലുള്ള പ്രവർത്തനങ്ങൾ",
    
    // Language Selection
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    malayalam: "മലയാളം",
    
    // Common Terms
    healthOfficial: "ആരോഗ്യ ഉദ്യോഗസ്ഥൻ",
    department: "വകുപ്പ്",
    officialId: "ഉദ്യോഗസ്ഥ ഐഡി",
    region: "പ്രദേശം",
    centralRegion: "കേന്ദ്ര പ്രദേശം",
    healthDepartment: "ആരോഗ്യ വകുപ്പ്",
    publicHealth: "പൊതുജനാരോഗ്യം",
    notProvided: "നൽകിയിട്ടില്ല",
    
    // Messages and Alerts
    dataLoadError: "ഡാറ്റ ലോഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു",
    networkError: "നെറ്റ്‌വർക്ക് കണക്ഷൻ പിശക്",
    tryAgainLater: "ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക",
    success: "വിജയം",
    failed: "പരാജയപ്പെട്ടു",
    processing: "പ്രോസസ്സിംഗ്...",
    
    // Form Labels
    required: "ആവശ്യമായ",
    optional: "ഓപ്ഷണൽ",
    selectOption: "ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക",
    enterText: "ടെക്സ്റ്റ് നൽകുക",
    chooseDate: "തീയതി തിരഞ്ഞെടുക്കുക",
    
    // Actions
    create: "സൃഷ്ടിക്കുക",
    update: "അപ്ഡേറ്റ് ചെയ്യുക",
    refresh: "പുതുക്കുക",
    filter: "ഫിൽട്ടർ",
    sort: "ക്രമീകരിക്കുക",
    export: "എക്സ്പോർട്ട്",
    import: "ഇമ്പോർട്ട്",
    print: "പ്രിന്റ്",
    
    // Profile Management
    manageHealthOfficialInfo: "നിങ്ങളുടെ ആരോഗ്യ ഉദ്യോഗസ്ഥ വിവരങ്ങൾ നിയന്ത്രിക്കുക",
    healthOfficerRole: "ആരോഗ്യ ഉദ്യോഗസ്ഥൻ"
  }
};

export default function HealthOfficialHome() {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Loading and error states
  const [loading, setLoading] = useState({
    profile: false,
    notifications: false,
    schemes: false
  });

  const [error, setError] = useState({
    profile: null,
    notifications: null,
    schemes: null
  });

  const [success, setSuccess] = useState({
    profile: null,
    notifications: null,
    schemes: null
  });

  // Data states
  const [officialProfile, setOfficialProfile] = useState(null);
  const [profileFormData, setProfileFormData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [schemes, setSchemes] = useState([
    // Sample schemes for demonstration
    {
      id: 1,
      title: "Ayushman Bharat Health Scheme",
      description: "Comprehensive health coverage for migrant workers and their families with cashless treatment up to ₹5 lakhs per year.",
      eligibility: "Migrant workers with valid ABHA card and annual income below ₹3 lakhs",
      benefits: "Free hospitalization, medicines, diagnostics, and emergency care",
      applicationProcess: "Apply online through official portal with required documents",
      region: "All Regions",
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Maternal Health Care Scheme",
      description: "Special healthcare support for pregnant migrant workers including pre and post-natal care.",
      eligibility: "Pregnant women working in construction, agriculture, and domestic sectors",
      benefits: "Free delivery, nutritional support, and childcare assistance",
      applicationProcess: "Register at nearest health center with pregnancy confirmation",
      region: "Kerala",
      validFrom: "2024-03-01",
      validUntil: "2025-02-28",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Emergency Medical Assistance",
      description: "24/7 emergency medical support for migrant workers in case of accidents or sudden illness.",
      eligibility: "All registered migrant workers with valid identification",
      benefits: "Immediate medical attention, ambulance service, and emergency surgery coverage",
      applicationProcess: "Contact emergency helpline or visit nearest government hospital",
      region: "Tamil Nadu",
      validFrom: "2024-01-15",
      validUntil: "2024-12-15",
      createdAt: new Date().toISOString()
    }
  ]);

  // Form states
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    region: '',
    type: 'announcement'
  });

  // Government Scheme form states
  const [showSchemeForm, setShowSchemeForm] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [schemeForm, setSchemeForm] = useState({
    title: '',
    description: '',
    eligibility: '',
    benefits: '',
    applicationProcess: '',
    validFrom: '',
    validUntil: '',
    region: ''
  });

  // Search states
  const [searchForm, setSearchForm] = useState({
    migrantAbha: '',
    doctorHealthPid: ''
  });
  const [searchResults, setSearchResults] = useState({
    migrant: null,
    doctor: null
  });
  const [searchLoading, setSearchLoading] = useState({
    migrant: false,
    doctor: false
  });
  const [searchError, setSearchError] = useState({
    migrant: null,
    doctor: null
  });

  // Initialize from sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setOfficialProfile(parsedUser);
        setProfileFormData(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        handleLogout();
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  // Load data based on active tab
  useEffect(() => {
    if (officialProfile) {
      switch (activeTab) {
        case 'notifications':
          loadNotifications();
          break;
        case 'schemes':
          loadSchemes();
          break;
        default:
          break;
      }
    }
  }, [activeTab, officialProfile]);

  const setLoadingState = (key, value) => {
    setLoading(prev => ({ ...prev, [key]: value }));
  };

  const setErrorState = (key, value) => {
    setError(prev => ({ ...prev, [key]: value }));
  };

  const setSuccessState = (key, value) => {
    setSuccess(prev => ({ ...prev, [key]: value }));
    // Auto-clear success message after 3 seconds
    if (value) {
      setTimeout(() => {
        setSuccess(prev => ({ ...prev, [key]: null }));
      }, 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await officialAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.clear();
      window.location.href = '/login';
    }
  };

  const loadNotifications = async () => {
    setLoadingState('notifications', true);
    setErrorState('notifications', null);
    try {
      const response = await officialAPI.getNotifications();
      if (response.success && response.notifications) {
        setNotifications(response.notifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      setErrorState('notifications', 'Failed to load notifications');
      setNotifications([]);
    } finally {
      setLoadingState('notifications', false);
    }
  };

  const loadSchemes = async () => {
    setLoadingState('schemes', true);
    setErrorState('schemes', null);
    
    try {
      // For now, just keep existing schemes in state
      // No API call needed since we're managing schemes in frontend
      setErrorState('schemes', null);
      
      // TODO: Make API call to backend when endpoints are ready
      // const response = await officialAPI.getSchemes();
      // if (response.success && response.schemes) {
      //   setSchemes(response.schemes);
      // }
      
    } catch (error) {
      console.error('Error loading schemes:', error);
      setErrorState('schemes', 'Failed to load schemes');
    } finally {
      setLoadingState('schemes', false);
    }
  };

  const handleCreateNotification = async () => {
    if (!notificationForm.title || !notificationForm.message) {
      setErrorState('notifications', 'Title and message are required');
      return;
    }

    setLoadingState('notifications', true);
    try {
      const response = await officialAPI.createNotification(
        notificationForm.title,
        notificationForm.message,
        notificationForm.region || null,
        notificationForm.type
      );
      
      if (response.success || response.notification) {
        setShowNotificationForm(false);
        setNotificationForm({ title: '', message: '', region: '', type: 'announcement' });
        setErrorState('notifications', null);
        
        // Reload notifications to show the newly created one
        await loadNotifications();
      } else {
        setErrorState('notifications', response.error || 'Failed to create notification');
        setLoadingState('notifications', false);
      }
    } catch (error) {
      console.error('Error creating notification:', error);
      setErrorState('notifications', 'Failed to create notification');
      setLoadingState('notifications', false);
    }
  };

  const handleEditNotification = async () => {
    setLoadingState('notifications', true);
    try {
      const response = await officialAPI.updateNotification(editingNotification.id, notificationForm);
      
      if (response.success || response.notification) {
        setEditingNotification(null);
        setNotificationForm({ title: '', message: '', region: '', type: 'announcement' });
        loadNotifications();
        setErrorState('notifications', null);
      } else {
        setErrorState('notifications', response.error || 'Failed to update notification');
      }
    } catch (error) {
      console.error('Error updating notification:', error);
      setErrorState('notifications', 'Failed to update notification');
    } finally {
      setLoadingState('notifications', false);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;

    try {
      setLoadingState('notifications', true);
      setErrorState('notifications', null);
      setSuccessState('notifications', null);
      
      const response = await officialAPI.deleteNotification(id);
      
      if (response.success) {
        // Immediately remove the notification from the local state for better UX
        setNotifications(prevNotifications => 
          prevNotifications.filter(notification => notification.id !== id)
        );
        setSuccessState('notifications', 'Notification deleted successfully');
        setErrorState('notifications', null);
      } else {
        setErrorState('notifications', response.error || 'Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      setErrorState('notifications', 'Failed to delete notification');
    } finally {
      setLoadingState('notifications', false);
    }
  };

  // Government Scheme Management Functions
  const handleCreateScheme = async () => {
    if (!schemeForm.title || !schemeForm.description) {
      setErrorState('schemes', 'Title and description are required');
      return;
    }

    setLoadingState('schemes', true);
    
    try {
      // Create a new scheme object for frontend display
      const newScheme = {
        id: Date.now(), // Use timestamp as temporary ID
        title: schemeForm.title,
        description: schemeForm.description,
        eligibility: schemeForm.eligibility,
        benefits: schemeForm.benefits,
        applicationProcess: schemeForm.applicationProcess,
        region: schemeForm.region || null,
        validFrom: schemeForm.validFrom,
        validUntil: schemeForm.validUntil,
        createdAt: new Date().toISOString()
      };

      // Add to frontend state immediately
      setSchemes(prevSchemes => [newScheme, ...prevSchemes]);
      
      // Reset form and close modal
      setShowSchemeForm(false);
      setSchemeForm({
        title: '',
        description: '',
        eligibility: '',
        benefits: '',
        applicationProcess: '',
        validFrom: '',
        validUntil: '',
        region: ''
      });
      setErrorState('schemes', null);
      
      // TODO: Make API call to backend when endpoints are ready
      // const response = await officialAPI.createScheme(
      //   schemeForm.title,
      //   schemeForm.description,
      //   schemeForm.eligibility,
      //   schemeForm.benefits,
      //   schemeForm.applicationProcess,
      //   schemeForm.validFrom,
      //   schemeForm.validUntil,
      //   schemeForm.region || null
      // );
      
    } catch (error) {
      console.error('Error creating scheme:', error);
      setErrorState('schemes', 'Failed to create scheme');
    } finally {
      setLoadingState('schemes', false);
    }
  };

  const handleEditScheme = async () => {
    setLoadingState('schemes', true);
    try {
      const response = await officialAPI.updateScheme(editingScheme.id, schemeForm);
      
      if (response.success || response.scheme) {
        setEditingScheme(null);
        setSchemeForm({
          title: '',
          description: '',
          eligibility: '',
          benefits: '',
          applicationProcess: '',
          validFrom: '',
          validUntil: '',
          region: ''
        });
        loadSchemes();
        setErrorState('schemes', null);
      } else {
        setErrorState('schemes', response.error || 'Failed to update scheme');
      }
    } catch (error) {
      console.error('Error updating scheme:', error);
      setErrorState('schemes', 'Failed to update scheme');
    } finally {
      setLoadingState('schemes', false);
    }
  };

  const handleDeleteScheme = async (id) => {
    if (!window.confirm(t('confirmDeleteScheme'))) return;

    try {
      // Remove from frontend state immediately
      setSchemes(prevSchemes => prevSchemes.filter(scheme => scheme.id !== id));
      setErrorState('schemes', null);
      
      // TODO: Make API call to backend when endpoints are ready
      // const response = await officialAPI.deleteScheme(id);
      
    } catch (error) {
      console.error('Error deleting scheme:', error);
      setErrorState('schemes', 'Failed to delete scheme');
    }
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
    setProfileFormData({ ...officialProfile });
  };

  const handleProfileSave = () => {
    setOfficialProfile({ ...profileFormData });
    sessionStorage.setItem('authUser', JSON.stringify(profileFormData));
    setIsEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setProfileFormData({ ...officialProfile });
    setIsEditingProfile(false);
  };

  const handleInputChange = (field, value) => {
    setProfileFormData(prev => ({ ...prev, [field]: value }));
  };

  // Search handlers
  const handleSearchMigrant = async () => {
    if (!searchForm.migrantAbha.trim()) {
      setSearchError(prev => ({ ...prev, migrant: 'Please enter ABHA number' }));
      return;
    }

    setSearchLoading(prev => ({ ...prev, migrant: true }));
    setSearchError(prev => ({ ...prev, migrant: null }));

    try {
      const response = await officialAPI.searchMigrant(searchForm.migrantAbha.trim());
      
      if (response.success) {
        setSearchResults(prev => ({ ...prev, migrant: response.migrant }));
      } else {
        setSearchError(prev => ({ ...prev, migrant: response.error || 'Failed to search migrant' }));
        setSearchResults(prev => ({ ...prev, migrant: null }));
      }
    } catch (error) {
      console.error('Error searching migrant:', error);
      setSearchError(prev => ({ ...prev, migrant: 'Failed to search migrant' }));
      setSearchResults(prev => ({ ...prev, migrant: null }));
    } finally {
      setSearchLoading(prev => ({ ...prev, migrant: false }));
    }
  };

  const handleSearchDoctor = async () => {
    if (!searchForm.doctorHealthPid.trim()) {
      setSearchError(prev => ({ ...prev, doctor: 'Please enter Health Professional ID' }));
      return;
    }

    setSearchLoading(prev => ({ ...prev, doctor: true }));
    setSearchError(prev => ({ ...prev, doctor: null }));

    try {
      const response = await officialAPI.searchDoctor(searchForm.doctorHealthPid.trim());
      
      if (response.success) {
        setSearchResults(prev => ({ ...prev, doctor: response.doctor }));
      } else {
        setSearchError(prev => ({ ...prev, doctor: response.error || 'Failed to search doctor' }));
        setSearchResults(prev => ({ ...prev, doctor: null }));
      }
    } catch (error) {
      console.error('Error searching doctor:', error);
      setSearchError(prev => ({ ...prev, doctor: 'Failed to search doctor' }));
      setSearchResults(prev => ({ ...prev, doctor: null }));
    } finally {
      setSearchLoading(prev => ({ ...prev, doctor: false }));
    }
  };

  const handleClearSearch = (type) => {
    if (type === 'migrant') {
      setSearchForm(prev => ({ ...prev, migrantAbha: '' }));
      setSearchResults(prev => ({ ...prev, migrant: null }));
      setSearchError(prev => ({ ...prev, migrant: null }));
    } else if (type === 'doctor') {
      setSearchForm(prev => ({ ...prev, doctorHealthPid: '' }));
      setSearchResults(prev => ({ ...prev, doctor: null }));
      setSearchError(prev => ({ ...prev, doctor: null }));
    }
  };

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <RefreshCw className="animate-spin" size={24} style={{ color: '#3b82f6' }} />
      <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>{t('loading')}</span>
    </div>
  );

  const ErrorMessage = ({ message, onRetry }) => (
    <div style={{
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0'
    }}>
      <p style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {t('retry')}
        </button>
      )}
    </div>
  );

  const SuccessMessage = ({ message }) => (
    <div style={{
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <CheckCircle size={20} style={{ color: '#16a34a' }} />
      <p style={{ color: '#16a34a', margin: 0, fontWeight: '500' }}>{message}</p>
    </div>
  );

  // Notifications Management Component
  const NotificationsSection = () => {
    if (loading.notifications) return <LoadingSpinner />;
    if (error.notifications) return <ErrorMessage message={error.notifications} onRetry={loadNotifications} />;

    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1rem" }}>
        {/* Success Message */}
        {success.notifications && <SuccessMessage message={success.notifications} />}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3>{t('notifications')}</h3>
          <button
            onClick={() => setShowNotificationForm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            {t('createNotification')}
          </button>
        </div>

        {/* Notification Form */}
        {(showNotificationForm || editingNotification) && (
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>
              {editingNotification ? t('editNotification') : t('createNotification')}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('notificationTitle')}</label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('notificationRegion')}</label>
                <select
                  value={notificationForm.region}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, region: e.target.value }))}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                >
                  <option value="">{t('allRegions')}</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('notificationType')}</label>
                <select
                  value={notificationForm.type}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, type: e.target.value }))}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                >
                  <option value="announcement">Announcement</option>
                  <option value="health_camp">Health Camp</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('notificationMessage')}</label>
              <textarea
                value={notificationForm.message}
                onChange={(e) => setNotificationForm(prev => ({ ...prev, message: e.target.value }))}
                style={{ width: '100%', height: '100px', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={editingNotification ? handleEditNotification : handleCreateNotification}
                disabled={loading.notifications}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: loading.notifications ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading.notifications ? 'not-allowed' : 'pointer'
                }}
              >
                {loading.notifications ? t('loading') : t('save')}
              </button>
              <button
                onClick={() => {
                  setShowNotificationForm(false);
                  setEditingNotification(null);
                  setNotificationForm({ title: '', message: '', region: '', type: 'announcement' });
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        )}

        {/* Notifications List */}
        {notifications && notifications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notifications.map((notification, index) => (
              <div key={notification.id || index} style={{
                backgroundColor: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>{notification.title}</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <span>Region: {notification.region || 'All Regions'}</span>
                      <span>Type: {notification.type}</span>
                      {notification.createdAt && (
                        <span>Created: {new Date(notification.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setEditingNotification(notification);
                        setNotificationForm({
                          title: notification.title,
                          message: notification.message,
                          region: notification.region || '',
                          type: notification.type
                        });
                      }}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      disabled={loading.notifications}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: loading.notifications ? '#9ca3af' : '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading.notifications ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        opacity: loading.notifications ? 0.6 : 1,
                        transition: 'all 0.2s ease'
                      }}
                      title={t('deleteNotification')}
                    >
                      {loading.notifications ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
                <p style={{ margin: '0', color: '#374151' }}>{notification.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>{t('noNotifications')}</p>
        )}
      </div>
    );
  };

  // Government Schemes Management Component
  const SchemesSection = () => {
    if (loading.schemes) return <LoadingSpinner />;
    if (error.schemes) return <ErrorMessage message={error.schemes} onRetry={loadSchemes} />;

    return (
      <div style={{ padding: "2rem", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ 
          textAlign: "center", 
          marginBottom: "2rem",
          borderBottom: "2px solid #f1f5f9",
          paddingBottom: "1rem"
        }}>
          <h2 style={{ 
            margin: "0 0 0.5rem 0", 
            fontSize: "1.75rem", 
            fontWeight: "700",
            color: "#1f2937"
          }}>
            Government Health Schemes
          </h2>
          <p style={{ 
            margin: 0, 
            color: "#6b7280",
            fontSize: "1rem"
          }}>
            Create and manage government health schemes for migrant workers and healthcare professionals
          </p>
        </div>

        <div style={{ maxWidth: "100%", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>{t('schemes')}</h3>
            <button
              onClick={() => setShowSchemeForm(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#6d28d9';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <Plus size={16} />
              {t('createScheme')}
            </button>
          </div>

          {/* Scheme Form */}
          {(showSchemeForm || editingScheme) && (
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '2rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              border: '2px solid #e2e8f0',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h4 style={{ 
                marginBottom: '1.5rem',
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937"
              }}>
                {editingScheme ? t('editScheme') : t('createScheme')}
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeTitle')}</label>
                  <input
                    type="text"
                    value={schemeForm.title}
                    onChange={(e) => setSchemeForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('schemePlaceholderTitle')}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'border-color 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeRegion')}</label>
                  <select
                    value={schemeForm.region}
                    onChange={(e) => setSchemeForm(prev => ({ ...prev, region: e.target.value }))}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">{t('allRegionsScheme')}</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeValidFrom')}</label>
                  <input
                    type="date"
                    value={schemeForm.validFrom}
                    onChange={(e) => (setSchemeForm(prev => ({ ...prev, validFrom: e.target.value })))}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeValidUntil')}</label>
                  <input
                    type="date"
                    value={schemeForm.validUntil}
                    onChange={(e) => setSchemeForm(prev => ({ ...prev, validUntil: e.target.value }))}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeDescription')}</label>
                  <textarea
                    value={schemeForm.description}
                    onChange={(e) => setSchemeForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t('schemePlaceholderDescription')}
                    style={{ 
                      width: '100%', 
                      height: '100px', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeEligibility')}</label>
                  <textarea
                    value={schemeForm.eligibility}
                    onChange={(e) => setSchemeForm(prev => ({ ...prev, eligibility: e.target.value }))}
                    placeholder={t('schemePlaceholderEligibility')}
                    style={{ 
                      width: '100%', 
                      height: '80px', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeBenefits')}</label>
                  <textarea
                    value={schemeForm.benefits}
                    onChange={(e) => setSchemeForm(prev => ({ ...prev, benefits: e.target.value }))}
                    placeholder={t('schemePlaceholderBenefits')}
                    style={{ 
                      width: '100%', 
                      height: '80px', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: "#374151" }}>{t('schemeApplicationProcess')}</label>
                  <textarea
                    value={schemeForm.applicationProcess}
                    onChange={(e) => setSchemeForm(prev => ({ ...prev, applicationProcess: e.target.value }))}
                    placeholder={t('schemePlaceholderApplicationProcess')}
                    style={{ 
                      width: '100%', 
                      height: '80px', 
                      padding: '0.75rem', 
                      border: '2px solid #d1d5db', 
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={editingScheme ? handleEditScheme : handleCreateScheme}
                  disabled={loading.schemes}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: loading.schemes ? '#9ca3af' : '#7c3aed',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading.schemes ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {loading.schemes ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      {t('loading')}
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {t('save')}
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowSchemeForm(false);
                    setEditingScheme(null);
                    setSchemeForm({
                      title: '',
                      description: '',
                      eligibility: '',
                      benefits: '',
                      applicationProcess: '',
                      validFrom: '',
                      validUntil: '',
                      region: ''
                    });
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <X size={16} />
                  {t('cancel')}
                </button>
              </div>
            </div>
          )}

          {/* Schemes List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {schemes && schemes.length > 0 && schemes.map((scheme, index) => {
              const isExpired = scheme.validUntil && new Date(scheme.validUntil) < new Date();
              return (
                <div key={scheme.id || index} style={{
                  backgroundColor: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          margin: '0 0 0.5rem 0', 
                          color: '#1f2937',
                          fontSize: '1.1rem',
                          fontWeight: '600'
                        }}>
                          {scheme.title}
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                          <span>Region: {scheme.region || 'All Regions'}</span>
                          <span className={isExpired ? 'expired' : 'active'} style={{
                            color: isExpired ? '#dc2626' : '#059669',
                            fontWeight: '600'
                          }}>
                            {isExpired ? t('expiredScheme') : t('activeScheme')}
                          </span>
                        </div>
                        {(scheme.validFrom || scheme.validUntil) && (
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {scheme.validFrom && <span>From: {new Date(scheme.validFrom).toLocaleDateString()}</span>}
                            {scheme.validFrom && scheme.validUntil && <span> • </span>}
                            {scheme.validUntil && <span>Until: {new Date(scheme.validUntil).toLocaleDateString()}</span>}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingScheme(scheme);
                            setSchemeForm({
                              title: scheme.title,
                              description: scheme.description,
                              eligibility: scheme.eligibility || '',
                              benefits: scheme.benefits || '',
                              applicationProcess: scheme.applicationProcess || '',
                              validFrom: scheme.validFrom || '',
                              validUntil: scheme.validUntil || '',
                              region: scheme.region || ''
                            });
                          }}
                          style={{
                            padding: '0.5rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteScheme(scheme.id)}
                          style={{
                            padding: '0.5rem',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <p style={{ 
                      margin: '0 0 1rem 0', 
                      color: '#374151',
                      fontSize: '0.875rem',
                      lineHeight: '1.5'
                    }}>
                      {scheme.description}
                    </p>

                    {scheme.eligibility && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <h5 style={{ 
                          margin: '0 0 0.25rem 0', 
                          fontSize: '0.75rem', 
                          fontWeight: '600', 
                          color: '#7c3aed',
                          textTransform: 'uppercase'
                        }}>
                          Eligibility
                        </h5>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.75rem', 
                          color: '#6b7280',
                          lineHeight: '1.4'
                        }}>
                          {scheme.eligibility}
                        </p>
                      </div>
                    )}

                    {scheme.benefits && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <h5 style={{ 
                          margin: '0 0 0.25rem 0', 
                          fontSize: '0.75rem', 
                          fontWeight: '600', 
                          color: '#059669',
                          textTransform: 'uppercase'
                        }}>
                          Benefits
                        </h5>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.75rem', 
                          color: '#6b7280',
                          lineHeight: '1.4'
                        }}>
                          {scheme.benefits}
                        </p>
                      </div>
                    )}

                    {scheme.applicationProcess && (
                      <div>
                        <h5 style={{ 
                          margin: '0 0 0.25rem 0', 
                          fontSize: '0.75rem', 
                          fontWeight: '600', 
                          color: '#2563eb',
                          textTransform: 'uppercase'
                        }}>
                          Application Process
                        </h5>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.75rem', 
                          color: '#6b7280',
                          lineHeight: '1.4'
                        }}>
                          {scheme.applicationProcess}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
        </div>
      </div>
    );
  };

  // Search Component
  const SearchSection = () => (
    <div style={{ padding: "2rem", maxHeight: "90vh", overflow: "auto" }}>
      <div style={{ 
        textAlign: "center", 
        marginBottom: "2rem",
        borderBottom: "2px solid #f1f5f9",
        paddingBottom: "1rem"
      }}>
        <h2 style={{ 
          margin: "0 0 0.5rem 0", 
          fontSize: "1.75rem", 
          fontWeight: "700",
          color: "#1f2937"
        }}>
          Search Health Records
        </h2>
        <p style={{ 
          margin: 0, 
          color: "#6b7280",
          fontSize: "1rem"
        }}>
          Search for migrant workers by ABHA number or doctors by Health Professional ID
        </p>
      </div>

      {/* Search Sections Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '3rem',
        maxWidth: "1200px", 
        margin: "0 auto"
      }}>
        
        {/* Migrant Workers Search Section */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '16px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#dcfce7",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <User size={24} style={{ color: "#059669" }} />
            </div>
            <div>
              <h3 style={{ 
                margin: "0 0 0.25rem 0", 
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937" 
              }}>
                Search Migrant Workers
              </h3>
              <p style={{ 
                margin: 0, 
                color: "#6b7280",
                fontSize: "0.875rem"
              }}>
                Find migrant worker records using their ABHA number
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr auto auto', 
            gap: '1rem', 
            alignItems: 'end',
            marginBottom: '1.5rem' 
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: "#374151",
                fontSize: "0.875rem"
              }}>
                {t('abhaNumber')}
              </label>
              <input
                type="text"
                value={searchForm.migrantAbha}
                onChange={(e) => setSearchForm(prev => ({ ...prev, migrantAbha: e.target.value }))}
                placeholder={t('searchPlaceholderMigrant')}
                style={{ 
                  width: '100%', 
                  padding: '0.875rem', 
                  border: '2px solid #d1d5db', 
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <button
              onClick={handleSearchMigrant}
              disabled={searchLoading.migrant || !searchForm.migrantAbha.trim()}
              style={{
                padding: '0.875rem 1.5rem',
                backgroundColor: searchLoading.migrant ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: searchLoading.migrant || !searchForm.migrantAbha.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                fontWeight: '600',
                fontSize: '0.875rem',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                if (!searchLoading.migrant && searchForm.migrantAbha.trim()) {
                  e.target.style.backgroundColor = '#059669';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!searchLoading.migrant && searchForm.migrantAbha.trim()) {
                  e.target.style.backgroundColor = '#10b981';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {searchLoading.migrant ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Search
                </>
              )}
            </button>
            <button
              onClick={() => handleClearSearch('migrant')}
              style={{
                padding: '0.875rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4b5563';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#6b7280';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Migrant Search Error */}
          {searchError.migrant && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '2px solid #fecaca',
              borderRadius: '8px',
              padding: '1rem',
              color: '#dc2626',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              {searchError.migrant}
            </div>
          )}
          
          {/* Migrant Search Result */}
          {searchResults.migrant && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}>
                <CheckCircle size={20} style={{ color: "#059669" }} />
                <h4 style={{ margin: '0', color: '#15803d', fontSize: "1.1rem", fontWeight: "600" }}>
                  Migrant Worker Found
                </h4>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                fontSize: '0.875rem', 
                color: '#374151' 
              }}>
                <div>
                  <strong style={{ color: "#059669" }}>Name:</strong> {searchResults.migrant.name}
                </div>
                <div>
                  <strong style={{ color: "#059669" }}>ABHA:</strong> {searchResults.migrant.abhaNumber}
                </div>
                <div>
                  <strong style={{ color: "#059669" }}>Mobile:</strong> {searchResults.migrant.mobile}
                </div>
                <div>
                  <strong style={{ color: "#059669" }}>Region:</strong> {searchResults.migrant.region}
                </div>
                <div>
                  <strong style={{ color: "#059669" }}>Role:</strong> {searchResults.migrant.role}
                </div>
                {searchResults.migrant.abhaAddress && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <strong style={{ color: "#059669" }}>ABHA Address:</strong> {searchResults.migrant.abhaAddress}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Doctors Search Section */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '16px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#dbeafe",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Stethoscope size={24} style={{ color: "#2563eb" }} />
            </div>
            <div>
              <h3 style={{ 
                margin: "0 0 0.25rem 0", 
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937" 
              }}>
                Search Doctors
              </h3>
              <p style={{ 
                margin: 0, 
                color: "#6b7280",
                fontSize: "0.875rem"
              }}>
                Find doctor records using their Health Professional ID
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr auto auto', 
            gap: '1rem', 
            alignItems: 'end',
            marginBottom: '1.5rem' 
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: "#374151",
                fontSize: "0.875rem"
              }}>
                {t('healthPid')}
              </label>
              <input
                type="text"
                value={searchForm.doctorHealthPid}
                onChange={(e) => setSearchForm(prev => ({ ...prev, doctorHealthPid: e.target.value }))}
                placeholder={t('searchPlaceholderDoctor')}
                style={{ 
                  width: '100%', 
                  padding: '0.875rem', 
                  border: '2px solid #d1d5db', 
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <button
              onClick={handleSearchDoctor}
              disabled={searchLoading.doctor || !searchForm.doctorHealthPid.trim()}
              style={{
                padding: '0.875rem 1.5rem',
                backgroundColor: searchLoading.doctor ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: searchLoading.doctor || !searchForm.doctorHealthPid.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                fontWeight: '600',
                fontSize: '0.875rem',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                if (!searchLoading.doctor && searchForm.doctorHealthPid.trim()) {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!searchLoading.doctor && searchForm.doctorHealthPid.trim()) {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {searchLoading.doctor ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Search
                </>
              )}
            </button>
            <button
              onClick={() => handleClearSearch('doctor')}
              style={{
                padding: '0.875rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4b5563';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#6b7280';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Doctor Search Error */}
          {searchError.doctor && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '2px solid #fecaca',
              borderRadius: '8px',
              padding: '1rem',
              color: '#dc2626',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              {searchError.doctor}
            </div>
          )}
          
          {/* Doctor Search Result */}
          {searchResults.doctor && (
            <div style={{
              backgroundColor: '#eff6ff',
              border: '2px solid #bfdbfe',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}>
                <CheckCircle size={20} style={{ color: "#2563eb" }} />
                <h4 style={{ margin: '0', color: '#1d4ed8', fontSize: "1.1rem", fontWeight: "600" }}>
                  Doctor Found
                </h4>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                fontSize: '0.875rem', 
                color: '#374151' 
              }}>
                <div>
                  <strong style={{ color: "#2563eb" }}>Name:</strong> {searchResults.doctor.name}
                </div>
                <div>
                  <strong style={{ color: "#2563eb" }}>Health Professional ID:</strong> {searchResults.doctor.healthPid}
                </div>
                <div>
                  <strong style={{ color: "#2563eb" }}>Mobile:</strong> {searchResults.doctor.mobile}
                </div>
                <div>
                  <strong style={{ color: "#2563eb" }}>Region:</strong> {searchResults.doctor.region}
                </div>
                <div>
                  <strong style={{ color: "#2563eb" }}>Role:</strong> {searchResults.doctor.role}
                </div>
                {searchResults.doctor.abhaNumber && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <strong style={{ color: "#2563eb" }}>ABHA:</strong> {searchResults.doctor.abhaNumber}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Profile Component (migrant-style implementation)
  const ProfileSection = () => {
    if (!officialProfile) {
      return (
        <div style={{
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <User size={48} style={{ color: "#d1d5db", marginBottom: "1rem" }} />
            <p style={{ color: '#6b7280', margin: 0, fontSize: "1.1rem" }}>No profile data available</p>
          </div>
        </div>
      );
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfileFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "2rem"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          padding: "2rem",
          color: "white",
          marginBottom: "2rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: "1.75rem",
                fontWeight: "700"
              }}>
                {t('profile')}
              </h2>
              <p style={{
                margin: "0.5rem 0 0 0",
                opacity: 0.9
              }}>
                {t('manageHealthOfficialInfo')}
              </p>
            </div>
            
            {!isEditingProfile ? (
              <button
                onClick={handleProfileEdit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  backdropFilter: "blur(10px)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <Edit3 size={18} />
                {t('Edit Profile')}
              </button>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={handleProfileSave}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "rgba(16, 185, 129, 0.9)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(16, 185, 129, 1)"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(16, 185, 129, 0.9)"}
                >
                  <Save size={18} />
                  {t('Save')}
                </button>
                <button
                  onClick={handleProfileCancel}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "rgba(239, 68, 68, 0.9)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(239, 68, 68, 1)"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(239, 68, 68, 0.9)"}
                >
                  <X size={18} />
                  {t('Cancel')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {/* Profile Card */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
            textAlign: "center"
          }}>
            {/* Profile Avatar */}
            <div style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
              fontSize: "3rem",
              fontWeight: "700",
              color: "white",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
            }}>
              {(officialProfile.name || "U").charAt(0).toUpperCase()}
            </div>

            <h3 style={{
              margin: "0 0 0.5rem 0",
              color: "#1f2937",
              fontSize: "1.5rem",
              fontWeight: "600"
            }}>
              {officialProfile.name || t('healthOfficial')}
            </h3>

            <p style={{
              margin: "0 0 1rem 0",
              color: "#6b7280",
              fontSize: "1rem"
            }}>
              {officialProfile.username || "HOF001"}
            </p>

            {/* Status Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#dcfce7",
              color: "#166534",
              borderRadius: "20px",
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "1.5rem"
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e"
              }} />
              Active
            </div>

            {/* Quick Stats */}
            <div style={{
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem"
              }}>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Role</span>
                <span style={{ color: "#1f2937", fontWeight: "600" }}>
                  {officialProfile.role || t('healthOfficerRole')}
                </span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>Department</span>
                <span style={{ color: "#1f2937", fontWeight: "600" }}>
                  {officialProfile.department || t('healthDepartment')}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{
              margin: "0 0 1.5rem 0",
              color: "#1f2937",
              fontSize: "1.25rem",
              fontWeight: "600",
              borderBottom: "2px solid #f3f4f6",
              paddingBottom: "0.75rem"
            }}>
              {t('Personal Details')}
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem"
            }}>
              {/* Name Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  {t('Name')}
                </label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    name="name"
                    value={profileFormData.name || ""}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "border-color 0.2s",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                ) : (
                  <div style={{
                    padding: "0.75rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb"
                  }}>
                    {officialProfile.name || t('notProvided')}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  {t('Email')}
                </label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    name="mobile"
                    value={profileFormData.mobile || ""}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "border-color 0.2s",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                ) : (
                  <div style={{
                    padding: "0.75rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb"
                  }}>
                    {officialProfile.mobile || t('notProvided')}
                  </div>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  Username
                </label>
                <div style={{
                  padding: "0.75rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  color: "#1f2937",
                  border: "1px solid #e5e7eb"
                }}>
                  {officialProfile.username || t('notProvided')}
                </div>
              </div>

              {/* Role Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  Role
                </label>
                <div style={{
                  padding: "0.75rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  color: "#1f2937",
                  border: "1px solid #e5e7eb"
                }}>
                  {officialProfile.role || t('healthOfficerRole')}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div style={{ marginTop: "2rem" }}>
              <h3 style={{
                margin: "0 0 1rem 0",
                color: "#1f2937",
                fontSize: "1.25rem",
                fontWeight: "600",
                borderBottom: "2px solid #f3f4f6",
                paddingBottom: "0.75rem"
              }}>
                Official Information
              </h3>
              
              <div style={{
                padding: "1rem",
                backgroundColor: "#f0f9ff",
                borderRadius: "8px",
                border: "1px solid #0ea5e9"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem"
                }}>
                  <span style={{
                    color: "#374151",
                    fontWeight: "500",
                    fontSize: "0.875rem"
                  }}>
                    Official ID: 
                  </span>
                  <span style={{
                    color: "#1f2937",
                    marginLeft: "0.5rem"
                  }}>
                    {officialProfile.id || "OFF001"}
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    color: "#374151",
                    fontWeight: "500",
                    fontSize: "0.875rem"
                  }}>
                    Department: 
                  </span>
                  <span style={{
                    color: "#1f2937",
                    marginLeft: "0.5rem"
                  }}>
                    {officialProfile.department || t('healthDepartment')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      // case "qrScan":
      //   return (
      //     <div style={{ padding: "2rem", backgroundColor: "#f8fafc", borderRadius: "12px", margin: "2rem auto", maxWidth: "500px" }}>
      //       <h3>QR Code Scanner</h3>
      //       <div style={{ 
      //         width: "300px", 
      //         height: "300px", 
      //         backgroundColor: "#e5e7eb", 
      //         margin: "1rem auto", 
      //         borderRadius: "8px",
      //         display: "flex",
      //         alignItems: "center",
      //         justifyContent: "center",
      //         color: "#6b7280"
      //       }}>
      //         <QrCode size={64} />
      //         <span style={{ marginLeft: "1rem" }}>Scanner View</span>
      //       </div>
      //       <p>Point your camera at a patient's QR code to access their health records</p>
      //     </div>
      //   );
      case "search":
        return <SearchSection />;
      case "notifications":
        return <NotificationsSection />;
      case "schemes":
        return <SchemesSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
            padding: "2rem"
          }}>
            <div style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
              boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)"
            }}>
              <User size={48} style={{ color: "white" }} />
            </div>
            
            <h2 style={{
              margin: "0 0 1rem 0",
              fontSize: "2rem",
              fontWeight: "700",
              color: "#1f2937"
            }}>
              {t('welcome')}, {officialProfile?.name || t('healthOfficial')}
            </h2>
            
            <p style={{
              margin: "0 0 2rem 0",
              fontSize: "1.1rem",
              color: "#6b7280",
              maxWidth: "600px",
              lineHeight: "1.6"
            }}>
              Manage health notifications, search for migrant workers and doctors, and oversee health records in your jurisdiction.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              width: "100%",
              maxWidth: "600px"
            }}>
              <div style={{
                padding: "1rem",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#dc2626",
                  marginBottom: "0.5rem"
                }}>
                  {notifications.length}
                </div>
                <div style={{
                  fontSize: "0.875rem",
                  color: "#6b7280"
                }}>
                  Active Notifications
                </div>
              </div>
              
              <div style={{
                padding: "1rem",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#059669",
                  marginBottom: "0.5rem"
                }}>
                  {officialProfile?.region || "Central Region"}
                </div>
                <div style={{
                  fontSize: "0.875rem",
                  color: "#6b7280"
                }}>
                  Your Region
                </div>
              </div>
              
              <div style={{
                padding: "1rem",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#2563eb",
                  marginBottom: "0.5rem"
                }}>
                  Active
                </div>
                <div style={{
                  fontSize: "0.875rem",
                  color: "#6b7280"
                }}>
                  System Status
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!officialProfile) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f8fafc",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <User size={24} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>
              {t('wellnessWebDashboard')}
            </h1>
            <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.9 }}>
              {t('healthOfficial')}
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: 'white',
              color: '#374151'
            }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
            <option value="ml">മലയാളം</option>
          </select>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '8px 12px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            <LogOut size={16} />
            {t('logout')}
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div style={{
        maxWidth: "1400px",
        width:'100%',
        margin: "auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        flex: 1
      }}>
        {/* Profile Summary Card */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "2rem",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "700",
              color: "white"
            }}>
              {(officialProfile.name || "H").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{
                margin: "0 0 0.25rem 0",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937"
              }}>
                {officialProfile.name || t('healthOfficial')}
              </h2>
              <p style={{
                margin: "0 0 0.5rem 0",
                fontSize: "0.875rem",
                color: "#6b7280"
              }}>
                {officialProfile.designation || t('healthOfficial')} • {officialProfile.region || t('centralRegion')}
              </p>
              <p style={{
                margin: 0,
                fontSize: "0.75rem",
                color: "#9ca3af"
              }}>
                {officialProfile.email || "alice.brown@health.gov"}
              </p>
            </div>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem"
          }}>
            <div style={{
              backgroundColor: "#fef2f2",
              padding: "1rem",
              borderRadius: "12px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#dc2626",
                marginBottom: "0.25rem"
              }}>
                {notifications.length}
              </div>
              <div style={{
                fontSize: "0.75rem",
                color: "#dc2626",
                fontWeight: "500"
              }}>
                Notifications
              </div>
            </div>
            
            <div style={{
              backgroundColor: "#f0fdf4",
              padding: "1rem",
              borderRadius: "12px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#059669",
                marginBottom: "0.25rem"
              }}>
                Active
              </div>
              <div style={{
                fontSize: "0.75rem",
                color: "#059669",
                fontWeight: "500"
              }}>
                Status
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500"
            }}
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>

        {/* Quick Actions Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth > 1200 ? "1fr 2fr" : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          {/* Notifications Card */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onClick={() => setActiveTab('notifications')}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#fef2f2",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Bell size={20} style={{ color: "#dc2626" }} />
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#1f2937"
                }}>
                  Notifications
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('notifications');
                }}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.75rem"
                }}
              >
                Manage
              </button>
            </div>
            
            <p style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              marginBottom: "1rem"
            }}>
              Create and manage health notifications
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {notifications.slice(0, 2).map((notification, index) => (
                <div
                  key={notification.id || index}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <div style={{
                    fontWeight: "600",
                    color: "#1f2937",
                    fontSize: "0.875rem",
                    marginBottom: "0.25rem"
                  }}>
                    {notification.title}
                  </div>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#6b7280"
                  }}>
                    {notification.region || 'All Regions'} • {notification.type}
                  </div>
                </div>
              ))}
              
              {notifications.length === 0 && (
                <div style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#9ca3af",
                  fontSize: "0.875rem"
                }}>
                  No notifications created yet
                </div>
              )}
            </div>
          </div>

          {/* Search Card */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#fef3c7",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Search size={20} style={{ color: "#d97706" }} />
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#1f2937"
                }}>
                  Search
                </h3>
              </div>
            </div>
            
            <p style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              marginBottom: "1rem"
            }}>
              Search for migrant workers and doctors
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem"
            }}>
              <button
                onClick={() => setActiveTab('search')}
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e0e7ff";
                  e.target.style.borderColor = "#c7d2fe";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f8fafc";
                  e.target.style.borderColor = "#e5e7eb";
                }}
              >
                <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Search by ABHA</div>
                <div>Migrant Workers</div>
              </button>
              <button
                onClick={() => setActiveTab('search')}
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e0e7ff";
                  e.target.style.borderColor = "#c7d2fe";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f8fafc";
                  e.target.style.borderColor = "#e5e7eb";
                }}
              >
                <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Search by Health ID</div>
                <div>Doctors</div>
              </button>
            </div>
          </div>

          {/* Government Schemes Card */}
        </div>
        <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onClick={() => setActiveTab('schemes')}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3e8ff",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FileText size={20} style={{ color: "#7c3aed" }} />
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#1f2937"
                }}>
                  Government Schemes
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('schemes');
                }}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.75rem"
                }}
              >
                Manage
              </button>
            </div>
            
            <p style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              marginBottom: "1rem"
            }}>
              Manage government health schemes for migrant workers and healthcare professionals
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {schemes.slice(0, 4).map((scheme, index) => (
                <div
                  key={scheme.id || index}
                  style={{
                    padding: "1rem",
                    backgroundColor: "#f8fafc",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f1f5f9";
                    e.target.style.borderColor = "#7c3aed";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#f8fafc";
                    e.target.style.borderColor = "#e5e7eb";
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "0.5rem"
                  }}>
                    <div style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "0.9rem",
                      lineHeight: "1.2"
                    }}>
                      {scheme.title}
                    </div>
                    <span style={{
                      fontSize: "0.65rem",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "12px",
                      backgroundColor: scheme.validUntil && new Date(scheme.validUntil) < new Date() ? "#fee2e2" : "#d1fae5",
                      color: scheme.validUntil && new Date(scheme.validUntil) < new Date() ? "#dc2626" : "#059669",
                      fontWeight: "600"
                    }}>
                      {scheme.validUntil && new Date(scheme.validUntil) < new Date() ? 'Expired' : 'Active'}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginBottom: "0.5rem"
                  }}>
                    Region: {scheme.region || 'All Regions'}
                  </div>
                  {scheme.description && (
                    <div style={{
                      fontSize: "0.7rem",
                      color: "#9ca3af",
                      lineHeight: "1.3",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {scheme.description}
                    </div>
                  )}
                </div>
              ))}
              
              {schemes.length === 0 && (
                <div style={{
                  padding: "2rem 1rem",
                  textAlign: "center",
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "10px",
                  border: "2px dashed #d1d5db"
                }}>
                  <div style={{
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    color: "#7c3aed"
                  }}>
                    📋
                  </div>
                  No schemes created yet
                  <div style={{
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                    color: "#6b7280"
                  }}>
                    Click "Manage" to create your first scheme
                  </div>
                </div>
              )}
              
              {schemes.length > 4 && (
                <div style={{
                  padding: "0.75rem",
                  textAlign: "center",
                  color: "#7c3aed",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  backgroundColor: "#f3e8ff",
                  borderRadius: "8px",
                  border: "1px solid #e9d5ff"
                }}>
                  +{schemes.length - 4} more schemes available
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Modal/Overlay for detailed views */}
      {activeTab !== 'welcome' && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        }}
        onClick={() => setActiveTab('welcome')}
        >
          <div 
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              maxWidth: "95vw",
              width: "1400px",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveTab('welcome')}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f3f4f6",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10
              }}
            >
              <X size={16} />
            </button>
            
            {activeTab === "search" && <SearchSection />}
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "notifications" && <NotificationsSection />}
            {activeTab === "schemes" && <SchemesSection />}
          </div>
        </div>
      )}
    </div>
  );
}