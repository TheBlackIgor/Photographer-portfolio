import "./AboutMe.scss";

export const AboutMe = () => {
  return (
    <div className="aboutMe-main">
      <section className="aboutMe-container">
        <h1>Cześć jestem Michał</h1>
        <article>
          <p>
            Cześć! Jestem Michał Reuss, mam 17 lat. Pasjonuję się fotografią
            oraz tworzeniem filmów. Już od 5 lat moje życie kręci się wokół
            obiektywu aparatu i kamery. Pochodzę z urokliwego Krakowa, który
            stanowi główne tło dla moich sesji zdjęciowych. Jednak jeśli jesteś
            z innego miasta - jestem gotów żeby do Ciebie przyjechać. W takim
            wypadku koszty podróży pokrywa klient.
          </p>
          <br />
          <p>
            Moja praca to nie tylko wykonywanie zdjęć czy kręcenie filmów, to
            pasja i zaangażowanie, które staram się przekładać na każdy kadr.
            Zapraszam Cię do zapoznania się z moim portfolio i skontaktowania
            się ze mną, jeśli jesteś zainteresowany współpracą. Razem możemy
            stworzyć niezapomniane wspomnienia w formie pięknych fotografii i
            filmów.
          </p>
          <br />
        </article>
      </section>
      <div className="aboutMe-card">
        <div className="aboutMe-first-content">
          <img src="/ja.jpg" alt="me" />
        </div>
        <div className="aboutMe-second-content">
          <span>A oto ja (w tle to mój przyjaciel Piotr :3)</span>
        </div>
      </div>
    </div>
  );
};
