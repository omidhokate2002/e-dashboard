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
        className="mb-0 font-weight-bold text-shadow"
        style={{ fontSize: "18px" }}
      >
        <span className="badge badge-primary badge-pill px-3 py-2">
          E-DASHBOARD
        </span>
      </h3>
    </div>
  );
};

export default Footer;
