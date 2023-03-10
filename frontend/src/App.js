import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// components
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Player from './components/Player/Player';
import TeamProvider from './components/TeamProvider';
import PlayerPassing from './components/Player/PlayerPassing';

const queryClient = new QueryClient();
// use dotenv to consume api keys


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TeamProvider>
        <Layout>
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/player/:id" element={<Player />} />
          </Routes>
        </Layout>
      </TeamProvider>
    </QueryClientProvider>
  );
}

export default App;
