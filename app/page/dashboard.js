import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Import komponen scanning
import ScanTabungMasuk from '../component/scan/scanTabungmasuk';
import ScanTabungKeluar from '../component/scan/scanTabungKeluar';
import ScanTambahTabung from '../component/scan/scanTambahTabung';


export default function DashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('masuk');

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

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>

      <View style={styles.manualHeader}>
        <Text style={styles.manualHeaderText}>Home</Text>
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/daftar-tabung')}>
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
          <Text style={[styles.tab, activeTab === 'masuk' && styles.activeTab]}>Barang Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('keluar')}>
          <Text style={[styles.tab, activeTab === 'keluar' && styles.activeTab]}>Barang Keluar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('tambah')}>
          <Text style={[styles.tab, activeTab === 'tambah' && styles.activeTab]}>Tambah Barang</Text>
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
  }, manualHeaderText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },header: {
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
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  tab: { padding: 10, color: '#555' },
  activeTab: { color: '#007bff', borderBottomWidth: 2, borderBottomColor: '#007bff' },
  scanArea: { flex: 1 },
});