import React from 'react';
import { Alert } from 'react-native-alert-dialogues';
import { useDispatch } from 'react-redux';
import { HIDE_ALERT } from "../store/actions/types"

const AlertScreen = props => {

   const dispatch = useDispatch();

   const hideAlert = () => {
      dispatch({ type: HIDE_ALERT, showAlert: false, showType: "success", showMessage: "" })
   }

   return (
      <Alert
         visible={props.showAlert}
         type={props.showType}
         okPressed={() =>
            hideAlert()
         }
         message={props.showMessage}
      />
   );
};


export default AlertScreen;
