import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#3c324a',
  },
  container: {
    flexGrow: 1,
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
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  reminderHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#58A6FF',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
