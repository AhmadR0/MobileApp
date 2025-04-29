import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CameraView } from 'expo-camera'; // Pastikan impor Camera benar
import { useCameraPermissions } from 'expo-camera'; 

export default function ScanTabungKeluar() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeData(data);
    console.log('Scanned Data:', type, data);
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
      {/* Camera view */}
      <CameraView
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr', 'ean13'],
        }}
      />

      {/* Frame Overlay */}
      <View style={styles.frameContainer}>
        <View style={styles.frame}></View>
      </View>

      {/* Barcode result */}
      {barcodeData && (
        <View style={styles.resultBox}>
          <Text>Data yang discan: {barcodeData}</Text>
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
  container: { flex: 1 },
  camera: { flex: 1 },
  resultBox: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Frame styling
  frameContainer: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    bottom: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: '80%',
    height: '50%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)', // White color with transparency for frame
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});
