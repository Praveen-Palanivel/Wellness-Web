 import api from './api';

export const authAPI = {
  // FIXED: Worker Login - Backend expects 'abhaNumber', not 'abha'
  workerLogin: async (abha, otp) => {
    try {
      console.log('Worker login request:', abha, otp); // DEBUG LOG
      const response = await api.post('/workers/login', { 
        abhaNumber: abha, // FIXED: Backend expects 'abhaNumber'
        otp: otp 
      });
      console.log('Worker login response:', response.data); // DEBUG LOG
      return response.data;
    } catch (error) {
      console.error('Worker login error:', error); // DEBUG LOG
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  },

  // Doctor Email Input - Working correctly
  doctorEmailInput: async (email) => {
    try {
      console.log('Doctor email input request:', email); // DEBUG LOG
      const response = await api.post('/doctor/email-input', { email });
      console.log('Doctor email input response:', response.data); // DEBUG LOG
      return response.data;
    } catch (error) {
      console.error('Doctor email input error:', error); // DEBUG LOG
      return { success: false, error: error.response?.data?.error || 'Failed to send email' };
    }
  },

  // FIXED: Doctor Email Verify - Backend accepts both 'code' and 'otp'
  doctorEmailVerify: async (email, otp) => {
    try {
      console.log('Doctor email verify request:', email, otp); // DEBUG LOG
      const response = await api.post('/doctor/email-verify', { 
        email: email, 
        otp: otp  // FIXED: Changed from 'code' to 'otp' to match your Authentication.jsx
      });
      console.log('Doctor email verify response:', response.data); // DEBUG LOG
      return response.data;
    } catch (error) {
      console.error('Doctor email verify error:', error); // DEBUG LOG
      return { success: false, error: error.response?.data?.error || 'Verification failed' };
    }
  },

  // Health Officer Email Input - Working correctly
  officialEmailInput: async (email) => {
    try {
      console.log('Official email input request:', email); // DEBUG LOG
      const response = await api.post('/official/email-input', { email });
      console.log('Official email input response:', response.data); // DEBUG LOG
      return response.data;
    } catch (error) {
      console.error('Official email input error:', error); // DEBUG LOG
      return { success: false, error: error.response?.data?.error || 'Failed to send email' };
    }
  },

  // FIXED: Official Email Verify - Backend accepts both 'code' and 'otp'
  officialEmailVerify: async (email, otp) => {
    try {
      console.log('Official email verify request:', email, otp); // DEBUG LOG
      const response = await api.post('/official/email-verify', { 
        email: email, 
        otp: otp  // FIXED: Changed from 'code' to 'otp'
      });
      console.log('Official email verify response:', response.data); // DEBUG LOG
      return response.data;
    } catch (error) {
      console.error('Official email verify error:', error); // DEBUG LOG
      return { success: false, error: error.response?.data?.error || 'Verification failed' };
    }
  },

  // ADDED: Additional API methods your components might need
  workerProfile: async () => {
    try {
      const response = await api.get('/workers/me');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to fetch profile' };
    }
  },

  workerQR: async () => {
    try {
      const response = await api.get('/workers/me/qr');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to generate QR' };
    }
  },

  workerNotifications: async () => {
    try {
      const response = await api.get('/workers/me/notifications');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to fetch notifications' };
    }
  },

  doctorProfile: async () => {
    try {
      const response = await api.get('/doctor/me');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to fetch profile' };
    }
  },

  doctorScanQR: async (encryptedData) => {
    try {
      const response = await api.post('/doctor/scan', { encryptedData });
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'QR scan failed' };
    }
  },

  doctorAddObservation: async (patientId, type, value, unit) => {
    try {
      const response = await api.post('/doctor/records/observations', { 
        patientId, type, value, unit 
      });
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to add observation' };
    }
  },

  doctorAddImmunization: async (patientId, vaccineType, lotNumber) => {
    try {
      const response = await api.post('/doctor/records/immunizations', { 
        patientId, vaccineType, lotNumber 
      });
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to add immunization' };
    }
  },

  officialProfile: async () => {
    try {
      const response = await api.get('/official/me');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to fetch profile' };
    }
  },

  officialNotifications: async () => {
    try {
      const response = await api.get('/official/notifications');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to fetch notifications' };
    }
  },

  officialCreateNotification: async (title, message, region, type) => {
    try {
      const response = await api.post('/official/notifications', { 
        title, message, region, type 
      });
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to create notification' };
    }
  },

  // ADDED: Logout methods
  workerLogout: async () => {
    try {
      const response = await api.post('/workers/logout');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Logout failed' };
    }
  },

  doctorLogout: async () => {
    try {
      const response = await api.post('/doctor/logout');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Logout failed' };
    }
  },

  officialLogout: async () => {
    try {
      const response = await api.post('/official/logout');
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Logout failed' };
    }
  }
};
