import { useEffect, useState, useRef } from "react"; 
import Head from "next/head";
import Image from "next/image";
import * as htmlToImage from "html-to-image"; // ✅ use this only
import { Tiro_Devanagari_Marathi, Akaya_Kanadaka } from "next/font/google";

const tiro = Tiro_Devanagari_Marathi({
  subsets: ["devanagari"],
  weight: ["400"],
});

const akaya = Akaya_Kanadaka({
  subsets: ["devanagari"],
  weight: ["400"],
});

export default function TraditionalInvitation() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [finalName, setFinalName] = useState("");
  const [showPersonalInvite, setShowPersonalInvite] = useState(false);
  const inviteRef = useRef(null);

  useEffect(() => {
    const inaugurationDate = new Date("March 12, 2026 18:25:00").getTime();

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

  const handleDownload = () => {
  if (!inviteRef.current) return;

  htmlToImage
    .toPng(inviteRef.current, {
      cacheBust: true,
      backgroundColor: "#ffffff",
      style: {
        fontFamily: "'Noto Serif Devanagari', serif", // ✅ fallback font
      },
      skipFonts: true, // ✅ prevent trying to embed Google Fonts (causes SecurityError)
      filter: (node) => {
        // ✅ ignore <link> or <style> nodes (external CSS causes errors)
        if (node.tagName === "LINK" || node.tagName === "STYLE") {
          return false;
        }
        return true;
      },
    })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${guestName || "invitation"}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error("❌ Error generating image:", err);
    });
};

  const handlePopupSubmit = () => {
    if (guestName.trim() === "") return;
    setFinalName(guestName);
    setShowPopup(false);
    setShowPersonalInvite(true);
  };


  return (
    <>
      <Head>
        <title>गृह प्रवेश निमंत्रण</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;700&family=Modak&family=Baloo+Bhai+2:wght@400;700&display=swap"
    rel="stylesheet"
  />
      </Head>

      {/* ---------------- MAIN INVITATION (WITH COUNTDOWN) ---------------- */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/bgFix.jpg"
            alt="Ganesha Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/70 via-white/90 to-white"></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden bg-white">
          <div className="absolute inset-0 z-0">
            <img
              src="/bg25.jpg"
              alt="Background"
              className="w-full h-full object-cover opacity-100"
            />
          </div>

          <div className="relative z-10">
            {/* Ganesh Image + Heading */}
            <div className="flex flex-col items-center">
              <Image
  src="/ganesha4.jpg"
  alt="Shree Ganesh"
  width={150}
  height={150}
  className="mx-auto mb-4 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)]"
/>
             <h1 className={` text-4xl md:text-5xl font-extrabold mt-2 text-yellow-700 drop-shadow-lg font-devanagari `}>
  गृह प्रवेश निमंत्रण
</h1>
            </div>

            <p className="text-xl md:text-2xl mt-2 text-yellow-600 drop-shadow-md font-devanagari">
              गुरुवार, १२ मार्च २०२५, संध्याकाळी ०६:२५
            </p>

            {/* 🏠 House Image with double golden border */}
            <div className="relative mt-5 max-w-md mx-auto p-[6px] rounded-2xl bg-gradient-to-r from-pink-900 via-pink-700 to-pink-500 shadow-2xl">
              <div className="rounded-2xl bg-gradient-to-r from-pink-900 via-pink-700 to-pink-500 p-[4px]">
                <div className="relative h-60 md:h-72 w-full rounded-xl overflow-hidden">
                  <Image
                    src="/house2.jpg"
                    alt="Our New Home"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="my-6 text-red-900">
              <h2 className="text-xl mb-3 drop-shadow">Countdown to Celebration</h2>
              <div className="flex justify-center space-x-5">
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div key={unit} className="text-center">
                    <div className="text-3xl font-bold drop-shadow-lg">{timeLeft[unit]}</div>
                    <div className="text-sm capitalize">{unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mt-6 px-4 leading-relaxed font-serif text-pink-900 text-base md:text-lg drop-shadow-md text-center">
              <p className="font-devanagari">
                🪔 स्वप्न एका नव्या वास्तूचे, साकार झाले आपल्या आशीर्वादाने।
                कार्य नूतन गृहाचे वास्तुशांतीचे, योजिले श्री कुलदेवताच्या कृपेने।
              </p>
              <p className="font-devanagari">
                🌺 तोरण या वास्तूवर चढावे, आपण सर्वांच्या साक्षीने...
                <br />
                रंगत या कार्याची वाढावी तुमच्या आनंददायी सहवासाने…
              </p>
            </div>

            {/* Venue */}
                  <p className="mt-6 font-bold text-base md:text-lg text-pink-900 drop-shadow-lg font-devanagari">
  <i className="fas fa-map-marker-alt mr-2"></i>
  स्थळ : पाटील गल्ली, गणपती मंदिर जवळ, माळभाग, शिरढोण
</p>

            {/* Host */}
            <p className="mt-5 font-bold text-base md:text-lg text-pink-900 drop-shadow-lg text-center font-devanagari">
              <i className="fas fa-user-circle mr-2"></i>
             निमंत्रक : सुरवे, सासणे, गारवे
            </p>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-4 left-4 text-2xl text-amber-600 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 text-2xl text-amber-600 animate-pulse">🙏</div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowPopup(true)}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition"
        >
          📥 View And Download Your Invitation
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="text-lg font-bold mb-4">तुमचे नाव भरा ✨</h2>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full border p-2 rounded-lg mb-4"
              placeholder="तुमचे नाव"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                रद्द करा
              </button>
              <button
                onClick={handlePopupSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                पुढे जा
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- PERSONALIZED INVITATION ---------------- */}
      {showPersonalInvite && (
        <div className="my-10 flex flex-col items-center">
          <div
            ref={inviteRef}
            className="relative w-full max-w-2xl rounded-3xl shadow-xl p-6 bg-white overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/bg25.jpg"
                alt="Background"
                className="w-full h-full object-cover opacity-100"
              />
            </div>

          <div className="relative z-10 text-center">
  {/* Ganesh Image */}
  
  
    {/* <Image
  src="/ganesha4.jpg"
  alt="Shree Ganesh"
  width={150}
  height={150}
  className="mx-auto mb-4 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)]"
/> */}
<img
  src="/ganesha4.jpg"
  alt="Shree Ganesh"
  className="mx-auto mb-4 w-[150px] h-[150px] rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)]"
/>

  {/* Heading */}
  <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-yellow-700 drop-shadow-lg font-devanagari">
    गृह प्रवेश निमंत्रण
  </h1>

  {/* Date */}
  <p className="text-xl md:text-2xl mt-3 text-yellow-600 drop-shadow-md font-devanagari">
    गुरुवार, १२ मार्च २०२५, संध्याकाळी ०६:२५
  </p>

              <p className="text-base md:text-lg mt-2 text-pink-900 drop-shadow-md font-devanagari">
                आदरणीय {finalName} सप्रेम नमस्कार वि. वि. आपणास कळविण्यात आनंद होत आहे कि, आमच्या नवीन वास्तूची शांती व सत्यनारायण महापूजा आयोजित केली आहे! तरी आपण सहकुटुंब, सहपरिवार व मित्रमंडळी उपस्थित राहून तीर्थप्रसादाचा लाभ घ्यावा ही विनंती... 🌸
              </p>

              {/* House Image with golden border */}
              <div className="relative mt-5 max-w-md mx-auto p-[6px] rounded-2xl bg-gradient-to-r from-pink-900 via-pink-700 to-pink-500 shadow-2xl">
                <div className="rounded-2xl bg-gradient-to-r from-pink-900 via-pink-700 to-pink-500 p-[4px]">
                  <div className="relative h-60 md:h-72 w-full rounded-xl overflow-hidden">
                    <Image
                      src="/house2.jpg"
                      alt="Our New Home"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6 px-4 leading-relaxed font-serif text-pink-900 text-base md:text-lg drop-shadow-md">
                <p className="font-devanagari">
                  🪔 स्वप्न एका नव्या वास्तूचे, साकार झाले आपल्या आशीर्वादाने।
                  कार्य नूतन गृहाचे वास्तुशांतीचे, योजिले श्री कुलदेवताच्या कृपेने।
                </p>
                <p className="font-devanagari">
                  🌺 तोरण या वास्तूवर चढावे, आपण सर्वांच्या साक्षीने...
                  <br />
                  रंगत या कार्याची वाढावी तुमच्या आनंददायी सहवासाने…
                </p>
              </div>

              {/* Venue */}
         <p className="mt-6 font-bold text-base md:text-lg text-pink-900 drop-shadow-lg font-devanagari">
  <i className="fas fa-map-marker-alt mr-2"></i>
  स्थळ : पाटील गल्ली, गणपती मंदिर जवळ, माळभाग, शिरढोण
</p>

<p className="mt-5 font-bold text-base md:text-lg text-pink-900 drop-shadow-lg font-devanagari">
  <i className="fas fa-user-circle mr-2"></i>
  निमंत्रक : सुरवे, सासणे, गारवे
</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition"
          >
            📥 Download Personalized Invitation
          </button>
        </div>
      )}

     
      <style jsx>{`
  .font-devanagari {
    font-family: "Noto Serif Devanagari", serif;
  }
  .font-marathi-stylish {
    font-family: "Modak", cursive;
  }
  .font-marathi-bold {
    font-family: "Baloo Bhai 2", cursive;
  }
    .font-display-rozh a {
    font-family: "Rozha One", serif;
  }
  .font-display-shrikhand {
    font-family: "Shrikhand", cursive;
  }
  .font-script-tillana {
    font-family: "Tillana", cursive;
  }
  .font-literary-tiro {
    font-family: "Tiro Devanagari Marathi", serif;
  }
`}</style>
    </>
  );
}
