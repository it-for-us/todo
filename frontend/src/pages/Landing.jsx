import React from "react";
import NavLanding from "../components/navbar/NavLanding";
import img from "../assets/images/hero.png.png";
import view from "../assets/images/view.svg.png";
import card from "../assets/images/card-back.svg.png";
import automation from "../assets/images/automation.png.png";
import power from "../assets/images/power-ups.png.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <>
      <div className="landing-page">
        <NavLanding />
        <div className="hero-section">
          <div className="hero-headline">
            <h1>Trello brings all your</h1>
            <h1>tasks, teammates, and</h1>
            <h1>tools together</h1>
            <p>Keep everything in the same place—even if your team isn’t.</p>
            <form action="">
              <input type="email" name="email" id="email" placeholder="Email" />
              <Link to={"/signup"}>Sign up - it's free!</Link>
            </form>
          </div>
          <div className="hero-img">
            <img src={img} alt="img" />
          </div>
        </div>

        <article>
          <h2>Features to help your team succeed</h2>
          <p>
            Empowering an efficient team requires powerful tools and plenty of
            snacks. From meetings and projects, to events and goal setting,
            DART's intuitive features enable teams to quickly create and
            customize workflows for any task.
          </p>
        </article>
        <section>
          <img src={view} alt="view" />
          <div className="view">
            <p>Select a view</p>
            <h2>The dashboard is just the beginning</h2>
            <p>
              Lists and cards are the first step in organizing work on DART
              boards. You can improve your workflow by adding task assignments,
              timesheets, productivity analytics, calendars and much more.
            </p>
            <span>+ Learn more about it</span>
          </div>
        </section>
        <section>
          <div className="card_">
            <p>Check out the details</p>
            <h2>Everything you need on the cards</h2>
            <p>
              DART cards are your portal to keep things more organized, where
              all parts of your task are managed, tracked and shared with
              teammates. Open any card to see an ecosystem of to-do lists, due
              dates, attachments, conversations and much more.
            </p>
            <span>+ Learn more about it</span>
          </div>
          <img src={card} alt="card" />
        </section>
        <section>
          <img src={automation} alt="automation" />
          <div className="automation">
            <p>Meet your new Butler</p>
            <h2>Automation without code</h2>
            <p>
              Let robots complete the work so your team can focus on what
              matters. With DART's built-in automation, your entire team can
              harness the power of automation, reducing the number of laborious
              tasks and clicks on your project dashboard.
            </p>
            <span>+ Learn more about it</span>
          </div>
        </section>
        <section>
          <div className="power">
            <p>Power-Ups</p>
            <h2>Integrate the best working tools</h2>
            <p>
              Easily connect the applications your team uses to your DART
              workflow or add a Power-Up to meet a specific need. Meet all your
              team's workflow needs with hundreds of Power-Ups available to you.
            </p>
            <span>+ Learn more about it</span>
          </div>
          <img src={power} alt="power" />
        </section>
      </div>
      <Footer />
    </>
  );
}
