import React, {useEffect, useState} from 'react';

function Paginate () {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;

       
            setCurrentPage(selectedPage)
            setOffset(offset)
    };

}

export default Paginate;