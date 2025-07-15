import { coffeeOptions } from "../utils";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";


export default function CoffeeForm(props) {
    const { isAuthenticated } = props;

    const [selectedCoffee, setSeletedCoffee] = useState(null);
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    //db
    const { globalData, setGlobalData, globalUser } = useAuth();

    //async：處理送出表單前，先setDoc()
    async function handleSubmitForm() {

        if (!isAuthenticated) {
            $('#exampleModal').modal('show');

            return;
        }


        //************ read db ************//
        // define a guard clause that only submits the form if it is completed
        if (!selectedCoffee) {
            return;
        }


        try {
            // then we're going to create a new data object
            const newGlobalData = {
                ...(globalData || {})
            }

            const nowTime = Date.now();
            const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 1000);
            const timestamp = nowTime - timeToSubtract;
            const newData = {
                name: selectedCoffee,
                cost: coffeeCost
            };

            newGlobalData[timestamp] = newData;


            // update the global state
            setGlobalData(newGlobalData);

            // persist the data in the firebase firestore
            const userRef = doc(db, 'users', globalUser.uid);
            const res = await setDoc(userRef, {
                [timestamp]: newData
            }, {
                    merge: true
                });


            setSeletedCoffee(null);
            // setShowCoffeeTypes(false);
            setCoffeeCost(0);
            setHour(0);
            setMin(0);
        }
        catch (err) {
            console.log(err.message);
        }
        //************ read db ************//
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col py-3">
                        <h2 className="fw-bolder lh-lg"><i className="fa-solid fa-pencil" /> Start Tracking Today</h2>
                        <h4 className="fw-bolder">Select coffee type</h4>
                        <div className="coffee-grid">
                            {
                                coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                                    return (
                                        <button
                                            type="button"
                                            className={"btn " + (option.name === selectedCoffee ? 'btn-dark ' : 'btn-outline-dark ') + "m-2 d-flex flex-column justify-content-center align-items-center"}
                                            key={optionIndex}
                                            onClick={() => {
                                                setSeletedCoffee(option.name);
                                                setShowCoffeeTypes(false);
                                            }}
                                        >
                                            <p className="fw-bolder">{option.name}</p>
                                            {option.caffeine}mg
                                        </button>
                                    );
                                })
                            }

                            <button
                                type="button"
                                className={"btn " + (showCoffeeTypes ? 'btn-dark ' : 'btn-outline-dark ') + "m-2 d-flex flex-column justify-content-center align-items-center"}
                                onClick={() => {
                                    setSeletedCoffee(null);
                                    setShowCoffeeTypes(true);
                                }}
                            >
                                <p className="fw-bolder">Other</p>
                                n/a
                            </button>
                        </div>

                        {
                            showCoffeeTypes &&
                            <select className="form-select mt-2" id="coffeeOptions"
                                onChange={(e) => {
                                    setSeletedCoffee(e.target.value);
                                }}
                            >
                                <option value={null}>Select type</option>
                                {
                                    coffeeOptions.map((option, optionIndex) => {
                                        return (
                                            <option key={optionIndex} value={option.name}>
                                                {option.name} ({option.caffeine}mg)
                                        </option>
                                        )
                                    })
                                }
                            </select>
                        }

                        <h4 className="fw-bolder mt-3">Add the cost</h4>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" placeholder="4.50" aria-label="Amount"
                                value={coffeeCost}
                                onChange={(e) => {
                                    setCoffeeCost(e.target.value);
                                }}
                            />
                        </div>

                        <h4 className="fw-bolder">Time since consumption</h4>
                        <div className="container-fluid mb-2 px-0">
                            <div className="row row-cols-2">
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="inputGroupSelect01">Hours</label>
                                        <select className="form-select" id="inputGroupSelect01"
                                            onChange={(e) => {
                                                setHour(e.target.value);
                                            }}
                                        >
                                            {
                                                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                                    .map((hour, hourIndex) => {
                                                        return (
                                                            <option key={hourIndex} value={hour}>
                                                                {hour}
                                                            </option>
                                                        )
                                                    })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="inputGroupSelect02">Mins</label>
                                        <select className="form-select" id="inputGroupSelect02"
                                            onChange={(e) => {
                                                setMin(e.target.value);
                                            }}
                                        >
                                            {
                                                [0, 5, 10, 15, 30, 45]
                                                    .map((min, minIndex) => {
                                                        return (
                                                            <option key={minIndex} value={min}>
                                                                {min}
                                                            </option>
                                                        )
                                                    })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="btn btn-outline-dark mb-2"
                            onClick={handleSubmitForm}
                        >
                            Add Entry
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}