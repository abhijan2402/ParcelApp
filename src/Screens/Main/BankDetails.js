import React, { useState, useEffect } from 'react';
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
import { useApi } from '../../Backend/Apis';

const BankDetails = () => {
    const { getRequest, postRequest } = useApi();

    const [bankAccounts, setBankAccounts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({
        accountHolder: '',
        bankName: '',
        branch: '',
        accountNumber: '',
        ifscCode: '',
    });

    useEffect(() => {
        fetchBankDetails();
    }, []);

    const fetchBankDetails = async () => {
        try {
            const response = await getRequest('/api/bank-details');
            console.log(response, "RESOOOOOPPPPPP");

            if (response?.success) {
                setBankAccounts(response.data?.data || []);
            } else {
                Alert.alert('Error', response?.error || 'Failed to fetch bank details');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong while fetching bank details');
        }
    };


    const deletebankData = async (id) => {

        try {
            const response = await getRequest(`/api/delete-bank-details?id=${id}`);
            console.log(response, "RESOOOOOPPPPPP");

            if (response?.success) {
                Alert.alert("Bank Account details deleted successfully.")
                fetchBankDetails()
            } else {
                Alert.alert('Error', response?.error || 'Failed to fetch bank details');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong while fetching bank details');
        }
    };

    const resetForm = () => {
        setForm({
            accountHolder: '',
            bankName: '',
            branch: '',
            accountNumber: '',
            ifscCode: '',
        });
    };

    const handleAdd = async () => {
        const { accountHolder, bankName, branch, accountNumber, ifscCode } = form;
        if (!accountHolder || !bankName || !branch || !accountNumber || !ifscCode) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('account_holder_name', accountHolder);
        formData.append('bank_name', bankName);
        formData.append('branch', branch);
        formData.append('account_number', accountNumber);
        formData.append('ifsc_code', ifscCode);

        try {
            const response = await postRequest('/api/add-bank-details', formData, true);
            if (response?.success) {
                Alert.alert('Success', 'Bank account added successfully');
                resetForm();
                setModalVisible(false);
                fetchBankDetails();
            } else {
                Alert.alert('Error', response?.error || 'Failed to add bank account');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong while adding bank details');
        }
    };

    const handleDelete = (id) => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this bank detail?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    deletebankData(id)
                },
            },
        ]);
    };

    const handleMarkDefault = async (bankId) => {
        try {
            const formData = new FormData();
            formData.append('bank_id', bankId);
            const response = await postRequest('/api/mark-default-bank-account', formData, true);
            console.log(response, "RESPPPP");

            if (response?.success) {
                Alert.alert('Success', 'Bank account default added successfully');
                fetchBankDetails()
            } else {
                Alert.alert('Error', response?.error || 'Failed to add bank account');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong while adding bank details');
        }
    };


    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{item.bank_name}</Text>
                <Text style={styles.detailText}>A/C Holder: {item.account_holder_name}</Text>
                <Text style={styles.detailText}>Branch: {item.branch}</Text>
                <Text style={styles.detailText}>A/C No: {item.account_number}</Text>
                <Text style={styles.detailText}>IFSC: {item.ifsc_code}</Text>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity
                    onPress={() => handleMarkDefault(item.id)}
                    style={[styles.defaultButton, item.is_default && styles.defaultButtonActive]}>
                    <Text style={[styles.defaultText, item.is_default && styles.defaultTextActive]}>
                        {item.is_default ? 'Default Selected' : 'Mark as Default'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/ios-glyphs/30/fa314a/delete-forever.png' }}
                        style={styles.deleteIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.Container}>
            <Header title={'Bank Details'} showBack />

            <FlatList
                data={bankAccounts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
                ListEmptyComponent={<Text style={styles.emptyText}>No bank details added yet.</Text>}
            />

            <CustomButton
                style={{ marginBottom: 50 }}
                onPress={() => setModalVisible(true)}
                title="Add Bank Details"
            />

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
                                placeholderTextColor="#999"
                                value={form[field]}
                                onChangeText={(val) => setForm({ ...form, [field]: val })}
                                keyboardType={field === 'accountNumber' ? 'numeric' : 'default'}
                            />
                        ))}

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={styles.cancelBtn}
                                onPress={() => {
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
        flex: 1,
        // height: windowHeight,
        backgroundColor: COLOR.white,
    },
    itemContainer: {
        // flexDirection: 'row',
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
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth / 1.255,
        marginTop: 10,
    },

    defaultButton: {
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },

    defaultButtonActive: {
        backgroundColor: '#d1e7dd',
        borderColor: '#198754',
    },

    defaultText: {
        color: '#007bff',
        fontSize: 14,
    },

    defaultTextActive: {
        color: '#198754',
        fontWeight: 'bold',
    },

    deleteButton: {
        padding: 6,
        marginLeft: 10,
    },

    deleteIcon: {
        width: 24,
        height: 24,
    },
});
