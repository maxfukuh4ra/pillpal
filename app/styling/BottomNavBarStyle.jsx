import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  activeNavText: {
    fontWeight: 'bold',
    color: '#E5989B',
  },
});

export default styles;
