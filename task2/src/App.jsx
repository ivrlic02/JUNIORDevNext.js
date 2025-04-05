import { useState, useEffect, createContext, useContext, useRef } from 'react';
import './App.css';

const DetailsContext = createContext({
  name: "",
  email: "",
  country: "",
  address: "",
  payment: ""
});

function Details() {
  const { name, email, country, address, payment } = useContext(DetailsContext);
  return (
    <>
      <div id="details-container">
        <h3>Detalji narudžbe</h3>
        <p>Ime: {name}</p>
        <p>Email: {email}</p>
        <p>Država: {country}</p>
        <p>Adresa: {address}</p>
        <p>Način plaćanja: {payment}</p>
      </div>
    </>
  );
}

function InputField({label, type, value, setValue, validate, errorMessage}) {
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (error) {
      inputRef.current.focus()
    }
  }, [error])

  const handleChange = (e) => {
    const newVal = e.target.value
    setValue(newVal)
    setError(validate(newVal) ? "" : errorMessage)
  }

  return (
    <>
      <label>{label}</label>
      <input ref={inputRef} type={type} value={value} onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Hrvatska");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Poduzeće");
  const [terms, setTerms] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      console.log("Success");
    }
  }, [submit]);

  function handleSubmit() {
    if (!terms) {
      alert("Uvjeti narudžbe moraju biti prihvaćeni!");
      return;
    }
    setSubmit(true);
  }

  return (
    <DetailsContext.Provider value={{ name, email, country, address, payment }}>
      <div id="main-container">
        <h1>Plaćanje</h1>
        <div id="form-container">
          <div id="contact">
            <h2>Kontakt</h2>
            <div className="box">
              <InputField label="Email:" type="email" value={email} setValue={setEmail} validate={(v) => v.includes("@")} errorMessage="Email mora sadržavati '@'." />
            </div>
          </div>
          <div id="address">
            <h2>Adresa</h2>
            <div className="box">
              <InputField label="Ime:" type="text" value={name} setValue={setName} validate={(v) => v.length > 2} errorMessage="Ime mora imati barem 3 slova." />

              <label htmlFor="drzava">Država:</label>
              <select id='drzava' value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Hrvatska">Hrvatska</option>
                <option value="Tanzanija">Tanzanija</option>
                <option value="Monako">Monako</option>
              </select>

              <InputField label="Adresa:" type="text" value={address} setValue={setAddress} validate={(v) => v.length > 4} errorMessage="Adresa mora imati barem 5 slova." />
            </div>
          </div>
          <div id="payment">
            <h2>Način plaćanja</h2>
            <div className="box">
              <label>
                <input type="radio" checked={payment === "Poduzeće"} onChange={() => setPayment("Poduzeće")} />Poduzeće
              </label>
              <label>
                <input type="radio" checked={payment === "Kartica"} onChange={() => setPayment("Kartica")} />Kartica
              </label>
            </div>
          </div>
          <p id='terms'>
            <input type="checkbox" id='checkbox' checked={terms} onChange={() => setTerms(!terms)} />
            Prihvaćam uvjete narudžbe
          </p>
        </div>
        <span><button onClick={handleSubmit}>Naruči</button></span>
      </div>
      {submit && <Details />}
    </DetailsContext.Provider>
  );
}

export default App;