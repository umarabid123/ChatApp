import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.userId;
        setUserId(userId)
    };
    fetchUser()
  }, []);

  return (
    <AuthContext.Provider value={{token,userId,setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext, AuthProvider};
