import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    Image,
    Modal,
    TextInput,
    Pressable,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import { windowHeight, windowWidth } from '../../Constants/Dimensions';
import { COLOR } from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const initialBankAccounts = [
    {
        id: '1',
        accountHolder: 'Abhishek Jangid',
        bankName: 'State Bank of India',
        branch: 'MI Road, Jaipur',
        accountNumber: 'XXXX XXXX 2345',
        ifscCode: 'SBIN0001234',
    },
];

const BankDetails = () => {
    const [bankAccounts, setBankAccounts] = useState(initialBankAccounts);
    const [modalVisible, setModalVisible] = useState(false);

    const [form, setForm] = useState({
        accountHolder: '',
        bankName: '',
        branch: '',
        accountNumber: '',
        ifscCode: '',
    });

    const resetForm = () => {
        setForm({
            accountHolder: '',
            bankName: '',
            branch: '',
            accountNumber: '',
            ifscCode: '',
        });
    };

    const handleDelete = (id) => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this bank detail?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    setBankAccounts((prev) => prev.filter((item) => item.id !== id));
                },
            },
        ]);
    };

    const handleAdd = () => {
        const { accountHolder, bankName, branch, accountNumber, ifscCode } = form;
        if (!accountHolder || !bankName || !branch || !accountNumber || !ifscCode) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        const newEntry = {
            ...form,
            id: Date.now().toString(),
        };

        setBankAccounts((prev) => [...prev, newEntry]);
        resetForm();
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{item.bankName}</Text>
                <Text style={styles.detailText}>A/C Holder: {item.accountHolder}</Text>
                <Text style={styles.detailText}>Branch: {item.branch}</Text>
                <Text style={styles.detailText}>A/C No: {item.accountNumber}</Text>
                <Text style={styles.detailText}>IFSC: {item.ifscCode}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Image
                    source={{
                        uri: 'https://img.icons8.com/ios-glyphs/30/fa314a/delete-forever.png',
                    }}
                    style={styles.deleteIcon}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.Container}>
            <Header title={'Bank Details'} showBack />
            <FlatList
                data={bankAccounts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No bank details added yet.</Text>
                }
            />

            {/* Add New Bank Button */}
            {/* <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Add New Bank</Text>
            </TouchableOpacity> */}
            <CustomButton
                style={{ marginBottom: 50 }}
                onPress={() => setModalVisible(true)}
                title={"Add Bank Details"} />

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add Bank Details</Text>

                        {['accountHolder', 'bankName', 'branch', 'accountNumber', 'ifscCode'].map((field) => (
                            <TextInput
                                key={field}
                                style={styles.input}
                                placeholder={field
                                    .replace('accountHolder', 'Account Holder Name')
                                    .replace('bankName', 'Bank Name')
                                    .replace('branch', 'Branch')
                                    .replace('accountNumber', 'Account Number')
                                    .replace('ifscCode', 'IFSC Code')}
                                placeholderTextColor="#999"  // Add this line
                                value={form[field]}
                                onChangeText={(val) => setForm({ ...form, [field]: val })}
                            />
                        ))}

                        <View style={styles.modalButtons}>
                            <Pressable style={styles.cancelBtn} onPress={() => {
                                setModalVisible(false);
                                resetForm();
                            }}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.saveBtn} onPress={handleAdd}>
                                <Text style={styles.btnText}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default BankDetails;

const styles = StyleSheet.create({
    Container: {
        height: windowHeight,
        backgroundColor: COLOR.white,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
    },
    bankInfo: {
        flex: 1,
    },
    bankName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.royalBlue,
        marginBottom: 4,
    },
    detailText: {
        fontSize: 14,
        color: '#333',
        marginTop: 2,
    },
    deleteButton: {
        padding: 8,
    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: '#FF3B30',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#aaa',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: COLOR.royalBlue,
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: COLOR.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: windowWidth - 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: COLOR.royalBlue,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    cancelBtn: {
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#ccc',
        borderRadius: 6,
    },
    saveBtn: {
        backgroundColor: COLOR.royalBlue,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    btnText: {
        color: COLOR.white,
        fontWeight: 'bold',
    },
});
