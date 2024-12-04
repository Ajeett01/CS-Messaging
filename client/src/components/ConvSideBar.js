import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MessageCard from "./MessageCard";
import { getCustomerDetails } from '../utils/api'
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey',
    borderRadius: 4,
  },
}));

export default function ConvSideBar({
  data,
  setSelectedConvo,
  isAgent,
  update,
  selectedConvo,
  setCustomerList,
  customerData,
  customerList,
  setCustomerData
}) {
  const [convData, setConvData] = useState(data);

  useEffect(() => {
    setConvData(data);
  }, [data]);

  useEffect(() => {
    if (isAgent) {
      async function customerDataFetch() {
        for (const item of convData) {
          if (!customerList.includes(item.custId)) {
            const res = await getCustomerDetails(item.custId)
            setCustomerList(prev => [...prev, item.custId])
            setCustomerData(prev => [...prev, res])
          }
        }
      }
      customerDataFetch()
    }
  }, [convData, isAgent, customerList, setCustomerList, setCustomerData]);

  return (
    <StyledBox  >
      {convData.length > 0 ? (
        convData.map((item, index) => (
          <MessageCard
            key={index}
            item={item}
            isAgent={isAgent}
            update={update}
            selectedConvo={selectedConvo}
            customerData={customerData}
            setSelectedConvo={setSelectedConvo}
          />
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress size={24} color="primary" />
        </Box>
      )}
    </StyledBox>
  );
}

