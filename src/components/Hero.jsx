
export default function Hero() {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1 className="fw-bolder">Coffee Tracking for Coffee <abbr title="An enthusiast or devotee">Fiends</abbr>!</h1>
                        <div className="benefits-list">
                            <h3 className="fw-bolder lh-lg">Try <span className="gradient-start">Caffiend</span> and start ...</h3>
                            <p>✅ Tracking every coffee</p>
                            <p>✅ Measuring your blood caffeine levels</p>
                            <p>✅ Costing and quanitifying your addition</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card text-bg-light mb-3">
                            <div className="card-body">
                                <h3 className="card-title fw-bolder lh-lg"><i className="fa-solid fa-circle-info"></i> Did you know...</h3>
                                <h5 className="fw-bold mb-3">That caffeine&apos;s half-life is about 5 hours?</h5>
                                <p>This means that after 5 hours, half the caffeine you consumed is still in your system, keeping you alert longer! So if you drink a cup of coffee with 200 mg of caffeine, 5 hours, later, you&apos;ll still have about 100 mg of caffeine in your system.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}