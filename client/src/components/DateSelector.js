import React, { useState, useEffect } from "react";
import "../App.css";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { useDispatch } from "react-redux";
import { SET_DATA } from "../reducers/actionTypes";
import { USD, ILS } from "../StringConsts";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

const DateSelector = () => {
  const [currency, setCurrency] = useState(USD);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatchBitData();
  }, [currency, selectedDate]);

  async function fetchBitData() {
    const response = await fetch(
      "http://localhost:9000/getBit/byDate?selectedDate=" + selectedDate
    );
    const bitData = await response.json();
    return bitData;
  }

  async function setDateData(date) {
    var today = new Date();
    if (date > today) {
      setShow(true);
    } else {
      setSelectedDate(formatDate(date));
    }
  }

  function formatDate(date) {
    let formattedDate = JSON.stringify(date)
      .split("T")[0]
      .substring(1);
    return formattedDate;
  }

  async function dispatchBitData() {
    try {
      let parsedData = await createGraphDataObj();
      dispatch({ type: SET_DATA, payload: parsedData[currency] });
    } catch (error) {
      console.error(error);
    }
  }
  async function createGraphDataObj() {
    try {
      let dateData = await fetchBitData();
      let usdGraphData = {
        open: dateData["1b. open (USD)"],
        high: dateData["2b. high (USD)"],
        low: dateData["3b. low (USD)"],
        close: dateData["4b. close (USD)"],
        currency: USD
      };
      let ilsGraphData = {
        open: dateData["1a. open (ILS)"],
        high: dateData["2a. high (ILS)"],
        low: dateData["3a. low (ILS)"],
        close: dateData["4a. close (ILS)"],
        currency: ILS
      };
      return { USD: usdGraphData, ILS: ilsGraphData };
    } catch (error) {
      console.error(error);
    }
  }
  const toggleCurrency = () => {
    setCurrency(prevState => {
      return prevState == USD ? ILS : USD;
    });
    dispatchBitData();
  };

  return (
    <div id="Date-selector-wrapper">
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Invalid Date</Alert.Heading>
          <p>Please do not choose any date past the current date.</p>
        </Alert>
      ) : (
        <></>
      )}
      <Card>
        <Card.Body>
          Click the button to toggel the currency between ILS and USD.
        </Card.Body>
      </Card>
      <Button variant="dark" onClick={toggleCurrency}>
        {currency}
      </Button>
      <div id="Date-selector">
        <DayPicker onDayClick={setDateData} />
      </div>
    </div>
  );
};

export default DateSelector;
