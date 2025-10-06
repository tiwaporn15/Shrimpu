// src/screens/ScanScreen.js

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useThemeX } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { useIsFocused } from '@react-navigation/native'; // Import hook นี้


// --- !!! สำคัญที่สุด !!! ---
// แก้ไข IP Address ตรงนี้ให้เป็น IP ของเครื่องคอมพิวเตอร์คุณ
// ใช้คำสั่ง ipconfig ใน cmd เพื่อหา IP ของคุณ
const API_URL = 'http://10.26.6.4'; // <-- แก้ไขเลข IP ตรงนี้ให้ถูกต้อง


export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null); // State สำหรับเก็บรูปที่ถ่าย
  const camRef = useRef(null);
  const { colors } = useThemeX();
  const { t } = useLang();
  
  // Hook นี้จะบอกว่าตอนนี้ผู้ใช้กำลังมองหน้าจอนี้อยู่หรือไม่
  // ใช้เพื่อเปิด/ปิดกล้องเมื่อสลับแท็บ
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false); // State สำหรับ Loading ตอนส่งรูป
  const [analysisResult, setAnalysisResult] = useState(null); // State สำหรับเก็บผลวิเคราะห์ 

  // ขออนุญาตใช้กล้องเมื่อ component ถูกโหลดครั้งแรก
  useEffect(() => {
    requestPermission();
  }, []);

  const handleTakePicture = async () => {
    if (camRef.current) {
      try {
        const photo = await camRef.current.takePictureAsync({ quality: 0.7 });
        console.log('Photo captured:', photo.uri);
        setCapturedPhoto(photo);
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  // --- ส่วนแสดงผลตามสถานะของ Permission ---
  if (!permission) {
    // กำลังรอผลการขออนุญาต
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.teal} />
      </View>
    );
  }

  if (!permission.granted) {
    // ผู้ใช้ยังไม่อนุญาต
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.bg, padding: 24 }]}>
        <Text style={{ marginBottom: 12, textAlign: 'center', color: colors.text }}>
          {t('scan.permissionNeeded')}
        </Text>
        <TouchableOpacity onPress={requestPermission} style={[styles.permissionButton, { backgroundColor: colors.teal }]}>
          <Text style={styles.permissionButtonText}>{t('scan.grantPermission')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- ส่วนแสดงผลเมื่อถ่ายรูปแล้ว ---
  if (capturedPhoto) {
    return (
      <View style={styles.fullScreen}>
        <Image source={{ uri: capturedPhoto.uri }} style={styles.fullScreen} />
        <TouchableOpacity style={styles.retakeButton} onPress={() => setCapturedPhoto(null)}>
            <Text style={styles.retakeButtonText}>{t('scan.retake')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // --- ส่วนแสดงผลหลัก (หน้ากล้อง) ---
  return (
    <View style={styles.fullScreen}>
      {isFocused && (
        <CameraView
          ref={camRef}
          style={StyleSheet.absoluteFill}
          facing="back"
        />
      )}

      {/* Overlay UI */}
      <View style={StyleSheet.absoluteFill}>
        {/* Scan Frame */}
        <View style={styles.scanFrame} />

        {/* Top Text */}
        <View style={styles.topTextContainer}>
            <Text style={styles.scanText}>{t('SCAN YOUR SHRIMP')}</Text>
        </View>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  scanFrame: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    margin: 30,
    borderRadius: 20,
  },
  topTextContainer: {
    position: 'absolute',
    top: 80,
    width: '100%',
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: '#333',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  retakeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});