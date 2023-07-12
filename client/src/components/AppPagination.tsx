import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../app/models/pagination";
import { useState } from "react";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
    const { currentPage, pageSize, totalCount, totalPages } = metaData;
    const [pageNumber, setPageNumber] = useState(currentPage);

    function updatePage(page: number) {
        setPageNumber(page);
        onPageChange(page);
    }

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ flexDirection: { xs: "column", sm: "row" } }}>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1}-
                {currentPage * pageSize > totalCount ?
                    totalCount : currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination
                color='secondary'
                size='large'
                count={totalPages}
                page={pageNumber}
                onChange={(event, page) => updatePage(page)}
            />
        </Box>
    )
}