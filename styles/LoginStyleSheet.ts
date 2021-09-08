import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
    },
    img: {
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        width: '100%',
        height: '85%',
    },
    header: {
        alignItems: 'center',
    },
    tgl: {
        color: '#707070',
        fontSize: 44,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginTop: 70,
    },
    box: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    input: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingLeft: 20,
        width: 306,
        height: 70.8,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
});