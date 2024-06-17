import "./Loader.css";

interface ILoader {
    text?: string;
}

function Loader({text}:Readonly<ILoader>) {
    return (
        <div className="loadingSection">
            <span className="loader"></span>
            <h5>{text}</h5>
        </div>    
    )
}

export default Loader;