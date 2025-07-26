import "./LetAdventureBegin.css";

const LetAdventureBegin = () => {
  return (
    <section className="adventure_section">
      <div className="adventure_container">
        <h2>Let the Adventure Begin! 🌍✨</h2>
        <p>Explore. Laugh. Discover. Repeat.</p>

        <div className="fun_facts">
          <div className="fact_card">
            <span>🎒</span>
            <h3>500+</h3>
            <p>Happy Tourists</p>
          </div>
          <div className="fact_card">
            <span>🧭</span>
            <h3>100+</h3>
            <p>Expert Guides</p>
          </div>
          <div className="fact_card">
            <span>🗺️</span>
            <h3>60+</h3>
            <p>Awesome Locations</p>
          </div>
          <div className="fact_card">
            <span>🚐</span>
            <h3>1000+</h3>
            <p>Road Trips Taken</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetAdventureBegin;