import React, {FC} from 'react';
import {Field, Form} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {FieldArray} from 'react-final-form-arrays';
import TextInput from '../elements/forms/TextInput';
import {IFormRecipe} from '../../services/RecipeService';
import {Button} from '../elements/buttons/Button';
import {Modal} from '../elements/Modal';
import {IngredientField} from '../elements/forms/IngredientField';
import {IShowToast, ToastConsumer} from '../elements/Toast';
import {styled} from '../elements/layout/Theme';

interface RecipeModalProps {
  onSubmit: (recipe: IFormRecipe) => void;
  isVisible: boolean;
  closeModal: () => void;
  formTitle: string;
  initialValues?: Partial<IFormRecipe | undefined>;
}

const validate = (values: IFormRecipe) => {
  const errors = {} as IFormRecipe;
  const requiredMessage = 'Required';
  if (!values.title) {
    errors.title = requiredMessage;
  }

  return errors;
};

export const RecipeModal: FC<RecipeModalProps> = ({formTitle, initialValues, onSubmit, isVisible, closeModal}) => {
  const submit = (values: IFormRecipe, showToast?: IShowToast): void => {
    try {
      values.ingredients = values.ingredients?.filter((ingredient) => ingredient && ingredient.name);
      onSubmit(values);
      showToast && showToast('New Recipe added successfully!', 'success');
    } catch (e) {
      showToast && showToast(`Error: ${e.message}`, 'error');
    } finally {
      closeModal();
    }
  };

  return (
    <ToastConsumer>
      {({showToast}) =>
        <Modal isVisible={isVisible} onClose={closeModal}>
          <h1>{formTitle}</h1>
          <Form
            onSubmit={values => submit(values, showToast)}
            mutators={{
              ...arrayMutators
            }}
            validate={validate}
            initialValues={initialValues}
            render={({
              handleSubmit,
              form: {
                mutators: {push}
              },
              pristine,
              form,
              submitting,
              values
            }) => (
              <FormWrapper onSubmit={handleSubmit}>
                <Field<string>
                  autoFocus
                  name='title'
                  component={TextInput}
                  placeholder='Recipe Title'
                />
                {
                            values.ingredients?.length > 0
                              ? <FieldArray name='ingredients'>
                                {({fields}) =>
                                  fields.map((name, key) => {
                                    const index = key + 1;
                                    return (
                                      <IngredientField
                                        key={key}
                                        name={name}
                                        addItem={() => push('ingredients', undefined)}
                                        removeItem={() => fields.remove(key)}
                                        index={index}
                                        itemsSize={fields.length}
                                      />
                                    );
                                  })
                                }
                              </FieldArray>
                              : <AddIngredientsButton
                                color='primary'
                                disabled={submitting}
                                onClick={() => push('ingredients', undefined)}
                                style={{cursor: 'pointer'}}
                              >
                                    Add Ingredients
                              </AddIngredientsButton>
                }
                <FormActionSection>
                  <Button type='submit' color='primary' disabled={submitting || pristine}>Submit</Button>
                  <Button
                    color='secondary'
                    disabled={submitting || pristine}
                    onClick={() => form.reset()}
                  >
                                Reset
                  </Button>
                </FormActionSection>
              </FormWrapper>
            )}
          />
        </Modal>
      }
    </ToastConsumer>
  );
};

const AddIngredientsButton = styled(Button)`
  margin-top: 25px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const FormActionSection = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
`;
