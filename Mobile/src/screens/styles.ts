import { PixelRatio, StatusBar, StyleSheet } from 'react-native';
import { clamp } from 'react-native-reanimated';

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4
    },

    subtitle: {
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 4,
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
        backgroundColor: '#ffffff',
        textAlignVertical: 'top',
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

    textBody: {
        fontSize: 12,
        marginBottom: 2,
        color: '#555555',
    },


    container: {
        padding: 4,
        flex: 1,
        backgroundColor: '#dddddd',
        // width: clamp(100, 300, 400),
        // alignSelf: 'center',
    },

    // container: {
    //     flex: 1,
    //     padding: 16,
    //     backgroundColor: '#f1f1f1',
    //     borderRadius: 8,
    //     marginVertical: 8,
    //     marginTop: StatusBar.currentHeight || 0,
    //     justifyContent: 'center', // Alinha no eixo vertical
    //     alignItems: 'center',     // Alinha no eixo horizontal
    // },

    searchInput: {
        height: 40,
        borderColor: '#555555',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },



    item: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },


    button: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#000000',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#555555',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },

    meta: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },

    body: {
        fontSize: 14,
        marginTop: 4,
        lineHeight: 20,
    },
    status: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },

    containerContent: {
        padding: 16,
        backgroundColor: '#fff',
    },

    scrollContainer: {
        padding: 16,
        flexGrow: 1,
    },

    headerStyle:{
        backgroundColor: '#ffffff', // Cor do fundo do header
    }

});


export default styles;