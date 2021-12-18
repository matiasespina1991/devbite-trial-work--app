export default function TableFilters({resultsLimitValue , userIdValue}) {

    return(
        <>
        <div className="table-filters--container">
            <div className="filter">
                <p>Number of results: </p>
                <select onChange={resultsLimitValue} defaultValue={'20'} name="limit-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
            <div className="filter">
                <p>User ID: </p>
                <input onChange={userIdValue} type="text" id="user-id" name="user-id" />
            </div>
        </div>
        </>
    )
}
