import React, {useState} from "react";
import { Box, Button } from "@mui/material";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ParkingApp() {
const [data, setData] = useState('');
const navigate = useNavigate();

const handlesubmit = (e) =>{
  e.preventDefault();
  
  
  const newdata = Array.from({ length: Number(data) }, (_, index) => index + 1);
  
  setData('');

  navigate("/ParkingLots", { state: { data: newdata } });
  
}
  return (
    <>
      <Box className="backgrund-img">
        <Box className="second-box">
          <Box className="box">
            <h2 className="head">Enter parking space</h2>
            
           
            <form onSubmit={handlesubmit}>
            <input type="number" className="input" 
            placeholder="Enter Space" 
              value={data}
              onChange={(e) => setData(e.target.value)}
              
            />
            
            <br></br>

             {/* <Link to="/ParkingLots">  */}
              <Button
                className="btn"
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2, borderRadius: 4 }}
              >
                Set Space
              </Button>
             {/* </Link>  */}
            </form>

          </Box>
        </Box>
      </Box>
    </>
  );
}

