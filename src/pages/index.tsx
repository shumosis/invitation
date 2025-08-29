import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const inaugurationDate = new Date("September 10, 2025 16:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = inaugurationDate - now;

      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRSVP = () => {
    const name = prompt("Please enter your name:");
    if (name) {
      const willAttend = confirm(`Thank you ${name}! Will you be attending our house inauguration?`);
      if (willAttend) {
        alert("We're excited to see you at the inauguration!");
      } else {
        alert("We'll miss you! Thank you for letting us know.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>House Inauguration Invitation</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <div className="container">
        <div className="invitation-card">
          <div className="header">
            <h1>HOUSE INAUGURATION</h1>
            <p>You are Cordially Invited to Celebrate With Us</p>
          </div>

          <div
            className="house-image"
            onClick={() =>
              alert(
                "To add your house image, replace the placeholder with an <img> tag."
              )
            }
          >
            <div className="upload-text">
              <i className="fas fa-home fa-3x"></i>
              <p>Your house image will appear here</p>
              <p>Click on  below</p>
            </div>
          </div>

          <div className="details">
            <h2>Celebration Details</h2>

            <div className="info-grid">
              <div className="info-item">
                <i className="fas fa-calendar-alt"></i>
                <div>
                  <h3>September 10, 2025</h3>
                  <p>Wednesday</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h3>4:00 PM onwards</h3>
                  <p>Evening</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Our New Home</h3>
                  <p>Address will be shared after RSVP</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-gift"></i>
                <div>
                  <h3>Your Presence</h3>
                  <p>Is the only gift we need</p>
                </div>
              </div>
            </div>

            <div className="message">
              <p>
                After much anticipation and hard work, we are thrilled to invite
                you to the inauguration of our new home. Your presence will add
                joy to our celebration and bless our new beginning.
              </p>
            </div>

            <div className="countdown">
              <h3>Countdown to the Celebration</h3>
              <div className="countdown-timer">
                <div className="timer-unit">
                  <div className="timer-value">{timeLeft.days}</div>
                  <div className="timer-label">Days</div>
                </div>
                <div className="timer-unit">
                  <div className="timer-value">{timeLeft.hours}</div>
                  <div className="timer-label">Hours</div>
                </div>
                <div className="timer-unit">
                  <div className="timer-value">{timeLeft.minutes}</div>
                  <div className="timer-label">Minutes</div>
                </div>
                <div className="timer-unit">
                  <div className="timer-value">{timeLeft.seconds}</div>
                  <div className="timer-label">Seconds</div>
                </div>
              </div>
            </div>

            <div className="rsvp">
              <button className="rsvp-button" onClick={handleRSVP}>
                RSVP Now
              </button>
              <p style={{ marginTop: "20px" }}>
                We wouldd love to know if you can make it!
              </p>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>
            Created with ❤️ for our special guests | For inquiries:
            your-email@example.com
          </p>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          color: #333;
          line-height: 1.6;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .invitation-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin: 30px auto;
          transition: transform 0.3s ease;
        }

        .invitation-card:hover {
          transform: translateY(-5px);
        }

        .header {
          text-align: center;
          padding: 30px 20px;
          background: linear-gradient(120deg, #2c3e50, #4ca1af);
          color: white;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .header p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .house-image {
          width: 100%;
          height: 350px;
          background-color: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #777;
          font-size: 1.2rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .house-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-text {
          position: absolute;
          text-align: center;
          z-index: 2;
        }

        .details {
          padding: 30px;
        }

        .details h2 {
          color: #2c3e50;
          margin-bottom: 20px;
          text-align: center;
          font-size: 1.8rem;
          position: relative;
          padding-bottom: 10px;
        }

        .details h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(120deg, #2c3e50, #4ca1af);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .info-item {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          padding: 15px;
          border-radius: 10px;
        }

        .info-item i {
          font-size: 1.5rem;
          margin-right: 15px;
          color: #4ca1af;
        }

        .message {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
          text-align: center;
          font-style: italic;
          line-height: 1.8;
        }

        .countdown {
          text-align: center;
          margin: 30px 0;
        }

        .countdown h3 {
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .timer-unit {
          background: linear-gradient(120deg, #2c3e50, #4ca1af);
          color: white;
          padding: 15px;
          border-radius: 10px;
          min-width: 80px;
        }

        .timer-value {
          font-size: 2rem;
          font-weight: bold;
        }

        .timer-label {
          font-size: 0.9rem;
          margin-top: 5px;
        }

        .rsvp {
          text-align: center;
          margin-top: 30px;
        }

        .rsvp-button {
          display: inline-block;
          background: linear-gradient(120deg, #2c3e50, #4ca1af);
          color: white;
          padding: 15px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .rsvp-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          color: #777;
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }

          .header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
