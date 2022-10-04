import React from 'react';
import styled from "styled-components";

const Table = styled.table`
border-collapse: collapse;
margin-bottom: 2em;
`;
const Caption = styled.caption`
font-size: 1.5rem;
    text-align: left;
    padding-bottom: 1rem;
    text-align:left;
`;
const Thead = styled.thead`

`;
const Tbody = styled.tbody``;
const TR = styled.tr``;
const TH = styled.th`
text-align: left;
    background-color: #CCAE51;
    color: #fff;
    padding: 0.5rem;
    border: 1px solid black;
    `;
    
const TD = styled.td`
padding: 0.5rem;
    border: 1px solid black;`;

export const TablularData = ({data,columns,caption}) => {
   
    return (
        <Table>
            <Caption>{caption}</Caption>
            <Thead>
                <TR>{columns.map((col,i) => <TH key={`th-${i}`}>{col}</TH>)}</TR>
            </Thead>
            <Tbody>
                {data.map((data,i) => (<TR key={`tr-${i}`}>
                    { Object.keys(data).map((col,i) => (
                        <TD key={`td-${i}`}>{data[col]}</TD>
                    ))}
                </TR>)                    
                )}
            </Tbody>
        </Table>
    )
}