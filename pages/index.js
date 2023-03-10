import { useSession, signIn, signOut } from 'next-auth/react';

import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/home/main';

const Home = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <Header />
      {session ? 'you are logged in' : 'you are not logged in' }
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
