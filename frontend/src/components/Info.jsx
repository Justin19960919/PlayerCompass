const InfoContainer = ({ info, isError }) => {
  return (
    <p style={{
      backgroundColor: isError ? "#f28482" : "#fefae0",
      color: isError ? "#ffffff" : "#293241",
      height: "40px",
      width: "80%",
      margin: "20px auto 20px auto",
      fontSize: "25px",
      textAlign: "center",
    }}>
      {info}
    </p>
  );
}

export default InfoContainer;