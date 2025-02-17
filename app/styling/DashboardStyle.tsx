import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#413D51',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  icon: {
    width: 40,
    height: 40,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row', // Arrange text & image side by side
    alignItems: 'center',
  },
  medicationInfo: {
    flex: 1, // Take up remaining space
    paddingRight: 10, // Add spacing between text and image
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#777',
  },
  medicationFrequency: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Push edit button to right
    marginTop: 5,
  },
  remindersTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reminderText: {
    fontSize: 14,
    color: '#555',
  },
  editButton: {
    backgroundColor: '#F8F9FA', // Light gray background
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  medicationImageContainer: {
    width: 75, // Slightly bigger for better alignment
    height: 75,
    borderRadius: 20, // Rounded corners for the background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Padding to keep image properly positioned
    marginTop: -60, // Moves image higher
    marginLeft: -85, // Moves image slightly left
  },
  medicationImage: {
    width: 45, // Image size increased slightly
    height: 45,
    resizeMode: 'contain',
  },
});

export default styles;
