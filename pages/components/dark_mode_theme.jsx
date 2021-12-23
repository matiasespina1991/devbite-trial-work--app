export default function DarkMode() {
    return(
        <style jsx global>{`
            p {
                color: white;
            }
            
            html {
                background-color: #121212;
            }
            
            .search-input{
                color: white;
            }

            .MuiDataGrid-main span,
            .MuiFormControlLabel-label,
            body .data-grid-container div {
                color: white;
            }

            .MuiDataGrid-root, .MuiDataGrid-root * {
                border-color: rgba(255, 255, 255, 0.12) !important;
            }

            .MuiFormControl-root div {
                color: white;
            }
        
            .MuiSvgIcon-root {
                fill: gray !important;
            }

            .table-row {
                background-color: rgb(18, 18, 18);
            }
            
            .table-row th,
            .table-row td {
                color: white;
            }
            
            .table-filters--container {
                background: #121212;
            }

            .table-filters--container .filter input {
                color: white;
            }

            .table-filters--container .filter fieldset {
                border-color: rgba(255, 255, 255, 0.12);
            }

            .MuiInputLabel-root:not(.Mui-focused){
                color: rgba(255, 255, 255, 0.3);
            }

            .MuiInputBase-input {
                color: white;
            }

            .MuiInputBase-root:hover fieldset {
                border-color: rgb(255 255 255 / 37%) !important;
            }

            .MuiDataGrid-footerContainer {
                border-top: 1px solid;
            }         

            .MuiDataGrid-row:hover {
                cursor: pointer;
                background-color: #ffffff1e !important;
            }

            .MuiPaper-root {
                background-color: #4b4848;
                color: white;
            }

            #alert-dialog-slide-description{
                color: white;
            }

        `}</style>
    )
}
