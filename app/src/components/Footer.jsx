const Footer = () => {
  return (
    <div
      className="footer bg-dark text-white"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          textShadow: "0px 1px 2px rgba(255, 255, 255, 0.8)",
        }}
      >
        E-DASHBOARD
      </h3>
    </div>
  );
};

export default Footer;
