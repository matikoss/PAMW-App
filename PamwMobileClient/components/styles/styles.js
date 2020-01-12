import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    buttonView: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigText: {
        fontSize: 40
    },
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(1, 222, 252)',
        height: '100%'
    },
    credentialsInput: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10
    },
    credentailsView: {

    },
    errorText: {
        color: 'red'
    },
    uploadOpacity: {
        backgroundColor: '#DDDDDD',
        padding: 20
    },
    mediumText: {
        fontSize: 25
    },
    fileContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    fileDeleteButton: {
        backgroundColor: 'red'
    },
    biblioInput: {
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'rgb(217, 207, 205)',
        width: 350,
        marginBottom: 10,
        color: 'black'

    },
    biblioButtonContainer: {
        marginBottom: 5,
        marginTop: 5,
        width: 350

    },
    attachViewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5
    },
    scrollViewContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewStyle: {
        backgroundColor: 'rgb(1, 222, 252)'
    },
    loginRegisterButton: {
        width: 350
    }

})