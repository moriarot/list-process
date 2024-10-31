import { useState, useEffect } from 'react'
import './App.css'
import AddProcessModal from './components/AddProcessModal'

function App() {
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    // כשהאתר מוכן, הוא שולח להורה שלו (ל php)
    // שהוא מוכן ואז ההורה ישלח קוקיז לזיהוי
    window.parent.postMessage({ pageLoaded: true }, "https://portal.tak.co.il");

    // Event listener for messages from the parent window
    // הפונקציה שקבלת את הקוקיז
    const messageHandler = (event) => {
      if (event.origin === 'https://portal.tak.co.il') { 
      if (event.data.cookieName) {
          // שמירת הקוקיז
          setCompanyId(event.data.cookieName);
        }
      }
    };

    window.addEventListener('message', messageHandler);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <>
    {companyId ? <AddProcessModal companyId={companyId}/> : <>404 not found</>}
    </>
  )
}

export default App
