import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

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

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/daftar-tabung')}>
          <Text style={styles.headerButton}>Daftar Tabung</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/download-laporan')}>
          <Text style={styles.headerButton}>Download Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.headerButton}>Logout</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#007bff' },
  headerButton: { color: 'white', fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  tab: { padding: 10, color: '#555' },
  activeTab: { color: '#007bff', borderBottomWidth: 2, borderBottomColor: '#007bff' },
  scanArea: { flex: 1 },
});