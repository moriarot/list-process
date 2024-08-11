import { useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } 
    from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import './TableProcess.css';

export default function TableProcess({setStageToUpdate, setOpenEditModal, haveChange}) {
    const [process, setProcess] = useState([]);

    useEffect(() => {
        fetchDatatProcessProcess();
    }, [haveChange])

    const fetchDatatProcessProcess = async () => {
        const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
        const apiUrl = "https://tak.co.il/td/api/admin/server.php";
        const formData = new FormData();
        formData.append("get_all_process", "true");
        formData.append("apiKey", apiKey);
        const searchParams = new URLSearchParams(window.location.search);
        const p_id = searchParams.get('p_id');
        
        formData.append("p_id", p_id);

        try {
            const response = await fetch(apiUrl, {
                method: "POST", body: formData,
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.success) {
                    // if in process, set data process
                    setProcess(jsonResponse.process);
                    console.log("response", jsonResponse)
                } else {
                    // setErrorTokenPersonal(true);
                }
            } else {                
                // setErrorTokenPersonal(true);
            }
        } catch (error) {
            console.log("error", error);
            // setErrorTokenPersonal(true);
        }
    }

  return (
    <TableContainer component={Paper} dir="rtl" className='table-container'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='MuiTableHead-title'>
            <TableCell align="right" >שם</TableCell>
            <TableCell align="right">מידע נוסף</TableCell>
            <TableCell align="right">פרטים נוספים</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {process.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">{row.TdRecKot}</TableCell> */}
              <TableCell align="right">{row.TdRecKot}</TableCell>
              <TableCell align="right">{row.TdRecDes}</TableCell>
              <TableCell align="right" className='clickable' onClick={() => {setStageToUpdate(row); setOpenEditModal(true);}}>
                <FontAwesomeIcon icon={faPen} style={{ margin: '0 47%' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
