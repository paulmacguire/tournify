import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ModalDateTimePicker from 'react-native-modal-datetime-picker';

const CreateTournament: React.FC = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [classification, setClassification] = useState('');

  // Funciones para manejar la visibilidad del selector de fecha
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Función para manejar la selección de fecha
  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  // Función para manejar la creación del torneo
  const handleCreateTournament = () => {
    console.log({
      tournamentName,
      location,
      date: date.toISOString().split('T')[0],
      classification,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Torneo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del Torneo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Torneo Anual"
            value={tournamentName}
            onChangeText={setTournamentName}
          />
        </View>

        {/* Campo de texto para ubicación */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ubicación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Club Oriente, Las Condes, Chile"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Selector de fecha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.input}>
            <Text style={styles.dateText}>
              {date.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>

          <ModalDateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={date}
          />
        </View>

        {/* Dropdown para clasificación */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Clasificación</Text>
          <RNPickerSelect
            onValueChange={(value) => setClassification(value)}
            items={[
              { label: 'Amateur', value: 'Amateur' },
              { label: 'Universitario', value: 'Universitario' },
              { label: 'Semiprofesional', value: 'Semiprofesional' },
              { label: 'Profesional', value: 'Profesional' },
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              placeholder: { color: '#9ca3af' },
            }}
            placeholder={{ label: 'Selecciona una clasificación', value: '' }}
            value={classification}
          />
        </View>

        <TouchableOpacity
          onPress={handleCreateTournament}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Crear Torneo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

import { TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d4ed8',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    color: '#1f2937',
    justifyContent: 'center',
  },
  dateText: {
    color: '#1f2937',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1d4ed8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateTournament;
