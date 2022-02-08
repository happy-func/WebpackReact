import React from 'react';
import './app.less';

const sortUniqueArray = [...new Set([...[1,2,5,7,9], ...[1,2,3,4,7,8,10]])].sort((x, y) => Number(x > y) || -1);

function App() {
  return (
    <div className="App">
      <h1>{JSON.stringify(sortUniqueArray)}</h1>
    </div>
  );
}

export default App;
