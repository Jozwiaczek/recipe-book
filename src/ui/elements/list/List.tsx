import React, {FC} from 'react';
import TableHeader from './TableHeader';
import {IRecipe} from '../../../services/RecipeService';
import {TableRow} from './TableRow';
import {styled} from '../layout/Theme';

const headers = [
  {
    name: 'Title',
    value: 'title',
    isSortEnabled: true,
  },
  {
    name: 'Updated At',
    value: 'updatedAt',
    isSortEnabled: true,
  },
  {
    name: 'Created At',
    value: 'createdAt',
    isSortEnabled: true,
  },
  {
    name: '',
    value: '',
    isSortEnabled: false,
  }
];

interface CustomTableProps {
  title: string;
  recipes: Array<IRecipe>;
  removeRecipe: (recipeId: string) => void;
}

export const List: FC<CustomTableProps> = ({title, recipes, removeRecipe}) => {
  return (
    <Wrapper>
      <Card>
        <ListTitle>{title}</ListTitle>
        <Table>
          <TableHeader headers={headers}/>
          <tbody>
            {recipes.map((recipe, key: number) => (
              <TableRow key={key} recipe={recipe} removeRecipe={removeRecipe}/>
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
`;
