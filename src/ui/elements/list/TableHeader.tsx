import React, {FC} from 'react';
import {styled} from '../layout/Theme';
import {Row} from '../../components/RecipeRow';
import {IHeader} from './List';

interface TableHeaderProps {
  headers: Array<IHeader>;
}

const TableHeader: FC<TableHeaderProps> = ({headers}) => {
  return (
    <thead>
      <HeaderRow>
        <HeaderCell/>
        {
          headers.map((header, key) => {
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
  font-weight: 600;
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
  line-height: normal;
  color: #333740;
`;
