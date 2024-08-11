import { useState } from 'react';
import './AddProcessModal.css';

function AddProcessModal({companyId}) {
  const [name, setName] = useState('');
  const [processId, setProcessId] = useState(null);
//   const [success, setSuccess] = useState(false);
    const closeModalAddProcess = () => {
      window.parent.postMessage({ closeAddProcess: true }, "https://portal.tak.co.il");

    }
  const createProcess = async(e) => {
    e.preventDefault();
    // Handle process creation

    // updateLoding(true, 'שומר את המידע..');
      const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
      const apiUrl = "https://tak.co.il/td/api/admin/server.php";
      const formDataToserver = new FormData();
      formDataToserver.append("createNewProcess", "true");
      formDataToserver.append("apiKey", apiKey);
      formDataToserver.append("idCompany", companyId);
      formDataToserver.append("name", name); 

      try {
          const response = await fetch(apiUrl, {
              method: "POST", body: formDataToserver,
          });
          if (response.ok) {
              const jsonResponse = await response.json();
              console.log('jsonResponse', jsonResponse)
              if (jsonResponse.success == true) {
                setProcessId(jsonResponse.message);
                  // if in process, set data stages
                //   setHaveChange(true);
                  //  אם זה שדה חדש מסוג מסמך לחתימה, מעביר למסך הוספת המסמך
                  // TdSugRec == "1" סוג שלב - מסמך לחתימה
                //   if(formData.TdSugRec == "1" && jsonResponse.stageIdNew){
                //     // window.parent.postMessage({ movePDFEdit: true, stageId:jsonResponse.stageIdNew }, "https://portal.tak.co.il");
                //   } else {
                //     // closeModal();
                //     // updateLoding(false);
                //   }
              } else {
                  // setErrorTokenPersonal(true);
                //   updateLoding(false);
              }
          } else {                
              // setErrorTokenPersonal(true);
            //   updateLoding(false);
          }
      } catch (error) {
          console.log("error", error);
          // setErrorTokenPersonal(true);
        //   updateLoding(false);
      }
  }

  const moveEditProcess = (e) => {
    e.preventDefault();
    window.parent.postMessage({ moveEditProcess: true, pId:processId }, "https://portal.tak.co.il");
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {!processId ? <form>
          <label>הכנס שם לתהליך</label>
          <input
            type='text'
            name='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <div className='modal_button'>
            <button onClick={closeModalAddProcess} className='cansel_button'>ביטול</button>
            <button onClick={createProcess} className='action_button'>צור תהליך חדש</button>
          </div>
        </form>: 
        <div>
            <div>התהליך נוצר בהצלחה</div>
            <button onClick={moveEditProcess}>עבור לעריכה</button>
        </div>
        }
      </div>
    </div>
  );
}

export default AddProcessModal;
