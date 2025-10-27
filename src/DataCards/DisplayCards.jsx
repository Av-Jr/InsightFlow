import "./DisplayCards.css"
import {useState, useEffect} from 'react'

const DisplayCards = () => {
    const [Rev, SetRev] = useState(0)

    useEffect(() => {
         fetch("http://127.0.0.1:5000/getRev")
             .then((Res) => Res.json())
             .then((data => {SetRev(data.LatestRevenue)}))
    }, [])
    return(
        <>
            <div id={"DisplayCardsCon"}>
                <div id={"DCCr1"}>
                    <div id={"RevBox"}>
                        <p class={"CardLabel"}>REVENUE : </p>
                        {Rev}
                    </div>
                    <div id={"SoldQBox"}>
                        <p className={"CardLabel"}>QUANTITY SOLD : </p>
                    </div>
                    <div id={"ProdSBox"}>
                        <p className={"CardLabel"}>PRODUCTS SOLD : </p>
                    </div>
                </div>
                <div id={"DCCr2"}>
                    <div id={"AOV"}>
                        <p className={"CardLabel"}>AVG ORDER VALUE : </p>
                    </div>
                    <div id={"RSD"}>
                        <p className={"CardLabel"}>RECENT SALES : </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayCards;