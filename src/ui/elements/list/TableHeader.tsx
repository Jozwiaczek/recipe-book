import React, {FC} from 'react';
import {styled} from '../layout/Theme';
import {Row} from './TableRow';

interface Header {
  name: string;
  value: string;
  isSortEnabled: boolean;
}

interface TableHeaderProps {
  headers: Array<Header>;
}

const TableHeader: FC<TableHeaderProps> = ({headers}) => {
  return (
    <thead>
      <HeaderRow>
        <HeaderCell/>
        {
          headers.map((header: Header, key: number) => {
            return (
              <HeaderCell key={key}>
                <HeaderTitle>{header.name}</HeaderTitle>
              </HeaderCell>
            );
          })
        }
      </HeaderRow>
    </thead>
  );
};

export default TableHeader;

const HeaderRow = styled(Row)`
  font-weight: 500;
  text-transform: capitalize;
  border-bottom: 2px solid ${props => props.theme.palette.divider};
`;

const HeaderCell = styled.td`
  height: 36px;
  padding-left: 20px;
`;

const HeaderTitle = styled.p`
  position: relative;
  padding-right: ${props => props.theme.sizes.margin * 1.4}px;
  width: fit-content;
  line-height: normal;
  color: #333740;
`;
