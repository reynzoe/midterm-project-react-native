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
        backgroundColor: '#FFE8DC', // light coral wash
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
    learnMoreRow: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    learnMoreText: {
        fontSize: 13,
        fontWeight: '700',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
        alignItems: 'center',
    },
    quickApplyBtn: {
        flex: 0.55,
        height: 42,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickApplyText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 13,
    },
    learnMoreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFE2C2',
        backgroundColor: '#FFFCF6',
        flex: 0.45,
        justifyContent: 'center',
    },
    learnMoreText: {
        fontSize: 13,
        fontWeight: '700',
    },
});

export default styles;
