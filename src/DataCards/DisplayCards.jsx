import "./DisplayCards.css"
import {useState, useEffect} from 'react'

const DisplayCards = () => {
    const [Rev, SetRev] = useState(0);
    const [Quan, SetQuan] = useState(0);
    const [Cat, SetCat] = useState([]);
    const [AOV, setAOV] = useState(0)
    const [LP, setLP] = useState([]);

    useEffect(() => {
         fetch("http://127.0.0.1:5000/getRev")
             .then((Res) => Res.json())
             .then((data => {SetRev(data.LatestRevenue)}))

        fetch("http://127.0.0.1:5000/getQuan")
            .then(res => res.json())
            .then(data => {SetQuan(data.LatestQuantity)})

        fetch("http://127.0.0.1:5000/getProdTot")
            .then(res => res.json())
            .then(Data => SetCat(Data))

        fetch("http://127.0.0.1:5000/getAOV")
            .then(res => res.json())
            .then(data => setAOV(data.LatestAOV))

        fetch("http://127.0.0.1:5000/getLatProd")
            .then(res => res.json())
            .then(data => {setLP(data)})
    }, [])
    return(
        <>
            <div id={"DisplayCardsCon"}>
                <div id={"DCCr1"}>
                    <div id={"RevBox"}>
                        <p className={"CardLabel"}>REVENUE : </p>
                        <p className={"CardVal"}>{Rev} $</p>
                    </div>

                    <div id={"SoldQBox"}>
                        <p className={"CardLabel"}>QUANTITY SOLD : </p>
                        <p className={"CardVal"}>{Quan} Prods</p>
                    </div>

                    <div id={"ProdSBox"}>
                        <p className={"CardLabel"}>PRODUCTS SOLD : </p>

                        <div className={"CardValProd"}>
                            <div className={"cardProdname"}>
                                <p style={{textAlign :" center"}}>CATEGORY</p>
                                <ul>
                                    {Cat.map((cat) => (
                                        <li key={cat.category_id}>{cat.category_name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={"cardColon"}>
                                <p style={{textAlign :" center"}}>|</p>
                                <ul>
                                    {Cat.map((cat) => (
                                        <li key={cat.category_id}>:</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={"cardProdQuan"}>
                                <p style={{textAlign :" center"}}>QUANTITY</p>
                                <ul>
                                    {Cat.map((cat) => (
                                        <li key={cat.category_id}>{cat.quantity}</li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div id={"DCCr2"}>
                    <div id={"AOV"}>
                        <p className={"CardLabel"}>AVG ORDER VALUE : </p>
                        <p className={"CardVal"}>{AOV}</p>
                    </div>
                    <div id={"RSD"}>
                        <p className={"CardLabel"}>RECENT SALES :</p>
                        <div className={"CardValProd"}>
                            <div className={"cardProdname"}>
                                <p style={{textAlign :" center"}}>DATE</p>
                                <ul>
                                    {LP.map((cat) => (
                                        <li>{cat.sale_date}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={"cardColon"}>
                                <p style={{textAlign :" center"}}>PRODUCT</p>
                                <ul>
                                    {LP.map((cat) => (
                                        <li>{cat.Product_Name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={"cardProdQuan"}>
                                <p style={{textAlign :" center"}}>QUANTITY</p>
                                <ul>
                                    {LP.map((cat) => (
                                        <li>{cat.quantity}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={"cardProdQuan"}>
                                <p style={{textAlign :" center"}}>PRICE ($)</p>
                                <ul>
                                    {LP.map((cat) => (
                                        <li>{cat.Price} </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayCards;