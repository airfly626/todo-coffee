import { coffeeConsumptionHistory, timeSinceConsumption, getCaffeineAmount, calculateCurrentCaffeineLevel } from "../utils";
import { useAuth } from "../context/AuthContext";


export default function History() {
    //************ read db ************//
    const { globalData } = useAuth();
    let coffeeConsumptionHistory = globalData;
    //************ read db ************//


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col mt-3">
                        <h2 className="fw-bolder lh-lg"><i className="fa-solid fa-timeline" /> History</h2>
                        <p className="fst-italic text-dark-emphasis">Hover for more information!</p>
                        <div className="d-flex flex-wrap align-items-center">
                            {
                                Object.keys(coffeeConsumptionHistory)
                                    .sort((a, b) => b - a)
                                    .map((utcTime, coffeeIndex) => {
                                        const coffee = coffeeConsumptionHistory[utcTime];
                                        const timeSinceConsume = timeSinceConsumption(utcTime);
                                        const originalAmount = getCaffeineAmount(coffee.name);
                                        const remainingAmount = calculateCurrentCaffeineLevel({
                                            [utcTime]: coffee
                                        });
                                        const summary = `${coffee.name} | \u000A` +
                                            `${timeSinceConsume} | \n` +
                                            `$${coffee.cost} | \n` +
                                            `${remainingAmount}mg / ${originalAmount}mg
                                        `;

                                        return (
                                            <div
                                                key={coffeeIndex}
                                                title={summary}
                                                className="p-3 p-lg-4"
                                            >
                                                <i className="fa-solid fa-mug-hot fa-lg" />
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}