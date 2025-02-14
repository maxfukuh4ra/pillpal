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
  optionButton: {
    backgroundColor: '#BFBFBF',
    margin: 5,
    padding: 15,
    borderRadius: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonSelected: {
    backgroundColor: 'green',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
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
  input: {
    width: '90%',
    backgroundColor: '#BFBFBF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
    fontFamily: 'raleway-regular',
  },
  dateText: {
    color: 'white',
  }
});

export default styles;