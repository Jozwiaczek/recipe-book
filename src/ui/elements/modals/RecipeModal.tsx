import React, {FC} from 'react';
import {Field, Form} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {FieldArray} from 'react-final-form-arrays';
import TextInput from '../forms/TextInput';
import {IFormRecipe} from '../../../services/RecipeService';
import {Button} from '../buttons/Button';
import {Modal} from './Modal';
import {IngredientField} from '../forms/IngredientField';

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
  const submit = (values: IFormRecipe): void => {
    onSubmit(values);
    closeModal();
  };

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <h1>{formTitle}</h1>
      <Form
        onSubmit={submit}
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
          <form onSubmit={handleSubmit}>
            <Field<string>
              name='title'
              component={TextInput}
              placeholder='Recipe Title'
            />
            <br/>
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
                              : <Button
                                color='primary'
                                disabled={submitting || pristine}
                                onClick={() => push('ingredients', undefined)}
                                style={{cursor: 'pointer'}}
                              >
                                    Add Ingredients
                              </Button>
            }
            <br/>
            <br/>
            <br/>
            <div className='buttons'>
              <Button type='submit' color='primary' disabled={submitting || pristine}>Submit</Button>
              <Button
                color='secondary'
                disabled={submitting || pristine}
                onClick={() => form.reset()}
              >
                                Reset
              </Button>
            </div>
          </form>
        )}
      />
    </Modal>
  );
};
