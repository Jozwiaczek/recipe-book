import React, {FC} from 'react';
import TableHeader from './TableHeader';
import {IFormRecipe, IRecipe} from '../../../services/RecipeService';
import {TableRow} from './TableRow';
import {styled} from '../layout/Theme';

export interface IHeader {
  name: string;
  value: string;
}

interface CustomTableProps {
  title: string;
  recipes: Array<IRecipe>;
  removeRecipe: (recipeId: string) => void;
  headers: Array<IHeader>;
  openEditRecipe: (recipe: IFormRecipe) => void;
}

export const List: FC<CustomTableProps> = ({
  headers,
  title,
  recipes,
  removeRecipe,
  openEditRecipe
}) => {
  return (
    <Wrapper>
      <Card>
        <ListTitle>{title}</ListTitle>
        <Table>
          <TableHeader headers={headers}/>
          <tbody>
            {recipes.map((recipe, key: number) => (
              <TableRow
                key={key}
                recipe={recipe}
                removeRecipe={removeRecipe}
                openEditRecipe={openEditRecipe}
              />
            ))}
          </tbody>
        </Table>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ListTitle = styled.p`
  margin: 1em 1em 0.5em;
  font-size: 1.4em;
  font-weight: 500;
  line-height: 1.6;
`;

const Card = styled.div`
  width: 100%;
  border-color: grey;
  border-radius: ${props => props.theme.sizes.borderRadius};
  box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0px rgba(0,0,0,0.14), 0 1px 3px 0px rgba(0,0,0,0.12);
  background: white;
`;

const Table = styled.table`
  width: 100%;
  display: table;
  overflow-x: scroll;
  border-spacing: 0;
  border-collapse: collapse;
  
  tr:nth-last-child(2) {
    border-bottom: none;
  }
`;
