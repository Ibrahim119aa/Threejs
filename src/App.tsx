
import React from 'react';
const Index = React.lazy(() => import('./Page/Index'));
function App() {




  return (
    <div>
      <Index />
    </div>
  )
}

export default App
