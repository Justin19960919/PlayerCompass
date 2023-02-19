import React from 'react';
import { Routes, Route } from 'react-router-dom';
// components
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Player from './components/Player/Player';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import PlayerShooting from './components/Player/PlayerShooting';

const queryClient = new QueryClient();
// use dotenv to consume api keys


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
