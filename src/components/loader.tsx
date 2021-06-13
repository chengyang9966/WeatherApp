import React,{useState} from 'react';
export interface loadingProps{
    Defaultloading:Boolean|undefined
}

const Loader =(props:loadingProps)=>{
    const {Defaultloading}=props
    console.log('Defaultloading: ', Defaultloading);
    const [loading,SetLoading]=useState<Boolean>(false)
    Defaultloading&&SetLoading(Defaultloading)
    

    return(
        loading?(

        <div className="App-header ">

<i className="loader ss1"></i>
        </div>
        ):null
    )
}

export {Loader as default}