import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = ({ isLoading }) => {
  return (
    isLoading ? <FontAwesomeIcon
      icon={faSpinner}
      size="5x"
      spin
      color="#cfdbd5"
      style={{ margin: "100px auto", width: "100%" }}
    /> : <></>
  );
}

export default Spinner;