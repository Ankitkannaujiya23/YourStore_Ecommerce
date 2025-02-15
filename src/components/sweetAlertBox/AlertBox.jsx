import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { PopupAlertBox } from './CustomAlert';
import { hideAlert } from '../../stateStore/storeSlices/AlertDataSlice';

const AlertBox = () => {
  const dispatch=useDispatch();
    const alertData=useSelector(state=> state.AlertDataSlice );
    const{isShowAlert}=alertData;
   // PopupAlertBox(alertData);
   // console.log("alert box data", alertData);
    useEffect(() => {
      //console.log("alert data", alertData);
        if (alertData?.isShowAlert) {
          PopupAlertBox(alertData);
        }
      }, [alertData, alertData.isShowAlert]);

  return (
    <div>
      
    </div>
  )
}

export default AlertBox;
