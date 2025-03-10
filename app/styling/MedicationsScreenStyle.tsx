import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#413D51'
  },
  container: {
    flex: 1,
    backgroundColor: '#3c324a',
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  header: {
    marginLeft: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a3b5a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#f4a9a3',
  },
  medicationImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#ff7f7f',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
