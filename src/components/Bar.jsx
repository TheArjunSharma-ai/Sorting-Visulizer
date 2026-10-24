import "./Bar.css"; // Ensure this file has the appropriate styles

function Bar({ index, length, color }) {
  const len = length;

  const inputStyle = {
    position: "relative",
    top: -Math.floor(len / 2),
    width: "100%", // Make input full width of the bar
    border: "none",
    background: "none",
    textAlign: "center", // Center text
    fontWeight: "bold",
    color: "black",
    rotate: "-90deg",
  };

  const colors = [
    ["rgba(61,90,241,0.5)", "rgba(61,90,241,0.2)"],
    ["rgba(255,48,79,1)", "rgba(255,48,79,0.5)"],
    ["rgba(131,232,90,0.5)", "rgba(131,232,90,0.2)"],
  ];

  const barStyle = {
    height: `${len}px`,
    backgroundColor: colors[color][0],
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: "1s",
    background: `radial-gradient(circle, #fff 0%, ${colors[color][0]} 100%)`,
  };
  return (
    <div className="bar" style={barStyle}>
      <input
        type="text"
        style={inputStyle}
        className="input"
        value={len}
        readOnly
        aria-label={`Value ${index + 1}`}
      />
    </div>
  );
}

export default Bar;
