import { calculateCoffeeStats, coffeeConsumptionHistory, calculateCurrentCaffeineLevel, statusLevels, getTopThreeCoffees } from "../utils";
import { useAuth } from "../context/AuthContext";


function StatCard(props) {
    const { lg, title, children } = props;

    return (
        <div className={"col" + (lg ? ' w-100' : '')}>
            <div className="card text-bg-light h-100">
                <div className="card-body">
                    <h5 className="card-title fw-bolder">{title}</h5>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default function Stats() {
    //************ read db ************//
    const { globalData } = useAuth();
    let coffeeConsumptionHistory = globalData;
    //************ read db ************//

    const stats = calculateCoffeeStats(coffeeConsumptionHistory);
    const coffeeLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory);
    const warnningLevel = coffeeLevel < statusLevels["low"].maxLevel ?
        "low" :
        coffeeLevel < statusLevels["moderate"] ?
            "moderate" :
            "hight";


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col mt-3">
                        <h2 className="fw-bolder lh-lg"><i className="fa-solid fa-chart-simple" /> Stats</h2>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 g-3">
                    <StatCard lg title="Active Caffeine Level">
                        <span className="fs-2 fw-medium">{coffeeLevel}</span>mg
                        <div className="badge text-wrap fs-6 ms-3 text-capitalize"
                            style={{ color: statusLevels[warnningLevel].color, background: statusLevels[warnningLevel].background }}
                        >
                            {warnningLevel}
                        </div>
                        <p className="mt-4 mb-0">{statusLevels[warnningLevel].description}</p>
                    </StatCard>
                    <StatCard title="Daily Caffeine">
                        <span className="fs-2 fw-medium">{stats.daily_caffeine}</span>mg
                    </StatCard>
                    <StatCard title="Avg # of Coffees">
                        <span className="fs-2 fw-medium">{stats.average_coffees}</span>mg
                    </StatCard>
                    <StatCard title="Daily Cost ($)">
                        $<span className="fs-2 fw-medium">{stats.daily_cost}</span>
                    </StatCard>
                    <StatCard title="Total Cost ($)">
                        $<span className="fs-2 fw-medium">{stats.total_cost}</span>
                    </StatCard>
                </div>

                <div className="row">
                    <div className="col my-3 mt-4">
                        <table className="table table-hover table-light">
                            <thead>
                                <tr>
                                    <th>Coffee Name</th>
                                    <th>Number of Purchase</th>
                                    <th>Percentage of Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTopThreeCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex) => {
                                        return (
                                            <tr key={coffeeIndex}>
                                                <td>{coffee.coffeeName}</td>
                                                <td>{coffee.count}</td>
                                                <td>{coffee.percentage}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}