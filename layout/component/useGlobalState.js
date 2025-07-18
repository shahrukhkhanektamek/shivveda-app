import { useState } from 'react';

const useGlobalState = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [showSideBar, setSideBar] = useState(false);

  return {
    alert: { showAlert, setShowAlert, alertMessage, setAlertMessage, alertType, setAlertType },
    sidebar: { showSideBar, setSideBar },
    loader: { showLoader, setShowLoader },
  };
};

export default useGlobalState;
