import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 1px solid #ddd;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#f0f0f0')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Pagination = ({ moviePerPage, totalMovie, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovie / moviePerPage); i++) {
    pageNumbers.push(i);
  }

  return (

      <PaginationContainer >
       
        {pageNumbers.map(number => (
          <PageButton key={number} >
            <a onClick={() => paginate(number)} href='!#'>
              {number}
            </a>
          </PageButton>
        ))}
      
      </PaginationContainer>
    
  );
};

export default Pagination;