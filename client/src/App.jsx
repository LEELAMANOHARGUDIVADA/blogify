import Routers from './routes/Routers'
import Header from './components/Header/Header'
import Home from './pages/Home'
import { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';

function App() {
  
  const[user, setUser] = useState('');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
  const user_id = localStorage.getItem('userId');

  if (token) {
    setUser(user);
    setUserData(user_id);
  }
  }, [])

  return (
    <>
    <Header username={user} setUserName={setUser} userId={userData} setUserId={setUserData} />
     <Routers user={user} setUser={setUser} userId={userData} setUserId={setUserData} />
     <Footer />
    </>
  )
}

export default App
