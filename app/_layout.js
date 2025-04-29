import { Stack } from 'expo-router';

export default function Layout(){
    return <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#0066cc' }, // Warna header
                headerTintColor: '#fff', // Warna teks di header
                headerTitleAlign: 'center', // Posisi judul
            }}
        />
}