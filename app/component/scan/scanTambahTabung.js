import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { CameraView } from 'expo-camera';
import { useCameraPermissions } from 'expo-camera';

const { width, height } = Dimensions.get('window');
export default function ScanTambahTabung() {
  
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [barcodeData, setBarcodeData] = useState(null);
    const frameRef = useRef(null);
    const [frameLayout, setFrameLayout] = useState(null);
  
    useEffect(() => {
      if (!permission?.granted) {
        requestPermission();
      }
    }, []);
  
    const handleLayout = (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setFrameLayout({
        x,
        y,
        width,
        height
      });
    };
  
    const isBarcodeInFrame = (bounds) => {
      if (!frameLayout) return false;
  
      // Konversi koordinat barcode ke sistem koordinat layar
      const barcodeCenterX = bounds.origin.x + bounds.size.width / 2;
      const barcodeCenterY = bounds.origin.y + bounds.size.height / 2;
  
      // Hitung area frame dengan toleransi 10%
      const frameLeft = frameLayout.x;
      const frameRight = frameLayout.x + frameLayout.width;
      const frameTop = frameLayout.y;
      const frameBottom = frameLayout.y + frameLayout.height;
  
      return (
        barcodeCenterX > frameLeft &&
        barcodeCenterX < frameRight &&
        barcodeCenterY > frameTop &&
        barcodeCenterY < frameBottom
      );
    };
  
    const handleBarcodeScanned = ({ type, data, bounds }) => {
      if (!isBarcodeInFrame(bounds)) {
        console.log('Barcode di luar frame - diabaikan');
        return;
      }
  
      setScanned(true);
      setBarcodeData(data);
      console.log('Barcode berhasil discan:', data);
    };
  
    if (!permission) {
      return <Text>Memeriksa izin kamera...</Text>;
    }
  
    if (!permission.granted) {
      return (
        <View style={styles.center}>
          <Text>Izin kamera dibutuhkan untuk scan barcode</Text>
          <Button title="Izinkan Kamera" onPress={requestPermission} />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'ean13'],
          }}
        />
  
        {/* Frame Overlay */}
        <View 
          ref={frameRef}
          style={styles.frameContainer}
          onLayout={handleLayout}
        >
          <View style={styles.frame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
          <Text style={styles.scanText}>Arahkan barcode ke dalam area ini</Text>
        </View>
  
        {barcodeData && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Data: {barcodeData}</Text>
            <Button
              title="Scan Lagi"
              onPress={() => {
                setScanned(false);
                setBarcodeData(null);
              }}
            />
          </View>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      position: 'relative',
    },
    camera: { 
      flex: 1,
    },
    resultBox: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    resultText: {
      fontSize: 16,
      marginBottom: 10,
    },
    center: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    frameContainer: {
      position: 'absolute',
      top: height * 0.25,
      left: width * 0.1,
      right: width * 0.1,
      height: height * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    frame: {
      width: '100%',
      height: '100%',
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.5)',
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    scanText: {
      color: 'white',
      marginTop: 10,
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 5,
      borderRadius: 5,
    },
    corner: {
      position: 'absolute',
      width: 30,
      height: 30,
    },
    cornerTopLeft: {
      position: 'absolute',
      top: -2,
      left: -2,
      width: 30,
      height: 30,
      borderLeftWidth: 4,
      borderTopWidth: 4,
      borderColor: '#00FF00',
    },
    cornerTopRight: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 30,
      height: 30,
      borderRightWidth: 4,
      borderTopWidth: 4,
      borderColor: '#00FF00',
    },
    cornerBottomLeft: {
      position: 'absolute',
      bottom: -2,
      left: -2,
      width: 30,
      height: 30,
      borderLeftWidth: 4,
      borderBottomWidth: 4,
      borderColor: '#00FF00',
    },
    cornerBottomRight: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 30,
      height: 30,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderColor: '#00FF00',
    },
  });