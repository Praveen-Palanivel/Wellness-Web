import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [qrResult, setQrResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "environment", // use "user" for laptop front cam
  };

  // Scan loop with useCallback to prevent infinite re-renders
  const scanQRCode = useCallback(() => {
    if (!isScanning) return;
    
    const video = webcamRef.current?.video;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanQRCode);
      return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame onto canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
      setQrResult(code.data);
      setIsScanning(false);
      setIsCameraStarted(false); // stop after finding QR
    } else {
      requestAnimationFrame(scanQRCode); // keep scanning
    }
  }, [isScanning]);

  // Start scanning when camera is active
  useEffect(() => {
    if (isScanning) {
      scanQRCode();
    }
  }, [isScanning, scanQRCode]);

  const startCamera = () => {
    setQrResult(null);
    setIsCameraStarted(true);
  };

  const stopCamera = () => {
    setIsCameraStarted(false);
    setIsScanning(false);
  };

  // Handle when webcam is ready
  const onUserMedia = () => {
    console.log("Camera started, beginning scan...");
    setIsScanning(true);
  };

  const onUserMediaError = (error) => {
    console.error("Camera error:", error);
    setIsCameraStarted(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Scan QR Code</h2>

      {qrResult && (
        <div style={{
          padding: '20px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '5px',
          color: '#155724'
        }}>
          <div style={{ marginBottom: '15px' }}>
            ✅ QR Code Scanned Successfully
          </div>
          
          <div id="scanResult" style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Processing health record data...</p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                // Show loading state
                const resultDiv = document.getElementById('scanResult');
                if (resultDiv) {
                  resultDiv.innerHTML = qrResult;
                }

                // Pass the encrypted data to the doctor's scan endpoint
                const doctorAPI = window.doctorAPI || {};
                if (doctorAPI.scanQR) {
                  doctorAPI.scanQR(qrResult)
                    .then(response => {
                      if (response.success) {
                        // Update the scan result div with decrypted data
                        if (resultDiv) {
                          const patientInfo = response.patientInfo || {};
                          const healthRecords = response.healthRecords || {};
                          
                          resultDiv.innerHTML = `
                            <h4 style="margin: 0 0 10px 0">Patient Information:</h4>
                            <p style="margin: 5px 0"><strong>Name:</strong> ${patientInfo.name || 'N/A'}</p>
                            <p style="margin: 5px 0"><strong>ABHA:</strong> ${patientInfo.abha || 'N/A'}</p>
                            <p style="margin: 5px 0"><strong>Region:</strong> ${patientInfo.region || 'N/A'}</p>
                            
                            <h4 style="margin: 10px 0">Health Records:</h4>
                            <p style="margin: 5px 0"><strong>Blood Pressure:</strong> ${healthRecords.bloodPressure || 'N/A'}</p>
                            <p style="margin: 5px 0"><strong>Temperature:</strong> ${healthRecords.temperature || 'N/A'}</p>
                            <p style="margin: 5px 0"><strong>Weight:</strong> ${healthRecords.weight || 'N/A'}</p>
                            <p style="margin: 5px 0"><strong>Last Checkup:</strong> ${healthRecords.lastCheckup || 'N/A'}</p>
                            <p style="margin: 5px 0"><strong>Status:</strong> ${healthRecords.status || 'N/A'}</p>
                            
                            <p style="margin: 10px 0 0 0; color: #666; font-size: 12px">
                              Scanned at: ${new Date().toLocaleString()}
                            </p>
                          `;
                        }
                        
                        // Add a slight delay before navigation to show the data
                        setTimeout(() => {
                          navigate(`/doctor/patient/${response.patientInfo.abha}`);
                        }, 3000);
                      } else {
                        if (resultDiv) {
                          resultDiv.innerHTML = `
                            <p style="margin: 5px 0; color: #dc3545">
                              ❌ Error: ${response.error || 'Failed to process QR code'}
                            </p>
                          `;
                        }
                      }
                    })
                    .catch(err => {
                      console.error('Error scanning QR:', err);
                      if (resultDiv) {
                        resultDiv.innerHTML = `
                          <p style="margin: 5px 0; color: #dc3545">
                            ❌ Error: Failed to process QR code
                          </p>
                        `;
                      }
                    });
                }
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              View Full Records
            </button>
            
            <button
              onClick={() => setQrResult(null)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Scan Another
            </button>
          </div>
        </div>
      )}

      {!isCameraStarted ? (
        <button 
          onClick={startCamera}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Start Camera
        </button>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '15px' 
        }}>
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
            onUserMediaError={onUserMediaError}
            style={{
              width: '420px',
              height: '420px',
              border: '2px solid #ddd',
              borderRadius: '10px'
            }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={stopCamera}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Stop Camera
            </button>
            
            <button 
              onClick={() => setQrResult(null)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Scan Again
            </button>
          </div>
          
          {isScanning && (
            <p style={{ color: '#666', fontSize: '14px' }}>
              📱 Point camera at QR code...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QRScanner;