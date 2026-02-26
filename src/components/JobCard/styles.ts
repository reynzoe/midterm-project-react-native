import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 14,
        marginHorizontal: 16,
        borderWidth: 1,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        elevation: 2,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    logoCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontWeight: '800',
        fontSize: 16,
    },
    title: {
        fontWeight: '800',
        fontSize: 16,
        flex: 1,
    },
    companyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    company: {
        fontSize: 13,
        fontWeight: '600',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
        flexWrap: 'wrap',
    },
    metaChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#F5F0E9', // sand chip
    },
    metaText: {
        fontSize: 12,
        fontWeight: '600',
    },
    saveIconBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginLeft: 10,
    },
    description: {
        marginTop: 10,
        fontSize: 13,
        lineHeight: 18,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
    },
    quickApplyBtn: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickApplyText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    saveBtn: {
        paddingHorizontal: 16,
        height: 46,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: {
        fontWeight: '700',
        fontSize: 14,
    },
});

export default styles;
