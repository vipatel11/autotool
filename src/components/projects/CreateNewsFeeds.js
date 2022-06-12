import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom"

export default function NewsFeeds() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

 
  return(
      <div>
        <p>You Clicked {count} times</p>
        <button onClick={()=> setCount(count + 1)}>
          Click me 
        </button>
      </div>
  )
}
