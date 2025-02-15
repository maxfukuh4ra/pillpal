import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#413D51',
  },  
  header: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
    fontFamily: 'raleway-bold',  
  },
  subHeader: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
    fontFamily: 'raleway-regular',
  },
  medicationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  medicationInputWrapper: {
    flex: 2,
    marginRight: 10,
  },
  timesInputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: '#BFBFBF',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: 'raleway-regular',
  },
  navigationContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  navigationButton: {
    backgroundColor: '#BFBFBF',
    padding: 15,
    borderRadius: 10,
    width: '45%', 
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'raleway-bold',   
  },
});

export default styles;
