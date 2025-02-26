import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c324a',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  header: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    color: '#f4a9a3',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 20,
  },
  medicationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  medicationInfo: {
    marginLeft: 10,
  },
  medicationTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  medicationName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  medicationDetails: {
    color: '#f4a9a3',
    fontSize: 14,
  },
  medicationDaysLeft: {
    color: '#7dcfb6',
    fontSize: 14,
  },
  reminderHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
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
    marginTop: 20,
  },
  saveButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
