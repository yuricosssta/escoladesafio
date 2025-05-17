import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginVertical: 8,
        marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'center', // Alinha no eixo vertical
        alignItems: 'center',     // Alinha no eixo horizontal
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4
    },
    option: {
        paddingVertical: 8,
    },
    optionText: {
        // fontSize: 16,
        // color: '#007AFF',
    },

    label: {
        marginTop: 10,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginTop: 4,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    picker: {
        height: 50,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 8,
        marginLeft: 4,
    },

});

export default styles;