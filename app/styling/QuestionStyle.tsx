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
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
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
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  chipWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  pickerContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#BFBFBF',
  },
  picker: {
    width: '100%',
    height: 50,
    color: 'white',
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: '#BFBFBF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: '#49F2E3',
  },
  chipText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'raleway-bold',
  },
});

export default styles;