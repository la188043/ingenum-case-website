import { promises } from 'fs';
import React from 'react';

import ManageSection from '../../Sections/ManageSections';

const App = () => (
  <div className="container">
    <h1 className="heading-primary u-mb-md">Task Application</h1>
    <ManageSection />
  </div>
);

export default App;
