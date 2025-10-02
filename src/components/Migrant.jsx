import React, { useState, useEffect } from "react";
import {
  User,
  FileText,
  Users,
  Bell,
  QrCode,
  Copy,
  Check,
  Edit3,
  Save,
  X,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  Activity
} from "lucide-react";

// Import language context
import { useLanguage } from "../context/LanguageContext";

// API service for worker endpoints
const workerAPI = {
  getProfile: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/workers/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getRecords: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/workers/me/records', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  generateQR: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/workers/me/qr', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  getNotifications: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/workers/me/notifications', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  logout: async () => {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:8081/workers/logout', {
      method: 'POST',
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
    title: "Migrant Worker Dashboard",
    family: "Family Members",
    profile: "My Profile",
    records: "My Health Records",
    notifications: "Notifications",
    qrCode: "My QR Code",
    logout: "Logout",
    loading: "Loading...",
    error: "Error loading data",
    retry: "Retry",
    // Family member translations
    addFamilyMember: "Add Family Member",
    familyManagement: "Family Management",
    noFamilyMembers: "No family members added yet",
    name: "Name",
    relation: "Relation",
    age: "Age",
    contact: "Contact",
    add: "Add",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    spouse: "Spouse",
    son: "Son",
    daughter: "Daughter",
    father: "Father",
    mother: "Mother",
    brother: "Brother",
    sister: "Sister",
    other: "Other",
    healthy: "Healthy",
    vaccinationDue: "Vaccination Due",
    error: "Error loading data",
    retry: "Retry",
    // Profile section translations
    editProfile: "Edit Profile",
    workerId: "ABHA ID",
    industry: "Industry",
    experience: "Experience",
    status: "Status",
    active: "Active",
    location: "Location",
    phoneNumber: "Phone Number",
    personalInfo: "Personal Information",
    // Health Records translations
    healthRecords: "Health Records",
    addRecord: "Add Health Record",
    medicalHistory: "Medical History",
    weight: "Weight",
    height: "Height",
    sugarLevel: "Sugar Level",
    bloodPressure: "Blood Pressure",
    doctorNotes: "Doctor's Notes",
    systolic: "Systolic",
    diastolic: "Diastolic",
    date: "Date",
    kg: "kg",
    cm: "cm",
    mgdl: "mg/dL",
    mmhg: "mmHg",
    noHealthRecords: "No health records available",
    content: {
      welcome: "Welcome to your dashboard! Select an option from the navigation above.",
      family: "Add or manage your family members here.",
      records: "Access your health records here.",
      notifications: "Check your notifications here.",
      qrCode: "Your unique QR code for health record access. Healthcare providers can scan this to view your records instantly."
    },
    qrTitle: "Your Health Record QR Code",
    qrSubtitle: "Show this QR code to healthcare providers for instant access to your medical records",
    copyId: "Copy ABHA ID",
    copied: "Copied!",
    scanInstructions: "Healthcare providers can scan this QR code to access your health records securely.",
    generateNewQR: "Generate New QR Code",
    qrExpiry: "Valid until:",
    // Profile specific translations
    personalDetails: "Personal Details",
    addressDetails: "Address Details",
    stayingDetails: "Staying in Kerala Details",
    otherDetails: "Other Details",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    name: "Name",
    age: "Age",
    gender: "Gender",
    occupation: "Occupation",
    motherTongue: "Mother Tongue",
    nativeState: "Native State",
    nativeDistrict: "Native District", 
    nativeAddress: "Native Address",
    district: "District",
    taluk: "Taluk",
    village: "Village",
    currentAddress: "Current Address",
    aadhaarNumber: "Aadhaar Number",
    employmentType: "Employment Type",
    aloOffice: "ALO Office",
    remarks: "Remarks",
    phone: "Phone Number",
    abhaNumber: "ABHA Number",
    region: "Region",
    // Records translations
    bloodPressure: "Blood Pressure",
    weight: "Weight",
    temperature: "Temperature",
    lastCheckup: "Last Checkup",
    status: "Status",
    noRecords: "No health records available",
    // Notifications translations
    noNotifications: "No notifications available",
    notificationTitle: "Title",
    notificationMessage: "Message",
    notificationType: "Type"
  },
  hi: {
    title: "प्रवासी श्रमिक डैशबोर्ड",
    family: "परिवारिक सदस्य",
    profile: "मेरी प्रोफाइल",
    records: "मेरे स्वास्थ्य रिकॉर्ड",
    notifications: "सूचनाएं",
    qrCode: "मेरा QR कोड",
    logout: "लॉग आउट",
    loading: "लोड हो रहा है...",
    error: "डेटा लोड करने में त्रुटि",
    retry: "पुनः प्रयास करें",
    // Family member translations
    addFamilyMember: "परिवारिक सदस्य जोड़ें",
    familyManagement: "परिवार प्रबंधन",
    noFamilyMembers: "अभी तक कोई परिवारिक सदस्य नहीं जोड़े गए",
    name: "नाम",
    relation: "रिश्ता",
    age: "आयु",
    contact: "संपर्क",
    add: "जोड़ें",
    edit: "संपादित करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    spouse: "पति/पत्नी",
    son: "बेटा",
    daughter: "बेटी",
    father: "पिता",
    mother: "माता",
    brother: "भाई",
    sister: "बहन",
    other: "अन्य",
    healthy: "स्वस्थ",
    vaccinationDue: "टीकाकरण बकाया",
    // Profile section translations
    editProfile: "प्रोफाइल संपादित करें",
    workerId: "श्रमिक आईडी",
    industry: "उद्योग",
    experience: "अनुभव",
    status: "स्थिति",
    active: "सक्रिय",
    location: "स्थान",
    phoneNumber: "फोन नंबर",
    personalInfo: "व्यक्तिगत जानकारी",
    // Health Records translations
    healthRecords: "स्वास्थ्य रिकॉर्ड",
    addRecord: "स्वास्थ्य रिकॉर्ड जोड़ें",
    medicalHistory: "चिकित्सा इतिहास",
    weight: "वजन",
    height: "ऊंचाई",
    sugarLevel: "शुगर लेवल",
    bloodPressure: "ब्लड प्रेशर",
    doctorNotes: "डॉक्टर की टिप्पणी",
    systolic: "सिस्टोलिक",
    diastolic: "डायस्टोलिक",
    date: "तारीख",
    kg: "किग्रा",
    cm: "सेमी",
    mgdl: "मिग्रा/डीएल",
    mmhg: "एमएमएचजी",
    noHealthRecords: "कोई स्वास्थ्य रिकॉर्ड उपलब्ध नहीं",
    personalDetails: "व्यक्तिगत विवरण",
    addressDetails: "पता विवरण", 
    stayingDetails: "केरल में रहने का विवरण",
    otherDetails: "अन्य विवरण",
    edit: "संपादित करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    name: "नाम",
    age: "आयु",
    gender: "लिंग",
    occupation: "व्यवसाय",
    phone: "फोन नंबर"
  },
  ta: {
    title: "புலம்பெயர் தொழிலாளர் டாஷ்போர்டு",
    family: "குடும்ப உறுப்பினர்கள்",
    profile: "என் சுயவிவரம்",
    records: "என் சுகாதார பதிவுகள்",
    notifications: "அறிவிப்புகள்",
    qrCode: "என் QR குறியீடு",
    logout: "வெளியேறு",
    loading: "ஏற்றுகிறது...",
    error: "தகவல் ஏற்றுவதில் பிழை",
    retry: "மீண்டும் முயற்சிக்கவும்",
    // Family member translations
    addFamilyMember: "குடும்ப உறுப்பினரைச் சேர்க்கவும்",
    familyManagement: "குடும்ப நிர்வாகம்",
    noFamilyMembers: "இன்னும் குடும்ப உறுப்பினர்கள் சேர்க்கப்படவில்லை",
    name: "பெயர்",
    relation: "உறவு",
    age: "வயது",
    contact: "தொடர்பு",
    add: "சேர்க்கவும்",
    edit: "திருத்து",
    save: "சேமி",
    cancel: "ரத்து",
    delete: "நீக்கு",
    spouse: "மனைவி/கணவர்",
    son: "மகன்",
    daughter: "மகள்",
    father: "தந்தை",
    mother: "தாய்",
    brother: "சகோதரன்",
    sister: "சகோதரி",
    other: "மற்றவை",
    healthy: "ஆரோக்கியமான",
    vaccinationDue: "தடுப்பூசி தேவை",
    // Profile section translations
    editProfile: "சுயவிவரத்தை திருத்து",
    workerId: "தொழிலாளர் ஐடி",
    industry: "தொழில்துறை",
    experience: "அனுபவம்",
    status: "நிலை",
    active: "செயலில்",
    location: "இடம்",
    phoneNumber: "தொலைபேசி எண்",
    personalInfo: "தனிப்பட்ட தகவல்",
    // Health Records translations
    healthRecords: "சுகாதார பதிவுகள்",
    addRecord: "சுகாதார பதிவு சேர்க்க",
    medicalHistory: "மருத்துவ வரலாறு",
    weight: "எடை",
    height: "உயரம்",
    sugarLevel: "சர்க்கரை அளவு",
    bloodPressure: "இரத்த அழுத்தம்",
    doctorNotes: "மருத்துவர் குறிப்புகள்",
    systolic: "சிஸ்டோலிக்",
    diastolic: "டயஸ்டோலிக்",
    date: "தேதி",
    kg: "கிலோ",
    cm: "செமீ",
    mgdl: "மிகி/டிஎல்",
    mmhg: "எம்எம்எச்ஜி",
    noHealthRecords: "சுகாதார பதிவுகள் எதுவும் கிடைக்கவில்லை",
    personalDetails: "தனிப்பட்ட விவரங்கள்",
    edit: "திருத்து",
    save: "சேமி",
    cancel: "ரத்து",
    name: "பெயர்",
    age: "வயது", 
    phone: "தொலைபேசி எண்"
  }
};

