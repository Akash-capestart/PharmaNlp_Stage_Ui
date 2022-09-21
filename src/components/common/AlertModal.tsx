import React,{useEffect} from 'react'
import { useAppDispatch,useAppSelector } from '../../redux/Hooks';
import { successAlertShow } from '../../redux/reducers/GlobalAlertSlice';

export default function AlertModal() {
  
  const {showAlert,alertMsg} = useAppSelector((state) => state.globalAlert);  
  const dispatch = useAppDispatch()

  useEffect(() => {    
    const alertHideHandler = () => {
        setTimeout(() => {
            dispatch(successAlertShow())
        },2000)
    }
    if(showAlert){
        alertHideHandler()
    }
  }, [dispatch,showAlert])      

  return (    
    <div className={`pad-15 position-fixed common-alert-box has-border-radius-5 ${showAlert && "common-alert-box-in-animation"}`}>
        <p className="no-margin">{alertMsg}</p>
    </div>    
  )
}
