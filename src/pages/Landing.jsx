import { Link } from "react-router-dom";

export default function Landing() {
  return <div className="public-landing">
    <section className="landing-hero">
      <div>
        <span className="eyebrow">TENDERTRACK PROCUREMENT PLATFORM</span>
        <h1>Welcome to TenderTrack</h1>
        <p>Discover opportunities, manage tenders and submit bids with confidence. TenderTrack brings the procurement process together in one simple platform.</p>
        <div className="landing-actions">
          <Link className="btn-primary" to="/register">Get Started · Sign Up</Link>
          <Link className="btn-secondary" to="/login">Log In</Link>
        </div>
      </div>
      <div className="landing-visual"><img src="/images/construction-team.png" alt="Team reviewing a construction project" /></div>
    </section>
    <section className="landing-features">
      <article className="card"><h2>Find opportunities</h2><p>Browse available tenders and review the details before preparing your bid.</p></article>
      <article className="card"><h2>Manage your bids</h2><p>Submit proposals and follow their progress from your account.</p></article>
      <article className="card"><h2>Stay informed</h2><p>Use your dashboard to keep track of procurement activity and deadlines.</p></article>
    </section>
  </div>;
}