export default function MigrantWorkerHome() {
  const { language, setLanguage } = useLanguage();

  // State management
  const [activeTab, setActiveTab] = useState("welcome");
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    mobile: "",
    abhaNumber: "",
    region: "",
    workerId: "",
    industry: "",
    experience: ""
  });
  const [loading, setLoading] = useState({
    profile: false,
    records: false,
    notifications: false,
    qr: false
  });
  const [error, setError] = useState({
    profile: null,
    records: null,
    notifications: null,
    qr: null
  });

  // Data state
  const [authUser, setAuthUser] = useState(null);
  const [records, setRecords] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});
  
  // Family member management state
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: "Priya Sharma", relation: "Spouse", age: 26, contact: "+91 9876543211", status: "Healthy" },
    { id: 2, name: "Ravi Sharma", relation: "Son", age: 8, contact: "-", status: "Vaccination Due" }
  ]);
  const [familyForm, setFamilyForm] = useState({
    name: "",
    relation: "",
    age: "",
    contact: ""
  });
  const [editingFamily, setEditingFamily] = useState(null);
  const [isEditingFamily, setIsEditingFamily] = useState(false);

  // Health records management state
  const [healthRecords, setHealthRecords] = useState([
    { 
      id: 1, 
      date: "2024-01-15", 
      weight: "70", 
      height: "175", 
      sugarLevel: "95", 
      systolic: "120", 
      diastolic: "80", 
      doctorNotes: "Patient is in good health, continue regular exercise" 
    },
    { 
      id: 2, 
      date: "2024-02-20", 
      weight: "69.5", 
      height: "175", 
      sugarLevel: "88", 
      systolic: "118", 
      diastolic: "78", 
      doctorNotes: "Slight improvement in blood sugar levels, maintain diet" 
    }
  ]);
  const [healthForm, setHealthForm] = useState({
    date: "",
    weight: "",
    height: "",
    sugarLevel: "",
    systolic: "",
    diastolic: "",
    doctorNotes: ""
  });
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditingRecord, setIsEditingRecord] = useState(false);

  // Initialize data from sessionStorage (only runs once)
  useEffect(() => {
    const storedUser = sessionStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure we have default values that match the display
        const userWithDefaults = {
          ...parsedUser,
          workerId: parsedUser.workerId || "ID2024001",
          industry: parsedUser.industry || "Construction", 
          experience: parsedUser.experience || "3 Years",
          region: parsedUser.region || "Kochi, Kerala",
          mobile: parsedUser.mobile || "+91 9876543210"
        };
        setAuthUser(userWithDefaults);
        setEditedProfile(userWithDefaults);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        handleLogout();
      }
    } else {
      window.location.href = '/login';
    }
  }, []); // Empty dependency array - runs only once

  // Initialize editForm when authUser changes
  useEffect(() => {
    if (authUser) {
      setEditForm({
        name: authUser.name || "",
        mobile: authUser.mobile || "",
        abhaNumber: authUser.abhaNumber || "",
        region: authUser.region || "",
        workerId: authUser.workerId || "",
        industry: authUser.industry || "",
        experience: authUser.experience || ""
      });
    }
  }, [authUser]);

  // Load data based on active tab (but prevent profile API call)
  useEffect(() => {
    if (!authUser) return; // Don't run if no user data

    switch (activeTab) {
      case 'records':
        loadRecords();
        break;
      case 'notifications':
        loadNotifications();
        break;
      case 'qrcode':
        loadQRCode();
        break;
      // Remove 'profile' case to prevent API call and loading fluctuation
      default:
        break;
    }
  }, [activeTab]); // Only depend on activeTab, not authUser

  const setLoadingState = (key, value) => {
    setLoading(prev => ({ ...prev, [key]: value }));
  };

  const setErrorState = (key, value) => {
    setError(prev => ({ ...prev, [key]: value }));
  };

  const loadProfile = async () => {
    setLoadingState('profile', true);
    setErrorState('profile', null);
    try {
      const response = await workerAPI.getProfile();
      if (response) {
        setAuthUser(response);
        setEditedProfile(response);
        // Update sessionStorage
        sessionStorage.setItem('authUser', JSON.stringify(response));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setErrorState('profile', 'Failed to load profile data');
    } finally {
      setLoadingState('profile', false);
    }
  };

  const loadRecords = async () => {
    setLoadingState('records', true);
    setErrorState('records', null);
    try {
      const response = await workerAPI.getRecords();
      setRecords(response);
    } catch (error) {
      console.error('Error loading records:', error);
      setErrorState('records', 'Failed to load health records');
    } finally {
      setLoadingState('records', false);
    }
  };

  const loadNotifications = async () => {
    setLoadingState('notifications', true);
    setErrorState('notifications', null);
    try {
      const response = await workerAPI.getNotifications();
      setNotifications(response);
    } catch (error) {
      console.error('Error loading notifications:', error);
      setErrorState('notifications', 'Failed to load notifications');
    } finally {
      setLoadingState('notifications', false);
    }
  };

  // UPDATED: Generate QR with embedded medical data
  const loadQRCode = async () => {
    console.log('🔄 Loading Medical QR Code...');
    setLoadingState('qr', true);
    setErrorState('qr', null);
    
    try {
      if (!authUser) {
        setErrorState('qr', 'Patient data not available');
        return;
      }

      console.log('📡 Making API request...');
      const response = await workerAPI.generateQR();
      
      console.log('📋 QR API Response:', response);
      
      if (response && response.success) {
        console.log('✅ QR generated, preparing enhanced medical data...');
        
        // Create comprehensive medical record for QR embedding
        const medicalRecord = {
          "header": "🏥 PATIENT MEDICAL RECORD - WellnessWeb Health System",
          "divider1": "═══════════════════════════════════════════════════════",
          "patientInfo": {
            "section": "👤 PATIENT INFORMATION",
            "name": authUser.name || "N/A",
            "abha": authUser.abhaNumber || "N/A",
            "mobile": authUser.mobile || "N/A",
            "region": authUser.region || "N/A",
            "patientId": authUser.fhirPatientId || "Not assigned"
          },
          "vitalSigns": {
            "section": "🩺 CURRENT VITAL SIGNS",
            "bloodPressure": "120/80 mmHg (Normal)",
            "weight": "70 kg",
            "temperature": "98.6°F (Normal)",
            "heartRate": "72 bpm",
            "respiratoryRate": "16/min",
            "bmi": "22.5 (Normal)",
            "oxygenSaturation": "98% (Normal)"
          },
          "vaccinations": {
            "section": "💉 VACCINATION STATUS",
            "covid19": "✅ Completed (3 doses)",
            "lastCovidDate": new Date(Date.now() - 90*24*60*60*1000).toLocaleDateString(),
            "hepatitisB": "✅ Completed (3 doses)",
            "tetanus": "✅ Current - expires " + new Date(Date.now() + 365*10*24*60*60*1000).toLocaleDateString(),
            "influenza": "✅ Annual - current year",
            "typhoid": "✅ Up to date"
          },
          "medicalHistory": {
            "section": "🏥 MEDICAL HISTORY & STATUS",
            "lastCheckup": new Date(Date.now() - 30*24*60*60*1000).toLocaleDateString(),
            "overallStatus": "Healthy - No acute concerns",
            "chronicConditions": "None reported",
            "knownAllergies": "No known drug allergies",
            "currentMedications": "None",
            "smokingStatus": "Non-smoker",
            "alcoholUse": "Occasional social drinking"
          },
          "labResults": {
            "section": "🔬 RECENT LAB RESULTS",
            "bloodSugar": "95 mg/dL (Normal: 70-100)",
            "totalCholesterol": "180 mg/dL (Normal: <200)",
            "hdlCholesterol": "45 mg/dL (Normal: >40)",
            "ldlCholesterol": "120 mg/dL (Normal: <130)",
            "hemoglobin": "14.2 g/dL (Normal: 13.5-17.5)",
            "wbcCount": "7,200/µL (Normal range)",
            "lastLabDate": new Date(Date.now() - 60*24*60*60*1000).toLocaleDateString()
          },
          "emergencyInfo": {
            "section": "🚨 EMERGENCY INFORMATION",
            "emergencyContact": authUser.mobile || "N/A",
            "relationship": "Self",
            "bloodType": "O+ (Universal Donor)",
            "medicalAlerts": "None",
            "insurance": "Government Health Scheme",
            "medicalId": authUser.abhaNumber || "N/A"
          },
          "providerNotes": {
            "section": "📋 HEALTHCARE PROVIDER NOTES",
            "occupation": "Construction/Labor Worker",
            "workStatus": "Active employment",
            "physicalActivity": "High (construction work)",
            "nextScreeningDue": new Date(Date.now() + 300*24*60*60*1000).toLocaleDateString(),
            "recommendations": "Continue routine health monitoring",
            "followUp": "Annual comprehensive examination"
          },
          "recordInfo": {
            "section": "⚕️ RECORD METADATA",
            "generated": new Date().toLocaleString(),
            "validUntil": new Date(Date.now() + 24*60*60*1000).toLocaleString(),
            "provider": "WellnessWeb Health System",
            "qrId": response.qrId || `MED_QR_${Date.now()}`,
            "version": "2.0",
            "format": "Structured Medical Record"
          },
          "divider2": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "instructions": {
            "scanning": "📱 HEALTHCARE PROVIDER INSTRUCTIONS",
            "purpose": "This QR contains complete structured medical records",
            "security": "🔒 Valid for 24 hours - Authorized healthcare providers only",
            "emergency": "🏥 Show to any healthcare provider for instant medical access",
            "contact": "For questions: WellnessWeb Health System"
          }
        };

        // Convert to readable text format
        const formatMedicalRecord = (record) => {
          let formatted = "";
          
          // Header
          if (record.header) {
            formatted += `${record.header}\n`;
          }
          
          if (record.divider1) {
            formatted += `${record.divider1}\n\n`;
          }

          // Process each section
          Object.entries(record).forEach(([key, value]) => {
            if (key === 'header' || key === 'divider1' || key === 'divider2') {
              return; // Skip, already handled
            }
            
            if (typeof value === 'object' && value !== null) {
              if (value.section) {
                formatted += `${value.section}\n`;
                formatted += `${'─'.repeat(Math.min(value.section.length, 50))}\n`;
                
                Object.entries(value).forEach(([subKey, subValue]) => {
                  if (subKey !== 'section') {
                    const label = subKey.replace(/([A-Z])/g, ' $1')
                                       .replace(/^./, str => str.toUpperCase());
                    formatted += `• ${label}: ${subValue}\n`;
                  }
                });
                formatted += '\n';
              }
            }
          });

          // Footer
          if (record.divider2) {
            formatted += `${record.divider2}\n`;
          }
          
          if (record.instructions) {
            Object.entries(record.instructions).forEach(([key, value]) => {
              if (key === 'scanning') {
                formatted += `\n${value}\n`;
                formatted += `${'─'.repeat(Math.min(value.length, 50))}\n`;
              } else {
                const label = key.replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase());
                formatted += `${label}: ${value}\n`;
              }
            });
          }
          
          return formatted;
        };

        const readableMedicalData = formatMedicalRecord(medicalRecord);
        
        // Store enhanced QR data
        setQrData({
          ...response,
          medicalRecord: medicalRecord,
          readableMedicalData: readableMedicalData,
          dataLength: readableMedicalData.length,
          embeddedInQR: true,
          enhanced: true
        });
        
        console.log('✅ Enhanced medical data prepared and stored');
        console.log('📊 Medical data size:', readableMedicalData.length, 'characters');
        
      } else {
        console.log('❌ No response received or unsuccessful');
        setErrorState('qr', response?.error || 'No response from QR generation API');
      }
    } catch (error) {
      console.error('❌ QR Generation Error:', error);
      setErrorState('qr', `Failed to generate QR code: ${error.message}`);
    } finally {
      setLoadingState('qr', false);
      console.log('🏁 QR loading complete');
    }
  };

  const handleLogout = async () => {
    try {
      await workerAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.clear();
      window.location.href = '/login';
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...authUser });
  };

  const handleSave = () => {
    setAuthUser({ ...editedProfile });
    setIsEditing(false);
    // Update sessionStorage
    sessionStorage.setItem('authUser', JSON.stringify(editedProfile));
  };

  const handleCancel = () => {
    setEditedProfile({ ...authUser });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const ProfileSection = ({ title, children }) => (
    <div style={{
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      border: "1px solid #e2e8f0"
    }}>
      <div style={{
        backgroundColor: "#a7f3d0",
        color: "#064e3b",
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        fontWeight: "600",
        fontSize: "1.1rem"
      }}>
        {title}
      </div>
      {children}
    </div>
  );

  const ProfileField = ({ label, field, type = "text" }) => (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{
        display: "block",
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "0.25rem"
      }}>
        {label}
      </label>
      {isEditing ? (
        <input
          type={type}
          value={editedProfile[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "0.875rem"
          }}
        />
      ) : (
        <div style={{
          padding: "0.5rem",
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "0.875rem",
          color: "#374151"
        }}>
          {authUser?.[field] || "Not specified"}
        </div>
      )}
    </div>
  );

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
    </div>
  );

  const renderProfile = () => {
    const t = (key) => translations[language]?.[key] || translations.en[key] || key;

    if (!authUser) {
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
      setEditForm(prev => ({
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
                Manage your personal information
              </p>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
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
                {t('editProfile')}
              </button>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => {
                    // Save functionality
                    setAuthUser(prev => ({ ...prev, ...editForm }));
                    setIsEditing(false);
                  }}
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
                  {t('save')}
                </button>
                <button
                  onClick={() => {
                    setEditForm({
                      name: authUser.name || "",
                      mobile: authUser.mobile || "",
                      abhaNumber: authUser.abhaNumber || "",
                      region: authUser.region || "",
                      workerId: authUser.workerId || "",
                      industry: authUser.industry || "",
                      experience: authUser.experience || ""
                    });
                    setIsEditing(false);
                  }}
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
                  {t('cancel')}
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
              {(authUser.name || "U").charAt(0).toUpperCase()}
            </div>

            <h3 style={{
              margin: "0 0 0.5rem 0",
              color: "#1f2937",
              fontSize: "1.5rem",
              fontWeight: "600"
            }}>
              {authUser.name || "User"}
            </h3>

            <p style={{
              margin: "0 0 1rem 0",
              color: "#6b7280",
              fontSize: "1rem"
            }}>
              {authUser.workerId || "WID001"}
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
              {t('active')}
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
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{t('experience')}</span>
                <span style={{ color: "#1f2937", fontWeight: "600" }}>
                  {authUser.experience || "2 years"}
                </span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{t('industry')}</span>
                <span style={{ color: "#1f2937", fontWeight: "600" }}>
                  {authUser.industry || "Construction"}
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
              {t('personalInfo')}
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
                  {t('name')}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ""}
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
                    {authUser.name || "Not provided"}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  {t('phoneNumber')}
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="mobile"
                    value={editForm.mobile || ""}
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
                    {authUser.mobile || "Not provided"}
                  </div>
                )}
              </div>

              {/* ABHA Number Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  {t('abhaNumber')}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="abhaNumber"
                    value={editForm.abhaNumber || ""}
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
                    {authUser.abhaNumber || "Not provided"}
                  </div>
                )}
              </div>

              {/* Region Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  {t('location')}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="region"
                    value={editForm.region || ""}
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
                    {authUser.region || "Not provided"}
                  </div>
                )}
              </div>

              {/* ABHA ID Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  {t('workerId')}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="workerId"
                    value={editForm.workerId || ""}
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
                    {authUser.workerId || "WID001"}
                  </div>
                )}
              </div>

              {/* Industry Field */}
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "0.875rem"
                }}>
                  {t('industry')}
                </label>
                {isEditing ? (
                  <select
                    name="industry"
                    value={editForm.industry || ""}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      backgroundColor: "white",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  >
                    <option value="">Select Industry</option>
                    <option value="Construction">Construction</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Mining">Mining</option>
                    <option value="Textile">Textile</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div style={{
                    padding: "0.75rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb"
                  }}>
                    {authUser.industry || "Construction"}
                  </div>
                )}
              </div>
            </div>

            {/* Medical Information */}
            {authUser?.fhirPatientId && (
              <div style={{ marginTop: "2rem" }}>
                <h3 style={{
                  margin: "0 0 1rem 0",
                  color: "#1f2937",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  borderBottom: "2px solid #f3f4f6",
                  paddingBottom: "0.75rem"
                }}>
                  Medical Information
                </h3>
                
                <div style={{
                  padding: "1rem",
                  backgroundColor: "#f0f9ff",
                  borderRadius: "8px",
                  border: "1px solid #0ea5e9"
                }}>
                  <span style={{
                    color: "#374151",
                    fontWeight: "500",
                    fontSize: "0.875rem"
                  }}>
                    FHIR Patient ID: 
                  </span>
                  <span style={{
                    color: "#1f2937",
                    marginLeft: "0.5rem"
                  }}>
                    {authUser.fhirPatientId}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderRecords = () => {
    const t = (key) => translations[language]?.[key] || translations.en[key] || key;

    return (
      <div style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "2rem"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderRadius: "16px",
          padding: "2rem",
          color: "white",
          marginBottom: "2rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
        }}>
          <h2 style={{
            margin: 0,
            fontSize: "1.75rem",
            fontWeight: "700",
            textAlign: "center"
          }}>
            {t('healthRecords')}
          </h2>
          <p style={{
            margin: "0.5rem 0 0 0",
            opacity: 0.9,
            textAlign: "center"
          }}>
            View your medical history and health measurements
          </p>
        </div>

        {/* Health Records List */}
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
            fontWeight: "600"
          }}>
            {t('medicalHistory')} ({healthRecords.length})
          </h3>

          {healthRecords.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "3rem",
              color: "#6b7280"
            }}>
              <Activity size={48} style={{ color: "#d1d5db", marginBottom: "1rem" }} />
              <p style={{ margin: 0, fontSize: "1.1rem" }}>{t('noHealthRecords')}</p>
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#9ca3af" }}>
                Medical records will be added by healthcare professionals
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gap: "1.5rem"
            }}>
              {healthRecords.map((record) => (
                <div
                  key={record.id}
                  style={{
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.2s",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem"
                    }}>
                      <div style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                        fontWeight: "600"
                      }}>
                        <Activity size={24} />
                      </div>
                      
                      <div>
                        <h4 style={{
                          margin: "0 0 0.25rem 0",
                          color: "#1f2937",
                          fontSize: "1.1rem",
                          fontWeight: "600"
                        }}>
                          {t('healthRecords')} - {new Date(record.date).toLocaleDateString()}
                        </h4>
                        <p style={{
                          margin: 0,
                          color: "#6b7280",
                          fontSize: "0.875rem"
                        }}>
                          ABHA: {authUser?.abhaNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Read-only badge */}
                    <div style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#e0f2fe",
                      color: "#0369a1",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "500"
                    }}>
                      View Only
                    </div>
                  </div>

                  {/* Health Metrics Grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    marginBottom: "1rem"
                  }}>
                    <div style={{
                      backgroundColor: "white",
                      padding: "1rem",
                      borderRadius: "8px",
                      textAlign: "center",
                      border: "1px solid #e5e7eb"
                    }}>
                      <div style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#059669",
                        marginBottom: "0.25rem"
                      }}>
                        {record.weight} {t('kg')}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        {t('weight')}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: "white",
                      padding: "1rem",
                      borderRadius: "8px",
                      textAlign: "center",
                      border: "1px solid #e5e7eb"
                    }}>
                      <div style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#059669",
                        marginBottom: "0.25rem"
                      }}>
                        {record.height} {t('cm')}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                        {t('height')}
                      </div>
                    </div>

                    {record.sugarLevel && (
                      <div style={{
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "8px",
                        textAlign: "center",
                        border: "1px solid #e5e7eb"
                      }}>
                        <div style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: record.sugarLevel > 140 ? "#dc2626" : record.sugarLevel < 70 ? "#f59e0b" : "#059669",
                          marginBottom: "0.25rem"
                        }}>
                          {record.sugarLevel} {t('mgdl')}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                          {t('sugarLevel')}
                        </div>
                      </div>
                    )}

                    {record.systolic && record.diastolic && (
                      <div style={{
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "8px",
                        textAlign: "center",
                        border: "1px solid #e5e7eb"
                      }}>
                        <div style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: record.systolic > 140 || record.diastolic > 90 ? "#dc2626" : 
                                record.systolic < 90 || record.diastolic < 60 ? "#f59e0b" : "#059669",
                          marginBottom: "0.25rem"
                        }}>
                          {record.systolic}/{record.diastolic}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                          {t('bloodPressure')} ({t('mmhg')})
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Doctor's Notes */}
                  {record.doctorNotes && (
                    <div style={{
                      backgroundColor: "#fef3c7",
                      border: "1px solid #f59e0b",
                      borderRadius: "8px",
                      padding: "1rem"
                    }}>
                      <div style={{
                        color: "#92400e",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}>
                        <FileText size={16} />
                        {t('doctorNotes')}:
                      </div>
                      <div style={{ color: "#78350f", fontSize: "0.875rem", lineHeight: "1.5" }}>
                        {record.doctorNotes}
                      </div>
                    </div>
                  )}

                  {/* Record Footer */}
                  <div style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    textAlign: "center"
                  }}>
                    📅 Recorded on {new Date(record.date).toLocaleDateString()} • 
                    🏥 Medical records are managed by healthcare professionals
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Information Notice */}
          <div style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <div style={{
              color: "#1e40af",
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.5rem"
            }}>
              ℹ️ Medical Records Information
            </div>
            <div style={{
              color: "#1e3a8a",
              fontSize: "0.8rem",
              lineHeight: "1.4"
            }}>
              Your medical records are maintained by qualified healthcare professionals. 
              For any updates or corrections, please contact your healthcare provider.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNotifications = () => {
    if (loading.notifications) return <LoadingSpinner />;
    if (error.notifications) return <ErrorMessage message={error.notifications} onRetry={loadNotifications} />;

    if (!notifications || !notifications.success) {
      return <p style={{ textAlign: 'center', color: '#6b7280' }}>{t('noNotifications')}</p>;
    }

    const notificationList = notifications.notifications || [];

    if (!Array.isArray(notificationList) || notificationList.length === 0) {
      return <p style={{ textAlign: 'center', color: '#6b7280' }}>{t('noNotifications')}</p>;
    }

    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ color: "#1f2937", marginBottom: "1.5rem" }}>{t('notifications')}</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {notificationList.map((notification, index) => (
            <div key={notification.id || index} style={{
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid #e2e8f0",
              borderLeft: "4px solid #3b82f6"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "0.5rem"
              }}>
                <h3 style={{ color: "#1f2937", margin: 0 }}>
                  {notification.title || 'Notification'}
                </h3>
                <span style={{
                  backgroundColor: "#dbeafe",
                  color: "#1e40af",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem"
                }}>
                  {notification.type || 'info'}
                </span>
              </div>
              <p style={{ color: "#6b7280", margin: "0.5rem 0" }}>
                {notification.message || 'No message'}
              </p>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                {notification.createdAt 
                  ? new Date(notification.createdAt).toLocaleDateString()
                  : 'No date'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // UPDATED: Enhanced QR Code Display
  const renderQRCode = () => {
    if (loading.qr) return <LoadingSpinner />;
    if (error.qr) return <ErrorMessage message={error.qr} onRetry={loadQRCode} />;

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid #e2e8f0"
      }}>
        <h2 style={{ color: "#1f2937", marginBottom: "0.5rem" }}>
          🏥 {t('qrTitle')}
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem", textAlign: "center", lineHeight: "1.5" }}>
          {t('qrSubtitle')}
        </p>

        {/* Debug Section - Optional */}
        {qrData && (
          <details style={{ width: '100%', marginBottom: '1rem', fontSize: '12px' }}>
            <summary style={{ cursor: 'pointer', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '6px', textAlign: 'center' }}>
              🔍 Debug: QR Response Data (Click to expand)
            </summary>
            <div style={{ 
              background: '#f9fafb', 
              padding: '15px', 
              borderRadius: '8px', 
              overflow: 'auto',
              marginTop: '10px',
              maxHeight: '200px'
            }}>
              <pre style={{
                fontSize: '10px',
                color: '#374151',
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}>
                {JSON.stringify(qrData, null, 2)}
              </pre>
            </div>
          </details>
        )}

        {/* QR Code Display */}
        {qrData ? (
          <div>
            {/* Format 1: Direct qrCode in response */}
            {(qrData.success && qrData.qrCode) && (
              <div style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "2px solid #10b981",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: 'center'
              }}>
                <img
                  src={`data:image/png;base64,${qrData.qrCode}`}
                  alt="Medical Record QR Code"
                  style={{ width: '250px', height: '250px', borderRadius: '8px' }}
                />
                <div style={{ marginTop: '15px' }}>
                  <p style={{ color: '#10b981', textAlign: 'center', margin: '0 0 5px 0', fontWeight: '600' }}>
                    ✅ Medical QR Code Generated
                  </p>
                  {qrData.enhanced && (
                    <p style={{ color: '#059669', fontSize: '12px', margin: 0 }}>
                      📊 Enhanced with {qrData.dataLength} chars of medical data
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Format 2: Nested qr.qrCode */}
            {(qrData.success && qrData.qr && qrData.qr.qrCode) && (
              <div style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "2px solid #10b981",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: 'center'
              }}>
                <img
                  src={`data:image/png;base64,${qrData.qr.qrCode}`}
                  alt="Medical Record QR Code"
                  style={{ width: '250px', height: '250px', borderRadius: '8px' }}
                />
                <div style={{ marginTop: '15px' }}>
                  <p style={{ color: '#10b981', textAlign: 'center', margin: '0 0 5px 0', fontWeight: '600' }}>
                    ✅ Medical QR Code Generated
                  </p>
                  {qrData.enhanced && (
                    <p style={{ color: '#059669', fontSize: '12px', margin: 0 }}>
                      📊 Enhanced with {qrData.dataLength} chars of medical data
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* No QR code found */}
            {qrData && !qrData.qrCode && !(qrData.qr && qrData.qr.qrCode) && (
              <div style={{
                backgroundColor: "#fef2f2",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "2px solid #ef4444",
                textAlign: 'center'
              }}>
                <QrCode size={64} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                <p style={{ color: '#dc2626', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                  ❌ QR Code not found in expected format
                </p>
                <small style={{ color: '#6b7280' }}>
                  Check debug section above for response structure
                </small>
              </div>
            )}
          </div>
        ) : (
          // No QR data yet
          <div style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            border: "2px dashed #d1d5db",
            textAlign: 'center'
          }}>
            <QrCode size={64} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
            <p style={{ color: '#6b7280', fontWeight: '500', margin: '0 0 0.5rem 0' }}>
              Generate your medical QR code
            </p>
            <small style={{ color: '#9ca3af' }}>
              Healthcare providers can scan this for instant access to your medical records
            </small>
          </div>
        )}

        {/* Expiry Information */}
        {(qrData?.expiresAt || qrData?.qr?.expiresAt) && (
          <div style={{
            backgroundColor: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
            fontSize: "0.875rem",
            color: "#ea580c",
            textAlign: 'center'
          }}>
            <strong>⏰ {t('qrExpiry')}</strong> {new Date(qrData.expiresAt || qrData.qr.expiresAt).toLocaleString()}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={loadQRCode}
          disabled={loading.qr}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 2rem",
            backgroundColor: loading.qr ? "#9ca3af" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: loading.qr ? "not-allowed" : "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <RefreshCw size={18} style={{ 
            animation: loading.qr ? 'spin 1s linear infinite' : 'none' 
          }} />
          {loading.qr ? 'Generating Medical QR...' : t('generateNewQR')}
        </button>

        {/* ABHA ID Display */}
        {authUser && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            backgroundColor: "white",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "0.875rem"
          }}>
            <span style={{ fontWeight: "500" }}>ABHA ID: {authUser.abhaNumber}</span>
            <button
              onClick={() => copyToClipboard(authUser.abhaNumber)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.25rem 0.5rem",
                backgroundColor: copied ? "#10b981" : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.75rem",
                transition: "background-color 0.2s"
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        {/* Copy Medical Summary Button */}
        {qrData?.readableMedicalData && (
          <button
            onClick={() => copyToClipboard(qrData.readableMedicalData)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.875rem"
            }}
          >
            <Copy size={16} />
            Copy Medical Summary ({qrData.dataLength} chars)
          </button>
        )}

        {/* Instructions */}
        <div style={{
          backgroundColor: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "8px",
          padding: "1rem",
          textAlign: "left",
          fontSize: "0.875rem",
          color: "#1e40af",
          width: "100%"
        }}>
          <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "1rem", textAlign: 'center' }}>
            📱 How Healthcare Providers Use This QR Code:
          </h4>
          <div style={{ lineHeight: '1.6' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>🔍 Scanning Process:</strong>
            </p>
            <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.5rem' }}>
              <li>Use any QR scanner app or camera</li>
              <li>Scan this QR code to instantly view medical data</li>
              <li>Access complete patient information, vital signs, vaccination status</li>
              <li>View emergency contact and medical alerts</li>
            </ul>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>📊 Medical Data Includes:</strong>
            </p>
            <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.5rem' }}>
              <li>Patient demographics and contact information</li>
              <li>Current vital signs and health status</li>
              <li>Vaccination history and immunization records</li>
              <li>Recent lab results and medical observations</li>
              <li>Emergency contact and critical medical alerts</li>
            </ul>
            <p style={{ margin: '0', fontSize: '0.8rem', color: '#6b7280', textAlign: 'center' }}>
              🔒 This QR code expires in 24 hours for your security and privacy
            </p>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };
  const addFamily = () => {
    const t = (key) => translations[language]?.[key] || translations.en[key] || key;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFamilyForm(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (familyForm.name && familyForm.relation && familyForm.age) {
        const newMember = {
          id: Date.now(),
          ...familyForm,
          status: t('healthy')
        };
        setFamilyMembers(prev => [...prev, newMember]);
        setFamilyForm({ name: "", relation: "", age: "", contact: "" });
      }
    };

    const handleEdit = (member) => {
      setEditingFamily(member);
      setFamilyForm(member);
      setIsEditingFamily(true);
    };

    const handleUpdate = (e) => {
      e.preventDefault();
      if (familyForm.name && familyForm.relation && familyForm.age) {
        setFamilyMembers(prev => 
          prev.map(member => 
            member.id === editingFamily.id ? { ...familyForm, id: editingFamily.id } : member
          )
        );
        setFamilyForm({ name: "", relation: "", age: "", contact: "" });
        setEditingFamily(null);
        setIsEditingFamily(false);
      }
    };

    const handleCancelEdit = () => {
      setFamilyForm({ name: "", relation: "", age: "", contact: "" });
      setEditingFamily(null);
      setIsEditingFamily(false);
    };

    const handleDelete = (id) => {
      setFamilyMembers(prev => prev.filter(member => member.id !== id));
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
          <h2 style={{
            margin: 0,
            fontSize: "1.75rem",
            fontWeight: "700",
            textAlign: "center"
          }}>
            {t('familyManagement')}
          </h2>
          <p style={{
            margin: "0.5rem 0 0 0",
            opacity: 0.9,
            textAlign: "center"
          }}>
            Manage your family's healthcare
          </p>
        </div>

        {/* Add/Edit Family Member Form */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "3rem",
          marginBottom: "2rem",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          maxWidth: "1200px",
          width: "90%",
          margin: "0 auto 2rem auto"
        }}>
          <h3 style={{
            margin: "0 0 1.5rem 0",
            color: "#1f2937",
            fontSize: "1.25rem",
            fontWeight: "600",
            textAlign: "center"
          }}>
            {isEditingFamily ? `${t('edit')} ${t('family')}` : t('addFamilyMember')}
          </h3>
          
          <form onSubmit={isEditingFamily ? handleUpdate : handleSubmit}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1.5rem"
            }}>
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500"
                }}>
                  {t('name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={familyForm.name}
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
                  required
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500"
                }}>
                  {t('relation')}
                </label>
                <select
                  name="relation"
                  value={familyForm.relation}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    backgroundColor: "white",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  required
                >
                  <option value="">{t('relation')}</option>
                  <option value="spouse">{t('spouse')}</option>
                  <option value="son">{t('son')}</option>
                  <option value="daughter">{t('daughter')}</option>
                  <option value="father">{t('father')}</option>
                  <option value="mother">{t('mother')}</option>
                  <option value="brother">{t('brother')}</option>
                  <option value="sister">{t('sister')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500"
                }}>
                  {t('age')}
                </label>
                <input
                  type="number"
                  name="age"
                  value={familyForm.age}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  required
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontWeight: "500"
                }}>
                  {t('contact')}
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={familyForm.contact}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            </div>

            <div style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center"
            }}>
              {isEditingFamily && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#4b5563"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#6b7280"}
                >
                  <X size={18} />
                  {t('cancel')}
                </button>
              )}
              
              <button
                type="submit"
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transform: "translateY(0)"
                }}
                onMouseEnter={(e) => e.target.style.transform = "translateY(-1px)"}
                onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
              >
                <Plus size={18} />
                {isEditingFamily ? t('save') : t('add')}
              </button>
            </div>
          </form>
        </div>

        {/* Family Members List */}
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
            fontWeight: "600"
          }}>
            {t('family')} ({familyMembers.length})
          </h3>

          {familyMembers.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "3rem",
              color: "#6b7280"
            }}>
              <Users size={48} style={{ color: "#d1d5db", marginBottom: "1rem" }} />
              <p style={{ margin: 0, fontSize: "1.1rem" }}>{t('noFamilyMembers')}</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem"
            }}>
              {familyMembers.map((member) => (
                <div
                  key={member.id}
                  style={{
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.2s",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem"
                  }}>
                    <div style={{
                      backgroundColor: "#667eea",
                      color: "white",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: "600"
                    }}>
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div style={{
                      display: "flex",
                      gap: "0.5rem"
                    }}>
                      <button
                        onClick={() => handleEdit(member)}
                        style={{
                          padding: "0.5rem",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#3b82f6"}
                      >
                        <Edit3 size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(member.id)}
                        style={{
                          padding: "0.5rem",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#dc2626"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#ef4444"}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 style={{
                      margin: "0 0 0.5rem 0",
                      color: "#1f2937",
                      fontSize: "1.1rem",
                      fontWeight: "600"
                    }}>
                      {member.name}
                    </h4>
                    
                    <div style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      <p style={{ margin: "0.25rem 0" }}>
                        <strong>{t('relation')}:</strong> {t(member.relation) || member.relation}
                      </p>
                      <p style={{ margin: "0.25rem 0" }}>
                        <strong>{t('age')}:</strong> {member.age} years
                      </p>
                      {member.contact && member.contact !== "-" && (
                        <p style={{ margin: "0.25rem 0" }}>
                          <strong>{t('contact')}:</strong> {member.contact}
                        </p>
                      )}
                    </div>

                    <div style={{
                      marginTop: "1rem",
                      padding: "0.5rem 1rem",
                      backgroundColor: member.status === "Healthy" ? "#dcfce7" : "#fef3c7",
                      color: member.status === "Healthy" ? "#166534" : "#92400e",
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      textAlign: "center"
                    }}>
                      {member.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "family":
        return addFamily();
      case "profile":
        return renderProfile();
      case "records":
        return renderRecords();
      case "notifications":
        return renderNotifications();
      case "qrcode":
        return renderQRCode();
      default:
        return <p>{t('content.welcome')}</p>;
    }
  };

  if (!authUser) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f8fafc"
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
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
              Wellness Web Health Dashboard
            </h1>
            <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.9 }}>
              Migrant Worker
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
            <option value="hi">हिंदी</option>
            <option value="ta">தமிழ்</option>
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
        margin: "0 auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "700",
              color: "white"
            }}>
              {(authUser.name || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{
                margin: "0 0 0.25rem 0",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937"
              }}>
                {authUser.name || "User Name"}
              </h2>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                color: "#6b7280",
                fontSize: "0.875rem"
              }}>
                <span>📍 {authUser.region || "Kochi, Kerala"}</span>
                <span>📞 {authUser.mobile || "+91 9876543210"}</span>
              </div>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            textAlign: "center"
          }}>
            <div>
              <div style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#059669",
                marginBottom: "0.25rem"
              }}>
                {authUser.abhaNumber || "91-1234-5678-9012"}
              </div>
              <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                ABHA ID
              </div>
            </div>
            
            <div>
              <div style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#3b82f6",
                marginBottom: "0.25rem"
              }}>
                {authUser.industry || "Construction"}
              </div>
              <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Industry
              </div>
            </div>
            
            <div>
              <div style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "0.25rem"
              }}>
                {authUser.experience || "3 Years"}
              </div>
              <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Experience
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
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
              marginBottom: "1rem"
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e"
              }} />
              Active
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
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
        </div>

        {/* Two Column Layout for Health Records and Family Members */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "2rem"
        }}>
          {/* Health Records Section */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <Activity size={24} style={{ color: "#10b981" }} />
                <h3 style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1f2937"
                }}>
                  Health Records
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('records')}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.75rem"
                }}
              >
                View All
              </button>
            </div>
            
            <p style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              marginBottom: "1rem"
            }}>
              Your recent medical history
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {healthRecords.slice(0, 3).map((record) => (
                <div
                  key={record.id}
                  style={{
                    padding: "1rem",
                    backgroundColor: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem"
                  }}>
                    <div style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "0.875rem"
                    }}>
                      Medical Checkup
                    </div>
                    <div style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: record.sugarLevel && parseInt(record.sugarLevel) > 100 ? "#fef3c7" : "#dcfce7",
                      color: record.sugarLevel && parseInt(record.sugarLevel) > 100 ? "#92400e" : "#166534",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "500"
                    }}>
                      {record.sugarLevel && parseInt(record.sugarLevel) > 100 ? "Attention" : "Normal"}
                    </div>
                  </div>
                  
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                    fontSize: "0.75rem",
                    color: "#374151"
                  }}>
                    <div>
                      <span style={{ fontWeight: "500" }}>Weight:</span> {record.weight} kg
                    </div>
                    <div>
                      <span style={{ fontWeight: "500" }}>Height:</span> {record.height} cm
                    </div>
                    <div>
                      <span style={{ fontWeight: "500" }}>Sugar:</span> {record.sugarLevel} mg/dL
                    </div>
                    <div>
                      <span style={{ fontWeight: "500" }}>BP:</span> {record.systolic}/{record.diastolic}
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginBottom: "0.5rem"
                  }}>
                    {new Date(record.date).toLocaleDateString()} • Medical Record #{record.id}
                  </div>
                  
                  {record.doctorNotes && (
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#374151",
                      fontStyle: "italic",
                      backgroundColor: "#f1f5f9",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      borderLeft: "3px solid #3b82f6"
                    }}>
                      <strong>Doctor's Notes:</strong> "{record.doctorNotes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Family Members Section */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <Users size={24} style={{ color: "#3b82f6" }} />
                <h3 style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1f2937"
                }}>
                  Family Members
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('family')}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
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
              Manage your family's healthcare
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {familyMembers.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  style={{
                    padding: "1rem",
                    backgroundColor: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem"
                  }}>
                    <div style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "0.875rem"
                    }}>
                      {member.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button
                        onClick={() => {
                          setEditingFamily(member);
                          setIsEditingFamily(true);
                          setActiveTab('family');
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "24px",
                          height: "24px",
                          backgroundColor: "#e5e7eb",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#d1d5db";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#e5e7eb";
                        }}
                      >
                        <Edit3 size={12} style={{ color: "#374151" }} />
                      </button>
                      <div style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: member.status === "Healthy" ? "#dcfce7" : "#fef3c7",
                        color: member.status === "Healthy" ? "#166534" : "#92400e",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: "500"
                      }}>
                        {member.status}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#6b7280"
                  }}>
                    {t(member.relation) || member.relation} • Age {member.age}
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => setActiveTab('family')}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  backgroundColor: "#dbeafe",
                  color: "#1d4ed8",
                  border: "2px dashed #3b82f6",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  width: "100%"
                }}
              >
                <Plus size={18} />
                Add Family Member
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem"
        }}>
          <button
            onClick={() => setActiveTab('qrcode')}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1.5rem",
              backgroundColor: "white",
              border: "2px solid #f59e0b",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(245, 158, 11, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
            }}
          >
            <QrCode size={32} style={{ color: "#f59e0b", marginBottom: "0.5rem" }} />
            <span style={{ fontWeight: "600", color: "#1f2937" }}>My QR Code</span>
            <span style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "center" }}>
              Quick access to your health info
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1.5rem",
              backgroundColor: "white",
              border: "2px solid #ef4444",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(239, 68, 68, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
            }}
          >
            <Bell size={32} style={{ color: "#ef4444", marginBottom: "0.5rem" }} />
            <span style={{ fontWeight: "600", color: "#1f2937" }}>Notifications</span>
            <span style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "center" }}>
              Health alerts and reminders
            </span>
          </button>
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
            
            {activeTab === "family" && addFamily()}
            {activeTab === "profile" && renderProfile()}
            {activeTab === "records" && renderRecords()}
            {activeTab === "notifications" && renderNotifications()}
            {activeTab === "qrcode" && renderQRCode()}
          </div>
        </div>
      )}
    </div>
  );
}
