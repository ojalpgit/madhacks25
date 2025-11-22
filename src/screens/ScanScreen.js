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
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useWallet } from '../context/WalletContext';
import { formatBTC } from '../utils/wallet';

// Helper: Format ISO date → "22 Nov 2025, 23:34"
const formatDateTime = (isoString) => {
  if (!isoString) return 'Just now';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) + ', ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

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

    const raw = scannedData.data.trim();
    setScanned(true);

    try {
      const parsed = JSON.parse(raw);
      setOrderData(parsed);
      setShowConfirmModal(true);
    } catch (err) {
      Alert.alert('Invalid QR', 'Please scan a valid payment QR code.');
      setScanned(false);
    }
  };

  const handleConfirm = () => {
    if (!orderData) return;

    setProcessing(true);
    setShowConfirmModal(false);

    setTimeout(() => {
      try {
        processPayment(orderData.vendorName || 'Merchant', orderData.totalBTC);
        setProcessing(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setScanned(false);
          navigation.goBack();
        }, 2200);
      } catch {
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

      {/* ORDER CONFIRMATION MODAL */}
      <Modal visible={showConfirmModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Review Order</Text>

            {/* Vendor + Message + Time */}
            <View style={styles.vendorCard}>
              <Text style={styles.vendorName}>{orderData?.vendorName || 'Merchant'}</Text>
              {orderData?.message && (
                <Text style={styles.message}>{orderData.message}</Text>
              )}
              {orderData?.generatedAt && (
                <Text style={styles.timestamp}>
                  Order time: {formatDateTime(orderData.generatedAt)}
                </Text>
              )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: '58%' }}>
              {/* Items */}
              <View style={styles.itemsCard}>
                <Text style={styles.sectionTitle}>Order Items</Text>
                {orderData?.items?.map((item, i) => (
                  <View key={i} style={styles.itemRow}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.quantity}>× {item.quantity}</Text>
                    </View>
                    <View style={styles.itemPrice}>
                      <Text style={styles.priceBTC}>
                        {formatBTC(item.subtotalBtc || item.priceBtc * item.quantity)}
                      </Text>
                      <Text style={styles.priceSBTC}>
                        {(item.priceSbtc * item.quantity).toLocaleString()} SBTC
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Total */}
              <View style={styles.totalCard}>
                <Text style={styles.totalLabel}>Total to Pay</Text>
                <Text style={styles.totalBTC}>{formatBTC(orderData?.totalBTC || 0)}</Text>
                <Text style={styles.totalSBTC}>
                  {(orderData?.totalSbtc || 0).toLocaleString()} SBTC
                </Text>
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

      {/* Processing & Success modals unchanged */}
      <Modal visible={processing} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.processingBox}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.processingText}>Processing Payment...</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={showSuccess} transparent>
        <View style={styles.modalOverlay}>
          <Animatable.View animation="zoomIn" duration={600} style={styles.successBox}>
            <MaterialIcons name="check-circle" size={100} color="#00ff00" />
            <Text style={styles.successTitle}>Payment Sent!</Text>
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

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.96)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#111', borderRadius: 24, padding: 24, width: '100%', maxHeight: '90%' },
  modalTitle: { fontSize: 28, fontWeight: 'bold', color: '#00ff00', textAlign: 'center', marginBottom: 16 },

  vendorCard: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20 },
  vendorName: { fontSize: 26, fontWeight: 'bold', color: '#00ff00' },
  message: { fontSize: 15, color: '#aaa', marginTop: 6, fontStyle: 'italic' },
  timestamp: { fontSize: 13, color: '#00cc00', marginTop: 10, fontWeight: '600' },

  itemsCard: { backgroundColor: '#1a1a1a', padding: 16, borderRadius: 16, marginBottom: 16 },
  sectionTitle: { color: '#00ff00', fontSize: 17, fontWeight: 'bold', marginBottom: 12 },

  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderColor: '#333' },
  itemInfo: { flex: 1 },
  itemName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  quantity: { color: '#0f0', fontSize: 14, marginTop: 4 },
  itemPrice: { alignItems: 'flex-end' },
  priceBTC: { color: '#00ff00', fontWeight: 'bold', fontSize: 16 },
  priceSBTC: { color: '#aaa', fontSize: 13 },

  totalCard: { backgroundColor: '#002200', padding: 24, borderRadius: 16, borderWidth: 2, borderColor: '#00ff00', alignItems: 'center' },
  totalLabel: { color: '#00ff00', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  totalBTC: { fontSize: 40, fontWeight: 'bold', color: '#00ff00' },
  totalSBTC: { fontSize: 20, color: '#00cc00', marginTop: 4 },

  buttonRow: { flexDirection: 'row', gap: 16, marginTop: 24 },
  cancelBtn: { flex: 1, backgroundColor: '#444', padding: 18, borderRadius: 16, alignItems: 'center' },
  payBtn: { flex: 1, backgroundColor: '#00aa00', padding: 18, borderRadius: 16, alignItems: 'center' },
  cancelText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  payText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },

  processingBox: { backgroundColor: '#111', padding: 40, borderRadius: 20, alignItems: 'center' },
  processingText: { marginTop: 20, color: '#fff', fontSize: 18 },
  successBox: { backgroundColor: '#111', padding: 50, borderRadius: 30, alignItems: 'center', borderWidth: 3, borderColor: '#00ff00' },
  successTitle: { marginTop: 20, fontSize: 28, fontWeight: 'bold', color: '#00ff00' },
  successSubtitle: { marginTop: 8, fontSize: 16, color: '#aaa' },

  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 20 },
  subtitle: { fontSize: 16, color: '#aaa', marginTop: 10, textAlign: 'center', paddingHorizontal: 40 },
  permissionBtn: { marginTop: 30, backgroundColor: '#00aa00', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 30 },
  permissionText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ScanScreen;