import React, { useState } from 'react';
import { Text, View, Switch, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsPrefrence from '../componets/settingPrefrence';
import ItemManagement from '../componets/foodPref';

export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(previousState => !previousState);

  const [isLikes, setIsLikes] = useState(false);
  const toggleLikes = () => setIsLikes(previousState => !previousState);

  const [isReviews, setIsReviews] = useState(false);
  const toggleReviews = () => setIsReviews(previousState => !previousState);

  const [isNewPost, setIsNewPost] = useState(false);
  const toggleNewPost = () => setIsNewPost(previousState => !previousState);

  const [likedFoods, setLikedFoods] = useState([]); // Add your liked foods data here
  const [dislikedFoods, setDislikedFoods] = useState([]); // Add your disliked foods data here
  const [allergies, setAllergies] = useState([]); // Add your allergies data here

  const [showLikedFoodsModal, setShowLikedFoodsModal] = useState(false);
  const [showDislikedFoodsModal, setShowDislikedFoodsModal] = useState(false);
  const [showAllergiesModal, setShowAllergiesModal] = useState(false);

  const [newLikedFood, setNewLikedFood] = useState('');
  const [newDislikedFood, setNewDislikedFood] = useState('');
  const [newAllergy, setNewAllergy] = useState('');

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item}</Text>
    </View>
  );
  const handleAddItem = (list, newItem, setNewValue) => {
    if (newItem.trim() !== '') {
      list(prevList => [...prevList, newItem.trim()]);
      // Clear the input after adding the item
      setNewValue('');
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Dark mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDark ? 'blue' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDark}
            value={isDark}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Likes</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isLikes ? 'blue' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLikes}
            value={isLikes}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Reviews</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isReviews ? 'blue' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleReviews}
            value={isReviews}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>New Post</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNewPost ? 'blue' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNewPost}
            value={isNewPost}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => setShowLikedFoodsModal(true)}>
        <Text style={styles.sectionTitle}>Liked Foods</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={showLikedFoodsModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Liked Foods</Text>
            <TextInput
              style={styles.input}
              placeholder="Add new liked food"
              value={newLikedFood}
              onChangeText={text => setNewLikedFood(text)}
            />
            <TouchableOpacity onPress={() => handleAddItem(setLikedFoods, newLikedFood, setNewLikedFood)}>
              <Text style={styles.addButton}>Add</Text>
            </TouchableOpacity>
            <FlatList
              data={likedFoods}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderListItem}
            />
            <TouchableOpacity onPress={() => setShowLikedFoodsModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setShowDislikedFoodsModal(true)}>
  <Text style={styles.sectionTitle}>Disliked Foods</Text>
</TouchableOpacity>
<Modal animationType="slide" transparent={true} visible={showDislikedFoodsModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Disliked Foods</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new disliked food"
        value={newDislikedFood}
        onChangeText={text => setNewDislikedFood(text)}
      />
      <TouchableOpacity onPress={() => handleAddItem(setDislikedFoods, newDislikedFood, setNewDislikedFood)}>
        <Text style={styles.addButton}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={dislikedFoods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
      />
      <TouchableOpacity onPress={() => setShowDislikedFoodsModal(false)}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

<TouchableOpacity onPress={() => setShowAllergiesModal(true)}>
  <Text style={styles.sectionTitle}>Allergies</Text>
</TouchableOpacity>
<Modal animationType="slide" transparent={true} visible={showAllergiesModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Allergies</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new allergy"
        value={newAllergy}
        onChangeText={text => setNewAllergy(text)}
      />
      <TouchableOpacity onPress={() => handleAddItem(setAllergies, newAllergy, setNewAllergy)}>
        <Text style={styles.addButton}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={allergies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
      />
      <TouchableOpacity onPress={() => setShowAllergiesModal(false)}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});
