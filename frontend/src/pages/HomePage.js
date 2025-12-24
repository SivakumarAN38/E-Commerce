export default function HomePage() {
  return (
    <div>

      {/* HERO SECTION */}
      <section
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          background: "#f0f9ff",
          borderRadius: "0 0 40px 40px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0ea5e9", margin: 0 }}>
          Welcome to our Electronic Store
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#000000ff",
            marginTop: "0.7rem",
          }}
        >
          The best gadgets at unbeatable prices ⚡
        </p>

        <img
          src="/Logo.png"
          alt="Electronic Store"
          style={{
            width: "260px",
            marginTop: "1.5rem",
            filter: "drop-shadow(0px 4px 14px rgba(0,0,0,0.1))",
          }}
        />

        <div style={{ marginTop: "2rem" }}>

          {/* BUTTON 1 */}
          <a
            href="/products"
            style={{
              background: "#0ea5e9",   // teal theme
              color: "white",
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
              marginRight: "1rem",
            }}
          >
            Shop Now
          </a>

          {/* BUTTON 2 */}
          <a
            href="/cart"
            style={{
              background: "white",
              border: "2px solid #0ea5e9",
              color: "#0ea5e9",
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            View Cart
          </a>

        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section style={{ padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#1f2937" }}>
          Featured Categories
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {/* CARD 1 */}
          <div style={categoryCard}>
            <img
              src="data:image/webp;base64,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"
              alt="Laptops"
              style={categoryImg}
            />
            <h3 style={{ color: "#1f2937" }}>Laptops</h3>
            <p style={{ color: "#4b5563" }}>
              Powerful performance for students & professionals
            </p>
          </div>

          {/* CARD 2 */}
          <div style={categoryCard}>
            <img
              src="https://th.bing.com/th/id/OIP.p3LS5-6m3loJsznQsIftYAHaEK?w=321&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Smartphones"
              style={categoryImg}
            />
            <h3 style={{ color: "#1f2937" }}>Smartphones</h3>
            <p style={{ color: "#4b5563" }}>
              Flagship and budget-friendly devices
            </p>
          </div>

          {/* CARD 3 */}
          <div style={categoryCard}>
            <img
              src="https://th.bing.com/th/id/OIP.HPhsRrK-UQl-pGE2vmDGOAHaEJ?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt="Accessories"
              style={categoryImg}
            />
            <h3 style={{ color: "#1f2937" }}>Accessories</h3>
            <p style={{ color: "#4b5563" }}>
              Headphones, keyboards, speakers & more
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

const categoryCard = {
  background: "#ffffff",
  padding: "1rem",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  transition: "0.2s",
  cursor: "pointer",
};

const categoryImg = {
  width: "100%",
  height: "150px",
  objectFit: "contain",
  marginBottom: "1rem",
};
