interface ICsvDataProps {
    file: File;
}

function CsvData({file}: Readonly<ICsvDataProps>){
    return (
        <div className="uploadData">
            {file.name}.{file.type}
        </div>
    )
}

export default CsvData;