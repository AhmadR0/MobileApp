import { View, Text, TouchableOpacity, StyleSheet,BackHandler  } from 'react-native';
import { useRouter } from 'expo-router';
import { useState,useEffect  } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

// Import komponen scanning
import ScanTabungMasuk from '../component/scan/scanTabungmasuk';
import ScanTabungKeluar from '../component/scan/scanTabungKeluar';
import ScanTambahTabung from '../component/scan/scanTambahTabung';


export default function DashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('masuk');

  useEffect(() => {
    const backAction = () => {
      return true; // Mencegah back ke login
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
    return () => backHandler.remove();
  }, []);
  
  // Tambahkan juga useEffect untuk check session
  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await SecureStore.getItemAsync('userToken');
      if (!userToken) {
        router.replace('/login');
      }
    };
    checkAuth();
  }, []);



  const renderScanner = () => {
    switch (activeTab) {
      case 'masuk':
        return <ScanTabungMasuk />;
      case 'keluar':
        return <ScanTabungKeluar />;
      case 'tambah':
        return <ScanTambahTabung />;
      default:
        return null;
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    router.replace('/login'); // Gunakan replace bukan push
  };

  return (
    <View style={styles.container}>

      <View style={styles.manualHeader}>
        <Text style={styles.manualHeaderText}>Home</Text>
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/page/daftar-tabung')}>
          <Ionicons name="list" size={20} color="white" style={styles.headerIcon} />
          <Text style={styles.headerText}>Daftar Tabung</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/download-laporan')}>
          <Ionicons name="download" size={20} color="white" style={styles.headerIcon} />
          <Text style={styles.headerText}>Download Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutIconWrapper} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="red" />
        </TouchableOpacity>

      </View>

      {/* TAB SELECTOR */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('masuk')}>
          <Text style={[
            styles.tab, 
            activeTab === 'masuk' && styles.activeTab,
            activeTab === 'masuk' && styles.activeTabMasuk
          ]}>Barang Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('keluar')}>
          <Text style={[
            styles.tab,
            activeTab === 'keluar' && styles.activeTab,
            activeTab === 'keluar' && styles.activeTabKeluar
          ]}>Barang Keluar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('tambah')}>
          <Text style={[
            styles.tab,
            activeTab === 'tambah' && styles.activeTab,
            activeTab === 'tambah' && styles.activeTabTambah
          ]}>Tambah Barang</Text>
        </TouchableOpacity>
      </View>

      {/* SCANNER AREA */}
      <View style={styles.scanArea}>
        {renderScanner()}
      </View>

    </View>
    
  );
  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  manualHeader: {
    backgroundColor: '#007bff',
    paddingVertical: 2,
    alignItems: 'center',
  },
  manualHeaderText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#007bff',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  headerIcon: {
    marginRight: 6,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoutIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tabContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: { 
    padding: 10, 
    color: '#555',
    fontWeight: '500',
  },
  activeTab: { 
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderRadius: 2,
  },
  // Warna khusus untuk masing-masing tab
  activeTabMasuk: {
    borderBottomColor: '#4CAF50', // Hijau
    color: '#4CAF50',
  },
  activeTabKeluar: {
    borderBottomColor: '#F44336', // Merah
    color: '#F44336',
  },
  activeTabTambah: {
    borderBottomColor: '#FF9800', // Orange
    color: '#FF9800',
  },
  scanArea: { flex: 1 },
});