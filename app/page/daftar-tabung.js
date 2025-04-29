import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DaftartabungScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('semua');
  
  // Data dummy dengan keterangan
  const dummyData = [
    { id: 'T001', status: 'ready', tanggal: '01/10/23', keterangan: '-' },
    { id: 'T002', status: 'keluar', tanggal: '02/10/23', keterangan: 'PT. Maju Jaya' },
    { id: 'T003', status: 'sedang diisi', tanggal: '03/10/23', keterangan: '-' },
    { id: 'T004', status: 'ready', tanggal: '04/10/23', keterangan: '-' },
    { id: 'T005', status: 'keluar', tanggal: '05/10/23', keterangan: 'PT. Sejahtera' },
    { id: 'T006', status: 'ready', tanggal: '06/10/23', keterangan: '-' },
    { id: 'T007', status: 'sedang diisi', tanggal: '07/10/23', keterangan: '-' },
    { id: 'T008', status: 'ready', tanggal: '08/10/23', keterangan: '-' },
    { id: 'T009', status: 'keluar', tanggal: '09/10/23', keterangan: 'CV. Mandiri' },
    { id: 'T010', status: 'ready', tanggal: '10/10/23', keterangan: '-' },
  ];

  // Filter data
  const countStatus = {
    ready: dummyData.filter(item => item.status === 'ready').length,
    keluar: dummyData.filter(item => item.status === 'keluar').length,
    proses: dummyData.filter(item => item.status === 'sedang diisi').length,
    total: dummyData.length
  };

  const filteredData = activeTab === 'semua' 
    ? dummyData 
    : dummyData.filter(item => item.status === activeTab || 
        (activeTab === 'keluar' && item.status === 'keluar'));

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return '#4CAF50';
      case 'keluar': return '#F44336';
      case 'sedang diisi': return '#FF9800';
      default: return '#000';
    }
  };

  const handleBack = () => {
    router.push('page/dashboard'); // Ganti dengan route yang sesuai
  };


  return (
    <View style={styles.container}>

      {/* header untuk daftar tabung */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Daftar Tabung</Text>
        <View style={styles.headerSpacer} /> {/* Untuk balance layout */}
      </View>

      {/* Card count status tabung */}
      <View style={styles.counterContainer}>
        <View style={[styles.counterCard, {backgroundColor: '#E8F5E9'}]}>
          <Text style={[styles.counterNumber, {color: '#4CAF50'}]}>{countStatus.ready}</Text>
          <Text style={styles.counterLabel}>READY</Text>
        </View>
        
        <View style={[styles.counterCard, {backgroundColor: '#FFEBEE'}]}>
          <Text style={[styles.counterNumber, {color: '#F44336'}]}>{countStatus.keluar}</Text>
          <Text style={styles.counterLabel}>KELUAR</Text>
        </View>
        
        <View style={[styles.counterCard, {backgroundColor: '#FFF3E0'}]}>
          <Text style={[styles.counterNumber, {color: '#FF9800'}]}>{countStatus.proses}</Text>
          <Text style={styles.counterLabel}>PROSES</Text>
        </View>
        
        <View style={[styles.counterCard, {backgroundColor: '#E3F2FD'}]}>
          <Text style={[styles.counterNumber, {color: '#2196F3'}]}>{countStatus.total}</Text>
          <Text style={styles.counterLabel}>TOTAL</Text>
        </View>
      </View>

      {/* Tab Filter */}
      <View style={styles.tabContainer}>
        {['semua', 'ready', 'keluar', 'sedang diisi'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab === 'semua' ? 'Semua' : 
               tab === 'ready' ? 'Ready' : 
               tab === 'keluar' ? 'Keluar' : 'Proses'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabel Responsive */}
      <ScrollView style={styles.verticalScroll}>
        {/* Header Tabel */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1.5 }]}>ID</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Status</Text>
          <Text style={[styles.headerCell, { flex: 3 }]}>Keterangan</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Update</Text>
        </View>

        {/* Data Tabel */}
        {filteredData.map((item, index) => (
          <View key={index} style={[
            styles.tableRow,
            index % 2 === 0 ? styles.evenRow : styles.oddRow
          ]}>
            <Text style={[styles.cell, { flex: 1.5 }]}>{item.id}</Text>
            <Text style={[
              styles.cell, 
              { flex: 2, color: getStatusColor(item.status) }
            ]}>
              {item.status === 'sedang diisi' ? 'Proses' : item.status}
            </Text>
            <Text 
              style={[styles.cell, { flex: 3 }]} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {item.keterangan}
            </Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.tanggal}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34, // Sama dengan lebar back button untuk balance
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterCard: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    minWidth: (width - 60) / 4, // Responsive width
  },
  counterNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  counterLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007bff',
    backgroundColor: '#f0f8ff',
  },
  tabText: { 
    color: '#555', 
    fontWeight: '500',
    fontSize: 12 
  },
  activeTabText: { 
    color: '#007bff', 
    fontWeight: 'bold',
    fontSize: 12 
  },
  verticalScroll: {
    flex: 1,
    marginHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  evenRow: { backgroundColor: '#fff' },
  oddRow: { backgroundColor: '#f9f9f9' },
  cell: {
    textAlign: 'center',
    paddingHorizontal: 2,
    fontSize: 12,
  },
});