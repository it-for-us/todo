import React from "react";
import NavLanding from "../components/navbar/NavLanding";
import img from "../assets/images/TrelloUICollage_4x.webp";
import imgSlider from "../assets/images/Carousel_Image_Boards_2x.webp";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="landing-page">
      <NavLanding />
      <div className="hero-section">
        <section className="hero-headline">
          <h1>Trello brings all your</h1>
          <h1>tasks, teammates, and</h1>
          <h1>tools together</h1>
          <p>Keep everything in the same place—even if your team isn’t.</p>
          <form action="">
            <input type="email" name="email" id="email" placeholder="Email" />
            <Link to={"/signup"}>Sign up - it's free!</Link>
          </form>
        </section>
        <section className="hero-img">
          <img src={img} alt="img" />
        </section>
      </div>
      <div className="hero-section-two">
        <article>
          <p>TRELLO 101</p>
          <h2>A productivity powerhouse</h2>
          <p>
            Simple, flexible, and powerful. All it takes are boards, lists, and
            cards to get a clear view of who’s doing what and what needs to get
            done. Learn more in our guide for getting started.
          </p>
        </article>
        <div className="slider">
          <div className="info">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  Boards
                </Card.Subtitle>
                <Card.Text>
                  Trello boards keep tasks organized and work moving forward. In
                  a glance, see everything from “things to do” to “aww yeah, we
                  did it!”
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Lists</Card.Subtitle>
                <Card.Text>
                  The different stages of a task. Start as simple as To Do,
                  Doing or Done—or build a workflow custom fit to your team’s
                  needs. There’s no wrong way to Trello.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Cards</Card.Subtitle>
                <Card.Text>
                  Cards represent tasks and ideas and hold all the information
                  to get the job done. As you make progress, move cards across
                  lists to show their status.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="img">
            <img src={imgSlider} alt="imgSlider" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
