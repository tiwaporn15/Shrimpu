import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [open, setOpen] = useState(false);
  const camRef = useRef(null);

  if (!permission) return <View/>;
  if (!permission.granted) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:24 }}>
        <Text style={{ marginBottom:12, textAlign:'center' }}>ต้องการอนุญาตกล้องเพื่อสแกน</Text>
        <TouchableOpacity onPress={requestPermission} style={{ backgroundColor:'#247b86', padding:12, borderRadius:10 }}>
          <Text style={{ color:'#fff', fontWeight:'700' }}>อนุญาต</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex:1 }}>
      {open ? (
        <CameraView ref={camRef} style={{ flex:1 }}/>
      ) : (
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
          <TouchableOpacity onPress={()=>setOpen(true)} style={{ backgroundColor:'#247b86', padding:14, borderRadius:30 }}>
            <Text style={{ color:'#fff', fontWeight:'800' }}>เปิดกล้อง</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
