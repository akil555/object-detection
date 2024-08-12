// src/App.jsx
import React from 'react';
import Layout from './Layout';
import ImageUploader from './ImageUploader';

function App() {
  return (
    <Layout>
      <h2 className="text-center text-xl font-semibold mb-6">Upload and Process Images</h2>
      <ImageUploader />
    </Layout>
  );
}

export default App;
