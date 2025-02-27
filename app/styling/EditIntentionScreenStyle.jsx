import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#3c324a',
  },
  container: {
    flex: 1, 
    backgroundColor: '#3c324a',
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1, 
  },
  header: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20, 
  },
  medicationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, 
  },
  medicationInfo: {
    marginLeft: 10,
  },
  medicationName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 50
  },
  medicationDetails: {
    color: '#f4a9a3',
    fontSize: 14,
  },
  reminderHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10, 
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomNavContainer: {
    marginBottom: 0, // Ensures it sits at the very bottom
  },
});

export default styles;
