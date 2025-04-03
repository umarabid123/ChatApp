import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

// Define interfaces for your data structures
interface User {
  _id: string;
  name: string;
  image?: string;
}

interface ChatRequest {
  from: User;
  message: string;
}

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
}

interface DecodedToken {
  userId: string;
}

interface ChatProps {
  item: User;
}

const ChatsScreen: React.FC = () => {
  const [options, setOptions] = useState<string[]>(['Chats']);
  const [chats, setChats] = useState<User[]>([]);
  const [requests, setRequests] = useState<ChatRequest[]>([]);
  const { token, setToken, setUserId, userId } = useContext<AuthContextType>(AuthContext);
  const navigation = useNavigation<any>();

  const chooseOption = (option: string) => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          const decodedToken: DecodedToken = jwtDecode(storedToken);
          setToken(storedToken);
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
      }
    };

    fetchUser();
  }, [setToken, setUserId]);

  useEffect(() => {
    if (userId) {
      getrequests();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getrequests = async () => {
    try {
      const response = await axios.get<ChatRequest[]>(
        `http://localhost:4000/getrequests/${userId}`
      );
      setRequests(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      const response = await axios.post('http://localhost:4000/acceptrequest', {
        userId: userId,
        requestId: requestId,
      });

      if (response.status === 200) {
        await getrequests();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get<User[]>(`http://localhost:4000/user/${userId}`);
      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Pressable onPress={logout}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo',
            }}
          />
        </Pressable>

        <Text style={styles.title}>Chats</Text>

        <View style={styles.iconsContainer}>
          <AntDesign name="camera" size={26} color="black" /> {/* Fixed icon name */}
          <MaterialIcons
            onPress={() => navigation.navigate('People')}
            name="person-outline"
            size={26}
            color="black"
          />
        </View>
      </View>

      <View style={styles.content}>
        <Pressable
          onPress={() => chooseOption('Chats')}
          style={styles.optionHeader}
        >
          <Text>Chats</Text>
          <Entypo name="chevron-down" size={26} color="black" /> {/* Fixed icon name */}
        </Pressable>

        {options.includes('Chats') && (
          chats.length > 0 ? (
            <View>
              {chats.map((item) => (
                <Chat item={item} key={item._id} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Chats yet</Text>
              <Text style={styles.emptySubText}>
                Get started by messaging a friend
              </Text>
            </View>
          )
        )}

        <Pressable
          onPress={() => chooseOption('Requests')}
          style={styles.optionHeader}
        >
          <Text>Requests</Text>
          <Entypo name="chevron-down" size={26} color="black" /> {/* Fixed icon name */}
        </Pressable>

        {options.includes('Requests') && (
          <View style={styles.requestsContainer}>
            <Text style={styles.requestsTitle}>Checkout all the requests</Text>

            {requests.map((item) => (
              <Pressable key={item.from._id} style={styles.requestItem}>
                <View style={styles.requestContent}>
                  <Pressable>
                    <Image
                      source={{ uri: item.from.image || 'default_image_url' }} // Added fallback
                      style={styles.requestImage}
                    />
                  </Pressable>

                  <View style={styles.requestText}>
                    <Text style={styles.requestName}>{item.from.name}</Text>
                    <Text style={styles.requestMessage}>{item.message}</Text>
                  </View>

                  <Pressable
                    onPress={() => acceptRequest(item.from._id)}
                    style={styles.acceptButton}
                  >
                    <Text style={styles.acceptText}>Accept</Text>
                  </Pressable>

                  <AntDesign name="delete" size={26} color="red" />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  content: {
    padding: 10,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
  },
  emptySubText: {
    marginTop: 4,
    color: 'gray',
  },
  requestsContainer: {
    marginVertical: 12,
  },
  requestsTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  requestItem: {
    marginVertical: 12,
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  requestImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  requestText: {
    flex: 1,
  },
  requestName: {
    fontSize: 15,
    fontWeight: '500',
  },
  requestMessage: {
    marginTop: 4,
    color: 'gray',
  },
  acceptButton: {
    padding: 8,
    backgroundColor: '#005187',
    width: 75,
    borderRadius: 5,
  },
  acceptText: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
  },
});

export default ChatsScreen;