import React, { useEffect } from 'react';
import useStorage from "../hooks/useStorage";

const ProgressBar = (props) => {
    const {progress, url} = useStorage(props.file, props.category, props.user);
    console.log(progress, url);

    useEffect(() => {
        if (url) {
          props.setFile(null);
          props.setCategory("");
          props.setShowProgressBar(false);
        }
      }, [url, props.setFile]);

    return (
        <div className="progress mt-2">
            <div className="progress-bar bg-success" role="progressbar" style={{width: progress+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    )
}

export default ProgressBar;