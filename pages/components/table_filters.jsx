export default function TableFilters({resultsLimitFilterValue , userIdFilterValue , quelleFilterValue}) {

    return(
        <>
        <div className="table-filters--container">
            <div className="filter">
                <p>USER ID: </p>
                <input onChange={userIdFilterValue} type="text" id="user-id" name="user-id" />
            </div>
            <div className="filter">
                <p>QUELLE: </p>
                <select onChange={quelleFilterValue} defaultValue={'HOMEPAGE-TOOL'} name="quelle">
                    <option value="-1">- Alle -</option>
                    <option value="9">HOMEPAGE-TOOL</option>
                    <option value="10">SHOW-ROOOOM</option>
                </select>
            </div>
            <div className="filter">
                <p>Filter number of results: </p>
                <select onChange={resultsLimitFilterValue} defaultValue={'20'} name="limit-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
        </div>
        </>
    )
}
