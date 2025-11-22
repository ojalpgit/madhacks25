import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useWallet } from '../context/WalletContext';
import { formatBTC } from '../utils/wallet';

const ScanScreen = () => {
  const navigation = useNavigation();
  const { processPayment } = useWallet();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBarCodeScanned = (scannedData) => {
    if (scanned) return;

    const data = scannedData.data;
    setScanned(true);

    try {
      const parsed = JSON.parse(data);
      setOrderData(parsed);
      setShowConfirmModal(true);
    } catch (err) {
      Alert.alert('Invalid QR Code', 'Please scan a valid payment QR code.');
      setScanned(false);
    }
  };

  const handleConfirm = () => {
    if (!orderData) return;

    setProcessing(true);
    setShowConfirmModal(false);

    setTimeout(() => {
      try {
        processPayment(`Order ${orderData.orderId.slice(0, 8)}`, orderData.totalBTC);
        setProcessing(false);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          setScanned(false);
          navigation.goBack();
        }, 2000);
      } catch (error) {
        setProcessing(false);
        Alert.alert('Payment Failed', 'Please try again.');
        setScanned(false);
      }
    }, 1500);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setScanned(false);
    setOrderData(null);
  };

  const handleClose = () => navigation.goBack();

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="camera-alt" size={80} color="#666" />
        <Text style={styles.title}>Camera Access Required</Text>
        <Text style={styles.subtitle}>Allow camera to scan QR codes</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />

        {/* Scanner Frame */}
        <View style={styles.overlay}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanArea}>
              {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((pos) => (
                <View key={pos} style={[styles.corner, styles[pos]]} />
              ))}
            </View>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom} />
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <MaterialIcons name="close" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>Scan to Pay</Text>
        </View>
      </View>

      {/* Clean Customer-Facing Order Summary */}
      <Modal visible={showConfirmModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Review & Pay</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Order ID */}
              <View style={styles.infoCard}>
                <Text style={styles.cardLabel}>Order ID</Text>
                <Text style={styles.cardValue}>{orderData?.orderId?.slice(0, 12)}...</Text>
              </View>

              {/* Items */}
              <View style={styles.itemsCard}>
                <Text style={styles.cardLabel}>Your Items</Text>
                {orderData?.cartItems?.map((item, i) => (
                  <View key={i} style={styles.itemRow}>
                    <View>
                      <Text style={styles.itemTitle}>Item {i + 1}</Text>
                      <Text style={styles.itemId}>{item.productId.slice(0, 8)}...</Text>
                    </View>
                    <View style={styles.priceBox}>
                      <Text style={styles.priceBTC}>{formatBTC(item.priceBtc)}</Text>
                      <Text style={styles.priceSBTC}>{item.priceSbtc.toLocaleString()} SBTC</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Total */}
              <View style={styles.totalCard}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalBTC}>{formatBTC(orderData?.totalBTC || 0)}</Text>
                <Text style={styles.totalSBTC}>{(orderData?.totalSbtc || 0).toLocaleString()} SBTC</Text>
              </View>
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.payBtn} onPress={handleConfirm}>
                <Text style={styles.payText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Processing */}
      <Modal visible={processing} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.processingBox}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.processingText}>Processing Payment...</Text>
          </View>
        </View>
      </Modal>

      {/* Success */}
      <Modal visible={showSuccess} transparent>
        <View style={styles.modalOverlay}>
          <Animatable.View animation="zoomIn" duration={600} style={styles.successBox}>
            <MaterialIcons name="check-circle" size={100} color="#00ff00" />
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successSubtitle}>Thank you for your purchase</Text>
          </Animatable.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraContainer: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },
  overlayTop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  overlayMiddle: { flexDirection: 'row', height: 320 },
  overlaySide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  scanArea: { width: 320, height: 320, position: 'relative' },
  corner: { position: 'absolute', width: 60, height: 60, borderColor: '#00ff00', borderWidth: 6 },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  overlayBottom: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },

  cancelButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 14, borderRadius: 30 },
  instructions: { position: 'absolute', bottom: 120, left: 0, right: 0, alignItems: 'center' },
  instructionText: { color: '#fff', fontSize: 18, fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 30 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#111', borderRadius: 20, padding: 24, width: '100%', maxHeight: '88%' },
  modalTitle: { fontSize: 28, fontWeight: 'bold', color: '#00ff00', textAlign: 'center', marginBottom: 20 },

  infoCard: { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 16, marginBottom: 16 },
  itemsCard: { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 16, marginBottom: 16 },
  totalCard: { backgroundColor: '#002200', padding: 20, borderRadius: 16, borderWidth: 2, borderColor: '#00ff00' },

  cardLabel: { color: '#00ff00', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  cardValue: { color: '#fff', fontSize: 15 },

  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#333' },
  itemTitle: { color: '#fff', fontWeight: '600' },
  itemId: { color: '#888', fontSize: 12 },
  priceBox: { alignItems: 'flex-end' },
  priceBTC: { color: '#00ff00', fontWeight: 'bold', fontSize: 16 },
  priceSBTC: { color: '#aaa', fontSize: 13 },

  totalLabel: { color: '#00ff00', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  totalBTC: { fontSize: 36, fontWeight: 'bold', color: '#00ff00', textAlign: 'center' },
  totalSBTC: { fontSize: 18, color: '#00cc00', textAlign: 'center', marginTop: 4 },

  buttonRow: { flexDirection: 'row', gap: 16, marginTop: 24 },
  cancelBtn: { flex: 1, backgroundColor: '#333', padding: 18, borderRadius: 16, alignItems: 'center' },
  payBtn: { flex: 1, backgroundColor: '#00aa00', padding: 18, borderRadius: 16, alignItems: 'center' },
  cancelText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  payText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },

  processingBox: { backgroundColor: '#111', padding: 40, borderRadius: 20, alignItems: 'center' },
  processingText: { marginTop: 20, color: '#fff', fontSize: 18 },

  successBox: { backgroundColor: '#111', padding: 50, borderRadius: 30, alignItems: 'center', borderWidth: 3, borderColor: '#00ff00' },
  successTitle: { marginTop: 20, fontSize: 28, fontWeight: 'bold', color: '#00ff00' },
  successSubtitle: { marginTop: 8, fontSize: 16, color: '#aaa' },
});

export default ScanScreen;